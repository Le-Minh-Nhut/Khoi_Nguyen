import type { Quiz, TranslationExercise } from '@/types/content';

export const quizzes: Quiz[] = [
  {
    id: 'terminology-core',
    title: {
      vi: 'Thuật ngữ giáo dục cốt lõi',
      en: 'Core education terminology',
    },
    description: {
      vi: 'Kiểm tra các cặp thuật ngữ dễ nhầm trong hồ sơ, học bổng và quản trị đại học.',
      en: 'Check the term pairs most often confused in admissions, scholarships, and university administration.',
    },
    questions: [
      {
        id: 'mou-vi',
        prompt: {
          vi: 'Trong văn bản hợp tác quốc tế, “Memorandum of Understanding (MOU)” được dịch đúng nhất là gì?',
          en: 'In an international cooperation document, what is the most accurate Vietnamese rendering of “Memorandum of Understanding (MOU)”?',
        },
        options: [
          { id: 'mou-a', vi: 'Biên bản ghi nhớ', en: 'Memorandum of Understanding' },
          { id: 'mou-b', vi: 'Hợp đồng kinh tế', en: 'Economic contract' },
          { id: 'mou-c', vi: 'Thư giới thiệu', en: 'Letter of introduction' },
          { id: 'mou-d', vi: 'Giấy chứng nhận hợp tác', en: 'Certificate of cooperation' },
        ],
        answerId: 'mou-a',
        explanation: {
          vi: '“Biên bản ghi nhớ” giữ đúng tính chất không ràng buộc pháp lý của MOU. “Hợp đồng kinh tế” tạo nghĩa ràng buộc và thương mại; “thư giới thiệu” và “giấy chứng nhận hợp tác” là loại văn bản khác hẳn.',
          en: '“Biên bản ghi nhớ” preserves the non-binding character of an MOU. “Economic contract” wrongly implies a binding commercial agreement, while “letter of introduction” and “certificate of cooperation” are different document types.',
        },
      },
      {
        id: 'transcript-vi',
        prompt: {
          vi: '“Academic transcript” trong hồ sơ tuyển sinh nên được dịch là gì?',
          en: 'How should “academic transcript” be rendered in an admissions file?',
        },
        options: [
          { id: 'transcript-a', vi: 'Bảng điểm', en: 'Academic transcript' },
          { id: 'transcript-b', vi: 'Bằng tốt nghiệp', en: 'Graduation certificate' },
          { id: 'transcript-c', vi: 'Chứng chỉ ngoại ngữ', en: 'Language certificate' },
          { id: 'transcript-d', vi: 'Học bạ điện tử', en: 'Electronic school record' },
        ],
        answerId: 'transcript-a',
        explanation: {
          vi: '“Bảng điểm” là bản ghi kết quả các môn học. “Bằng tốt nghiệp” chỉ là văn bằng hoàn thành khóa học, “chứng chỉ ngoại ngữ” là loại chứng chỉ riêng, còn “học bạ” thường dùng cho cấp phổ thông chứ không phải đại học.',
          en: '“Bảng điểm” records course results. “Bằng tốt nghiệp” is the degree awarded on completion, “chứng chỉ ngoại ngữ” is a language certificate, and “học bạ” normally refers to secondary-school records rather than university study.',
        },
      },
      {
        id: 'credit-transfer-en',
        prompt: {
          vi: 'Thuật ngữ tiếng Anh chuẩn cho “chuyển đổi tín chỉ” giữa hai trường là gì?',
          en: 'What is the standard English term for “chuyển đổi tín chỉ” between two institutions?',
        },
        options: [
          { id: 'credit-a', vi: 'Chuyển đổi tín chỉ', en: 'Credit transfer' },
          { id: 'credit-b', vi: 'Quy đổi thang điểm', en: 'Credit conversion' },
          { id: 'credit-c', vi: 'Miễn học phần', en: 'Course exemption' },
          { id: 'credit-d', vi: 'Đối chiếu bảng điểm', en: 'Transcript mapping' },
        ],
        answerId: 'credit-a',
        explanation: {
          vi: '“Credit transfer” là thuật ngữ chính thức trong trao đổi sinh viên. “Credit conversion” nói về quy đổi thang điểm, “course exemption” là miễn học phần chứ không chuyển tín chỉ, còn “transcript mapping” chỉ là đối chiếu bảng điểm.',
          en: '“Credit transfer” is the official term in student exchange. “Credit conversion” concerns grade-scale conversion, “course exemption” means waiving a course rather than transferring credit, and “transcript mapping” is merely comparing transcripts.',
        },
      },
      {
        id: 'tuition-scholarship-vi',
        prompt: {
          vi: 'Một học bổng chỉ miễn toàn bộ học phí, không có trợ cấp sinh hoạt, nên được gọi là gì?',
          en: 'A scholarship that covers tuition in full but provides no living allowance should be called what?',
        },
        options: [
          { id: 'tuition-a', vi: 'Học bổng miễn học phí toàn phần', en: 'Full-tuition scholarship' },
          { id: 'tuition-b', vi: 'Học bổng toàn phần', en: 'Full scholarship' },
          { id: 'tuition-c', vi: 'Học bổng bán phần', en: 'Partial scholarship' },
          { id: 'tuition-d', vi: 'Trợ cấp sinh hoạt', en: 'Living allowance' },
        ],
        answerId: 'tuition-a',
        explanation: {
          vi: '“Học bổng miễn học phí toàn phần” nêu đúng phạm vi chi trả. “Học bổng toàn phần” hàm ý cả sinh hoạt phí nên dễ gây hiểu lầm; “học bổng bán phần” là mức thấp hơn, còn “trợ cấp sinh hoạt” là khoản tiền khác, không phải học bổng.',
          en: '“Full-tuition scholarship” states the exact coverage. “Full scholarship” implies living costs as well, “partial scholarship” understates the award, and “living allowance” is a different kind of payment, not a scholarship.',
        },
      },
      {
        id: 'head-of-department-vi',
        prompt: {
          vi: 'Chức danh “Head of Department” trong một trường đại học được dịch đúng nhất là gì?',
          en: 'What is the most accurate Vietnamese equivalent of “Head of Department” at a university?',
        },
        options: [
          { id: 'head-a', vi: 'Trưởng khoa', en: 'Head of Department' },
          { id: 'head-b', vi: 'Trưởng bộ môn', en: 'Head of Division' },
          { id: 'head-c', vi: 'Hiệu trưởng', en: 'Rector / President' },
          { id: 'head-d', vi: 'Chủ nhiệm lớp', en: 'Homeroom teacher' },
        ],
        answerId: 'head-a',
        explanation: {
          vi: 'Trong cơ cấu đại học Việt Nam, “khoa” tương ứng department, nên “Trưởng khoa” là chuẩn. “Trưởng bộ môn” là cấp nhỏ hơn, “Hiệu trưởng” đứng đầu cả trường, còn “chủ nhiệm lớp” chỉ phụ trách một lớp sinh viên.',
          en: 'In Vietnamese university structures, “khoa” corresponds to department, so “Trưởng khoa” is standard. “Trưởng bộ môn” heads a smaller division, “Hiệu trưởng” leads the whole institution, and “chủ nhiệm lớp” is a class adviser.',
        },
      },
    ],
  },
  {
    id: 'interpreting-judgment',
    title: {
      vi: 'Xử lý tình huống phiên dịch',
      en: 'Interpreting judgment',
    },
    description: {
      vi: 'Chọn cách xử lý đúng khi gặp thành ngữ, số liệu mơ hồ, từ viết tắt lạ và câu hỏi căng thẳng.',
      en: 'Choose the right move for idioms, ambiguous figures, unfamiliar acronyms, and tense audience questions.',
    },
    questions: [
      {
        id: 'joke-idiom',
        prompt: {
          vi: 'Diễn giả pha trò bằng một thành ngữ tiếng Anh không có tương đương trực tiếp trong tiếng Việt. Phiên dịch viên nên làm gì?',
          en: 'A speaker makes a joke using an English idiom with no direct Vietnamese equivalent. What should the interpreter do?',
        },
        options: [
          { id: 'joke-a', vi: 'Dịch sát từng từ để giữ nguyên hình ảnh', en: 'Translate word for word to preserve the image' },
          { id: 'joke-b', vi: 'Dùng một cách nói tương đương gần nhất và giữ đúng ý hài', en: 'Use the nearest functional equivalent and keep the humorous intent' },
          { id: 'joke-c', vi: 'Bỏ qua vì khán giả sẽ không hiểu', en: 'Omit it because the audience will not understand' },
          { id: 'joke-d', vi: 'Giải thích thành ngữ bằng một đoạn dài', en: 'Explain the idiom in a long aside' },
        ],
        answerId: 'joke-b',
        explanation: {
          vi: 'Mục tiêu là chuyển chức năng giao tiếp, không chuyển từng từ. Dịch sát từ thường vô nghĩa, bỏ qua làm mất giọng điệu, còn giải thích dài phá nhịp và làm khán giả mất tập trung.',
          en: 'The goal is to transfer communicative function, not words. A literal rendering often falls flat, omission loses the tone, and a long explanation breaks the rhythm and pulls focus.',
        },
      },
      {
        id: 'ambiguous-number',
        prompt: {
          vi: 'Diễn giả nói “the third of next month” nhưng ngữ cảnh có thể hiểu là ngày 3 hoặc tuần thứ ba. Phiên dịch viên nên xử lý thế nào?',
          en: 'A speaker says “the third of next month”, but the context could mean the 3rd day or the third week. What should the interpreter do?',
        },
        options: [
          { id: 'number-a', vi: 'Chọn cách hiểu có vẻ hợp lý hơn và dịch luôn', en: 'Pick the more plausible reading and render it' },
          { id: 'number-b', vi: 'Dịch nguyên văn mơ hồ sang tiếng Việt', en: 'Render the ambiguity literally into Vietnamese' },
          { id: 'number-c', vi: 'Hỏi lại diễn giả để làm rõ trước khi dịch', en: 'Ask the speaker to clarify before rendering' },
          { id: 'number-d', vi: 'Bỏ số liệu và chỉ nói “đầu tháng sau”', en: 'Drop the date and say “early next month”' },
        ],
        answerId: 'number-c',
        explanation: {
          vi: 'Với số liệu và thời hạn, đoán sai gây hậu quả thực tế. Hỏi lại là bước chuyên nghiệp; dịch nguyên văn để mơ hồ hoặc làm mờ thành “đầu tháng” đều chuyển rủi ro sang người nghe.',
          en: 'With dates and deadlines, a wrong guess has real consequences. Asking is the professional move; preserving the ambiguity or blurring it to “early next month” shifts the risk onto the audience.',
        },
      },
      {
        id: 'unknown-acronym',
        prompt: {
          vi: 'Diễn giả nhắc một từ viết tắt chuyên ngành mà bạn chưa từng gặp và không kịp tra cứu. Cách xử lý đúng là gì?',
          en: 'A speaker uses a specialist acronym you have never seen and cannot look up in time. What is the right handling?',
        },
        options: [
          { id: 'acronym-a', vi: 'Đoán nghĩa theo ngữ cảnh rồi dịch trọn cụm', en: 'Guess from context and translate the full phrase' },
          { id: 'acronym-b', vi: 'Giữ nguyên từ viết tắt và hỏi lại diễn giả cách mở rộng', en: 'Keep the acronym and ask the speaker for the expansion' },
          { id: 'acronym-c', vi: 'Thay bằng một từ viết tắt khác quen thuộc hơn', en: 'Substitute a more familiar acronym' },
          { id: 'acronym-d', vi: 'Bỏ qua cụm đó và dịch tiếp câu sau', en: 'Skip it and continue with the next sentence' },
        ],
        answerId: 'acronym-b',
        explanation: {
          vi: 'Giữ nguyên từ viết tắt bảo toàn thông tin gốc, và hỏi lại giúp mở rộng chính xác. Đoán hoặc thay bằng từ khác có thể tạo thuật ngữ sai; bỏ qua làm mất nội dung chuyên môn.',
          en: 'Keeping the acronym preserves the original information, and asking yields the correct expansion. Guessing or substituting invents terminology, while skipping loses substantive content.',
        },
      },
      {
        id: 'hostile-question',
        prompt: {
          vi: 'Một khán giả đặt câu hỏi gay gắt, phê bình trường tiếp nhận. Phiên dịch viên nên chuyển câu hỏi thế nào?',
          en: 'An audience member asks a pointed question criticising the host institution. How should the interpreter render it?',
        },
        options: [
          { id: 'hostile-a', vi: 'Làm nhẹ giọng để tránh căng thẳng', en: 'Soften the tone to avoid tension' },
          { id: 'hostile-b', vi: 'Thêm lời xin lỗi thay mặt khán giả', en: 'Add an apology on the questioner’s behalf' },
          { id: 'hostile-c', vi: 'Giữ nguyên mức độ phê bình và giọng điệu lịch sự', en: 'Preserve the strength of the criticism and the polite register' },
          { id: 'hostile-d', vi: 'Tóm tắt thành một câu trung tính', en: 'Summarise it into a neutral statement' },
        ],
        answerId: 'hostile-c',
        explanation: {
          vi: 'Phiên dịch viên trung lập với nội dung: không làm dịu cũng không khuếch đại. Làm nhẹ hoặc tóm tắt làm mất quyền nêu ý kiến; thêm lời xin lỗi là tự ý phát ngôn thay người khác.',
          en: 'The interpreter stays neutral about content: neither softening nor amplifying. Softening or summarising removes the questioner’s voice, and adding an apology is speaking on someone else’s behalf.',
        },
      },
      {
        id: 'honorific-choice',
        prompt: {
          vi: 'Diễn giả nói “you” với một hội đồng gồm nhiều chức danh khác nhau. Cách xưng hô nào phù hợp nhất trong tiếng Việt?',
          en: 'A speaker addresses “you” to a panel mixing several ranks. Which Vietnamese form of address is most appropriate?',
        },
        options: [
          { id: 'honorific-a', vi: 'Dùng “quý vị” nhất quán cho cả hội đồng', en: 'Use “quý vị” consistently for the whole panel' },
          { id: 'honorific-b', vi: 'Dùng “bạn” vì tiếng Anh chỉ có một từ', en: 'Use “bạn” because English has only one word' },
          { id: 'honorific-c', vi: 'Đổi chức danh theo từng người dù diễn giả không nêu tên', en: 'Switch titles per person even without names' },
          { id: 'honorific-d', vi: 'Bỏ đại từ và dùng câu không chủ ngữ', en: 'Drop the pronoun and use subjectless sentences' },
        ],
        answerId: 'honorific-a',
        explanation: {
          vi: '“Quý vị” trang trọng, bao quát nhiều người và không áp đặt quan hệ. “Bạn” quá suồng sã với hội đồng; đổi chức danh khi không có tên dễ sai; bỏ đại từ có thể làm câu thiếu chủ thể hoặc lạnh nhạt.',
          en: '“Quý vị” is formal, covers a group, and avoids imposing a relationship. “Bạn” is too casual for a panel, switching titles without names invites errors, and dropping the pronoun can leave the sentence impersonal or unclear.',
        },
      },
    ],
  },
];

export const translationExercises: TranslationExercise[] = [
  {
    id: 'welcome-seminar',
    title: {
      vi: 'Phát biểu khai mạc hội thảo',
      en: 'Opening a seminar',
    },
    direction: 'en-vi',
    level: 'beginner',
    source:
      'Good morning, distinguished guests, colleagues, and students. On behalf of the Faculty of Education, it is my great honour to welcome you to this international seminar on inclusive learning, and to thank our partners for travelling so far to join us.',
    suggested:
      'Kính thưa quý vị đại biểu, quý thầy cô và các bạn sinh viên. Thay mặt Khoa Giáo dục, tôi rất vinh dự được chào mừng quý vị đến với hội thảo quốc tế về học tập hòa nhập, và xin cảm ơn các đối tác đã đi một chặng đường dài để tham dự cùng chúng tôi.',
    notes: {
      vi: '“Distinguished guests” nên dịch thành “quý vị đại biểu” để giữ nghi thức khai mạc. “Travelling so far” chuyển thành “đi một chặng đường dài”, tránh dịch sát “du lịch xa”.',
      en: '“Distinguished guests” becomes “quý vị đại biểu” to keep the ceremonial register. “Travelling so far” is rendered as “đi một chặng đường dài” rather than a literal travel verb.',
    },
  },
  {
    id: 'closing-thanks',
    title: {
      vi: 'Lời cảm ơn kết thúc',
      en: 'Closing thanks',
    },
    direction: 'vi-en',
    level: 'beginner',
    source:
      'Trước khi kết thúc, tôi xin cảm ơn ban tổ chức, các diễn giả và toàn thể quý vị đã dành thời gian tham dự. Hy vọng những trao đổi hôm nay sẽ mở ra nhiều hợp tác mới trong thời gian sắp tới.',
    suggested:
      'Before we close, I would like to sincerely thank the organising committee, our speakers, and everyone who has taken the time to attend today. I hope the discussions we have had will open the door to new collaborations in the months ahead.',
    notes: {
      vi: '“Trước khi kết thúc” giữ được nhịp trang trọng mà không cần thêm “ladies and gentlemen”. “Mở ra nhiều hợp tác mới” dùng “open the door to new collaborations” để tự nhiên hơn “create many new cooperations”.',
      en: '“Trước khi kết thúc” keeps the formal rhythm without adding “ladies and gentlemen”. “Mở ra nhiều hợp tác mới” becomes “open the door to new collaborations”, more idiomatic than “create many new cooperations”.',
    },
  },
  {
    id: 'audience-question',
    title: {
      vi: 'Câu hỏi từ khán giả',
      en: 'Question from the audience',
    },
    direction: 'en-vi',
    level: 'beginner',
    source:
      'I have a question for the panel: if a student’s English is not yet strong enough for the exchange programme, what support does the host university offer before the semester begins?',
    suggested:
      'Tôi có một câu hỏi cho phần thảo luận: nếu tiếng Anh của sinh viên chưa đủ tốt để tham gia chương trình trao đổi, trường tiếp nhận sẽ hỗ trợ gì trước khi học kỳ bắt đầu?',
    notes: {
      vi: '“The panel” dịch là “phần thảo luận” để khán giả hiểu đây là phần hỏi đáp, không phải “bảng điều khiển”. Giữ cấu trúc câu hỏi trực tiếp của người nêu.',
      en: '“The panel” is rendered as “phần thảo luận” so the audience reads it as the Q&A segment, not a control panel. The questioner’s direct question structure is preserved.',
    },
  },
  {
    id: 'deadline-dates',
    title: {
      vi: 'Hạn nộp và các mốc thời gian',
      en: 'Deadlines and key dates',
    },
    direction: 'vi-en',
    level: 'intermediate',
    source:
      'Theo kế hoạch, hồ sơ học bổng phải được nộp trước 17 giờ ngày 30 tháng 4 năm 2027; kết quả dự kiến công bố vào ngày 15 tháng 6, và sinh viên trúng tuyển cần xác nhận nhập học trước ngày 1 tháng 7.',
    suggested:
      'Under the plan, scholarship applications must be submitted by 5 p.m. on 30 April 2027. Results are expected to be announced on 15 June, and successful candidates must confirm enrolment by 1 July.',
    notes: {
      vi: 'Đổi 17 giờ thành “5 p.m.” và đảo trật tự ngày–tháng sang cách viết tiếng Anh. “Trúng tuyển” ở đây là “successful candidates”, không phải “admitted students” chung chung.',
      en: '17:00 becomes “5 p.m.”, and day–month order is reversed for English. “Trúng tuyển” is “successful candidates” rather than a generic “admitted students”.',
    },
  },
  {
    id: 'academic-title',
    title: {
      vi: 'Giới thiệu chức danh học thuật',
      en: 'Introducing an academic title',
    },
    direction: 'en-vi',
    level: 'intermediate',
    source:
      'Dr Nguyen Minh Anh, Associate Professor of Comparative Education at the University of Melbourne, will deliver the keynote. Her research examines how rural schools adapt national curricula, and she has advised three ministries on assessment reform.',
    suggested:
      'TS. Nguyễn Minh Anh, Phó Giáo sư chuyên ngành Giáo dục So sánh tại Đại học Melbourne, sẽ trình bày bài phát biểu chính. Bà nghiên cứu cách các trường nông thôn thích ứng với chương trình quốc gia và đã tư vấn cho ba bộ về cải cách đánh giá.',
    notes: {
      vi: '“Associate Professor” là “Phó Giáo sư”, không phải “Giáo sư phó”. “Keynote” dùng “bài phát biểu chính”; “ministries” để là “bộ” vì không nêu quốc gia cụ thể.',
      en: '“Associate Professor” maps to “Phó Giáo sư”, never a word-for-word “Giáo sư phó”. “Keynote” is “bài phát biểu chính”, and “ministries” stays generic as “bộ” since no country is named.',
    },
  },
  {
    id: 'polite-refusal',
    title: {
      vi: 'Từ chối lịch sự',
      en: 'A polite refusal',
    },
    direction: 'vi-en',
    level: 'intermediate',
    source:
      'Cảm ơn anh đã mời, nhưng tôi e rằng khoa chúng tôi không thể cử giảng viên tham gia học kỳ tới, vì lịch giảng dạy đã kín. Tuy nhiên, chúng tôi rất sẵn lòng hợp tác trong các hoạt động trực tuyến.',
    suggested:
      'Thank you for the invitation, but I am afraid our faculty will not be able to send a lecturer next semester, as our teaching schedule is already full. We would, however, be very glad to cooperate on online activities.',
    notes: {
      vi: '“Tôi e rằng” chuyển thành “I am afraid” để giữ mức độ từ chối mềm. “Lịch giảng dạy đã kín” là “teaching schedule is already full”, tránh “closed schedule”.',
      en: '“Tôi e rằng” becomes “I am afraid” to keep the refusal soft. “Lịch giảng dạy đã kín” is “teaching schedule is already full”, not a literal “closed schedule”.',
    },
  },
  {
    id: 'scholarship-conditions',
    title: {
      vi: 'Điều kiện duy trì học bổng',
      en: 'Scholarship conditions',
    },
    direction: 'en-vi',
    level: 'advanced',
    source:
      'The scholarship covers full tuition and a monthly stipend of 12 million dong for up to four semesters, provided the recipient maintains a GPA of at least 3.2 and completes 30 hours of community tutoring each semester.',
    suggested:
      'Học bổng chi trả toàn bộ học phí và trợ cấp 12 triệu đồng mỗi tháng trong tối đa bốn học kỳ, với điều kiện người nhận duy trì điểm trung bình tối thiểu 3,2 và hoàn thành 30 giờ dạy kèm cộng đồng mỗi học kỳ.',
    notes: {
      vi: '“For up to four semesters” là “trong tối đa bốn học kỳ”, không phải “bốn học kỳ”. Dùng dấu phẩy thập phân “3,2” theo tiếng Việt và giữ “GPA” thành “điểm trung bình” cho người nghe phổ thông.',
      en: '“For up to four semesters” is “trong tối đa bốn học kỳ”, not a flat “four semesters”. Use the Vietnamese decimal comma “3,2”, and gloss GPA as “điểm trung bình” for a general audience.',
    },
  },
  {
    id: 'mou-clause',
    title: {
      vi: 'Điều khoản biên bản ghi nhớ',
      en: 'MOU clause',
    },
    direction: 'vi-en',
    level: 'advanced',
    source:
      'Hai bên nhất trí trao đổi tối đa năm sinh viên mỗi năm học theo hình thức học một học kỳ tại trường đối tác; tín chỉ đạt yêu cầu sẽ được công nhận, trừ khi có thỏa thuận khác bằng văn bản.',
    suggested:
      'The two parties agree to exchange up to five students per academic year, each studying one semester at the partner institution. Credits earned satisfactorily shall be recognised unless otherwise agreed in writing.',
    notes: {
      vi: '“Tín chỉ đạt yêu cầu” dịch là “credits earned satisfactorily”, không dùng “passed credits”. “Trừ khi có thỏa thuận khác bằng văn bản” dùng công thức chuẩn “unless otherwise agreed in writing”.',
      en: '“Tín chỉ đạt yêu cầu” is “credits earned satisfactorily”, not “passed credits”. “Trừ khi có thỏa thuận khác bằng văn bản” uses the standard clause “unless otherwise agreed in writing”.',
    },
  },
  {
    id: 'schedule-change',
    title: {
      vi: 'Thông báo thay đổi lịch',
      en: 'Announcing a schedule change',
    },
    direction: 'en-vi',
    level: 'intermediate',
    source:
      'Ladies and gentlemen, please note that the afternoon session has been moved to Hall B, and the panel discussion will begin fifteen minutes later than scheduled. We apologise for any inconvenience and thank you for your patience.',
    suggested:
      'Kính thưa quý vị, xin lưu ý phiên buổi chiều đã được chuyển sang Hội trường B, và phần thảo luận sẽ bắt đầu muộn hơn dự kiến mười lăm phút. Chúng tôi xin lỗi vì sự bất tiện và cảm ơn quý vị đã thông cảm.',
    notes: {
      vi: '“Ladies and gentlemen” dùng “Kính thưa quý vị” cho thông báo tại chỗ. “Fifteen minutes later than scheduled” viết thành “muộn hơn dự kiến mười lăm phút”, tránh “15 phút sau”.',
      en: '“Ladies and gentlemen” becomes “Kính thưa quý vị” for an on-site announcement. “Fifteen minutes later than scheduled” is “muộn hơn dự kiến mười lăm phút”, not a bare “15 minutes later”.',
    },
  },
  {
    id: 'sponsor-thanks',
    title: {
      vi: 'Cảm ơn nhà tài trợ',
      en: 'Thanking a sponsor',
    },
    direction: 'vi-en',
    level: 'advanced',
    source:
      'Thay mặt ban tổ chức, tôi xin cảm ơn Quỹ Giáo dục Mở đã tài trợ 250 triệu đồng cho hội thảo, cảm ơn các tình nguyện viên đã làm việc không mệt mỏi, và cảm ơn quý vị đã ở lại đến phút cuối.',
    suggested:
      'On behalf of the organising committee, I would like to thank the Open Education Fund for its grant of 250 million dong for this seminar, our volunteers for their tireless work, and all of you for staying until the very end.',
    notes: {
      vi: '“Tài trợ 250 triệu đồng” chuyển thành danh từ “a grant of 250 million dong” để tránh lỗi “sponsor 250 million”. Giữ “dong” thay vì quy đổi, vì đây là số tiền trong văn bản gốc.',
      en: '“Tài trợ 250 triệu đồng” becomes the noun phrase “a grant of 250 million dong”, avoiding the error “sponsor 250 million”. Keep “dong” rather than converting, since the figure belongs to the source document.',
    },
  },
];
