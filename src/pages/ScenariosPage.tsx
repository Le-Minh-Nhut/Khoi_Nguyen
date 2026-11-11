import { ArrowRight, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scenarios } from '@/content/scenarios';
import { useI18n } from '@/hooks/useApp';
import { PageHeader, StatPill } from '@/components/shared/PageHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { ImageCredit, TileImage } from '@/components/shared/ImageCredit';

/** Documentary photograph per scenario, cropped 16:9. */
const scenarioImages: Record<string, { file: string; alt: string }> = {
  'university-partnership-meeting': {
    file: 'sc-partnership.webp',
    alt: 'Hai đoàn đại biểu trường đại học ngồi đàm phán quanh bàn họp dài',
  },
  'study-abroad-consultation': {
    file: 'sc-consultation.webp',
    alt: 'Sinh viên trao đổi với cán bộ tư vấn trong khuôn viên trường',
  },
  'international-education-seminar': {
    file: 'sc-seminar.webp',
    alt: 'Các diễn giả thảo luận trên sân khấu một hội thảo quốc tế',
  },
  'student-exchange-discussion': {
    file: 'sc-exchange.webp',
    alt: 'Nhóm sinh viên chương trình trao đổi chụp ảnh lưu niệm cùng nhau',
  },
  'scholarship-information-session': {
    file: 'sc-scholarship.webp',
    alt: 'Lễ trao học bổng cho sinh viên xuất sắc',
  },
  'mou-signing-ceremony': {
    file: 'sc-signing.webp',
    alt: 'Đại diện hai trường đại học ký kết thỏa thuận hợp tác',
  },
};

export default function ScenariosPage() {
  const t = useI18n();

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs items={[{ label: t('nav.scenarios') }]} />
      <PageHeader
        eyebrow={t('nav.learn')}
        title={t('scenarios.title')}
        lede={t('scenarios.lede')}
        meta={
          <>
            <StatPill label={t('nav.scenarios')} value={String(scenarios.length)} />
            <StatPill
              label={t('label.turns')}
              value={String(scenarios.reduce((sum, item) => sum + item.dialogue.length, 0))}
            />
          </>
        }
      />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {scenarios.map((scenario, index) => (
          <li key={scenario.slug}>
            <Link
              to={`/scenarios/${scenario.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-panel border border-divider bg-surface transition-colors hover:border-accent/40"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-canvas">
                <TileImage
                  file={scenarioImages[scenario.slug]?.file ?? 'sc-seminar.webp'}
                  alt={scenarioImages[scenario.slug]?.alt ?? ''}
                  width={1100}
                  height={619}
                  sizes="(min-width: 1280px) 380px, (min-width: 640px) 45vw, 92vw"
                  className="opacity-[0.94] transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                />
                <span className="absolute left-3 top-3 rounded bg-surface/90 px-1.5 py-0.5 font-serif text-[11px] font-semibold tabular-nums text-ink backdrop-blur-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 pt-4">
              <div className="flex items-start justify-between gap-3">
                <MessagesSquare className="size-4 text-accent" aria-hidden="true" />
              </div>

              <h2 className="mt-2 text-[1.15rem] font-semibold leading-snug text-ink transition-colors group-hover:text-accent-strong">
                {scenario.title.vi}
              </h2>
              <p className="mt-0.5 text-[12.5px] text-ink-muted" lang="en">
                {scenario.title.en}
              </p>

              <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-muted" lang="vi">
                {scenario.setting.vi}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <Badge tone="accent">
                  {scenario.dialogue.length} {t('label.turns')}
                </Badge>
                <Badge>
                  {scenario.terms.length} {t('label.terms')}
                </Badge>
              </div>

              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-strong">
                {t('scenarios.open')}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>

              <ImageCredit
                file={scenarioImages[scenario.slug]?.file ?? 'sc-seminar.webp'}
                className="mt-3 border-t border-divider pt-2"
              />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
