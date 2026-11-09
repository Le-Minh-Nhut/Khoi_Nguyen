import type { Lesson } from '@/types/content';

export const lessonPart2: Lesson[] = [
  {
    slug: 'note-taking',
    number: 3,
    title: {
      en: 'Note-taking for Interpreters',
      vi: 'Ghi chú cho phiên dịch viên',
    },
    summary: {
      en: 'Notes are not a transcript. They are a set of visual cues that let you rebuild a segment in the other language without losing the logic that held it together.',
      vi: 'Ghi chú không phải bản chép lời. Đó là tập dấu hiệu thị giác giúp bạn dựng lại đoạn nói bằng ngôn ngữ khác mà không làm mất mạch lô-gíc đã gắn kết đoạn nói.',
    },
    readingMinutes: 10,
    objectives: [
      {
        en: 'Take notes in the source language or in symbols, never in a half-translated mixture.',
        vi: 'Ghi chú bằng ngôn ngữ nguồn hoặc bằng ký hiệu, không bao giờ trộn nửa dịch nửa nguyên văn.',
      },
      {
        en: 'Use verticality, indentation, and margin lines to record the structure of an argument.',
        vi: 'Dùng bố cục dọc, thụt lề và đường lề để ghi cấu trúc lập luận.',
      },
      {
        en: 'Build a personal symbol set for the terms that recur in your working domain.',
        vi: 'Xây bộ ký hiệu riêng cho các thuật ngữ lặp lại trong lĩnh vực bạn làm việc.',
      },
      {
        en: 'Read back your own notes at speed, a week after writing them, and still recover the argument.',
        vi: 'Đọc lại ghi chú của mình thật nhanh, một tuần sau khi viết, mà vẫn khôi phục được lập luận.',
      },
    ],
    sections: [
      {
        heading: { en: 'What notes are for', vi: 'Ghi chú để làm gì' },
        paragraphs: [
          {
            en: 'A consecutive interpreter holds a segment of one to three minutes. The notes exist to trigger recall, not to store words. If you find yourself writing complete sentences, you are transcribing — and transcribing will fail you the moment the speaker goes faster than your pen.',
            vi: 'Phiên dịch viên nối tiếp giữ một đoạn từ một đến ba phút. Ghi chú tồn tại để gợi nhớ, không phải để lưu từ ngữ. Nếu bạn thấy mình đang viết câu hoàn chỉnh, tức là bạn đang chép lời — và cách đó sẽ phản bội bạn ngay khi người nói nhanh hơn ngòi bút.',
          },
          {
            en: 'The Rozan method, still the most widely taught system, rests on seven principles: note the idea rather than the word; use abbreviation; link ideas with lines and arrows; note negation explicitly; note emphasis; note verticality; and shift — leave a gap — when the idea changes.',
            vi: 'Phương pháp Rozan, vẫn là hệ thống được dạy rộng rãi nhất, dựa trên bảy nguyên tắc: ghi ý chứ không ghi từ; dùng viết tắt; liên kết ý bằng đường và mũi tên; ghi rõ phủ định; ghi rõ nhấn mạnh; ghi theo chiều dọc; và chuyển ý bằng một khoảng trống khi ý thay đổi.',
          },
        ],
        note: {
          en: 'Notes are for you alone. Do not adopt a symbol system wholesale from a textbook if you cannot read it back at speed after a week.',
          vi: 'Ghi chú chỉ dành cho bạn. Đừng bê nguyên hệ ký hiệu từ sách giáo trình nếu sau một tuần bạn không đọc lại được với tốc độ cần thiết.',
        },
      },
      {
        heading: { en: 'The page as a diagram', vi: 'Trang giấy như một sơ đồ' },
        paragraphs: [
          {
            en: 'Verticality carries hierarchy. Main ideas sit at the left margin; subordinate ideas are indented beneath them; asides go to the right margin in a narrow column. A diagonal line through a phrase means negation. A horizontal line means a break between ideas.',
            vi: 'Bố cục dọc thể hiện thứ bậc. Ý chính nằm ở lề trái; ý phụ thụt vào bên dưới; phần bổ sung ghi ở cột hẹp bên lề phải. Đường chéo qua một cụm nghĩa là phủ định. Đường ngang nghĩa là ranh giới giữa các ý.',
          },
          {
            en: 'Arrows carry relationships cheaply: → for consequence or direction, ← for cause coming from the right, ↔ for mutual or reciprocal action, and a curved arrow for “returns to”. At a partnership meeting, a curved arrow from “MOU” back to “annex” records the sentence “the annex forms part of the MOU” in two strokes.',
            vi: 'Mũi tên chuyển tải quan hệ rất rẻ: → cho hệ quả hoặc hướng, ← cho nguyên nhân đến từ phía sau, ↔ cho tác động qua lại, và mũi tên cong cho “quay lại”. Trong cuộc họp hợp tác, mũi tên cong từ “MOU” về “annex” ghi lại câu “phụ lục là một phần của MOU” chỉ bằng hai nét.',
          },
        ],
        table: {
          caption: { en: 'A starter symbol set for education events', vi: 'Bộ ký hiệu khởi đầu cho sự kiện giáo dục' },
          headers: [
            { en: 'Symbol', vi: 'Ký hiệu' },
            { en: 'Means', vi: 'Nghĩa' },
            { en: 'Example', vi: 'Ví dụ' },
          ],
          rows: [
            [
              { en: '△', vi: '△' },
              { en: 'University / institution', vi: 'Trường / cơ sở' },
              { en: '△HN → △LD', vi: '△HN → △LD' },
            ],
            [
              { en: '$', vi: '$' },
              { en: 'Money, fee, scholarship', vi: 'Tiền, phí, học bổng' },
              { en: '$ full = tuition + dorm', vi: '$ full = tuition + dorm' },
            ],
            [
              { en: '↑ / ↓', vi: '↑ / ↓' },
              { en: 'Increase / decrease', vi: 'Tăng / giảm' },
              { en: 'quota ↑ 4', vi: 'quota ↑ 4' },
            ],
            [
              { en: '∴', vi: '∴' },
              { en: 'Therefore / consequence', vi: 'Vì vậy / hệ quả' },
              { en: 'senate Jun ∴ delay', vi: 'senate Jun ∴ delay' },
            ],
            [
              { en: '↔', vi: '↔' },
              { en: 'Mutual, reciprocal', vi: 'Qua lại, đối ứng' },
              { en: '△HN ↔ △LD credits', vi: '△HN ↔ △LD credits' },
            ],
            [
              { en: '~', vi: '~' },
              { en: 'Approximately / softhedge', vi: 'Khoảng / giảm nhẹ' },
              { en: '~50/50 split', vi: '~50/50 split' },
            ],
          ],
        },
      },
      {
        heading: { en: 'Numbers, names, and negatives', vi: 'Số liệu, tên riêng và phủ định' },
        paragraphs: [
          {
            en: 'Three categories deserve mechanical treatment, because they are the ones you cannot reconstruct from context. Numbers get written as digits immediately, with the unit attached: “12M VND”, “15 Mar”, “IELTS 6.5 (no band < 6.0)”. Names get written in capitals and verified before the event from the participant list.',
            vi: 'Ba nhóm cần xử lý máy móc, vì đó là những thứ không thể dựng lại từ ngữ cảnh. Số liệu ghi ngay bằng chữ số, kèm đơn vị: “12M VND”, “15 Mar”, “IELTS 6.5 (no band < 6.0)”. Tên riêng ghi bằng chữ hoa và xác minh trước sự kiện từ danh sách đại biểu.',
          },
          {
            en: 'Negation must never be left to memory. A slashed circle, the abbreviation “no”, or a diagonal line through the whole phrase all work — but pick one and use it every time. The most expensive interpreting errors in education meetings are negations and conditions that vanished between the speaker and the listener.',
            vi: 'Phủ định không bao giờ được giao cho trí nhớ. Vòng tròn gạch chéo, chữ “no”, hoặc đường chéo qua cả cụm đều được — nhưng chọn một cách và dùng nhất quán. Những lỗi phiên dịch đắt giá nhất trong các cuộc họp giáo dục là phủ định và điều kiện bị biến mất giữa người nói và người nghe.',
          },
        ],
        example: {
          label: { en: 'From speech to notes', vi: 'Từ lời nói đến ghi chú' },
          source: {
            en: 'We cannot confirm the tuition waiver for 2027, because the budget is approved annually and the ministry has not yet issued the guidance for that year.',
            vi: 'Chúng tôi chưa thể xác nhận việc miễn học phí cho năm 2027, vì ngân sách được duyệt hằng năm và bộ chưa ban hành hướng dẫn cho năm đó.',
          },
          translation: {
            en: 'Chúng tôi chưa thể xác nhận việc miễn học phí cho năm 2027, vì ngân sách được duyệt hằng năm và bộ chưa ban hành hướng dẫn cho năm đó.',
            vi: 'We cannot yet confirm the 2027 tuition waiver, because the budget is approved annually and the ministry has not issued guidance for that year.',
          },
          note: {
            en: 'Notes might read: “✗ waiver 2027 / budget annual / MOET ✗ guidance 2027”. Fourteen characters instead of thirty words, with both negations preserved.',
            vi: 'Ghi chú có thể là: “✗ waiver 2027 / budget annual / MOET ✗ guidance 2027”. Mười bốn ký tự thay cho ba mươi từ, giữ nguyên cả hai phủ định.',
          },
        },
      },
      {
        heading: { en: 'Practising the habit', vi: 'Luyện thành thói quen' },
        paragraphs: [
          {
            en: 'Take notes from a recorded lecture once a day for two weeks, and speak the segment back from the notes alone with the recording paused. Record yourself and check the two things you are most likely to have lost: a number and a condition.',
            vi: 'Ghi chú từ một bài giảng ghi âm mỗi ngày trong hai tuần, rồi nói lại đoạn đó chỉ dựa vào ghi chú, với bản ghi đã tạm dừng. Ghi âm lại và kiểm tra hai thứ dễ mất nhất: một con số và một điều kiện.',
          },
        ],
        bullets: [
          { en: 'Use A4, portrait, and start at the top left — never in the middle of a page.', vi: 'Dùng giấy A4, khổ dọc, và bắt đầu ở góc trên trái — không bao giờ bắt đầu giữa trang.' },
          { en: 'Write only on the right-hand page so you can annotate the left later.', vi: 'Chỉ viết ở trang bên phải để sau đó có thể ghi chú thêm ở trang bên trái.' },
          { en: 'Date and title every page; you will reuse these notes for terminology later.', vi: 'Ghi ngày và tiêu đề mỗi trang; sau này bạn sẽ dùng lại để bổ sung thuật ngữ.' },
        ],
      },
      {
        heading: { en: 'Keeping a working terminology sheet', vi: 'Duy trì bảng thuật ngữ làm việc' },
        paragraphs: [
          {
            en: 'Notes from the room are not only a memory aid; they are raw material. A term that caused you trouble should leave the session with a Vietnamese rendering attached, written in your own handwriting, before you forget why it was hard.',
            vi: 'Ghi chú trong phòng không chỉ là trợ giúp trí nhớ; chúng là nguyên liệu thô. Thuật ngữ làm bạn lúng túng nên được rời phiên họp kèm một cách dịch tiếng Việt do chính bạn viết, trước khi bạn quên vì sao nó khó.',
          },
        ],
        bullets: [
          { en: 'Use one page per event and file it by date; you will meet the same speakers again.', vi: 'Mỗi sự kiện một trang riêng và lưu theo ngày; bạn sẽ gặp lại chính những diễn giả đó.' },
          { en: 'Mark uncertain renderings with a question mark, then resolve them within a week.', vi: 'Đánh dấu chấm hỏi cho cách dịch chưa chắc, rồi giải quyết trong vòng một tuần.' },
          { en: 'Photograph nothing confidential; transcribe only terms, not content.', vi: 'Không chụp ảnh nội dung mật; chỉ chép thuật ngữ, không chép nội dung.' },
        ],
      },
    ],
    tips: [
      { en: 'Never write a word in the target language; it splits your attention at the worst moment.', vi: 'Đừng bao giờ viết từ bằng ngôn ngữ đích; nó chia chú ý đúng lúc tệ nhất.' },
      { en: 'Leave a gap whenever the idea shifts — structure is the part you cannot recover later.', vi: 'Để khoảng trống mỗi khi ý chuyển — cấu trúc là phần không thể khôi phục về sau.' },
      { en: 'Write numbers before anything else in the segment.', vi: 'Ghi số liệu trước mọi thứ khác trong đoạn.' },
      { en: 'Test your notes on yourself a week later; if you cannot read them, change the system.', vi: 'Kiểm tra ghi chú của mình sau một tuần; nếu không đọc được, đổi hệ thống.' },
    ],
    takeaways: [
      { en: 'Notes trigger memory; they do not replace it.', vi: 'Ghi chú gợi nhớ; không thay thế trí nhớ.' },
      { en: 'Verticality and gaps record the logic of an argument.', vi: 'Bố cục dọc và khoảng trống ghi lại lô-gíc lập luận.' },
      { en: 'Numbers, names, and negations need a fixed mechanical notation.', vi: 'Số liệu, tên riêng và phủ định cần cách ghi máy móc cố định.' },
      { en: 'A symbol system you cannot read back at speed is not a system.', vi: 'Hệ ký hiệu không đọc lại được với tốc độ cần thiết thì không phải hệ thống.' },
    ],
    relatedTerms: ['consecutive-interpreting', 'terminology-preparation', 'memory-training', 'note-template'],
  },
  {
    slug: 'memory-training',
    number: 4,
    title: {
      en: 'Memory Training',
      vi: 'Luyện trí nhớ',
    },
    summary: {
      en: 'Interpreting stress does not remove memory; it shrinks the window in which memory works. Training widens that window so a two-minute segment does not feel like a test of nerve.',
      vi: 'Căng thẳng phiên dịch không xóa trí nhớ; nó thu hẹp khung thời gian trí nhớ hoạt động. Luyện tập mở rộng khung đó để đoạn nói hai phút không còn là bài kiểm tra thần kinh.',
    },
    readingMinutes: 8,
    objectives: [
      {
        en: 'Explain the difference between short-term storage and comprehension-based retention.',
        vi: 'Giải thích khác biệt giữa lưu trữ ngắn hạn và ghi nhớ dựa trên hiểu nghĩa.',
      },
      {
        en: 'Run three drills that build retention without notes.',
        vi: 'Thực hiện ba bài luyện xây dựng khả năng ghi nhớ không cần ghi chú.',
      },
      {
        en: 'Recognise the point at which fatigue, not ability, is causing loss.',
        vi: 'Nhận ra thời điểm mà mất mát do mệt mỏi chứ không do năng lực.',
      },
    ],
    sections: [
      {
        heading: { en: 'Two kinds of remembering', vi: 'Hai kiểu ghi nhớ' },
        paragraphs: [
          {
            en: 'Rote retention holds sounds. Comprehension-based retention holds meaning, and meaning compresses far better: a four-clause sentence about a budget condition becomes a single proposition in memory. Interpreters who try to hold sounds hit a wall at about twenty seconds; those who hold meaning can carry two minutes.',
            vi: 'Ghi nhớ máy móc giữ âm thanh. Ghi nhớ dựa trên hiểu nghĩa giữ ý, và ý nén tốt hơn nhiều: câu bốn mệnh đề về một điều kiện ngân sách trở thành một mệnh đề trong trí nhớ. Người cố giữ âm thanh sẽ chạm tường ở khoảng hai mươi giây; người giữ ý có thể mang được hai phút.',
          },
          {
            en: 'This is why comprehension practice and memory practice cannot be separated. You cannot hold what you did not understand, and the part you did not understand is exactly the part you will invent under pressure.',
            vi: 'Vì vậy luyện hiểu và luyện nhớ không thể tách rời. Bạn không thể giữ điều mình không hiểu, và phần không hiểu chính là phần bạn sẽ bịa ra dưới áp lực.',
          },
        ],
        note: {
          en: 'If you notice yourself inventing detail, stop and ask the speaker to repeat. A clarification costs ten seconds; an invented figure costs a partnership.',
          vi: 'Nếu thấy mình đang bịa chi tiết, hãy dừng và đề nghị người nói nhắc lại. Một câu hỏi làm rõ tốn mười giây; một con số bịa tốn cả một quan hệ hợp tác.',
        },
      },
      {
        heading: { en: 'Three drills', vi: 'Ba bài luyện' },
        paragraphs: [
          {
            en: 'All three fit into twenty minutes a day and need nothing more than a recorded talk and a timer. Rotate them; do not do the same drill for a month, because improvement comes from the change of constraint.',
            vi: 'Cả ba bài vừa hai mươi phút mỗi ngày và không cần gì ngoài một bài nói ghi âm và đồng hồ. Hãy luân phiên; đừng làm một bài suốt tháng, vì tiến bộ đến từ việc thay đổi ràng buộc.',
          },
        ],
        table: {
          caption: { en: 'Drill schedule that fits a working week', vi: 'Lịch luyện phù hợp tuần làm việc' },
          headers: [
            { en: 'Drill', vi: 'Bài luyện' },
            { en: 'How', vi: 'Cách làm' },
            { en: 'Target', vi: 'Mục tiêu' },
          ],
          rows: [
            [
              { en: 'Progressive repetition', vi: 'Lặp tăng dần' },
              { en: 'Segment of 30s → retell → 60s → retell → 90s', vi: 'Đoạn 30 giây → kể lại → 60 giây → kể lại → 90 giây' },
              { en: 'Hold 90 seconds without notes', vi: 'Giữ 90 giây không ghi chú' },
            ],
            [
              { en: 'Number chain', vi: 'Chuỗi số liệu' },
              { en: 'Listen only for figures; recite them in order after', vi: 'Chỉ nghe số liệu; đọc lại theo thứ tự sau đó' },
              { en: 'Five figures, no error', vi: 'Năm con số, không sai' },
            ],
            [
              { en: 'Interference task', vi: 'Bài gây nhiễu' },
              { en: 'Retell while counting backwards from 100 by 7', vi: 'Kể lại trong khi đếm ngược từ 100 trừ 7' },
              { en: 'Keep the argument under load', vi: 'Giữ lập luận khi bị tải' },
            ],
          ],
        },
      },
      {
        heading: { en: 'Fatigue is not failure', vi: 'Mệt mỏi không phải thất bại' },
        paragraphs: [
          {
            en: 'Attention degrades measurably after about twenty-five minutes of dense consecutive work. Errors cluster at the ends of segments and around the third hour of a morning session. Recognising the pattern lets you ask for a break at the right time instead of blaming your vocabulary.',
            vi: 'Sự chú ý suy giảm rõ rệt sau khoảng hai mươi lăm phút làm việc nối tiếp dày đặc. Lỗi tập trung ở cuối các đoạn và quanh giờ thứ ba của buổi sáng. Nhận ra quy luật này giúp bạn xin nghỉ đúng lúc thay vì tự trách vốn từ.',
          },
        ],
        bullets: [
          { en: 'Hydrate; a dry mouth is also a dry working memory.', vi: 'Uống đủ nước; miệng khô cũng là trí nhớ làm việc khô.' },
          { en: 'Ask for a five-minute break every forty minutes in consecutive mode; frame it as accuracy, not comfort.', vi: 'Xin nghỉ năm phút mỗi bốn mươi phút ở hình thức nối tiếp; nêu lý do là độ chính xác, không phải sự thoải mái.' },
          { en: 'If a segment collapses, say so and ask for the last sentence again — never fill the gap with plausible content.', vi: 'Nếu một đoạn bị sụp, hãy nói rõ và xin nhắc lại câu cuối — không bao giờ lấp khoảng trống bằng nội dung nghe hợp lý.' },
        ],
      },
      {
        heading: { en: 'Remembering vocabulary under pressure', vi: 'Nhớ từ vựng dưới áp lực' },
        paragraphs: [
          {
            en: 'A term you have only read is not available under pressure; a term you have said aloud three times is. This is why preparation lists should be spoken, not silently reviewed. Read each entry as a full sentence in both languages and you build a retrieval path, not just a recognition memory.',
            vi: 'Thuật ngữ bạn mới chỉ đọc thì không có sẵn dưới áp lực; thuật ngữ bạn đã nói thành tiếng ba lần thì có. Vì vậy danh sách chuẩn bị phải được nói ra, không chỉ đọc thầm. Đọc mỗi mục thành câu đầy đủ ở cả hai ngôn ngữ là bạn tạo đường truy xuất, không chỉ trí nhớ nhận diện.',
          },
        ],
        example: {
          label: { en: 'Preparing three terms aloud', vi: 'Chuẩn bị ba thuật ngữ thành tiếng' },
          source: {
            en: 'Articulation agreement — credit transfer — tuition fee waiver.',
            vi: 'Thỏa thuận liên kết đào tạo — công nhận tín chỉ — miễn giảm học phí.',
          },
          translation: {
            en: 'The 2+2 articulation agreement lets students transfer credits, and two nominees receive a tuition fee waiver.',
            vi: 'Thỏa thuận liên kết 2+2 cho phép sinh viên chuyển đổi tín chỉ, và hai sinh viên được đề cử sẽ được miễn giảm học phí.',
          },
          note: {
            en: 'Say all three in one sentence, both directions. A term learned inside a sentence survives; a term learned as a pair of words usually does not.',
            vi: 'Nói cả ba trong một câu, cả hai chiều. Thuật ngữ học trong câu sẽ trụ được; thuật ngữ học theo cặp từ thường không.',
          },
        },
      },
      {
        heading: { en: 'What to practise the week before', vi: 'Luyện gì trong tuần trước sự kiện' },
        paragraphs: [
          {
            en: 'Memory training is a long project, but the week before an event is not the time to start it. In that week, switch from general drills to the material you will actually hear: the agenda titles, the speakers’ names, and the figures in the draft agreement.',
            vi: 'Luyện trí nhớ là dự án dài hạn, nhưng tuần trước sự kiện không phải lúc bắt đầu. Trong tuần đó, hãy chuyển từ bài luyện chung sang chính tài liệu bạn sẽ nghe: tiêu đề chương trình, tên diễn giả và các con số trong dự thảo thỏa thuận.',
          },
        ],
        bullets: [
          { en: 'Recite the delegate list from memory, titles included, before each session.', vi: 'Đọc thuộc danh sách đại biểu, kể cả chức danh, trước mỗi phiên.' },
          { en: 'Rehearse the three sentences you expect to hear most often.', vi: 'Tập trước ba câu bạn dự đoán sẽ nghe nhiều nhất.' },
          { en: 'Sleep is preparation; a tired interpreter at nine in the morning is a liability.', vi: 'Giấc ngủ là chuẩn bị; một phiên dịch viên mệt lúc chín giờ sáng là rủi ro.' },
        ],
        note: {
          en: 'Performance under fatigue is trained by practising while tired, but only occasionally. Do not make exhaustion your normal working condition.',
          vi: 'Khả năng làm việc khi mệt được luyện bằng cách thỉnh thoảng luyện tập lúc mệt. Đừng biến sự kiệt sức thành điều kiện làm việc bình thường.',
        },
      },
    ],
    tips: [
      { en: 'Hold meaning, not sound; sounds do not compress.', vi: 'Giữ ý, không giữ âm; âm thanh không nén được.' },
      { en: 'Practise with interference, because real rooms are full of it.', vi: 'Luyện khi có nhiễu, vì phòng thật đầy nhiễu.' },
      { en: 'Speak your preparation list aloud, in sentences.', vi: 'Đọc danh sách chuẩn bị thành tiếng, theo câu.' },
      { en: 'Ask for a pause before fatigue turns into an error.', vi: 'Xin nghỉ trước khi mệt mỏi biến thành lỗi.' },
    ],
    takeaways: [
      { en: 'Comprehension-based memory is what makes long segments survivable.', vi: 'Ghi nhớ dựa trên hiểu nghĩa giúp đoạn dài trở nên khả thi.' },
      { en: 'Retention improves with changing constraints, not with repetition alone.', vi: 'Khả năng ghi nhớ tiến bộ nhờ thay đổi ràng buộc, không chỉ nhờ lặp lại.' },
      { en: 'Fatigue causes clustered errors; schedule breaks deliberately.', vi: 'Mệt mỏi gây lỗi theo cụm; cần chủ động sắp xếp thời gian nghỉ.' },
      { en: 'Never fill a memory gap with plausible content.', vi: 'Không bao giờ lấp khoảng trống trí nhớ bằng nội dung nghe hợp lý.' },
    ],
    relatedTerms: ['note-taking', 'active-listening', 'consecutive-interpreting', 'terminology-preparation'],
  },
  {
    slug: 'professional-delivery',
    number: 5,
    title: {
      en: 'Professional Speaking and Delivery',
      vi: 'Nói chuyên nghiệp và truyền đạt',
    },
    summary: {
      en: 'A correct interpretation delivered with a hesitant voice is heard as an incorrect one. Delivery — pace, volume, and the refusal to mimic — is part of the skill, not a finish applied afterwards.',
      vi: 'Một bản phiên dịch đúng nhưng nói ngập ngừng sẽ được nghe như bản sai. Cách truyền đạt — nhịp, âm lượng và việc không bắt chước người nói — là một phần của kỹ năng, không phải lớp hoàn thiện phủ lên sau.',
    },
    readingMinutes: 9,
    objectives: [
      {
        en: 'Speak at a pace that fits the register of the room and the comprehension of the listener.',
        vi: 'Nói với nhịp phù hợp văn phong của buổi và khả năng tiếp nhận của người nghe.',
      },
      {
        en: 'Use first person as the speaker does, without adding “he said” or “the speaker thinks”.',
        vi: 'Dùng ngôi thứ nhất như người nói, không thêm “ông ấy nói” hay “diễn giả cho rằng”.',
      },
      {
        en: 'Hand over between interpreters cleanly during simultaneous work.',
        vi: 'Bàn giao rõ ràng giữa hai phiên dịch viên khi làm song song.',
      },
      {
        en: 'Handle hesitations, self-corrections, and jokes without flattening them or inventing them.',
        vi: 'Xử lý ngập ngừng, tự sửa lời và câu đùa mà không làm phẳng hay bịa thêm.',
      },
    ],
    sections: [
      {
        heading: { en: 'First person, always', vi: 'Luôn ngôi thứ nhất' },
        paragraphs: [
          {
            en: 'The interpreter speaks as the speaker. “I would like to thank the host university” — not “she says she would like to thank”. The first person keeps the listener in direct contact with the original and prevents the drift into narration, where accuracy quietly degrades.',
            vi: 'Phiên dịch viên nói như chính người nói. “Tôi xin cảm ơn trường chủ nhà” — không phải “cô ấy nói rằng cô ấy muốn cảm ơn”. Ngôi thứ nhất giữ người nghe tiếp xúc trực tiếp với phát ngôn gốc và ngăn trôi sang lối tường thuật, nơi độ chính xác lặng lẽ giảm.',
          },
          {
            en: 'The exception is a third-party report. If the speaker says “the Rector told me that…”, then the interpreter keeps that structure: “Hiệu trưởng nói với tôi rằng…”. The rule is to mirror the deictic frame, not to flatten everything into one voice.',
            vi: 'Ngoại lệ là khi người nói thuật lại lời người khác. Nếu diễn giả nói “the Rector told me that…”, phiên dịch viên giữ nguyên cấu trúc: “Hiệu trưởng nói với tôi rằng…”. Nguyên tắc là phản chiếu khung quy chiếu, không làm phẳng mọi thứ thành một giọng.',
          },
        ],
        example: {
          label: { en: 'Keeping the frame', vi: 'Giữ khung quy chiếu' },
          source: {
            en: 'I have been asked by our Provost to convey her thanks, and to say that she looks forward to visiting Hanoi next spring.',
            vi: 'Tôi được Hiệu phó phụ trách học thuật của chúng tôi giao chuyển lời cảm ơn, và cho biết bà ấy mong được thăm Hà Nội vào mùa xuân tới.',
          },
          translation: {
            en: 'Tôi được Hiệu phó phụ trách học thuật của chúng tôi giao chuyển lời cảm ơn, và cho biết bà ấy mong được thăm Hà Nội vào mùa xuân tới.',
            vi: 'I have been asked by our Provost to convey her thanks, and to say that she looks forward to visiting Hanoi next spring.',
          },
          note: {
            en: '“Her thanks” stays third person because it is somebody else’s thanks. “I look forward” would be wrong here — the interpreter is not the one visiting Hanoi.',
            vi: '“Lời cảm ơn của bà ấy” giữ ngôi thứ ba vì đó là lời của người khác. Dùng “tôi mong được thăm Hà Nội” ở đây là sai — người đi Hà Nội không phải phiên dịch viên.',
          },
        },
      },
      {
        heading: { en: 'Pace and volume', vi: 'Nhịp và âm lượng' },
        paragraphs: [
          {
            en: 'Vietnamese delivered at English speed becomes unintelligible, because Vietnamese syllables carry more information per unit of sound but listeners need more time between tone-bearing units. Slow down when going into Vietnamese; the opposite direction can usually run faster.',
            vi: 'Tiếng Việt nói ở tốc độ tiếng Anh sẽ khó hiểu, vì âm tiết tiếng Việt mang nhiều thông tin hơn trên mỗi đơn vị âm nhưng người nghe cần nhiều thời gian hơn giữa các đơn vị mang thanh điệu. Hãy nói chậm lại khi chuyển sang tiếng Việt; chiều ngược lại thường có thể nhanh hơn.',
          },
          {
            en: 'Volume is a technical question, not a stylistic one. Ask someone in the back row during setup whether they can hear you at normal speaking level; then never raise your voice above it for the rest of the event.',
            vi: 'Âm lượng là câu hỏi kỹ thuật, không phải phong cách. Trong lúc chuẩn bị, nhờ một người ở hàng ghế cuối nghe thử ở mức nói bình thường; sau đó đừng nâng giọng cao hơn mức đó suốt sự kiện.',
          },
        ],
        bullets: [
          { en: 'Pause at the end of each idea; the pause signals a boundary the listener can use.', vi: 'Ngừng ở cuối mỗi ý; khoảng ngừng báo ranh giới để người nghe bám theo.' },
          { en: 'Do not fill pauses with “ừm” or “you know”; silence reads as professionalism, filler reads as uncertainty.', vi: 'Đừng lấp khoảng ngừng bằng “ừm” hay “you know”; im lặng toát lên sự chuyên nghiệp, từ đệm toát lên sự thiếu chắc chắn.' },
          { en: 'Read numbers slightly slower than the surrounding speech.', vi: 'Đọc số liệu chậm hơn một chút so với phần còn lại.' },
        ],
        note: {
          en: 'On a headset, your breathing is audible. Keep the microphone slightly to the side of your mouth and breathe away from it.',
          vi: 'Khi dùng tai nghe, hơi thở của bạn bị nghe thấy. Đặt micro hơi lệch sang bên miệng và thở ra hướng khác.',
        },
      },
      {
        heading: { en: 'Handover in the booth', vi: 'Bàn giao trong buồng phiên dịch' },
        paragraphs: [
          {
            en: 'A clean handover happens at a sentence boundary, not mid-clause. The outgoing interpreter finishes the current idea and says the incoming interpreter’s name quietly on the internal channel; the incoming interpreter confirms and takes the next sentence. Agree the signal before the event, and agree who watches the clock.',
            vi: 'Bàn giao sạch diễn ra ở ranh giới câu, không giữa mệnh đề. Người kết thúc ca nói trọn ý đang dở và gọi tên người vào ca qua kênh nội bộ; người vào ca xác nhận và nhận câu tiếp theo. Thống nhất tín hiệu trước sự kiện, và thống nhất ai canh giờ.',
          },
        ],
        table: {
          caption: { en: 'Delivery checklist before you unmute', vi: 'Danh mục kiểm tra trước khi bật micro' },
          headers: [
            { en: 'Check', vi: 'Kiểm tra' },
            { en: 'Why', vi: 'Vì sao' },
          ],
          rows: [
            [
              { en: 'Channel set to the right language', vi: 'Kênh đã đặt đúng ngôn ngữ' },
              { en: 'Most common avoidable failure at large events', vi: 'Lỗi phổ biến nhất có thể tránh ở sự kiện lớn' },
            ],
            [
              { en: 'Water within reach, bottle open', vi: 'Nước trong tầm tay, đã mở nắp' },
              { en: 'Opening a bottle mid-sentence is audible', vi: 'Mở nắp chai giữa câu bị nghe thấy' },
            ],
            [
              { en: 'Speaker visible on monitor or through glass', vi: 'Nhìn được người nói qua màn hình hoặc kính' },
              { en: 'Lip-reading recovers unclear names', vi: 'Đọc khẩu hình giúp cứu tên riêng khó nghe' },
            ],
            [
              { en: 'Notes and glossary open at the right page', vi: 'Ghi chú và bảng thuật ngữ mở đúng trang' },
              { en: 'Searching under pressure costs accuracy', vi: 'Tìm kiếm dưới áp lực làm mất độ chính xác' },
            ],
          ],
        },
      },
      {
        heading: { en: 'Hesitations, jokes, and self-correction', vi: 'Ngập ngừng, câu đùa và tự sửa lời' },
        paragraphs: [
          {
            en: 'A speaker’s hesitation can carry meaning: “well… I think we can” is not the same as “we can”. Render the hedge in Vietnamese — “à… tôi nghĩ là chúng tôi có thể” — rather than smoothing it into certainty. Certainty is a commitment, and you are not authorised to make it.',
            vi: 'Sự ngập ngừng có thể mang nghĩa: “well… I think we can” khác với “we can”. Hãy chuyển sắc thái giảm nhẹ sang tiếng Việt — “à… tôi nghĩ là chúng tôi có thể” — thay vì làm phẳng thành khẳng định. Khẳng định là một cam kết, và bạn không có thẩm quyền tạo ra nó.',
          },
          {
            en: 'Self-correction is delivered, not resolved. If the speaker says “we have fifty — sorry, fifteen places”, the Vietnamese keeps both numbers and the correction: “chúng tôi có năm mươi — xin lỗi, mười lăm chỉ tiêu”. Silently choosing one number hides the fact that the record is uncertain.',
            vi: 'Tự sửa lời phải được chuyển đạt, không được tự giải quyết. Nếu người nói nói “we have fifty — sorry, fifteen places”, tiếng Việt giữ cả hai số và phần sửa: “chúng tôi có năm mươi — xin lỗi, mười lăm chỉ tiêu”. Tự chọn một số sẽ che mất việc dữ liệu còn chưa chắc.',
          },
          {
            en: 'Jokes are the hardest category. If the humour travels, keep it; if it does not, render the intent — “the speaker is making a light remark about the traffic” — rather than inventing a joke that the audience will then attribute to the speaker.',
            vi: 'Câu đùa là nhóm khó nhất. Nếu dí dỏm chuyển được, giữ nguyên; nếu không, hãy chuyển ý định — “diễn giả đang đùa nhẹ về chuyện giao thông” — thay vì bịa một câu đùa mà khán giả sẽ gán cho diễn giả.',
          },
        ],
      },
      {
        heading: { en: 'Handling the microphone', vi: 'Xử lý micro' },
        paragraphs: [
          {
            en: 'Most interpreters are not trained on audio equipment, and most audio problems at education events are solved in ten seconds by someone who knows the desk. Learn three things: how to mute, how to confirm your channel, and who the technician is.',
            vi: 'Phần lớn phiên dịch viên không được đào tạo về thiết bị âm thanh, và phần lớn sự cố âm thanh tại sự kiện giáo dục được người biết bàn điều khiển giải quyết trong mười giây. Hãy biết ba điều: cách tắt tiếng, cách xác nhận kênh của mình, và kỹ thuật viên là ai.',
          },
        ],
        bullets: [
          { en: 'Confirm your channel by having the technician speak to you before doors open.', vi: 'Xác nhận kênh của bạn bằng cách để kỹ thuật viên nói thử trước giờ mở cửa.' },
          { en: 'Keep the microphone 5–10 cm from your mouth and slightly off-axis.', vi: 'Giữ micro cách miệng 5–10 cm và hơi lệch trục.' },
          { en: 'Mute when you are not speaking; un-muted booth noise reaches every headset.', vi: 'Tắt tiếng khi không nói; tiếng ồn trong buồng chưa tắt sẽ đến mọi tai nghe.' },
        ],
      },
    ],
    tips: [
      { en: 'Speak as “I”; never narrate the speaker.', vi: 'Nói với “tôi”; không bao giờ tường thuật người nói.' },
      { en: 'Slow down into Vietnamese and into numbers.', vi: 'Nói chậm lại khi sang tiếng Việt và khi đọc số.' },
      { en: 'Agree the handover signal before the event, not during it.', vi: 'Thống nhất tín hiệu bàn giao trước sự kiện, không phải trong lúc diễn ra.' },
      { en: 'Deliver the speaker’s hesitation; do not resolve it for them.', vi: 'Chuyển đạt sự ngập ngừng của người nói; đừng tự giải quyết thay họ.' },
    ],
    takeaways: [
      { en: 'First person keeps the listener in direct contact with the original.', vi: 'Ngôi thứ nhất giữ người nghe tiếp xúc trực tiếp với phát ngôn gốc.' },
      { en: 'Pace and volume are technical decisions, tested in the room.', vi: 'Nhịp và âm lượng là quyết định kỹ thuật, được kiểm tra tại phòng.' },
      { en: 'Handover happens at sentence boundaries with a pre-agreed signal.', vi: 'Bàn giao diễn ra ở ranh giới câu với tín hiệu đã thống nhất trước.' },
      { en: 'Hedges and self-corrections are content, not noise.', vi: 'Sắc thái giảm nhẹ và tự sửa lời là nội dung, không phải tạp âm.' },
    ],
    relatedTerms: ['simultaneous-interpreting', 'consecutive-interpreting', 'interpretation-booth', 'protocol'],
  },
];
