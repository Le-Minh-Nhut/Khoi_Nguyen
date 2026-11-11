import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { GlossaryCategory, GlossaryCategoryId } from '@/types/content';
import { TileImage } from '@/components/shared/ImageCredit';
import { useSettings } from '@/app/SettingsProvider';

/** One documentary photograph per domain; keeps the ledger editorial, not a gallery. */
const categoryImages: Record<GlossaryCategoryId, { file: string; alt: string }> = {
  'study-abroad': {
    file: 'cat-study-abroad.webp',
    alt: 'Quầy tư vấn của một trường đại học tại hội chợ du học, nhân viên đang trao đổi với học sinh',
  },
  scholarships: {
    file: 'cat-scholarships.webp',
    alt: 'Sinh viên nhận học bổng trò chuyện cùng đại diện nhà tài trợ sau lễ trao',
  },
  cooperation: {
    file: 'cat-cooperation.webp',
    alt: 'Đoàn đại biểu hai trường đại học ngồi làm việc quanh bàn họp dài',
  },
  conferences: {
    file: 'cat-conferences.webp',
    alt: 'Khán phòng hội nghị học thuật đông người nghe diễn giả chính phát biểu',
  },
  administration: {
    file: 'cat-administration.webp',
    alt: 'Mặt tiền một tòa nhà học thuật của trường đại học',
  },
  exchange: {
    file: 'cat-exchange.webp',
    alt: 'Sinh viên đi bộ qua cầu trong khuôn viên trường đại học',
  },
  research: {
    file: 'cat-research.webp',
    alt: 'Nhà nghiên cứu làm việc trong phòng thí nghiệm y sinh',
  },
  events: {
    file: 'cat-events.webp',
    alt: 'Bàn đón tiếp đại biểu tại một hội nghị quốc tế',
  },
};

/** Eight domains as a numbered ledger — the structure carries the meaning. */
export function EventCategories({ categories }: { categories: GlossaryCategory[] }) {
  const { uiLang } = useSettings();
  return (
    <ul className="grid gap-px overflow-hidden rounded-card border border-divider bg-divider sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category, index) => {
        const image = categoryImages[category.id];
        return (
          <li key={category.id} className="bg-surface">
            <Link
              to={`/glossary?category=${category.id}`}
              className="group flex h-full flex-col transition-colors hover:bg-accent-soft/40"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-canvas">
                <TileImage
                  file={image.file}
                  alt={image.alt}
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw"
                  className="opacity-[0.94] transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                />
                <span className="absolute left-2.5 top-2.5 rounded bg-surface/90 px-1.5 py-0.5 font-serif text-[11px] font-semibold tabular-nums text-ink backdrop-blur-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[15px] font-semibold leading-snug text-ink" lang={uiLang}>
                    {category.label[uiLang]}
                  </h3>
                  <ArrowUpRight
                    className="mt-0.5 size-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-0.5 text-[12.5px] leading-snug text-ink-muted" lang={uiLang === 'vi' ? 'en' : 'vi'}>
                  {category.label[uiLang === 'vi' ? 'en' : 'vi']}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
