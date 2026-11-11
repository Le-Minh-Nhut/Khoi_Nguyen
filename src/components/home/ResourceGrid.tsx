import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Languages,
  Lightbulb,
  ListChecks,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/app/SettingsProvider';

const resources = [
  {
    to: '/guide',
    icon: BookOpen,
    en: 'Interpretation guide',
    vi: 'Hướng dẫn phiên dịch',
    bodyVi: 'Tám chương từ phân loại hình thức phiên dịch đến xử lý tình huống khó về đạo đức nghề.',
    bodyEn: 'Eight chapters, from the modes of interpreting to difficult ethical situations.',
  },
  {
    to: '/phrase-bank',
    icon: Languages,
    en: 'Phrase bank',
    vi: 'Ngân hàng mẫu câu',
    bodyVi: '48 mẫu câu chuyên nghiệp cho khai mạc, giới thiệu, điều hành thảo luận và bế mạc.',
    bodyEn: '48 professional expressions for openings, introductions, moderation, and closing.',
  },
  {
    to: '/tips',
    icon: Lightbulb,
    en: 'Tips & common mistakes',
    vi: 'Lưu ý & lỗi thường gặp',
    bodyVi: 'Mười lỗi dịch phổ biến, mỗi lỗi có ví dụ cụ thể và cách xử lý tốt hơn.',
    bodyEn: 'Ten frequent translation errors, each with a concrete example and a better approach.',
  },
  {
    to: '/toolkit',
    icon: ListChecks,
    en: 'Translation toolkit',
    vi: 'Bộ công cụ phiên dịch',
    bodyVi: 'Danh mục chuẩn bị, kiểm tra chất lượng, bảng thuật ngữ xuất CSV và mẫu ghi chú.',
    bodyEn: 'Checklists, a quality review, an exportable glossary, and a note-taking sheet.',
  },
  {
    to: '/practice',
    icon: Target,
    en: 'Practice',
    vi: 'Luyện tập',
    bodyVi: 'Hai bài trắc nghiệm có chấm điểm và mười bài dịch để đối chiếu.',
    bodyEn: 'Two scored quizzes and ten translation exercises to compare against.',
  },
  {
    to: '/saved',
    icon: BookMarked,
    en: 'Saved items',
    vi: 'Nội dung đã lưu',
    bodyVi: 'Thuật ngữ, mẫu câu, bài học và tình huống bạn đã đánh dấu, lưu trên trình duyệt này.',
    bodyEn: 'Terms, phrases, chapters, and scenarios you bookmarked, stored in this browser.',
  },
];

export function ResourceGrid() {
  // Card copy is chrome, so it follows the interface language; the other
  // language stays on screen as the secondary line, as everywhere else.
  const { uiLang } = useSettings();
  const other = uiLang === 'vi' ? 'en' : 'vi';

  return (
    <ul className="grid gap-px overflow-hidden rounded-card border border-divider bg-divider sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => {
        const Icon = resource.icon;
        const body = uiLang === 'vi' ? resource.bodyVi : resource.bodyEn;
        return (
          <li key={resource.to} className="bg-surface">
            <Link
              to={resource.to}
              className="group flex h-full flex-col p-5 transition-colors hover:bg-accent-soft/50"
            >
              <div className="flex items-center justify-between">
                <Icon className="size-5 text-accent" aria-hidden="true" />
                <ArrowRight
                  className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-3 text-[15px] font-semibold text-ink" lang={uiLang}>
                {resource[uiLang]}
              </h3>
              <p className="text-[12px] uppercase tracking-wide text-ink-muted" lang={other}>
                {resource[other]}
              </p>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-muted" lang={uiLang}>
                {body}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
