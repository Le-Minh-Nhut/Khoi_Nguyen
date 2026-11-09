import type { Lesson } from '@/types/content';

export const lessonPart1: Lesson[] = [
  {
    slug: 'types-of-interpreting',
    number: 1,
    title: {
      en: 'Understanding Different Types of Interpreting',
      vi: 'Hiểu các hình thức phiên dịch',
    },
    summary: {
      en: 'Consecutive, simultaneous, liaison, and remote interpreting demand different skills, different equipment, and different preparation. Knowing which one you have been hired for changes how you work.',
      vi: 'Phiên dịch nối tiếp, song song, đàm thoại và từ xa đòi hỏi kỹ năng, thiết bị và cách chuẩn bị khác nhau. Biết mình được thuê cho hình thức nào sẽ quyết định cách bạn làm việc.',
    },
    readingMinutes: 9,
    objectives: [
      {
        en: 'Name the four main modes used at education events and describe when each is appropriate.',
        vi: 'Gọi tên bốn hình thức chính dùng tại sự kiện giáo dục và mô tả khi nào mỗi hình thức phù hợp.',
      },
      {
        en: 'Distinguish liaison interpreting from consecutive interpreting in terms of turn length and register.',
        vi: 'Phân biệt phiên dịch đàm thoại với phiên dịch nối tiếp về độ dài lượt nói và văn phong.',
      },
      {
        en: 'Prepare differently for a booth assignment than for a seated bilateral meeting.',
        vi: 'Chuẩn bị khác nhau cho ca trực buồng phiên dịch so với một cuộc họp song phương ngồi bàn.',
      },
      {
        en: 'Ask the organiser the questions that determine which mode is actually needed.',
        vi: 'Hỏi ban tổ chức những câu xác định hình thức phiên dịch thực sự cần dùng.',
      },
    ],
    sections: [
      {
        heading: {
          en: 'Why the mode comes first',
          vi: 'Vì sao phải xác định hình thức trước',
        },
        paragraphs: [
          {
            en: 'Every other preparation decision follows from the mode. A consecutive interpreter needs note-taking materials and a seat near the speaker; a simultaneous interpreter needs a booth, headsets, and a colleague to relay to. Booking the wrong mode is not a small scheduling error — it changes what is physically possible in the room.',
            vi: 'Mọi quyết định chuẩn bị khác đều phụ thuộc vào hình thức. Phiên dịch nối tiếp cần giấy ghi chú và chỗ ngồi gần người nói; phiên dịch song song cần buồng, tai nghe và đồng nghiệp để chuyển tiếp. Đặt sai hình thức không phải lỗi lịch nhỏ — nó thay đổi những gì có thể làm được trong phòng.',
          },
          {
            en: 'At Vietnamese universities the request often arrives as “cần phiên dịch” with no mode specified. Ask early: how long will each speaker talk without pause, how many listeners need the translation, and is there a booth in the hall.',
            vi: 'Ở các trường đại học Việt Nam, yêu cầu thường chỉ là “cần phiên dịch” mà không nêu hình thức. Hãy hỏi sớm: mỗi diễn giả nói liên tục bao lâu, bao nhiêu người cần nghe bản dịch, và hội trường có buồng phiên dịch chưa.',
          },
        ],
      },
      {
        heading: {
          en: 'Consecutive interpreting',
          vi: 'Phiên dịch nối tiếp',
        },
        paragraphs: [
          {
            en: 'The speaker pauses every few sentences — ideally every one to three minutes — and the interpreter delivers the whole segment. It is the default for bilateral meetings, MOU discussions, and any setting where only a handful of people need the translation.',
            vi: 'Người nói dừng sau vài câu — lý tưởng là mỗi một đến ba phút — và phiên dịch viên chuyển đạt trọn đoạn. Đây là hình thức mặc định cho họp song phương, thảo luận MOU và mọi bối cảnh chỉ vài người cần nghe bản dịch.',
          },
          {
            en: 'Accuracy is high because you can reconstruct. The cost is time: a ninety-minute meeting becomes roughly three hours. Warn the chair about this in advance, because a chair who planned a tight agenda will start rushing the interpreter rather than the speaker.',
            vi: 'Độ chính xác cao vì có thể tái tạo trọn ý. Cái giá là thời gian: cuộc họp chín mươi phút thành khoảng ba giờ. Cần báo trước cho chủ tọa, vì người lập chương trình chặt sẽ bắt đầu giục phiên dịch viên thay vì giục người nói.',
          },
        ],
        bullets: [
          {
            en: 'Turns longer than four minutes without notes will lose detail — ask the speaker to pause at natural boundaries.',
            vi: 'Lượt nói dài quá bốn phút mà không ghi chú sẽ mất chi tiết — đề nghị người nói dừng ở ranh giới ý tự nhiên.',
          },
          {
            en: 'Sit where you can see both the speaker’s face and the delegation’s reaction.',
            vi: 'Ngồi ở vị trí nhìn được mặt người nói và phản ứng của đoàn.',
          },
          {
            en: 'Keep a visible notebook; a speaker who sees you writing pauses more reliably.',
            vi: 'Để sổ ghi chú lộ ra; người nói thấy bạn ghi sẽ dừng đúng nhịp hơn.',
          },
        ],
        example: {
          label: { en: 'A three-sentence segment', vi: 'Một đoạn ba câu' },
          source: {
            en: 'We have reviewed your proposal carefully. Two points are still open: credit recognition and the tuition split. If we can settle those today, our senate can review the agreement in June.',
            vi: 'Chúng tôi đã xem xét kỹ đề xuất của quý vị. Còn hai điểm chưa ngã ngũ: công nhận tín chỉ và tỷ lệ phân chia học phí. Nếu hôm nay chốt được hai điểm này, hội đồng học thuật của chúng tôi có thể xem xét thỏa thuận vào tháng Sáu.',
          },
          translation: {
            en: 'Chúng tôi đã xem xét kỹ đề xuất của quý vị. Còn hai điểm chưa ngã ngũ: công nhận tín chỉ và tỷ lệ phân chia học phí. Nếu hôm nay chốt được hai điểm này, hội đồng học thuật của chúng tôi có thể xem xét thỏa thuận vào tháng Sáu.',
            vi: 'We have reviewed your proposal carefully. Two points remain open: credit recognition and the tuition split. If we can settle them today, our academic senate can review the agreement in June.',
          },
          note: {
            en: 'Note that “our senate” is not a Vietnamese institution. Rendering it as “hội đồng học thuật của chúng tôi” explains the foreign body rather than inventing a Vietnamese equivalent.',
            vi: 'Lưu ý “our senate” không phải thiết chế Việt Nam. Dịch là “hội đồng học thuật của chúng tôi” để giải thích cơ quan nước ngoài thay vì gán một tương đương Việt Nam không tồn tại.',
          },
        },
      },
      {
        heading: {
          en: 'Simultaneous interpreting',
          vi: 'Phiên dịch song song',
        },
        paragraphs: [
          {
            en: 'The interpreter speaks at almost the same time as the speaker, typically with a lag of two to four seconds — the décalage. It is used for plenary sessions, keynote addresses, and any event with a large audience and a fixed programme.',
            vi: 'Phiên dịch viên nói gần như đồng thời với người nói, thường chậm hai đến bốn giây — khoảng trễ (décalage). Hình thức này dùng cho phiên toàn thể, phát biểu chính và sự kiện đông người có chương trình cố định.',
          },
          {
            en: 'A single interpreter cannot sustain this for more than about thirty minutes at full concentration. Working in pairs, alternating roughly every twenty to thirty minutes, is standard practice, and any organiser who books one interpreter for a three-hour plenary has misunderstood the job.',
            vi: 'Một phiên dịch viên không thể duy trì tập trung cao độ quá khoảng ba mươi phút. Làm việc theo cặp, đổi ca khoảng hai mươi đến ba mươi phút, là chuẩn mực; ban tổ chức đặt một người cho phiên toàn thể ba giờ là đã hiểu sai công việc.',
          },
        ],
        table: {
          caption: {
            en: 'Modes compared at a glance',
            vi: 'So sánh nhanh các hình thức',
          },
          headers: [
            { en: 'Mode', vi: 'Hình thức' },
            { en: 'Typical turn length', vi: 'Độ dài lượt nói' },
            { en: 'Equipment', vi: 'Thiết bị' },
            { en: 'Best for', vi: 'Phù hợp với' },
          ],
          rows: [
            [
              { en: 'Consecutive', vi: 'Nối tiếp' },
              { en: '1–3 minutes', vi: '1–3 phút' },
              { en: 'Notebook, pen', vi: 'Sổ, bút' },
              { en: 'Bilateral meetings, MOU talks', vi: 'Họp song phương, đàm phán MOU' },
            ],
            [
              { en: 'Simultaneous', vi: 'Song song' },
              { en: 'Continuous', vi: 'Liên tục' },
              { en: 'Booth, console, headsets', vi: 'Buồng, bàn điều khiển, tai nghe' },
              { en: 'Plenary sessions, keynotes', vi: 'Phiên toàn thể, phát biểu chính' },
            ],
            [
              { en: 'Liaison', vi: 'Đàm thoại' },
              { en: '1–3 sentences', vi: '1–3 câu' },
              { en: 'None', vi: 'Không cần' },
              { en: 'Campus tours, consultations', vi: 'Tham quan trường, tư vấn' },
            ],
            [
              { en: 'Remote', vi: 'Từ xa' },
              { en: 'Depends on mode', vi: 'Tùy hình thức' },
              { en: 'Platform, audio link', vi: 'Nền tảng trực tuyến, đường âm thanh' },
              { en: 'Webinars, hybrid panels', vi: 'Hội thảo trực tuyến, phiên kết hợp' },
            ],
          ],
        },
      },
      {
        heading: {
          en: 'Liaison interpreting',
          vi: 'Phiên dịch đàm thoại',
        },
        paragraphs: [
          {
            en: 'Turns are short — a sentence or two — and the interpreter often stands beside the visitor, moving between two people who are having a conversation rather than delivering speeches. Campus tours, study-abroad consultation counters, and one-to-one meetings with a parent all fall here.',
            vi: 'Lượt nói ngắn — một hai câu — và phiên dịch viên thường đứng cạnh khách, chuyển qua lại giữa hai người đang trò chuyện chứ không phải đọc diễn văn. Tham quan trường, quầy tư vấn du học và buổi gặp riêng với phụ huynh đều thuộc nhóm này.',
          },
          {
            en: 'The register is conversational, and Vietnamese kinship terms matter. A parent may be addressed as “anh/chị”, a student as “em”. Getting this wrong is more noticeable than a slightly imperfect technical term.',
            vi: 'Văn phong là khẩu ngữ, và cách xưng hô tiếng Việt rất quan trọng. Phụ huynh có thể gọi là “anh/chị”, sinh viên là “em”. Gọi sai dễ bị nhận ra hơn một thuật ngữ chuyên môn chưa thật chuẩn.',
          },
        ],
        example: {
          label: { en: 'Liaison exchange at a consultation desk', vi: 'Trao đổi tại quầy tư vấn' },
          source: {
            en: 'Sorry — does the scholarship cover the dormitory too, or only tuition?',
            vi: 'Cho em hỏi — học bổng có chi trả ký túc xá không, hay chỉ học phí thôi ạ?',
          },
          translation: {
            en: 'The scholarship covers tuition only. Accommodation is arranged for you, but the rent is deducted from your monthly stipend.',
            vi: 'Học bổng chỉ chi trả học phí. Nhà trường bố trí chỗ ở cho em, nhưng tiền thuê sẽ trừ vào sinh hoạt phí hằng tháng.',
          },
          note: {
            en: 'The English “Sorry” is not an apology here; it is a softener before a question. “Cho em hỏi” carries that function without sounding like the student did something wrong.',
            vi: '“Sorry” ở đây không phải lời xin lỗi mà là cách mở đầu câu hỏi cho mềm. “Cho em hỏi” đảm nhận đúng chức năng đó mà không khiến sinh viên như đang mắc lỗi.',
          },
        },
      },
      {
        heading: {
          en: 'Remote interpreting',
          vi: 'Phiên dịch từ xa',
        },
        paragraphs: [
          {
            en: 'Remote interpreting delivers the same modes over a video platform or audio link. It removes travel, which is why it has become common for scholarship information sessions and hybrid workshops, but it adds new failure points: latency, a speaker who walks away from the microphone, and a chat window full of questions nobody is reading aloud.',
            vi: 'Phiên dịch từ xa thực hiện cùng các hình thức trên qua nền tảng video hoặc đường âm thanh. Nó loại bỏ việc di chuyển, nên ngày càng phổ biến với buổi thông tin học bổng và hội thảo kết hợp, nhưng thêm điểm rủi ro: độ trễ, người nói rời micro, và cửa sổ trò chuyện đầy câu hỏi không ai đọc lên.',
          },
        ],
        bullets: [
          {
            en: 'Test the audio link with the actual organiser, not with a colleague, at least one day before.',
            vi: 'Kiểm tra đường âm thanh với chính ban tổ chức, không phải với đồng nghiệp, ít nhất một ngày trước.',
          },
          {
            en: 'Agree with the host that the speaker will repeat any question from the chat.',
            vi: 'Thống nhất với đơn vị chủ trì rằng người điều hành sẽ đọc lại mọi câu hỏi từ cửa sổ trò chuyện.',
          },
          {
            en: 'Keep a phone hotspot ready; campus Wi-Fi fails during the session that matters most.',
            vi: 'Chuẩn bị sẵn điểm phát 4G từ điện thoại; Wi-Fi trong trường thường hỏng đúng phiên quan trọng nhất.',
          },
        ],
        note: {
          en: 'Remote work is not a discount mode. A remote interpreter still needs the same preparation, and the organiser still needs to send the materials in advance.',
          vi: 'Làm từ xa không phải hình thức hạ giá. Phiên dịch viên từ xa vẫn cần chuẩn bị như nhau, và ban tổ chức vẫn phải gửi tài liệu trước.',
        },
      },
      {
        heading: {
          en: 'What to confirm in writing',
          vi: 'Những gì cần xác nhận bằng văn bản',
        },
        paragraphs: [
          {
            en: 'Before you accept, confirm the mode, the number of working hours, whether a second interpreter is provided, and whether the event documents will reach you at least three working days ahead. A short email listing these four items prevents almost every dispute that arises afterwards.',
            vi: 'Trước khi nhận việc, xác nhận hình thức, số giờ làm việc, có phiên dịch viên thứ hai hay không, và liệu tài liệu sự kiện có đến tay bạn trước ít nhất ba ngày làm việc. Một email ngắn nêu bốn điểm này ngăn được gần như mọi tranh cãi về sau.',
          },
        ],
      },
    ],
    tips: [
      {
        en: 'Ask for the mode in writing; verbal agreements change on the day.',
        vi: 'Yêu cầu xác nhận hình thức bằng văn bản; thỏa thuận miệng sẽ thay đổi vào ngày diễn ra.',
      },
      {
        en: 'For simultaneous work, insist on a partner for sessions over forty minutes.',
        vi: 'Với phiên dịch song song, kiên quyết yêu cầu có người làm cặp khi phiên dài quá bốn mươi phút.',
      },
      {
        en: 'Visit the room before the event; sightlines and acoustics decide quality more than vocabulary does.',
        vi: 'Đến phòng trước giờ; tầm nhìn và âm học quyết định chất lượng nhiều hơn vốn từ.',
      },
      {
        en: 'In liaison mode, agree with both parties how you will be addressed before the first turn.',
        vi: 'Ở hình thức đàm thoại, thống nhất với hai bên cách xưng hô trước lượt nói đầu tiên.',
      },
    ],
    takeaways: [
      {
        en: 'Mode determines equipment, stamina, and fee — settle it before anything else.',
        vi: 'Hình thức quyết định thiết bị, sức bền và thù lao — phải chốt trước mọi thứ khác.',
      },
      {
        en: 'Consecutive buys accuracy with time; warn the chair about the time cost.',
        vi: 'Nối tiếp đổi thời gian lấy độ chính xác; cần báo chủ tọa về chi phí thời gian đó.',
      },
      {
        en: 'Simultaneous work requires a partner and tested equipment, not just availability.',
        vi: 'Phiên dịch song song cần người làm cặp và thiết bị đã kiểm tra, không chỉ sự sẵn sàng.',
      },
      {
        en: 'Liaison interpreting is judged on register and address terms as much as on accuracy.',
        vi: 'Phiên dịch đàm thoại được đánh giá qua văn phong và cách xưng hô nhiều như qua độ chính xác.',
      },
    ],
    relatedTerms: ['simultaneous-interpreting', 'consecutive-interpreting', 'interpretation-booth', 'liaison-interpreting'],
  },
  {
    slug: 'active-listening',
    number: 2,
    title: {
      en: 'Active Listening Techniques',
      vi: 'Kỹ thuật lắng nghe chủ động',
    },
    summary: {
      en: 'Interpreting begins before you speak. Listening for intent rather than words is what allows you to produce a sentence that sounds like the speaker rather than a transcription of them.',
      vi: 'Phiên dịch bắt đầu trước khi bạn nói. Lắng nghe ý định thay vì từ ngữ là điều giúp bạn tạo ra câu nghe như chính người nói, chứ không phải bản chép lời.',
    },
    readingMinutes: 8,
    objectives: [
      {
        en: 'Hold a speaker’s full segment in working memory while resisting the urge to translate word by word.',
        vi: 'Giữ trọn đoạn nói của diễn giả trong trí nhớ làm việc mà không thôi thúc dịch từng từ.',
      },
      {
        en: 'Identify the propositional content of a sentence: who did what, to whom, when, and with what qualification.',
        vi: 'Xác định nội dung mệnh đề của câu: ai làm gì, với ai, khi nào và kèm điều kiện gì.',
      },
      {
        en: 'Detect hedging, politeness markers, and implicit refusal in diplomatic academic speech.',
        vi: 'Nhận ra cách giảm nhẹ, dấu hiệu lịch sự và lời từ chối ngầm trong diễn ngôn học thuật ngoại giao.',
      },
      {
        en: 'Use shadowing and summarising as daily listening practice.',
        vi: 'Dùng kỹ thuật nói đuổi và tóm tắt làm bài luyện nghe hằng ngày.',
      },
    ],
    sections: [
      {
        heading: { en: 'Listening for intent', vi: 'Lắng nghe ý định' },
        paragraphs: [
          {
            en: 'A professor saying “I would want to see more data before we commit” is refusing, politely and completely. An interpreter who renders only the words — “Tôi muốn xem thêm dữ liệu” — drops the refusal and the meeting proceeds as if agreement were near.',
            vi: 'Một giáo sư nói “I would want to see more data before we commit” là đang từ chối, lịch sự và dứt khoát. Phiên dịch viên chỉ chuyển từ ngữ — “Tôi muốn xem thêm dữ liệu” — làm mất lời từ chối, và cuộc họp tiếp tục như thể sắp đạt thỏa thuận.',
          },
          {
            en: 'Train yourself to hear three layers at once: the proposition (what is stated), the stance (how committed the speaker is), and the action requested (what the listener should now do). Missing the third layer is the most common cause of a meeting that ends without a decision.',
            vi: 'Hãy luyện nghe ba lớp cùng lúc: mệnh đề (nói điều gì), lập trường (cam kết đến đâu) và hành động được yêu cầu (người nghe cần làm gì). Bỏ lớp thứ ba là nguyên nhân phổ biến nhất khiến cuộc họp kết thúc mà không có quyết định.',
          },
        ],
        example: {
          label: { en: 'Hearing the refusal', vi: 'Nghe ra lời từ chối' },
          source: {
            en: 'That is an interesting proposal. Of course, any commitment of that size would need to go through our senate, and the senate does not sit again until June.',
            vi: 'Đó là một đề xuất thú vị. Dĩ nhiên, bất kỳ cam kết nào ở mức đó đều phải qua hội đồng học thuật, mà hội đồng phải đến tháng Sáu mới họp lại.',
          },
          translation: {
            en: 'Đó là một đề xuất thú vị. Dĩ nhiên, bất kỳ cam kết nào ở mức đó đều phải qua hội đồng học thuật, mà hội đồng phải đến tháng Sáu mới họp lại.',
            vi: 'That is an interesting proposal. Naturally, any commitment of that size would have to go through our academic senate, and the senate does not meet again until June.',
          },
          note: {
            en: '“Interesting” plus a procedural obstacle is a soft no. Keep both halves; if you compress it to “we will consider it”, the Vietnamese side will book travel for a signing that is not going to happen.',
            vi: '“Interesting” cộng một rào cản thủ tục là lời từ chối mềm. Phải giữ cả hai vế; nếu rút thành “chúng tôi sẽ xem xét”, phía Việt Nam sẽ đặt vé cho một lễ ký không diễn ra.',
          },
        },
      },
      {
        heading: { en: 'Chunking long segments', vi: 'Chia đoạn dài thành cụm' },
        paragraphs: [
          {
            en: 'Working memory holds roughly seven items, and fewer under stress. Chunking means grouping a segment into meaningful units — a condition and its consequence, a claim and its evidence — so that six sentences become three ideas.',
            vi: 'Trí nhớ làm việc giữ được khoảng bảy đơn vị, và ít hơn khi căng thẳng. Chia cụm là nhóm đoạn nói thành đơn vị có nghĩa — một điều kiện và hệ quả, một luận điểm và bằng chứng — để sáu câu trở thành ba ý.',
          },
        ],
        bullets: [
          { en: 'Mark the verb of each clause; it carries the action.', vi: 'Đánh dấu động từ của từng mệnh đề; nó mang hành động.' },
          { en: 'Numbers and names are their own chunk — write them first, everything else can wait.', vi: 'Số liệu và tên riêng là cụm riêng — ghi trước, phần còn lại chờ được.' },
          { en: 'A connective (“however”, “therefore”, “provided that”) tells you the shape of the next idea.', vi: 'Từ nối (“tuy nhiên”, “vì vậy”, “với điều kiện là”) báo trước hình dạng của ý tiếp theo.' },
        ],
        note: {
          en: 'Chunking is not summarising. You are still delivering the full content; you are only changing how you hold it.',
          vi: 'Chia cụm không phải tóm tắt. Bạn vẫn chuyển đạt đủ nội dung; chỉ thay đổi cách ghi nhớ.',
        },
      },
      {
        heading: { en: 'Shadowing as practice', vi: 'Nói đuổi như bài luyện' },
        paragraphs: [
          {
            en: 'Shadowing means repeating speech aloud a second or two behind the speaker, in the same language. It builds the split attention that simultaneous interpreting requires: one channel listening, one channel speaking.',
            vi: 'Nói đuổi là lặp lại lời nói thành tiếng chậm hơn người nói một hai giây, cùng ngôn ngữ. Bài tập này xây dựng khả năng chia chú ý mà phiên dịch song song đòi hỏi: một kênh nghe, một kênh nói.',
          },
          {
            en: 'Ten minutes a day with a recorded lecture is enough. Start with clear audio; add a Vietnamese-accented English speaker and then a fast native speaker as you improve. Track one thing per week — endings, numbers, or connectives.',
            vi: 'Mười phút mỗi ngày với một bài giảng ghi âm là đủ. Bắt đầu với âm thanh rõ; sau đó thêm người nói tiếng Anh giọng Việt rồi đến người bản ngữ nói nhanh. Mỗi tuần chỉ theo dõi một điểm — đuôi từ, số liệu, hoặc từ nối.',
          },
        ],
        table: {
          caption: { en: 'Three listening drills and what each fixes', vi: 'Ba bài luyện nghe và điều mỗi bài sửa được' },
          headers: [
            { en: 'Drill', vi: 'Bài luyện' },
            { en: 'How', vi: 'Cách làm' },
            { en: 'Fixes', vi: 'Sửa được' },
          ],
          rows: [
            [
              { en: 'Shadowing', vi: 'Nói đuổi' },
              { en: 'Repeat 2 seconds behind, same language', vi: 'Lặp lại chậm 2 giây, cùng ngôn ngữ' },
              { en: 'Split attention, articulation', vi: 'Chia chú ý, khẩu hình' },
            ],
            [
              { en: 'Summarising', vi: 'Tóm tắt' },
              { en: 'Retell a 3-minute segment in 4 sentences', vi: 'Kể lại đoạn 3 phút trong 4 câu' },
              { en: 'Propositional memory', vi: 'Ghi nhớ mệnh đề' },
            ],
            [
              { en: 'Number recall', vi: 'Nhớ số liệu' },
              { en: 'Listen for figures only; write them down', vi: 'Chỉ nghe số liệu; ghi lại' },
              { en: 'Numeric accuracy under load', vi: 'Độ chính xác số liệu khi quá tải' },
            ],
          ],
        },
      },
      {
        heading: { en: 'Listening to Vietnamese as a source', vi: 'Nghe tiếng Việt như ngôn ngữ nguồn' },
        paragraphs: [
          {
            en: 'Interpreting into English is harder for most Vietnamese students than the reverse, because the source is comfortable and the target is not. Vietnamese formal speech is full of nominalised Sino-Vietnamese phrasing — “việc triển khai công tác đào tạo” — that must be unpacked into verbs in English: “how the training is delivered”.',
            vi: 'Với phần lớn sinh viên Việt Nam, dịch sang tiếng Anh khó hơn dịch sang tiếng Việt, vì ngôn ngữ nguồn thoải mái còn ngôn ngữ đích thì không. Diễn ngôn trang trọng tiếng Việt nhiều danh từ hóa Hán Việt — “việc triển khai công tác đào tạo” — phải mở ra thành động từ trong tiếng Anh: “how the training is delivered”.',
          },
          {
            en: 'Listen for the verb hidden inside a noun phrase. Once you hear “triển khai” as the action, the sentence becomes speakable in English instead of a chain of abstractions.',
            vi: 'Hãy nghe động từ ẩn trong cụm danh từ. Khi nhận ra “triển khai” là hành động, câu trở nên nói được bằng tiếng Anh thay vì một chuỗi trừu tượng.',
          },
        ],
        example: {
          label: { en: 'Unpacking nominalisation', vi: 'Mở cụm danh từ hóa' },
          source: {
            en: 'Việc triển khai công tác đào tạo theo hình thức trực tuyến đã góp phần nâng cao hiệu quả quản lý.',
            vi: 'Việc triển khai công tác đào tạo theo hình thức trực tuyến đã góp phần nâng cao hiệu quả quản lý.',
          },
          translation: {
            en: 'Delivering the training online has helped us manage it more effectively.',
            vi: 'Chuyển hoạt động đào tạo sang hình thức trực tuyến đã giúp quản lý hiệu quả hơn.',
          },
          note: {
            en: 'The interpreter produced two verbs — deliver, manage — from four nouns. This is reformulation, not omission: the meaning is intact and the English is now sayable.',
            vi: 'Phiên dịch viên tạo ra hai động từ — deliver, manage — từ bốn danh từ. Đây là tái cấu trúc, không phải lược bỏ: nghĩa còn nguyên và tiếng Anh trở nên nói được.',
          },
        },
      },
      {
        heading: { en: 'Listening in noisy rooms', vi: 'Nghe trong phòng ồn' },
        paragraphs: [
          {
            en: 'Conference rooms are hostile acoustic environments: air conditioning, clinking cups, a whispered side conversation, and a microphone that clips the first syllable of every sentence. You will not fix the room. You can fix what you rely on.',
            vi: 'Phòng hội nghị là môi trường âm học thù địch: điều hòa, tiếng cốc chạm, một cuộc trò chuyện thì thầm bên cạnh, và micro cắt mất âm tiết đầu của mỗi câu. Bạn không sửa được căn phòng. Bạn có thể sửa những gì mình dựa vào.',
          },
        ],
        bullets: [
          { en: 'Move closer to the speaker rather than turning up the volume; distance is the real problem.', vi: 'Di chuyển lại gần người nói thay vì tăng âm lượng; khoảng cách mới là vấn đề thật.' },
          { en: 'Watch mouths for names and numbers; the eye recovers what the ear loses.', vi: 'Nhìn khẩu hình khi nghe tên và số; mắt bù được phần tai mất.' },
          { en: 'Tell the chair about persistent noise; a microphone adjustment takes thirty seconds and saves the session.', vi: 'Báo chủ tọa khi có tiếng ồn kéo dài; chỉnh micro mất ba mươi giây và cứu cả phiên.' },
        ],
        note: {
          en: 'Earplugs are not the answer; selective attention is. Practise listening to one voice inside a crowded café and you are training the exact skill the room demands.',
          vi: 'Nút tai không phải giải pháp; chú ý có chọn lọc mới là. Hãy luyện nghe một giọng nói trong quán cà phê đông người — đó chính là kỹ năng căn phòng đòi hỏi.',
        },
      },
    ],
    tips: [
      { en: 'Never start speaking before the speaker finishes; the end of a sentence is where the meaning lives.', vi: 'Đừng bắt đầu nói trước khi người nói kết thúc; cuối câu là nơi chứa nghĩa.' },
      { en: 'Practice with imperfect audio on purpose; real rooms are never clean.', vi: 'Luyện với âm thanh không hoàn hảo một cách có chủ đích; phòng thật không bao giờ sạch âm.' },
      { en: 'Write numbers the moment you hear them, even mid-sentence.', vi: 'Ghi số liệu ngay khi nghe, kể cả giữa câu.' },
    ],
    takeaways: [
      { en: 'Listen for proposition, stance, and requested action — all three.', vi: 'Nghe cả ba lớp: mệnh đề, lập trường và hành động được yêu cầu.' },
      { en: 'Chunking preserves content while making it holdable.', vi: 'Chia cụm giữ nguyên nội dung mà vẫn ghi nhớ được.' },
      { en: 'Shadowing trains the split attention simultaneous work requires.', vi: 'Nói đuổi luyện khả năng chia chú ý cần cho phiên dịch song song.' },
      { en: 'Vietnamese nominalisations must be unpacked into English verbs.', vi: 'Cụm danh từ hóa tiếng Việt phải mở ra thành động từ tiếng Anh.' },
    ],
    relatedTerms: ['consecutive-interpreting', 'simultaneous-interpreting', 'active-listening', 'note-taking'],
  },
];
