import type { GlossaryCategory } from '@/types/content';

export const glossaryCategories: GlossaryCategory[] = [
  {
    id: 'study-abroad',
    label: { en: 'Study Abroad & Admissions', vi: 'Du học & Tuyển sinh' },
    scope: {
      en: 'Applications, admissions decisions, entry requirements, and student mobility.',
      vi: 'Hồ sơ, kết quả xét tuyển, điều kiện đầu vào và việc di chuyển của sinh viên.',
    },
  },
  {
    id: 'scholarships',
    label: { en: 'Scholarships & Financial Aid', vi: 'Học bổng & Hỗ trợ tài chính' },
    scope: {
      en: 'Award types, funding conditions, tuition, and cost-of-living support.',
      vi: 'Loại học bổng, điều kiện tài trợ, học phí và hỗ trợ chi phí sinh hoạt.',
    },
  },
  {
    id: 'cooperation',
    label: { en: 'International Cooperation', vi: 'Hợp tác quốc tế' },
    scope: {
      en: 'Agreements, partnerships, MOUs, and inter-institutional commitments.',
      vi: 'Thỏa thuận, quan hệ đối tác, biên bản ghi nhớ và cam kết giữa các cơ sở giáo dục.',
    },
  },
  {
    id: 'conferences',
    label: { en: 'Academic Conferences & Seminars', vi: 'Hội thảo & Hội nghị học thuật' },
    scope: {
      en: 'Programmes, papers, sessions, and the people who present them.',
      vi: 'Chương trình, bài tham luận, phiên họp và những người trình bày.',
    },
  },
  {
    id: 'administration',
    label: { en: 'University Administration', vi: 'Quản trị đại học' },
    scope: {
      en: 'Governance, academic units, staffing, and institutional structures.',
      vi: 'Quản trị, đơn vị học thuật, nhân sự và cơ cấu tổ chức của trường.',
    },
  },
  {
    id: 'exchange',
    label: { en: 'Student Exchange Programs', vi: 'Chương trình trao đổi sinh viên' },
    scope: {
      en: 'Mobility schemes, credit transfer, host institutions, and orientation.',
      vi: 'Chương trình trao đổi, chuyển đổi tín chỉ, trường tiếp nhận và định hướng.',
    },
  },
  {
    id: 'research',
    label: { en: 'Research & Academic Activities', vi: 'Nghiên cứu & Hoạt động học thuật' },
    scope: {
      en: 'Research projects, publications, supervision, and academic integrity.',
      vi: 'Đề tài nghiên cứu, công bố khoa học, hướng dẫn nghiên cứu và liêm chính học thuật.',
    },
  },
  {
    id: 'events',
    label: { en: 'Educational Event Management', vi: 'Tổ chức sự kiện giáo dục' },
    scope: {
      en: 'Logistics, registration, protocol, and on-site coordination.',
      vi: 'Hậu cần, đăng ký, lễ tân và điều phối tại chỗ.',
    },
  },
];
