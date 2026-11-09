import type { Lesson } from '@/types/content';

export const lessonPart3: Lesson[] = [
  {
    slug: 'terminology-preparation',
    number: 6,
    title: {
      en: 'Terminology Preparation',
      vi: 'Chuẩn bị thuật ngữ',
    },
    summary: {
      en: 'Terminology work is the part of preparation that most reliably prevents error. It is also the part most often skipped, because reading documents feels like enough — it is not.',
      vi: 'Công tác thuật ngữ là phần chuẩn bị ngăn lỗi hiệu quả nhất. Đây cũng là phần hay bị bỏ qua nhất, vì đọc tài liệu có cảm giác là đủ — nhưng không đủ.',
    },
    readingMinutes: 9,
    objectives: [
      {
        en: 'Build a working glossary from the documents you are actually given, not from a generic word list.',
        vi: 'Lập bảng thuật ngữ từ chính tài liệu được cung cấp, không phải từ danh sách từ chung chung.',
      },
      {
        en: 'Decide when to keep a term, adapt it, or explain it.',
        vi: 'Quyết định khi nào giữ nguyên, khi nào chuyển đổi, khi nào giải thích thuật ngữ.',
      },
      {
        en: 'Extract the terms that matter most from an agenda in under thirty minutes.',
        vi: 'Trích ra những thuật ngữ quan trọng nhất từ một chương trình làm việc trong dưới ba mươi phút.',
      },
      {
        en: 'Maintain consistency across a multi-day event and across a team of interpreters.',
        vi: 'Duy trì tính nhất quán trong sự kiện nhiều ngày và trong cả một nhóm phiên dịch viên.',
      },
    ],
    sections: [
      {
        heading: { en: 'Where terms actually come from', vi: 'Thuật ngữ thực sự đến từ đâu' },
        paragraphs: [
          {
            en: 'The most useful source is the agenda item titles, because they become the sentences people actually say. A printed agenda usually contains thirty to forty nouns, and roughly ten of those will account for most of the session.',
            vi: 'Nguồn hữu ích nhất là tiêu đề các mục trong chương trình làm việc, vì chúng trở thành câu người ta thực sự nói. Một chương trình in ra thường chứa ba mươi đến bốn mươi danh từ, và khoảng mười trong số đó chiếm phần lớn phiên họp.',
          },
          {
            en: 'Then the slides, then the previous year’s minutes, then the signed agreements. Never start from a dictionary: a dictionary gives you all the possible renderings, and preparation is about choosing one.',
            vi: 'Sau đó đến slide, rồi biên bản năm trước, rồi các thỏa thuận đã ký. Đừng bao giờ bắt đầu từ từ điển: từ điển cho bạn mọi cách dịch khả dĩ, còn chuẩn bị là chuyện chọn một.',
          },
        ],
        bullets: [
          { en: 'Highlight every noun phrase with a plus sign and every acronym once.', vi: 'Đánh dấu mọi cụm danh từ có dấu cộng và mọi từ viết tắt một lần.' },
          { en: 'Write the Vietnamese you will actually say, not the most formal one you can find.', vi: 'Viết đúng câu tiếng Việt bạn sẽ nói, không phải cách trang trọng nhất tìm được.' },
          { en: 'Mark terms you are unsure about and ask the organiser, not the dictionary.', vi: 'Đánh dấu thuật ngữ chưa chắc và hỏi ban tổ chức, không hỏi từ điển.' },
        ],
      },
      {
        heading: { en: 'Keep, adapt, or explain', vi: 'Giữ nguyên, chuyển đổi hay giải thích' },
        paragraphs: [
          {
            en: 'Keep the term when it is an established loanword that the audience already uses: IELTS, GPA, MOU, ISBN. Adapt when a settled Vietnamese equivalent exists and the audience expects it: “credit transfer” becomes “công nhận tín chỉ”. Explain when neither works: “tenure” has no Vietnamese equivalent in current practice, so say “chế độ biên chế trọn đời” and add one clause of context if time allows.',
            vi: 'Giữ nguyên khi thuật ngữ là từ vay đã ổn định và khán giả đã dùng: IELTS, GPA, MOU, ISBN. Chuyển đổi khi đã có tương đương tiếng Việt ổn định và người nghe mong đợi điều đó: “credit transfer” thành “công nhận tín chỉ”. Giải thích khi cả hai cách đều không ổn: “tenure” chưa có tương đương tiếng Việt rõ ràng, nên nói “chế độ biên chế trọn đời” và thêm một mệnh đề ngữ cảnh nếu kịp.',
          },
        ],
        table: {
          caption: { en: 'Decision table for problem terms', vi: 'Bảng quyết định cho thuật ngữ khó' },
          headers: [
            { en: 'Term', vi: 'Thuật ngữ' },
            { en: 'Strategy', vi: 'Cách xử lý' },
            { en: 'Rendered as', vi: 'Cách chuyển ngữ' },
          ],
          rows: [
            [
              { en: 'MOU', vi: 'MOU' },
              { en: 'Keep acronym, add full form once', vi: 'Giữ viết tắt, nêu đầy đủ một lần' },
              { en: 'MOU (biên bản ghi nhớ)', vi: 'MOU (biên bản ghi nhớ)' },
            ],
            [
              { en: 'Provost', vi: 'Provost' },
              { en: 'Explain with descriptive title', vi: 'Giải thích bằng chức danh mô tả' },
              { en: 'Hiệu phó phụ trách học thuật', vi: 'Hiệu phó phụ trách học thuật' },
            ],
            [
              { en: 'Tenure', vi: 'Tenure' },
              { en: 'Explain', vi: 'Giải thích' },
              { en: 'chế độ biên chế trọn đời', vi: 'chế độ biên chế trọn đời' },
            ],
            [
              { en: 'Faculty', vi: 'Faculty' },
              { en: 'Adapt, disambiguate', vi: 'Chuyển đổi, làm rõ nghĩa' },
              { en: 'khoa / đội ngũ giảng viên', vi: 'khoa / đội ngũ giảng viên' },
            ],
            [
              { en: 'ECTS', vi: 'ECTS' },
              { en: 'Keep, gloss on first use', vi: 'Giữ nguyên, chú thích lần đầu' },
              { en: 'tín chỉ ECTS', vi: 'tín chỉ ECTS' },
            ],
          ],
        },
      },
      {
        heading: { en: 'Consistency across a team', vi: 'Nhất quán trong nhóm' },
        paragraphs: [
          {
            en: 'Two interpreters working the same event must say the same word for the same concept. This is not a stylistic preference: if one says “học bổng toàn phần” and the other “học bổng toàn khóa”, the Vietnamese delegation will ask whether these are two different schemes.',
            vi: 'Hai phiên dịch viên cùng một sự kiện phải nói cùng một từ cho cùng một khái niệm. Đây không phải sở thích văn phong: nếu một người nói “học bổng toàn phần” còn người kia nói “học bổng toàn khóa”, đoàn Việt Nam sẽ hỏi đây có phải hai chương trình khác nhau không.',
          },
          {
            en: 'Agree the glossary in a shared sheet before the first session. Mark one preferred rendering per concept and list the rejected ones, so that a colleague joining on day two does not reopen the discussion.',
            vi: 'Thống nhất bảng thuật ngữ trên một bảng tính chia sẻ trước phiên đầu tiên. Đánh dấu một cách dịch được chọn cho mỗi khái niệm và liệt kê các cách bị loại, để đồng nghiệp vào ngày thứ hai không mở lại tranh luận.',
          },
        ],
        example: {
          label: { en: 'One concept, one rendering', vi: 'Một khái niệm, một cách dịch' },
          source: {
            en: 'The scholarship is full, covers tuition and accommodation, and runs for the whole programme.',
            vi: 'Học bổng là toàn phần, chi trả học phí và chỗ ở, và kéo dài suốt chương trình.',
          },
          translation: {
            en: 'Học bổng toàn phần chi trả học phí và chỗ ở trong suốt chương trình.',
            vi: 'The scholarship is full: it covers tuition and accommodation for the whole programme.',
          },
          note: {
            en: '“Full” and “whole programme” are different ideas, and only one belongs in the term. Collapsing both into “học bổng toàn khóa” loses the coverage information.',
            vi: '“Toàn phần” và “suốt chương trình” là hai ý khác nhau, chỉ một ý thuộc về thuật ngữ. Gộp cả hai thành “học bổng toàn khóa” sẽ làm mất thông tin về phạm vi chi trả.',
          },
        },
      },
      {
        heading: { en: 'A thirty-minute extraction routine', vi: 'Quy trình trích xuất ba mươi phút' },
        paragraphs: [
          {
            en: 'Minute one to ten: read the agenda and slides, marking every noun phrase and acronym. Minute ten to twenty: for each mark, write one Vietnamese rendering you are confident saying aloud. Minute twenty to twenty-five: check only the uncertain ones against a reliable source, and write a note rather than a guess. Minute twenty-five to thirty: read the whole list aloud once, both directions.',
            vi: 'Phút một đến mười: đọc chương trình và slide, đánh dấu mọi cụm danh từ và từ viết tắt. Phút mười đến hai mươi: với mỗi dấu, viết một cách dịch tiếng Việt bạn tự tin nói thành tiếng. Phút hai mươi đến hai mươi lăm: chỉ tra những mục chưa chắc bằng nguồn tin cậy, và ghi chú thay vì đoán. Phút hai mươi lăm đến ba mươi: đọc toàn bộ danh sách thành tiếng một lần, cả hai chiều.',
          },
        ],
        note: {
          en: 'Bring the sheet to the event. A one-page glossary in your hand beats a perfect glossary on a laptop you cannot open in the booth.',
          vi: 'Mang bảng thuật ngữ đến sự kiện. Một trang giấy trong tay tốt hơn bảng hoàn hảo trên máy tính không mở được trong buồng phiên dịch.',
        },
      },
      {
        heading: { en: 'Where to check an unfamiliar rendering', vi: 'Tra cứu một cách dịch chưa quen ở đâu' },
        paragraphs: [
          {
            en: 'Check in this order: the event documents themselves (the organiser’s own usage wins), the partner institution’s website in both languages, a regulatory source such as the ministry’s published documents, and only then a general dictionary. A dictionary confirms a word exists; it does not tell you which word the room uses.',
            vi: 'Tra theo thứ tự sau: chính tài liệu sự kiện (cách dùng của ban tổ chức là chuẩn), website song ngữ của cơ sở đối tác, nguồn quy phạm như văn bản đã công bố của bộ, và chỉ sau đó mới đến từ điển chung. Từ điển xác nhận một từ tồn tại; nó không cho biết cả phòng đang dùng từ nào.',
          },
        ],
        bullets: [
          { en: 'Prefer a source that shows the term inside a sentence, in context.', vi: 'Ưu tiên nguồn cho thấy thuật ngữ nằm trong câu, có ngữ cảnh.' },
          { en: 'Record the source next to the term so a colleague can verify it later.', vi: 'Ghi nguồn bên cạnh thuật ngữ để đồng nghiệp kiểm chứng sau.' },
          { en: 'If two credible sources disagree, ask the organiser which one they use.', vi: 'Nếu hai nguồn đáng tin mâu thuẫn, hỏi ban tổ chức họ dùng cách nào.' },
        ],
        note: {
          en: 'A term you cannot source is a term you should be ready to explain rather than assert.',
          vi: 'Thuật ngữ bạn không có nguồn là thuật ngữ bạn nên sẵn sàng giải thích thay vì khẳng định.',
        },
      },
    ],
    tips: [
      { en: 'Start from agenda titles; they become the sentences you hear.', vi: 'Bắt đầu từ tiêu đề chương trình; chúng trở thành những câu bạn sẽ nghe.' },
      { en: 'Choose one rendering per concept and write down the ones you rejected.', vi: 'Chọn một cách dịch cho mỗi khái niệm và ghi lại các cách đã loại.' },
      { en: 'Say every term aloud; recognition is not retrieval.', vi: 'Nói thành tiếng từng thuật ngữ; nhận diện không phải truy xuất.' },
      { en: 'Ask the organiser about ambiguous terms rather than deciding silently.', vi: 'Hỏi ban tổ chức về thuật ngữ mơ hồ thay vì tự quyết trong im lặng.' },
    ],
    takeaways: [
      { en: 'Preparation means choosing among renderings, not collecting them.', vi: 'Chuẩn bị là chọn giữa các cách dịch, không phải thu thập chúng.' },
      { en: 'Keep, adapt, or explain — decide deliberately for each term.', vi: 'Giữ nguyên, chuyển đổi hay giải thích — quyết định có chủ đích cho từng thuật ngữ.' },
      { en: 'Team consistency is part of accuracy.', vi: 'Nhất quán trong nhóm là một phần của độ chính xác.' },
      { en: 'A printed one-page glossary is a working tool; a laptop may not be.', vi: 'Bảng thuật ngữ một trang in ra là công cụ làm việc; máy tính có thể không.' },
    ],
    relatedTerms: ['note-taking', 'academic-title', 'memorandum-of-understanding', 'accreditation'],
  },
  {
    slug: 'cross-cultural-communication',
    number: 7,
    title: {
      en: 'Cross-cultural Communication',
      vi: 'Giao tiếp liên văn hóa',
    },
    summary: {
      en: 'Two delegations can agree on every word and still misunderstand each other. Interpreting is not only between languages; it sits between conventions of politeness, hierarchy, and what counts as a clear answer.',
      vi: 'Hai đoàn có thể thống nhất từng từ mà vẫn hiểu sai nhau. Phiên dịch không chỉ nằm giữa các ngôn ngữ; nó nằm giữa những quy ước về lịch sự, thứ bậc và điều gì được coi là một câu trả lời rõ ràng.',
    },
    readingMinutes: 9,
    objectives: [
      {
        en: 'Recognise when a politeness convention rather than a language problem is causing friction.',
        vi: 'Nhận ra khi căng thẳng đến từ quy ước lịch sự chứ không phải vấn đề ngôn ngữ.',
      },
      {
        en: 'Render Vietnamese formal address without inventing titles or flattening hierarchy.',
        vi: 'Chuyển đạt cách xưng hô trang trọng của tiếng Việt mà không bịa chức danh hay làm phẳng thứ bậc.',
      },
      {
        en: 'Handle indirect refusal and indirect criticism without converting them into confrontation.',
        vi: 'Xử lý lời từ chối gián tiếp và phê bình gián tiếp mà không biến chúng thành đối đầu.',
      },
      {
        en: 'Decide when a cultural explanation is appropriate and when it is interference.',
        vi: 'Quyết định khi nào giải thích văn hóa là phù hợp và khi nào là can thiệp.',
      },
    ],
    sections: [
      {
        heading: { en: 'Politeness is not padding', vi: 'Lịch sự không phải phần thừa' },
        paragraphs: [
          {
            en: 'Vietnamese formal speech opens with address formulas — “Kính thưa quý vị”, “Thay mặt đoàn” — that English conferences often replace with a simple “Good morning”. Dropping them entirely makes the Vietnamese speaker sound curt; keeping them in full on every turn makes the English sound ceremonial and slow.',
            vi: 'Diễn ngôn trang trọng tiếng Việt mở đầu bằng công thức xưng hô — “Kính thưa quý vị”, “Thay mặt đoàn” — trong khi hội nghị tiếng Anh thường chỉ cần “Good morning”. Bỏ hoàn toàn khiến người nói tiếng Việt nghe cộc; giữ đầy đủ ở mọi lượt khiến tiếng Anh nghe nghi lễ và chậm.',
          },
          {
            en: 'The workable rule: keep the formula at the opening and closing of a speech, compress it in the middle. “Kính thưa quý vị” becomes one “Ladies and gentlemen” at the start and nothing afterwards.',
            vi: 'Nguyên tắc khả dụng: giữ công thức ở phần mở và kết, nén lại ở giữa. “Kính thưa quý vị” thành một “Ladies and gentlemen” ở đầu và không lặp lại sau đó.',
          },
        ],
        example: {
          label: { en: 'Compressing a formula', vi: 'Nén một công thức' },
          source: {
            en: 'Kính thưa quý vị đại biểu, kính thưa các vị khách quý, thay mặt ban tổ chức, tôi xin trân trọng cảm ơn sự có mặt của quý vị trong buổi sáng hôm nay.',
            vi: 'Kính thưa quý vị đại biểu, kính thưa các vị khách quý, thay mặt ban tổ chức, tôi xin trân trọng cảm ơn sự có mặt của quý vị trong buổi sáng hôm nay.',
          },
          translation: {
            en: 'On behalf of the organisers, thank you all for joining us this morning.',
            vi: 'Thay mặt ban tổ chức, tôi xin cảm ơn quý vị đã có mặt trong buổi sáng hôm nay.',
          },
          note: {
            en: 'Three formulaic lines reduce to one clause. The gratitude and the authority (“on behalf of the organisers”) survive; only the ceremonial repetition goes.',
            vi: 'Ba dòng công thức rút thành một mệnh đề. Lòng biết ơn và thẩm quyền (“thay mặt ban tổ chức”) được giữ; chỉ phần lặp nghi lễ bị bỏ.',
          },
        },
      },
      {
        heading: { en: 'Address terms and hierarchy', vi: 'Xưng hô và thứ bậc' },
        paragraphs: [
          {
            en: 'Vietnamese address encodes relative age and status: “Thầy/Cô” for teachers, “anh/chị” for peers, “em” for juniors, and titles read before names. English has almost none of this. The interpreter must decide, per turn, how much hierarchy to carry across.',
            vi: 'Cách xưng hô tiếng Việt mã hóa tuổi tác tương đối và địa vị: “Thầy/Cô” với người dạy, “anh/chị” với ngang hàng, “em” với người ít tuổi hơn, và chức danh đọc trước tên. Tiếng Anh gần như không có những điều này. Phiên dịch viên phải quyết định, theo từng lượt, mang bao nhiêu thứ bậc sang.',
          },
          {
            en: 'A workable default: keep titles in the first mention — “Professor Nguyen, Vice-Rector” — then use surnames. Do not translate “Thầy” as “Teacher”, which sounds like a schoolchild addressing an adult. “Professor” or the person’s name plus title is closer to the function.',
            vi: 'Mặc định khả dụng: giữ chức danh ở lần nhắc đầu — “Professor Nguyen, Vice-Rector” — sau đó dùng họ. Đừng dịch “Thầy” thành “Teacher”, nghe như học sinh gọi người lớn. “Professor” hoặc tên kèm chức danh gần với chức năng hơn.',
          },
        ],
        bullets: [
          { en: 'Never invent a title the person does not hold; ask instead.', vi: 'Không bao giờ thêm chức danh người đó không có; hãy hỏi.' },
          { en: '“PGS.TS” is two ranks — read both, in the order given.', vi: '“PGS.TS” là hai học hàm, học vị — đọc cả hai, theo thứ tự đã ghi.' },
          { en: 'When a Vietnamese speaker uses “đồng chí”, the room is political or state; “colleague” is too neutral, so use the name or “Comrade” only if the speaker does.', vi: 'Khi người nói dùng “đồng chí”, bối cảnh là chính trị hoặc nhà nước; “colleague” quá trung tính, nên dùng tên hoặc “Comrade” chỉ khi người nói dùng.' },
        ],
      },
      {
        heading: { en: 'Indirect refusal and indirect criticism', vi: 'Từ chối và phê bình gián tiếp' },
        paragraphs: [
          {
            en: 'Vietnamese refusal often arrives as a difficulty rather than a no: “việc này hơi khó” or “để chúng tôi xem lại”. Rendering that as “we will review it” invites the other side to wait for an approval that is not coming. The interpreter’s job is to preserve the hesitation in the target language, not to resolve it.',
            vi: 'Lời từ chối tiếng Việt thường đến dưới dạng khó khăn chứ không phải chữ “không”: “việc này hơi khó” hoặc “để chúng tôi xem lại”. Dịch thành “we will review it” khiến bên kia chờ một phê duyệt sẽ không đến. Việc của phiên dịch viên là giữ nguyên sự dè dặt trong ngôn ngữ đích, không phải giải quyết nó.',
          },
          {
            en: 'The same applies in reverse. An English “I’m afraid that won’t be possible” is a firm refusal softened for politeness; in Vietnamese it becomes “E rằng việc đó không khả thi”, keeping both the softener and the refusal.',
            vi: 'Chiều ngược lại cũng vậy. “I’m afraid that won’t be possible” là lời từ chối dứt khoát được làm mềm; sang tiếng Việt thành “E rằng việc đó không khả thi”, giữ cả phần làm mềm và phần từ chối.',
          },
        ],
        note: {
          en: 'Explaining culture is interference unless both parties have asked for it or a misunderstanding has already happened. Prefer rendering the nuance faithfully over adding commentary.',
          vi: 'Giải thích văn hóa là can thiệp, trừ khi hai bên yêu cầu hoặc hiểu nhầm đã xảy ra. Nên chuyển đạt sắc thái trung thực hơn là thêm bình luận.',
        },
      },
      {
        heading: { en: 'When to step outside the role', vi: 'Khi nào được vượt ra ngoài vai trò' },
        paragraphs: [
          {
            en: 'There are three legitimate moments to speak as yourself rather than as the speaker: when you need a term clarified; when a number is internally contradictory and you cannot render either version honestly; and when a remark is discriminatory and continuing to relay it would make you a participant in it. In the third case, stop, state your position briefly and neutrally, and ask the chair how to proceed.',
            vi: 'Có ba thời điểm chính đáng để nói với tư cách bản thân thay vì người nói: khi cần làm rõ một thuật ngữ; khi một con số tự mâu thuẫn và bạn không thể chuyển đạt trung thực cách nào; và khi một phát ngôn mang tính phân biệt đối xử, tiếp tục chuyển đạt sẽ biến bạn thành người tham gia. Ở trường hợp thứ ba, hãy dừng, nêu ngắn gọn và trung tính lập trường của mình, rồi hỏi chủ tọa cách tiếp tục.',
          },
        ],
      },
      {
        heading: { en: 'Silence, laughter, and the space between turns', vi: 'Im lặng, tiếng cười và khoảng giữa các lượt' },
        paragraphs: [
          {
            en: 'Silence carries different weight in the two languages. A pause of three seconds after a question is normal in a Vietnamese meeting and can read as evasion in an English one; laughter may signal embarrassment rather than amusement. The interpreter should neither fill the silence nor explain the laughter, but should deliver the pause as a pause.',
            vi: 'Im lặng mang trọng lượng khác nhau ở hai ngôn ngữ. Khoảng dừng ba giây sau một câu hỏi là bình thường trong cuộc họp tiếng Việt và có thể bị hiểu là né tránh trong cuộc họp tiếng Anh; tiếng cười có thể là dấu hiệu ngượng chứ không phải thích thú. Phiên dịch viên không nên lấp khoảng lặng hay giải thích tiếng cười, mà nên chuyển đạt khoảng dừng như một khoảng dừng.',
          },
          {
            en: 'When a pause stretches past five seconds and the room starts to look at you, a neutral bridge is legitimate: “Người nói đang cân nhắc câu trả lời” or “The speaker is considering the question.” It is factual, it protects the speaker, and it is not commentary.',
            vi: 'Khi khoảng dừng kéo dài quá năm giây và cả phòng bắt đầu nhìn bạn, một câu bắc cầu trung tính là hợp lý: “Người nói đang cân nhắc câu trả lời” hoặc “The speaker is considering the question.” Câu này chỉ nêu sự việc, bảo vệ người nói và không phải bình luận.',
          },
        ],
      },
    ],
    tips: [
      { en: 'Keep address formulas at the head and tail of a speech, compress them in the middle.', vi: 'Giữ công thức xưng hô ở đầu và cuối bài nói, nén lại ở phần giữa.' },
      { en: 'Never translate “Thầy/Cô” as “Teacher”.', vi: 'Không bao giờ dịch “Thầy/Cô” thành “Teacher”.' },
      { en: 'Preserve indirect refusal as indirect; do not resolve it for either side.', vi: 'Giữ lời từ chối gián tiếp ở dạng gián tiếp; đừng giải quyết thay bên nào.' },
      { en: 'Do not add cultural commentary unless it was requested.', vi: 'Không thêm bình luận văn hóa trừ khi được yêu cầu.' },
    ],
    takeaways: [
      { en: 'Politeness conventions carry meaning and must be rendered, not stripped.', vi: 'Quy ước lịch sự mang nghĩa và phải được chuyển đạt, không bị gọt bỏ.' },
      { en: 'Address terms encode hierarchy that English cannot carry directly.', vi: 'Cách xưng hô mã hóa thứ bậc mà tiếng Anh không mang trực tiếp được.' },
      { en: 'Indirect refusal must stay indirect in both directions.', vi: 'Lời từ chối gián tiếp phải giữ tính gián tiếp ở cả hai chiều.' },
      { en: 'Explaining culture is a boundary decision, not a default.', vi: 'Giải thích văn hóa là quyết định ranh giới, không phải mặc định.' },
    ],
    relatedTerms: ['academic-title', 'professor', 'protocol', 'dean'],
  },
  {
    slug: 'ethics-and-difficult-situations',
    number: 8,
    title: {
      en: 'Professional Ethics and Difficult Situations',
      vi: 'Đạo đức nghề nghiệp và tình huống khó',
    },
    summary: {
      en: 'Confidentiality, neutrality, and competence are straightforward until the afternoon they are tested. This chapter sets out what to do when a figure is wrong, a client asks for advocacy, and a speaker says something you should not simply relay.',
      vi: 'Bảo mật, trung lập và năng lực là những điều rõ ràng cho đến buổi chiều chúng bị thử thách. Chương này nêu cách xử lý khi một con số sai, khi khách hàng yêu cầu bạn làm người biện hộ, và khi diễn giả nói điều bạn không nên chuyển đạt một cách đơn thuần.',
    },
    readingMinutes: 11,
    objectives: [
      {
        en: 'Apply confidentiality to documents, recordings, and informal conversations alike.',
        vi: 'Áp dụng bảo mật cho cả tài liệu, bản ghi và các trao đổi không chính thức.',
      },
      {
        en: 'Respond when a speaker states a factual error you know to be wrong.',
        vi: 'Phản ứng khi người nói nêu một sai sót thực tế mà bạn biết là sai.',
      },
      {
        en: 'Decline work beyond your competence without damaging the relationship.',
        vi: 'Từ chối công việc vượt năng lực mà không làm hỏng quan hệ.',
      },
      {
        en: 'Act when a remark is discriminatory, without becoming an advocate for either side.',
        vi: 'Hành động khi một phát ngôn mang tính phân biệt đối xử, mà không trở thành người biện hộ cho bên nào.',
      },
    ],
    sections: [
      {
        heading: { en: 'Confidentiality', vi: 'Bảo mật' },
        paragraphs: [
          {
            en: 'Everything you interpret is confidential by default: draft agreements, financial terms, a student’s failed application, a dean’s disagreement with the Rector. The obligation extends past the event and covers your notes, your glossary, and the examples you might be tempted to use in training.',
            vi: 'Mọi thứ bạn phiên dịch mặc định là bảo mật: dự thảo thỏa thuận, điều khoản tài chính, hồ sơ bị từ chối của một sinh viên, bất đồng của một trưởng khoa với hiệu trưởng. Nghĩa vụ kéo dài sau sự kiện và bao trùm ghi chú, bảng thuật ngữ và cả ví dụ bạn có thể muốn dùng khi giảng dạy.',
          },
          {
            en: 'Practically: do not photograph documents, do not forward files to a personal account without agreement, and anonymise any example before it leaves the room. If a client asks you to sign an NDA, read it — it usually covers more than the meeting itself.',
            vi: 'Trên thực tế: không chụp ảnh tài liệu, không chuyển tệp sang tài khoản cá nhân khi chưa thống nhất, và ẩn danh mọi ví dụ trước khi nó rời khỏi phòng họp. Nếu khách yêu cầu ký thỏa thuận bảo mật, hãy đọc — nó thường bao trùm nhiều hơn bản thân cuộc họp.',
          },
        ],
      },
      {
        heading: { en: 'Neutrality is not indifference', vi: 'Trung lập không phải thờ ơ' },
        paragraphs: [
          {
            en: 'Neutrality means the interpreter does not add, soften, or sharpen the speaker’s position. It does not mean delivering a statement you find offensive as though it were your own view. The distinction matters: faithful rendering preserves the speaker’s responsibility for what was said; adaptation transfers part of that responsibility to you.',
            vi: 'Trung lập nghĩa là phiên dịch viên không thêm, không làm mềm, không làm sắc thêm lập trường của người nói. Điều đó không có nghĩa là chuyển đạt một phát ngôn xúc phạm như thể đó là quan điểm của bạn. Sự phân biệt rất quan trọng: chuyển đạt trung thực giữ trách nhiệm phát ngôn ở người nói; chế biến lại chuyển một phần trách nhiệm sang bạn.',
          },
        ],
        example: {
          label: { en: 'A factual error in the room', vi: 'Một sai sót thực tế trong phòng' },
          source: {
            en: 'As everyone knows, Vietnam has twelve universities in the top five hundred worldwide.',
            vi: 'Như mọi người đều biết, Việt Nam có mười hai trường đại học trong nhóm năm trăm trường tốt nhất thế giới.',
          },
          translation: {
            en: 'Như mọi người đều biết, Việt Nam có mười hai trường đại học trong nhóm năm trăm trường tốt nhất thế giới.',
            vi: 'As everyone knows, Vietnam has twelve universities in the top five hundred worldwide.',
          },
          note: {
            en: 'Interpret it faithfully. Correcting the figure would make you a participant in the discussion. If the error will cause harm — a wrong deadline, a wrong amount — note it to the chair at the break, as a logistics matter, not as a challenge in the room.',
            vi: 'Hãy chuyển đạt trung thực. Sửa con số sẽ biến bạn thành người tham gia thảo luận. Nếu sai sót gây hệ quả — hạn sai, số tiền sai — hãy báo chủ tọa lúc giải lao, như một vấn đề hậu cần, không phải một chất vấn giữa phòng.',
          },
        },
      },
      {
        heading: { en: 'Competence and declining work', vi: 'Năng lực và từ chối công việc' },
        paragraphs: [
          {
            en: 'Accepting an assignment outside your language pair, your domain, or your physical capacity is the most common ethical failure, and it is usually caused by financial pressure or by not wanting to disappoint a colleague. Decline early, name the reason, and offer an alternative: a recommendation, a glossary, or a shorter scope.',
            vi: 'Nhận việc vượt ngoài cặp ngôn ngữ, lĩnh vực hoặc sức chịu đựng của mình là lỗi đạo đức phổ biến nhất, thường do áp lực tài chính hoặc không muốn làm đồng nghiệp thất vọng. Hãy từ chối sớm, nêu rõ lý do và đề xuất phương án: giới thiệu người khác, chia sẻ bảng thuật ngữ, hoặc thu hẹp phạm vi.',
          },
        ],
        bullets: [
          { en: '“Tôi không nhận được việc này vì lý do chuyên môn” is a complete sentence; no apology is required.', vi: '“Tôi không nhận được việc này vì lý do chuyên môn” là một câu đầy đủ; không cần xin lỗi.' },
          { en: 'If you discover mid-event that you are out of depth, tell the organiser at the first break.', vi: 'Nếu giữa sự kiện nhận ra mình không đủ năng lực, hãy báo ban tổ chức ngay giờ giải lao đầu tiên.' },
          { en: 'Do not accept a simultaneous assignment alone for a session longer than forty minutes.', vi: 'Không nhận phiên dịch song song một mình cho phiên dài quá bốn mươi phút.' },
        ],
      },
      {
        heading: { en: 'Discriminatory remarks', vi: 'Phát ngôn phân biệt đối xử' },
        paragraphs: [
          {
            en: 'If a speaker makes a remark that demeans a group, you have three defensible options and one indefensible one. You may render it faithfully (the audience will hear the speaker’s view as the speaker’s), you may render it and note to the chair at the break, or you may pause and say you cannot continue with that passage. What you may not do is quietly soften it into something acceptable, because that hides both the remark and your own position.',
            vi: 'Nếu người nói đưa ra phát ngôn hạ thấp một nhóm người, bạn có ba lựa chọn bảo vệ được và một lựa chọn không. Bạn có thể chuyển đạt trung thực (khán giả sẽ nghe đó là quan điểm của người nói), chuyển đạt và báo chủ tọa lúc giải lao, hoặc dừng lại và nói bạn không thể tiếp tục đoạn đó. Điều bạn không được làm là lặng lẽ làm mềm thành điều chấp nhận được, vì như vậy che cả phát ngôn lẫn lập trường của chính bạn.',
          },
        ],
        note: {
          en: 'Agree the escalation route with the organiser before the event: who do you tell, and how, if something goes wrong. Having a named person makes the decision possible in the moment.',
          vi: 'Thống nhất đường báo cáo với ban tổ chức trước sự kiện: báo ai và báo thế nào nếu có vấn đề. Có một người được nêu tên giúp quyết định trở nên khả thi ngay tại chỗ.',
        },
      },
      {
        heading: { en: 'Conflict of interest', vi: 'Xung đột lợi ích' },
        paragraphs: [
          {
            en: 'Declare any relationship that could colour your work: you are a candidate for the scholarship being discussed, a relative sits on the committee, you are employed by one of the two universities. Declaring is not disqualifying; concealing is. Most organisers can rearrange a session; almost none can repair a reputation.',
            vi: 'Hãy khai báo mọi quan hệ có thể ảnh hưởng công việc: bạn là ứng viên của học bổng đang bàn, người thân ngồi trong hội đồng, bạn đang làm việc cho một trong hai trường. Khai báo không loại bạn; che giấu mới loại. Phần lớn ban tổ chức có thể đổi phiên; gần như không ai sửa được uy tín.',
          },
        ],
        example: {
          label: { en: 'Declining mid-assignment', vi: 'Từ chối giữa chừng' },
          source: {
            en: 'I am sorry, but I am not able to continue interpreting this section. The discussion concerns a candidate I am related to. I will step out and brief my colleague.',
            vi: 'Tôi xin lỗi, nhưng tôi không thể tiếp tục phiên dịch phần này. Nội dung liên quan đến một ứng viên là người thân của tôi. Tôi sẽ ra ngoài và bàn giao cho đồng nghiệp.',
          },
          translation: {
            en: 'Tôi xin lỗi, nhưng tôi không thể tiếp tục phiên dịch phần này. Nội dung liên quan đến một ứng viên là người thân của tôi. Tôi sẽ ra ngoài và bàn giao cho đồng nghiệp.',
            vi: 'I am sorry, but I am not able to continue interpreting this section. It concerns a candidate to whom I am related. I will step out and hand over to my colleague.',
          },
          note: {
            en: 'The statement is short, factual, and offers a handover. Length invites negotiation; a handover ends the matter without blaming anyone.',
            vi: 'Phát biểu ngắn, chỉ nêu sự việc và đề xuất bàn giao. Nói dài sẽ mời gọi thương lượng; bàn giao kết thúc vấn đề mà không quy trách nhiệm ai.',
          },
        },
      },
    ],
    tips: [
      { en: 'Treat every assignment as confidential by default, including your notes.', vi: 'Coi mọi việc là bảo mật mặc định, kể cả ghi chú của bạn.' },
      { en: 'Render errors faithfully; report consequential ones to the chair at the break.', vi: 'Chuyển đạt sai sót trung thực; báo chủ tọa những sai sót có hệ quả vào giờ giải lao.' },
      { en: 'Decline out-of-competence work early and offer an alternative.', vi: 'Từ chối sớm công việc vượt năng lực và đề xuất phương án thay thế.' },
      { en: 'Never soften a discriminatory remark into acceptability.', vi: 'Không bao giờ làm mềm phát ngôn phân biệt đối xử để nó thành chấp nhận được.' },
    ],
    takeaways: [
      { en: 'Confidentiality outlives the event and covers notes and examples.', vi: 'Bảo mật tồn tại sau sự kiện và bao gồm ghi chú, ví dụ.' },
      { en: 'Neutrality preserves the speaker’s responsibility for their words.', vi: 'Trung lập giữ trách nhiệm phát ngôn ở người nói.' },
      { en: 'Competence limits are ethical limits, not modesty.', vi: 'Giới hạn năng lực là giới hạn đạo đức, không phải sự khiêm tốn.' },
      { en: 'Declare conflicts of interest before they become incidents.', vi: 'Khai báo xung đột lợi ích trước khi nó thành sự cố.' },
    ],
    relatedTerms: ['academic-integrity', 'plagiarism', 'protocol', 'memorandum-of-understanding'],
  },
];
