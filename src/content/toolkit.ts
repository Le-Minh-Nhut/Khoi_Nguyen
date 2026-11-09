import type { ChecklistItem, QualityCriterion } from '@/types/content';

/** Ten preparation items for the week before an interpreted event. */
export const preparationChecklist: ChecklistItem[] = [
  {
    id: 'agenda',
    label: { en: 'Read the full agenda and note which sessions need interpretation', vi: 'Đọc toàn bộ chương trình và ghi rõ phiên nào cần phiên dịch' },
    detail: {
      en: 'Confirm the mode for each session: consecutive, simultaneous, or liaison.',
      vi: 'Xác nhận hình thức cho từng phiên: nối tiếp, song song hay đàm thoại.',
    },
  },
  {
    id: 'organisers',
    label: { en: 'Research the organizers and both partner institutions', vi: 'Tìm hiểu đơn vị tổ chức và hai cơ sở đối tác' },
  },
  {
    id: 'names',
    label: { en: 'Verify speaker names, titles, and the order they will be read', vi: 'Xác minh tên, chức danh diễn giả và thứ tự đọc' },
    detail: {
      en: 'Vietnamese titles are read before names; check whether PGS.TS appears in full.',
      vi: 'Chức danh tiếng Việt đọc trước tên; kiểm tra tên đầy đủ PGS.TS hay không.',
    },
  },
  {
    id: 'terminology',
    label: { en: 'Build a bilingual glossary from the event documents', vi: 'Lập bảng thuật ngữ song ngữ từ tài liệu sự kiện' },
  },
  {
    id: 'institutional-terms',
    label: { en: 'Confirm institution-specific terminology and abbreviations', vi: 'Xác nhận thuật ngữ và viết tắt riêng của từng trường' },
  },
  {
    id: 'materials',
    label: { en: 'Review slides, papers, and the draft agreement', vi: 'Xem slide, bài tham luận và dự thảo thỏa thuận' },
  },
  {
    id: 'practice',
    label: { en: 'Practise aloud: three sentences per key term, both directions', vi: 'Luyện thành tiếng: ba câu cho mỗi thuật ngữ chính, cả hai chiều' },
  },
  {
    id: 'equipment',
    label: { en: 'Check interpretation equipment, channels, and headset stock', vi: 'Kiểm tra thiết bị phiên dịch, kênh và số lượng tai nghe' },
    detail: {
      en: 'Test with the technician, not with a colleague on the phone.',
      vi: 'Kiểm tra với kỹ thuật viên, không phải với đồng nghiệp qua điện thoại.',
    },
  },
  {
    id: 'schedule',
    label: { en: 'Confirm schedule, breaks, and who covers each session', vi: 'Xác nhận lịch, giờ giải lao và người phụ trách từng phiên' },
  },
  {
    id: 'backup',
    label: { en: 'Prepare backup materials: printed glossary, spare notebook, battery pack', vi: 'Chuẩn bị dự phòng: bảng thuật ngữ in sẵn, sổ dự phòng, pin dự phòng' },
  },
];

/** Nine criteria for reviewing a finished translation. */
export const qualityChecklist: QualityCriterion[] = [
  {
    id: 'accuracy',
    label: { en: 'Accuracy', vi: 'Độ chính xác' },
    question: { en: 'Does every proposition in the source appear in the target?', vi: 'Mọi mệnh đề trong bản gốc có xuất hiện trong bản dịch không?' },
  },
  {
    id: 'terminology',
    label: { en: 'Terminology', vi: 'Thuật ngữ' },
    question: { en: 'Is each technical term rendered with the agreed equivalent?', vi: 'Mỗi thuật ngữ có được dịch bằng cách đã thống nhất không?' },
  },
  {
    id: 'consistency',
    label: { en: 'Consistency', vi: 'Nhất quán' },
    question: { en: 'Is the same concept named the same way throughout?', vi: 'Cùng một khái niệm có được gọi giống nhau xuyên suốt không?' },
  },
  {
    id: 'clarity',
    label: { en: 'Clarity', vi: 'Rõ ràng' },
    question: { en: 'Can a reader understand it on first reading?', vi: 'Người đọc có hiểu ngay lần đọc đầu không?' },
  },
  {
    id: 'naturalness',
    label: { en: 'Naturalness', vi: 'Tự nhiên' },
    question: { en: 'Does it read like a text written in the target language?', vi: 'Bản dịch có đọc như văn bản viết bằng ngôn ngữ đích không?' },
  },
  {
    id: 'context',
    label: { en: 'Context', vi: 'Ngữ cảnh' },
    question: { en: 'Does the register match the event and the audience?', vi: 'Văn phong có phù hợp với sự kiện và người nghe không?' },
  },
  {
    id: 'grammar',
    label: { en: 'Grammar', vi: 'Ngữ pháp' },
    question: { en: 'Are there no agreement, tense, or classifier errors?', vi: 'Không có lỗi hợp giống, thì, hay loại từ chứ?' },
  },
  {
    id: 'tone',
    label: { en: 'Tone', vi: 'Giọng điệu' },
    question: { en: 'Is politeness preserved without becoming excessive?', vi: 'Sắc thái lịch sự có được giữ mà không quá mức không?' },
  },
  {
    id: 'completeness',
    label: { en: 'Completeness', vi: 'Đầy đủ' },
    question: { en: 'Are conditions, negatives, and figures all present?', vi: 'Điều kiện, phủ định và số liệu đã có đủ chưa?' },
  },
];

export const referenceResources = [
  {
    name: 'Cambridge Dictionary',
    url: 'https://dictionary.cambridge.org/',
    description: {
      en: 'Learner-oriented definitions with example sentences and British/American usage.',
      vi: 'Định nghĩa hướng người học, kèm câu ví dụ và cách dùng Anh–Mỹ.',
    },
    kind: { en: 'Dictionary', vi: 'Từ điển' },
  },
  {
    name: 'Merriam-Webster',
    url: 'https://www.merriam-webster.com/',
    description: {
      en: 'Precise American English definitions; useful for deciding between near-synonyms.',
      vi: 'Định nghĩa tiếng Anh Mỹ chính xác; hữu ích khi phân biệt các từ gần nghĩa.',
    },
    kind: { en: 'Dictionary', vi: 'Từ điển' },
  },
  {
    name: 'Từ điển tiếng Việt — Vdict',
    url: 'https://vdict.com/',
    description: {
      en: 'Vietnamese dictionary and cross-language lookups for checking a rendering.',
      vi: 'Từ điển tiếng Việt và tra cứu đa ngôn ngữ để kiểm tra cách dịch.',
    },
    kind: { en: 'Dictionary', vi: 'Từ điển' },
  },
  {
    name: 'UNTERM — United Nations Terminology Database',
    url: 'https://unterm.un.org/',
    description: {
      en: 'Official multilingual terminology from UN documents, including education and development terms.',
      vi: 'Thuật ngữ chính thức đa ngôn ngữ từ văn bản Liên Hợp Quốc, gồm cả lĩnh vực giáo dục và phát triển.',
    },
    kind: { en: 'Terminology database', vi: 'Cơ sở dữ liệu thuật ngữ' },
  },
  {
    name: 'IATE — EU Interinstitutional Terminology',
    url: 'https://iate.europa.eu/',
    description: {
      en: 'EU terminology with definitions and reliability ratings, strong on education policy terms.',
      vi: 'Thuật ngữ EU có định nghĩa và mức độ tin cậy, mạnh về thuật ngữ chính sách giáo dục.',
    },
    kind: { en: 'Terminology database', vi: 'Cơ sở dữ liệu thuật ngữ' },
  },
  {
    name: 'UNESCO Institute for Statistics — Glossary',
    url: 'https://uis.unesco.org/en/glossary',
    description: {
      en: 'Definitions for enrolment, literacy, mobility, and other education indicators.',
      vi: 'Định nghĩa các chỉ số tuyển sinh, biết chữ, di chuyển học tập và các chỉ số giáo dục khác.',
    },
    kind: { en: 'Education glossary', vi: 'Thuật ngữ giáo dục' },
  },
  {
    name: 'EUR-Lex',
    url: 'https://eur-lex.europa.eu/',
    description: {
      en: 'Full texts of EU legal instruments; useful when a term carries legal effect.',
      vi: 'Toàn văn văn bản pháp lý EU; hữu ích khi thuật ngữ mang hiệu lực pháp lý.',
    },
    kind: { en: 'Legal source', vi: 'Nguồn pháp lý' },
  },
  {
    name: 'Bộ Giáo dục và Đào tạo — Văn bản',
    url: 'https://moet.gov.vn/',
    description: {
      en: 'Official Vietnamese education regulations; the reference for domestic administrative terms.',
      vi: 'Văn bản quy phạm về giáo dục Việt Nam; nguồn chuẩn cho thuật ngữ hành chính trong nước.',
    },
    kind: { en: 'Regulatory source', vi: 'Nguồn quy phạm' },
  },
  {
    name: 'AIIC — International Association of Conference Interpreters',
    url: 'https://aiic.org/',
    description: {
      en: 'Professional standards, working conditions, and guidance on interpreting practice.',
      vi: 'Chuẩn mực nghề, điều kiện làm việc và hướng dẫn thực hành phiên dịch.',
    },
    kind: { en: 'Professional body', vi: 'Tổ chức nghề nghiệp' },
  },
] as const;
