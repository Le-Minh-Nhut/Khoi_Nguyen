import type { PhraseCategory } from '@/types/content';

export const phraseCategories: PhraseCategory[] = [
  {
    id: 'opening',
    label: { en: 'Opening & Welcoming', vi: 'Khai mạc & Chào mừng' },
    scope: {
      en: 'Welcomes, acknowledgements, and first minutes of an event.',
      vi: 'Lời chào mừng, ghi nhận sự hiện diện và những phút đầu của sự kiện.',
    },
  },
  {
    id: 'introducing',
    label: { en: 'Introducing Speakers', vi: 'Giới thiệu diễn giả' },
    scope: {
      en: 'Titles, affiliations, and the reasons a speaker is worth listening to.',
      vi: 'Học hàm, học vị, đơn vị công tác và lý do khán giả nên lắng nghe diễn giả.',
    },
  },
  {
    id: 'moderating',
    label: { en: 'Moderating Discussions', vi: 'Điều hành thảo luận' },
    scope: {
      en: 'Handing over the floor, managing time, and inviting questions.',
      vi: 'Chuyển lượt phát biểu, giữ thời gian và mời đặt câu hỏi.',
    },
  },
  {
    id: 'partnership',
    label: { en: 'University Partnership Meetings', vi: 'Họp hợp tác đại học' },
    scope: {
      en: 'Proposing, negotiating, and confirming joint academic work.',
      vi: 'Đề xuất, đàm phán và xác nhận các hoạt động học thuật chung.',
    },
  },
  {
    id: 'study-abroad',
    label: { en: 'Study Abroad Consultations', vi: 'Tư vấn du học' },
    scope: {
      en: 'Explaining requirements, costs, and timelines to students and parents.',
      vi: 'Giải thích yêu cầu, chi phí và lộ trình cho sinh viên và phụ huynh.',
    },
  },
  {
    id: 'closing',
    label: { en: 'Closing & Thanking', vi: 'Bế mạc & Cảm ơn' },
    scope: {
      en: 'Summaries, thanks, and the next step after the event.',
      vi: 'Tóm tắt, lời cảm ơn và bước tiếp theo sau sự kiện.',
    },
  },
];
