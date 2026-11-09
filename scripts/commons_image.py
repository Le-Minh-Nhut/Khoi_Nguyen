#!/usr/bin/env python3
"""Commons image sourcing: search, inspect licences, fetch as optimised WebP.

  python3 scripts/commons_image.py search "conference audience" --limit 12
  python3 scripts/commons_image.py fetch "File:Foo.jpg" --name conferences-hall.webp \
      --width 900 --ratio 16:9

Search prints candidates with licence, author and native resolution, flagging
which ones pass the PD/CC0/CC-BY/CC-BY-SA filter. `fetch` refuses anything that
fails the filter, downloads the server-side thumbnail (never the full original),
centre-crops to --ratio, resizes, strips metadata and writes WebP into
public/images/. Credits printed at the end go straight into imageCredits.ts.
"""
import argparse
import io
import json
import pathlib
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = 'https://commons.wikimedia.org/w/api.php'
UA = ('EduLingoGuide/1.0 (https://github.com/le-minh-nhut/Khoi_Nguyen; '
      'educational project) python-urllib/3.12')
OUT = pathlib.Path(__file__).resolve().parent.parent / 'public/images'


def api(**params):
    params.update(action='query', format='json', formatversion='2')
    url = API + '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    time.sleep(1.2)  # Commons rate-limits bursts
    for attempt in range(4):  # Commons rate-limits bursts with 429
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            if error.code != 429 or attempt == 3:
                raise
            time.sleep(2 + attempt * 2)


def info(titles, width=1600):
    data = api(prop='imageinfo', titles='|'.join(titles),
               iiprop='url|mime|size|extmetadata', iiurlwidth=width)
    return [p for p in data['query']['pages'] if 'imageinfo' in p]


def meta(page):
    m = page['imageinfo'][0].get('extmetadata', {})
    author = re.sub(r'<[^>]+>', '', m.get('Artist', {}).get('value', '')).strip()
    license = m.get('LicenseShortName', {}).get('value', '').strip()
    return author, license


def clean(license):
    """PD, CC0, CC BY[n], CC BY-SA[n] — anything else is refused."""
    value = license.strip().lower()
    if not value or 'nc' in value or 'nd' in value:
        return False
    return any(value.startswith(p) for p in ('cc0', 'cc by', 'public domain', 'pd'))


def search(query, limit):
    # filetype:bitmap keeps PDFs/SVGs out; wide images only, so tiles crop well.
    data = api(list='search', srsearch=f'{query} filetype:bitmap',
               srnamespace=6, srlimit=limit)
    if 'query' not in data or not data['query'].get('search'):
        print('-- no results')
        return
    pages = info([r['title'] for r in data['query']['search']])
    for p in pages:
        ii = p['imageinfo'][0]
        if ii['width'] < 900 or ii['width'] / max(ii['height'], 1) < 1.1:
            continue
        author, license = meta(p)
        flag = 'OK ' if clean(license) else '-- '
        print(f"{flag}{ii['width']}x{ii['height']}  {license or '?':22} {author[:42]:42} {p['title']}")


def fetch(title, name, width, ratio=None):
    page = info([title], width)[0]
    ii = page['imageinfo'][0]
    author, license = meta(page)
    if not clean(license):
        sys.exit(f'refusing {title}: licence "{license}" not PD/CC0/CC BY/CC BY-SA')
    req = urllib.request.Request(ii['thumburl'], headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=60) as response:
        raw = response.read()
    from PIL import Image
    image = Image.open(io.BytesIO(raw)).convert('RGB')
    if ratio:
        rw, rh = (int(x) for x in ratio.split(':'))
        target = rw / rh
        w, h = image.size
        if w / h > target:
            new_w = int(h * target)
            left = (w - new_w) // 2
            image = image.crop((left, 0, left + new_w, h))
        else:
            new_h = int(w / target)
            top = (h - new_h) // 2
            image = image.crop((0, top, w, top + new_h))
    if image.width > width:
        image = image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    image.save(path, 'WEBP', quality=78, method=6)
    print(f'{path.relative_to(OUT.parent.parent)}  {path.stat().st_size} B  {image.width}x{image.height}')
    print('credits entry:')
    print(f"  {{ file: '{name}', title: '{title[5:]}', author: '{author}', "
          f"license: '{license}', sourceUrl: 'https://commons.wikimedia.org/wiki/"
          f"{urllib.parse.quote(title.replace(' ', '_'))}' }},")


def preview(titles, tag):
    """Contact sheet of 300px thumbs at /tmp/commons-preview/<tag>.jpg — look before fetching."""
    from PIL import Image, ImageDraw
    cell, cols = 300, 4
    pages = info(titles, 320)
    sheet = Image.new('RGB', (cols * cell, ((len(pages) + cols - 1) // cols) * (cell + 18)), 'white')
    draw = ImageDraw.Draw(sheet)
    for index, page in enumerate(pages):
        req = urllib.request.Request(page['imageinfo'][0]['thumburl'], headers={'User-Agent': UA})
        with urllib.request.urlopen(req, timeout=60) as response:
            image = Image.open(io.BytesIO(response.read())).convert('RGB')
        image.thumbnail((cell - 8, cell - 8))
        x, y = (index % cols) * cell, (index // cols) * (cell + 18)
        sheet.paste(image, (x + 4, y + 4))
        draw.text((x + 6, y + cell + 2), f"{index} {page['title'][5:60]}", fill='black')
        print(index, page['title'])
    out = pathlib.Path('/tmp/commons-preview'); out.mkdir(exist_ok=True)
    sheet.save(out / f'{tag}.jpg', quality=80)
    print(out / f'{tag}.jpg')


def category(name, limit):
    data = api(generator='categorymembers', gcmtitle=f'Category:{name}', gcmtype='file',
               gcmlimit=limit, prop='imageinfo', iiprop='url|mime|size|extmetadata',
               iiurlwidth=1600)
    for page in [p for p in data.get('query', {}).get('pages', []) if 'imageinfo' in p]:
        ii = page['imageinfo'][0]
        author, license = meta(page)
        print(f"{'OK ' if clean(license) else '-- '}{ii['width']}x{ii['height']}  "
              f"{(license or '?')[:22]:22} {author[:40]:40} {page['title']}")


def thumb(title, width):
    page = info([title], width)[0]
    print(page['imageinfo'][0]['thumburl'])


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest='command', required=True)
    s = sub.add_parser('search')
    s.add_argument('query')
    s.add_argument('--limit', type=int, default=12)
    f = sub.add_parser('fetch')
    f.add_argument('title')
    f.add_argument('--name', required=True)
    f.add_argument('--width', type=int, default=900)
    f.add_argument('--ratio', help='e.g. 16:9, 4:3, 1:1')
    pr = sub.add_parser('preview')
    pr.add_argument('tag')
    pr.add_argument('titles', nargs='+')
    c = sub.add_parser('cat')
    c.add_argument('name')
    c.add_argument('--limit', type=int, default=25)
    t = sub.add_parser('thumb')
    t.add_argument('title')
    t.add_argument('--width', type=int, default=480)
    args = parser.parse_args()
    if args.command == 'search':
        search(args.query, args.limit)
    elif args.command == 'preview':
        preview(args.titles, args.tag)
    elif args.command == 'cat':
        category(args.name, args.limit)
    elif args.command == 'thumb':
        thumb(args.title, args.width)
    else:
        fetch(args.title, args.name, args.width, args.ratio)
