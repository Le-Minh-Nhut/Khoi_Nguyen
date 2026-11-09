import { BookOpen, Compass, ShieldCheck, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/hooks/useApp';
import { PageHeader, StatPill } from '@/components/shared/PageHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { glossaryTerms } from '@/content/glossary';
import { phrases } from '@/content/phrases';
import { lessons } from '@/content/lessons';
import { scenarios } from '@/content/scenarios';
import { Button } from '@/components/ui/button';

const audience = [
  {
    vi: 'Sinh viên ngành biên–phiên dịch',
    en: 'Translation and interpretation students',
  },
  {
    vi: 'Phiên dịch viên mới vào nghề và trình độ trung cấp',
    en: 'Beginner and intermediate interpreters',
  },
  {
    vi: 'Sinh viên hỗ trợ các sự kiện giáo dục song ngữ',
    en: 'Students supporting bilingual education events',
  },
  {
    vi: 'Cán bộ hợp tác quốc tế của các trường đại học',
    en: 'University international relations staff',
  },
  {
    vi: 'Những người hỗ trợ giao tiếp quốc tế trong giáo dục',
    en: 'Anyone assisting international educational communication',
  },
];

const features = [
  {
    icon: BookOpen,
    vi: 'Tra cứu thuật ngữ song ngữ theo tám nhóm chủ đề, tìm được không dấu, tìm theo từ viết tắt.',
    en: 'Bilingual terminology across eight domains, searchable without diacritics and by abbreviation.',
    to: '/glossary',
    cta: 'Thuật ngữ',
  },
  {
    icon: Compass,
    vi: 'Ngân hàng 48 mẫu câu chuyên nghiệp, hiện/ẩn bản dịch, sao chép và lưu lại.',
    en: 'A bank of 48 professional expressions with translation toggles, copy, and bookmarks.',
    to: '/phrase-bank',
    cta: 'Mẫu câu',
  },
  {
    icon: Target,
    vi: 'Tám chương hướng dẫn nghề phiên dịch, có ghi chú dịch thuật và bảng so sánh.',
    en: 'Eight chapters on interpreting practice, with translation notes and comparison tables.',
    to: '/guide',
    cta: 'Hướng dẫn',
  },
  {
    icon: Users,
    vi: 'Sáu tình huống thực tế với hội thoại song ngữ đầy đủ và mẹo xử lý tại chỗ.',
    en: 'Six realistic scenarios with full bilingual dialogue and on-the-spot tips.',
    to: '/scenarios',
    cta: 'Tình huống',
  },
  {
    icon: ShieldCheck,
    vi: 'Công cụ chuẩn bị: danh mục kiểm tra, bảng thuật ngữ xuất CSV, mẫu ghi chú.',
    en: 'Preparation toolkit: checklists, an exportable glossary, and a note-taking template.',
    to: '/toolkit',
    cta: 'Công cụ',
  },
];

export default function AboutPage() {
  const t = useI18n();

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumbs items={[{ label: t('nav.about') }]} />
      <PageHeader
        eyebrow={t('nav.about')}
        title={t('about.title')}
        lede={t('about.lede')}
        meta={
          <>
            <StatPill label="thuật ngữ" value={String(glossaryTerms.length)} />
            <StatPill label="mẫu câu" value={String(phrases.length)} />
            <StatPill label="chương" value={String(lessons.length)} />
            <StatPill label="tình huống" value={String(scenarios.length)} />
          </>
        }
      />

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 max-w-[68ch]">
          <section aria-labelledby="background">
            <h2 id="background" className="text-h2 mb-3">
              Bối cảnh dự án
            </h2>
            <p className="prose-guide">
              Các sự kiện giáo dục quốc tế tại Việt Nam diễn ra liên tục: hội nghị học thuật, hội thảo, lễ ký
              kết biên bản ghi nhớ, buổi tư vấn du học, chương trình trao đổi sinh viên. Người phiên dịch trong
              những bối cảnh này không chỉ cần vốn từ, mà cần biết thuật ngữ nào là chuẩn mực, chức danh nào
              phải đọc ra sao, và khi nào một cách dịch trôi chảy lại làm sai lệch ý.
            </p>
            <p className="prose-guide mt-3">
              EduLingo Guide ra đời để lấp khoảng trống đó: một sổ tay tra cứu nhanh, có chú thích dịch thuật,
              tổ chức theo đúng cách một phiên dịch viên chuẩn bị cho sự kiện — tra thuật ngữ, học kỹ thuật,
              rồi luyện tập.
            </p>
          </section>

          <section aria-labelledby="mission" className="mt-10">
            <h2 id="mission" className="text-h2 mb-3">
              Sứ mệnh
            </h2>
            <p className="prose-guide">
              Giúp người làm công tác phiên dịch trong giáo dục có được cách diễn đạt chính xác và tự nhiên
              bằng cả hai ngôn ngữ, để nội dung học thuật và các cam kết hợp tác không bị bóp méo qua bản dịch.
            </p>
          </section>

          <section aria-labelledby="vision" className="mt-10">
            <h2 id="vision" className="text-h2 mb-3">
              Tầm nhìn
            </h2>
            <p className="prose-guide">
              Một nguồn tham khảo mở, miễn phí, được cập nhật, mà bất kỳ sinh viên hay cán bộ hợp tác quốc tế
              nào cũng có thể dùng trước một sự kiện mà không cần khóa đào tạo dài hạn. Nội dung song ngữ, không
              chỉ là danh sách từ.
            </p>
          </section>

          <section aria-labelledby="audience" className="mt-10">
            <h2 id="audience" className="text-h2 mb-3">
              Đối tượng sử dụng
            </h2>
            <ul className="space-y-2">
              {audience.map((item) => (
                <li key={item.en} className="flex gap-3 border-b border-divider pb-2 text-[14.5px]">
                  <span className="flex-1 text-ink">{item.vi}</span>
                  <span className="hidden flex-1 text-[13px] text-ink-muted sm:block">{item.en}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="features" className="mt-10">
            <h2 id="features" className="text-h2 mb-3">
              Chức năng của website
            </h2>
            <ul className="space-y-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.to} className="flex gap-3 rounded-lg border border-divider bg-surface p-4">
                    <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] leading-relaxed text-ink">{feature.vi}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-muted">{feature.en}</p>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="self-center">
                      <Link to={feature.to}>{feature.cta}</Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="disclaimer" className="mt-10 rounded-card border border-highlight/70 bg-highlight-soft p-5">
            <h2 id="disclaimer" className="text-h3 mb-2 text-[#4d370f]">
              Tuyên bố miễn trừ
            </h2>
            <p className="text-[13.5px] leading-relaxed text-[#5f4413]">{t('footer.disclaimer')}</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-[#7a5a20]">
              This project is not affiliated with, endorsed by, or sponsored by any university, ministry, or
              professional body. Names of institutions in the practice material are illustrative.
            </p>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border border-divider bg-canvas/60 p-4">
            <h2 className="eyebrow mb-2">Nguyên tắc thiết kế</h2>
            <ul className="space-y-2 text-[13px] leading-relaxed text-ink-muted">
              <li>Song ngữ ngay trên trang, không giấu bản dịch sau một tab.</li>
              <li>Chú thích khi một cách dịch sát chữ sẽ gây hiểu sai.</li>
              <li>Không tự động chấm điểm bản dịch mở — chỉ đưa bản gợi ý để đối chiếu.</li>
              <li>Toàn bộ nội dung chạy trong trình duyệt; không có máy chủ, không thu thập dữ liệu.</li>
            </ul>
          </div>

          <div className="rounded-card border border-divider bg-surface p-4">
            <h2 className="eyebrow mb-2">Công nghệ</h2>
            <p className="text-[13px] leading-relaxed text-ink-muted">
              React 19, TypeScript, Vite, Tailwind CSS v4, Radix UI, React Router, Lucide. Dữ liệu giáo dục
              nằm trong các tệp TypeScript; tùy chọn và nội dung đã lưu dùng localStorage.
            </p>
          </div>

          <div className="rounded-card border border-divider bg-accent-soft/60 p-4">
            <h2 className="eyebrow mb-1">Bắt đầu</h2>
            <p className="text-[13px] leading-relaxed text-ink-muted">
              Đọc chương một, rồi mở một tình huống và ẩn bản dịch để tự thử.
            </p>
            <Button asChild size="sm" className="mt-3">
              <Link to="/guide/types-of-interpreting">{t('guide.start')}</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
