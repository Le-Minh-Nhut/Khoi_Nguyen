import { ArrowRight, Fingerprint, Layers, PenLine, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/hooks/useApp';
import { useSettings } from '@/app/SettingsProvider';

const phases = [
  {
    key: 'before' as const,
    icon: Layers,
    en: 'Before',
    vi: 'Trước sự kiện',
    items: [
      { en: 'Read the agenda and confirm which sessions need interpretation.', vi: 'Đọc chương trình và xác nhận phiên nào cần phiên dịch.' },
      { en: 'Build a bilingual glossary from the papers, slides, and the MOU annex.', vi: 'Lập bảng thuật ngữ song ngữ từ tài liệu, slide và phụ lục MOU.' },
      { en: 'Confirm names, titles, and the order they will be read aloud.', vi: 'Xác nhận tên, chức danh và thứ tự đọc.' },
    ],
    to: '/toolkit',
    linkKey: 'toolkit.checklist' as const,
  },
  {
    key: 'during' as const,
    icon: Target,
    en: 'During',
    vi: 'Trong sự kiện',
    items: [
      { en: 'Listen for the intent behind each turn before choosing a term.', vi: 'Nghe ý định phía sau mỗi lượt nói trước khi chọn thuật ngữ.' },
      { en: 'Keep a running note of numbers, and re-confirm any figure above a detail threshold.', vi: 'Ghi liên tục các con số, xác nhận lại mọi con số quan trọng.' },
      { en: 'Use the phrase bank for protocol moments so you are not composing under pressure.', vi: 'Dùng ngân hàng mẫu câu cho các nghi thức để không phải ứng biến dưới áp lực.' },
    ],
    to: '/phrase-bank',
    linkKey: 'nav.phrases' as const,
  },
  {
    key: 'after' as const,
    icon: PenLine,
    en: 'After',
    vi: 'Sau sự kiện',
    items: [
      { en: 'Record new terms while the context is still fresh.', vi: 'Ghi lại thuật ngữ mới khi bối cảnh còn rõ.' },
      { en: 'Check whether any spoken commitment needs written confirmation.', vi: 'Kiểm tra xem có cam kết nào cần xác nhận bằng văn bản.' },
      { en: 'Review one weak moment and decide what to prepare differently next time.', vi: 'Xem lại một điểm yếu và quyết định sẽ chuẩn bị khác đi thế nào.' },
    ],
    to: '/guide/terminology-preparation',
    linkKey: 'nav.guide' as const,
  },
];

export function EventPathway() {
  const t = useI18n();
  const { uiLang } = useSettings();
  const other = uiLang === 'vi' ? 'en' : 'vi';

  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {phases.map((phase, index) => {
        const Icon = phase.icon;
        return (
          <li key={phase.key} className="relative flex flex-col rounded-card border border-divider bg-canvas/60 p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-content-center rounded-lg border border-accent/25 bg-surface text-accent-strong">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="font-serif text-lg font-semibold leading-tight text-ink" lang={uiLang}>
                  {phase[uiLang]}
                </p>
                <p className="text-[12px] uppercase tracking-wide text-ink-muted" lang={other}>
                  {phase[other]}
                </p>
              </div>
            </div>

            <ul className="mt-4 flex-1 space-y-2.5 border-t border-divider pt-4">
              {phase.items.map((item) => (
                <li key={item.en} className="flex gap-2.5 text-[13.5px] leading-relaxed">
                  <Fingerprint className="mt-1 size-3 shrink-0 text-accent/60" aria-hidden="true" />
                  <span>
                    <span className="block text-ink" lang={uiLang}>
                      {item[uiLang]}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] text-ink-muted" lang={other}>
                      {item[other]}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to={phase.to}
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-strong hover:underline"
            >
              {t(phase.linkKey)}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
