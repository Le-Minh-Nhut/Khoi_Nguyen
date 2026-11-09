import type { Phrase } from '@/types/content';

export const phrases: Phrase[] = [
  /* ---------------------------------- Opening --------------------------------- */
  {
    id: 'opening-welcome-delegates',
    category: 'opening',
    en: 'Good morning, and a very warm welcome to each of you on behalf of the organizing committee.',
    vi: 'Kính thưa quý vị, thay mặt ban tổ chức, tôi xin gửi tới quý vị lời chào mừng nồng nhiệt nhất.',
    context: {
      en: 'Use as the first line of a plenary session, before any names are read out.',
      vi: 'Dùng ở câu mở đầu phiên toàn thể, trước khi xướng tên đại biểu.',
    },
    note: {
      en: '"Kính thưa quý vị" is the standard formal opener for a room with officials; "Chào quý vị" is too casual here.',
      vi: '"Kính thưa quý vị" là cách mở đầu trang trọng chuẩn khi có lãnh đạo; "Chào quý vị" quá suồng sã.',
    },
  },
  {
    id: 'opening-acknowledge-vip',
    category: 'opening',
    en: 'I would like to extend a particular welcome to our distinguished guests, including the Vice-Minister of Education and Training and the Rector of the host university.',
    vi: 'Tôi xin trân trọng chào mừng các vị khách quý, trong đó có Thứ trưởng Bộ Giáo dục và Đào tạo và Hiệu trưởng trường đại học chủ nhà.',
    context: {
      en: 'Use when acknowledging seated VIPs by title rather than naming each person individually.',
      vi: 'Dùng khi ghi nhận sự hiện diện của lãnh đạo theo chức danh thay vì xướng tên từng người.',
    },
    note: {
      en: 'In Vietnamese, read titles from the most senior downward; "trân trọng chào mừng" is the collocation officials expect.',
      vi: 'Tiếng Việt đọc chức danh từ cấp cao nhất xuống; "trân trọng chào mừng" là cụm từ khách mời chính thường mong đợi.',
    },
  },
  {
    id: 'opening-thank-host',
    category: 'opening',
    en: 'On behalf of the delegation, I would like to thank our hosts for their generous hospitality and meticulous preparation.',
    vi: 'Thay mặt đoàn công tác, tôi xin cảm ơn đơn vị chủ nhà đã đón tiếp chu đáo và chuẩn bị sự kiện hết sức chu tất.',
    context: {
      en: 'Use early in a visit or joint event, before the substantive agenda begins.',
      vi: 'Dùng ở đầu buổi thăm hoặc sự kiện chung, trước khi vào chương trình chính.',
    },
    note: {
      en: '"Hosts" is often rendered "quý thầy cô" or "đơn vị chủ nhà"; "chu đáo" and "chu tất" together are stronger than a literal "generous hospitality".',
      vi: '"Hosts" thường dịch là "quý thầy cô" hoặc "đơn vị chủ nhà"; dùng "chu đáo" và "chu tất" cho tự nhiên hơn lối dịch sát chữ.',
    },
  },
  {
    id: 'opening-state-event-purpose',
    category: 'opening',
    en: 'This forum brings together university leaders, admissions officers, and students to discuss how we prepare learners for international study.',
    vi: 'Diễn đàn này quy tụ lãnh đạo các trường đại học, cán bộ tuyển sinh và sinh viên cùng thảo luận cách chuẩn bị cho người học bước ra môi trường quốc tế.',
    context: {
      en: 'Use to tell the audience what the event is for before the programme is read out.',
      vi: 'Dùng để giới thiệu mục đích sự kiện trước khi đọc chương trình.',
    },
  },
  {
    id: 'opening-housekeeping',
    category: 'opening',
    en: 'Before we begin, may I ask you to switch your phones to silent, and to note that simultaneous interpretation is available on channel two.',
    vi: 'Trước khi bắt đầu, xin quý vị vui lòng để điện thoại ở chế độ im lặng và lưu ý phiên dịch song song có trên kênh hai.',
    context: {
      en: 'Use in the brief housekeeping slot after the welcome and before the first speaker.',
      vi: 'Dùng trong phần phổ biến ngắn sau lời chào mừng và trước diễn giả đầu tiên.',
    },
    note: {
      en: '"May I ask you to" is softer and more idiomatic than "please" alone; in Vietnamese, "xin quý vị vui lòng" performs the same softening.',
      vi: '"May I ask you to" lịch sự hơn "please"; tiếng Việt dùng "xin quý vị vui lòng" để tương ứng.',
    },
  },
  {
    id: 'opening-recognise-partners',
    category: 'opening',
    en: 'We are grateful for the support of our partners, without whom this programme would not have been possible.',
    vi: 'Chúng tôi trân trọng cảm ơn sự đồng hành của các đối tác, những người đã góp phần làm nên chương trình hôm nay.',
    context: {
      en: 'Use when donors, sponsors, or partner institutions are represented in the room.',
      vi: 'Dùng khi có nhà tài trợ hoặc đối tác tham dự trực tiếp.',
    },
  },
  {
    id: 'opening-first-time-together',
    category: 'opening',
    en: 'This is the first time our two institutions have met formally, and we hope it marks the beginning of a long collaboration.',
    vi: 'Đây là lần đầu tiên hai trường chúng ta gặp gỡ chính thức, và chúng tôi hy vọng đây sẽ là khởi đầu cho một mối hợp tác lâu dài.',
    context: {
      en: 'Use at a first official meeting between two institutions, after the introductions are complete.',
      vi: 'Dùng trong cuộc gặp chính thức đầu tiên giữa hai đơn vị, sau phần giới thiệu thành phần.',
    },
    note: {
      en: 'Avoid "long-term cooperation" as a straight calque of "hợp tác lâu dài"; "a long collaboration" reads more naturally in English.',
      vi: 'Tránh dịch máy "long-term cooperation"; trong tiếng Anh, "a long collaboration" tự nhiên hơn.',
    },
  },
  {
    id: 'opening-interpretation-notice',
    category: 'opening',
    en: 'Please note that the Vietnamese interpretation is a live rendering, and the English original prevails in case of any discrepancy.',
    vi: 'Xin lưu ý phần dịch tiếng Việt được thực hiện trực tiếp; trong trường hợp có khác biệt, bản tiếng Anh được dùng làm căn cứ.',
    context: {
      en: 'Use at the start of a formal session with interpreting, especially where documents will be adopted.',
      vi: 'Dùng ở đầu phiên họp trang trọng có phiên dịch, nhất là khi sẽ thông qua văn bản.',
    },
    note: {
      en: 'This is a legal-register line; "prevails" not "is more correct", and "được dùng làm căn cứ" rather than "đúng hơn".',
      vi: 'Đây là câu thuộc văn phong pháp lý; dùng "được dùng làm căn cứ", không dùng "đúng hơn".',
    },
  },

  /* -------------------------------- Introducing ------------------------------- */
  {
    id: 'introducing-keynote-by-title',
    category: 'introducing',
    en: 'It is my privilege to introduce our keynote speaker, Professor Nguyen Thi Lan, Vice-Rector for International Affairs at Hanoi University of Science.',
    vi: 'Tôi rất vinh dự được giới thiệu diễn giả chính của chúng ta, Giáo sư Nguyễn Thị Lan, Phó Hiệu trưởng phụ trách hợp tác quốc tế, Trường Đại học Khoa học Hà Nội.',
    context: {
      en: 'Use to introduce a keynote by full title and affiliation before they take the stage.',
      vi: 'Dùng để giới thiệu diễn giả chính kèm học hàm, chức danh và đơn vị trước khi mời lên sân khấu.',
    },
    note: {
      en: 'Give title, then name, then affiliation; reversing the order in Vietnamese sounds like a list rather than an introduction.',
      vi: 'Đọc học hàm, rồi tên, rồi đơn vị; đảo thứ tự sẽ nghe như đang đọc danh sách hơn là giới thiệu.',
    },
  },
  {
    id: 'introducing-read-bio',
    category: 'introducing',
    en: 'Professor Lan holds a doctorate from the University of Melbourne and has led more than twenty joint research projects across Southeast Asia.',
    vi: 'Giáo sư Lan nhận bằng tiến sĩ tại Đại học Melbourne và đã chủ trì hơn hai mươi dự án nghiên cứu hợp tác khắp Đông Nam Á.',
    context: {
      en: 'Use for the one- or two-sentence bio after the speaker has been named.',
      vi: 'Dùng cho phần tiểu sử một đến hai câu sau khi đã giới thiệu tên diễn giả.',
    },
    note: {
      en: 'Keep the bio to credentials the audience can use; "holds a doctorate from" is more spoken than "is a PhD holder".',
      vi: 'Chỉ nêu thông tin khán giả cần; "holds a doctorate from" tự nhiên hơn "is a PhD holder".',
    },
  },
  {
    id: 'introducing-affiliation-clarify',
    category: 'introducing',
    en: 'To avoid confusion, Professor Lan is speaking today in her capacity as Vice-Rector, not as a representative of the ministry.',
    vi: 'Để tránh nhầm lẫn, hôm nay Giáo sư Lan phát biểu với tư cách Phó Hiệu trưởng, không phải với tư cách đại diện Bộ.',
    context: {
      en: 'Use when a speaker holds several roles and the audience might misread which one applies.',
      vi: 'Dùng khi diễn giả đảm nhiệm nhiều chức vụ và khán giả có thể hiểu nhầm tư cách phát biểu.',
    },
    note: {
      en: '"In her capacity as" is the standard formula; Vietnamese "với tư cách" is its fixed equivalent, not "trong khả năng của".',
      vi: '"In her capacity as" là khuôn chuẩn; tiếng Việt dùng cố định "với tư cách", không dùng "trong khả năng của".',
    },
  },
  {
    id: 'introducing-panel-members',
    category: 'introducing',
    en: 'Joining us on the panel are Dr Tran Van Minh from the British Council and Ms Le Thu Ha, Head of Admissions at Da Nang University.',
    vi: 'Tham gia phiên thảo luận có Tiến sĩ Trần Văn Minh từ Hội đồng Anh và bà Lê Thu Hà, Trưởng phòng Tuyển sinh, Đại học Đà Nẵng.',
    context: {
      en: 'Use to introduce panelists in seating order before the discussion starts.',
      vi: 'Dùng giới thiệu các thành viên theo thứ tự chỗ ngồi trước khi bắt đầu thảo luận.',
    },
  },
  {
    id: 'introducing-moderator',
    category: 'introducing',
    en: 'Our discussion will be moderated by Dr Pham Quang Huy, who has chaired this forum for the past three years.',
    vi: 'Phiên thảo luận sẽ do Tiến sĩ Phạm Quang Huy điều hành, người đã chủ trì diễn đàn này trong ba năm qua.',
    context: {
      en: 'Use immediately before handing the floor to the moderator.',
      vi: 'Dùng ngay trước khi chuyển lượt điều hành cho người dẫn.',
    },
    note: {
      en: '"Moderated by" and "chaired" are not interchangeable: the moderator runs discussion, the chair runs the session.',
      vi: '"Moderated by" và "chaired" không thay thế nhau: người điều hành dẫn thảo luận, chủ tọa điều hành phiên.',
    },
  },
  {
    id: 'introducing-speaker-credential',
    category: 'introducing',
    en: 'She has advised three national scholarship programmes and is the author of a widely used guide to international admissions.',
    vi: 'Bà đã cố vấn cho ba chương trình học bổng quốc gia và là tác giả cuốn cẩm nang tuyển sinh quốc tế được sử dụng rộng rãi.',
    context: {
      en: 'Use as the credibility line when the speaker is known for practical work rather than academic titles.',
      vi: 'Dùng làm câu tạo uy tín khi diễn giả nổi bật ở kinh nghiệm thực tiễn hơn là học hàm.',
    },
  },
  {
    id: 'introducing-handover-to-speaker',
    category: 'introducing',
    en: 'Professor Lan, the floor is yours.',
    vi: 'Kính mời Giáo sư Lan phát biểu.',
    context: {
      en: 'Use as the final, short handover once the introduction is complete.',
      vi: 'Dùng làm câu chuyển lượt ngắn gọn sau khi giới thiệu xong.',
    },
    note: {
      en: '"The floor is yours" has no literal Vietnamese equivalent; "Kính mời ... phát biểu" is the phrase a Vietnamese host actually uses.',
      vi: '"The floor is yours" không có tương đương sát chữ; "Kính mời ... phát biểu" mới là câu người dẫn Việt Nam dùng.',
    },
  },
  {
    id: 'introducing-defer-questions',
    category: 'introducing',
    en: 'We will hold questions until the end of the presentation, so please note them down as we go.',
    vi: 'Chúng ta sẽ dành phần hỏi đáp đến cuối bài trình bày, vì vậy xin quý vị ghi lại câu hỏi trong khi nghe.',
    context: {
      en: 'Use right after introducing a speaker who prefers not to be interrupted.',
      vi: 'Dùng ngay sau khi giới thiệu diễn giả không muốn bị ngắt lời.',
    },
  },

  /* -------------------------------- Moderating -------------------------------- */
  {
    id: 'moderating-open-floor',
    category: 'moderating',
    en: 'Thank you, Professor. I would now like to open the floor to questions from the audience.',
    vi: 'Cảm ơn Giáo sư. Bây giờ tôi xin mở phần đặt câu hỏi cho quý vị trong hội trường.',
    context: {
      en: 'Use to switch from presentation to Q&A.',
      vi: 'Dùng khi chuyển từ phần trình bày sang phần hỏi đáp.',
    },
  },
  {
    id: 'moderating-invite-questions',
    category: 'moderating',
    en: 'If you have a question, please raise your hand and state your name and institution so we can direct the answer.',
    vi: 'Quý vị có câu hỏi xin vui lòng giơ tay và cho biết họ tên, đơn vị để chúng tôi trả lời đúng người.',
    context: {
      en: 'Use at the start of a Q&A with a large or mixed audience.',
      vi: 'Dùng khi bắt đầu phần hỏi đáp với hội trường đông hoặc nhiều thành phần.',
    },
    note: {
      en: '"State your name and institution" is the expected protocol; in Vietnamese, "cho biết họ tên, đơn vị" is the conventional pairing.',
      vi: '"State your name and institution" là nghi thức quen thuộc; tiếng Việt dùng cặp "họ tên, đơn vị".',
    },
  },
  {
    id: 'moderating-time-warning',
    category: 'moderating',
    en: 'We have about five minutes left in this session, so I would ask the remaining speakers to be brief.',
    vi: 'Phiên này còn khoảng năm phút, vì vậy tôi xin đề nghị các diễn giả còn lại trình bày ngắn gọn.',
    context: {
      en: 'Use as a soft time warning before the session ends.',
      vi: 'Dùng làm lời nhắc thời gian nhẹ nhàng trước khi phiên kết thúc.',
    },
    note: {
      en: '"I would ask" is more polite than "you must"; "xin đề nghị" carries the same softened authority in Vietnamese.',
      vi: '"I would ask" lịch sự hơn "you must"; "xin đề nghị" mang sắc thái nhắc nhở tương đương trong tiếng Việt.',
    },
  },
  {
    id: 'moderating-one-question',
    category: 'moderating',
    en: 'May I ask everyone to keep to one question each, so that as many people as possible can speak.',
    vi: 'Xin quý vị mỗi người chỉ đặt một câu hỏi để nhiều người có cơ hội phát biểu.',
    context: {
      en: 'Use when the queue is long and time is short.',
      vi: 'Dùng khi nhiều người chờ đặt câu hỏi mà thời gian hạn chế.',
    },
  },
  {
    id: 'moderating-handover-back',
    category: 'moderating',
    en: 'Thank you for that question. I will pass it to Dr Minh, and then to Ms Ha for a second perspective.',
    vi: 'Cảm ơn câu hỏi của quý vị. Tôi xin chuyển câu hỏi này tới Tiến sĩ Minh, sau đó mời bà Hà chia sẻ thêm một góc nhìn.',
    context: {
      en: 'Use to distribute a question across two panelists without losing the thread.',
      vi: 'Dùng để chia câu hỏi cho hai thành viên mà vẫn giữ mạch thảo luận.',
    },
  },
  {
    id: 'moderating-clarify-question',
    category: 'moderating',
    en: 'If I understood correctly, your question is about recognition of foreign credits, not about admission. Is that right?',
    vi: 'Nếu tôi hiểu đúng, câu hỏi của quý vị liên quan đến công nhận tín chỉ nước ngoài, không phải tuyển sinh. Có đúng vậy không ạ?',
    context: {
      en: 'Use to restate a rambling question before the panel answers it.',
      vi: 'Dùng để tóm lại câu hỏi dài trước khi hội đồng trả lời.',
    },
    note: {
      en: 'Ending with "Is that right?" is the standard check; Vietnamese adds "ạ" to keep the register courteous.',
      vi: 'Kết thúc bằng "Is that right?" là cách kiểm tra chuẩn; tiếng Việt thêm "ạ" để giữ lễ độ.',
    },
  },
  {
    id: 'moderating-wrap-qa',
    category: 'moderating',
    en: 'We have time for one final question before we close the discussion.',
    vi: 'Chúng ta còn thời gian cho một câu hỏi cuối cùng trước khi khép lại phần thảo luận.',
    context: {
      en: 'Use to signal the end of Q&A while still allowing one last intervention.',
      vi: 'Dùng để báo hiệu kết thúc hỏi đáp nhưng vẫn cho một lượt phát biểu cuối.',
    },
  },
  {
    id: 'moderating-close-panel',
    category: 'moderating',
    en: 'On behalf of the panel, thank you for a lively and constructive discussion. We will now hand back to the organizers.',
    vi: 'Thay mặt các diễn giả, cảm ơn quý vị đã có một buổi thảo luận sôi nổi và xây dựng. Chúng tôi xin trả lại chương trình cho ban tổ chức.',
    context: {
      en: 'Use at the end of a panel session when control returns to the MC.',
      vi: 'Dùng khi kết thúc phiên thảo luận và trả chương trình lại cho người dẫn.',
    },
    note: {
      en: '"Hand back to the organizers" is the meta-language of the event; avoid translating it as "return the program".',
      vi: '"Hand back to the organizers" là ngôn ngữ điều hành sự kiện; tránh dịch thành "trả lại chương trình" theo nghĩa đen.',
    },
  },

  /* -------------------------------- Partnership ------------------------------- */
  {
    id: 'partnership-propose-mou',
    category: 'partnership',
    en: 'We would like to propose a memorandum of understanding covering student exchange, joint research, and faculty mobility.',
    vi: 'Chúng tôi xin đề xuất một bản ghi nhớ hợp tác bao gồm trao đổi sinh viên, nghiên cứu chung và trao đổi giảng viên.',
    context: {
      en: 'Use to table the first formal proposal in a partnership meeting.',
      vi: 'Dùng khi đưa ra đề xuất chính thức đầu tiên trong cuộc họp hợp tác.',
    },
    note: {
      en: '"Memorandum of understanding" is normally said in full on first mention; "MOU" is acceptable afterwards.',
      vi: 'Lần đầu nên đọc đầy đủ "memorandum of understanding"; các lần sau có thể dùng "MOU".',
    },
  },
  {
    id: 'partnership-scope-discussion',
    category: 'partnership',
    en: 'Before we draft anything, perhaps we could agree on the scope: which faculties would be involved, and for how long.',
    vi: 'Trước khi soạn thảo, có lẽ chúng ta nên thống nhất phạm vi: những khoa nào tham gia và trong thời hạn bao lâu.',
    context: {
      en: 'Use to slow the meeting down before commitments are written into a draft.',
      vi: 'Dùng để giữ nhịp cuộc họp trước khi đưa cam kết vào bản dự thảo.',
    },
    note: {
      en: '"Perhaps we could" is a soft proposal, not a question; "có lẽ chúng ta nên" matches that hedging in Vietnamese.',
      vi: '"Perhaps we could" là đề xuất mềm, không phải câu hỏi; "có lẽ chúng ta nên" tương ứng sắc thái đó.',
    },
  },
  {
    id: 'partnership-existing-collaboration',
    category: 'partnership',
    en: 'Our two universities have worked together since 2015, and this agreement would consolidate what has grown informally.',
    vi: 'Hai trường chúng ta đã hợp tác từ năm 2015, và thỏa thuận này sẽ thể chế hóa những gì đã hình thành một cách tự phát.',
    context: {
      en: 'Use to frame a new agreement as continuity rather than a fresh start.',
      vi: 'Dùng để định vị thỏa thuận mới là bước tiếp nối, không phải khởi đầu mới.',
    },
  },
  {
    id: 'partnership-working-group',
    category: 'partnership',
    en: 'May I suggest that each side nominate two contact points, so that drafting does not depend on this room alone.',
    vi: 'Tôi xin đề nghị mỗi bên cử hai đầu mối liên hệ để việc soạn thảo không chỉ phụ thuộc vào cuộc họp hôm nay.',
    context: {
      en: 'Use when the meeting is close to agreeing but the drafting work still needs owners.',
      vi: 'Dùng khi cuộc họp gần đạt đồng thuận nhưng phần soạn thảo vẫn cần người phụ trách.',
    },
  },
  {
    id: 'partnership-timeline',
    category: 'partnership',
    en: 'If we can agree the text by March, we would be able to sign during the delegation visit in April.',
    vi: 'Nếu chúng ta thống nhất được nội dung trước tháng Ba, chúng ta có thể ký trong chuyến thăm của đoàn vào tháng Tư.',
    context: {
      en: 'Use to tie the drafting schedule to a fixed diplomatic or academic calendar event.',
      vi: 'Dùng để gắn tiến độ soạn thảo với một mốc cố định trong lịch đối ngoại hoặc học thuật.',
    },
    note: {
      en: 'Vietnamese prefers "thống nhất được nội dung" to a literal "agree the text"; "text" here means the agreed wording.',
      vi: 'Tiếng Việt dùng "thống nhất được nội dung" tự nhiên hơn lối dịch sát "agree the text".',
    },
  },
  {
    id: 'partnership-signing-ceremony',
    category: 'partnership',
    en: 'We are now ready for the signing. I would ask the two principals to take their places at the table.',
    vi: 'Đến đây, chúng ta chuyển sang lễ ký kết. Kính mời hai vị đại diện vào vị trí tại bàn ký.',
    context: {
      en: 'Use to move a meeting into the formal signing segment.',
      vi: 'Dùng để chuyển cuộc họp sang phần ký kết chính thức.',
    },
    note: {
      en: 'In Vietnamese protocol, "Kính mời" is expected for moving officials; a bare "please" sounds like stage direction.',
      vi: 'Theo nghi thức tiếng Việt, mời lãnh đạo phải dùng "Kính mời"; "please" trống sẽ nghe như lời nhắc sân khấu.',
    },
  },
  {
    id: 'partnership-confirm-next-steps',
    category: 'partnership',
    en: 'To confirm, we will send the first draft by the end of next week, and you will return comments within ten working days.',
    vi: 'Xin xác nhận lại: chúng tôi sẽ gửi bản dự thảo đầu tiên trước cuối tuần sau, và quý vị phản hồi trong vòng mười ngày làm việc.',
    context: {
      en: 'Use in the final minutes of a meeting to lock in responsibilities out loud.',
      vi: 'Dùng ở những phút cuối cuộc họp để chốt trách nhiệm thành lời.',
    },
    note: {
      en: 'Start with "To confirm" so the interpreter and the minute-taker both hear the commitment clearly.',
      vi: 'Mở đầu bằng "To confirm" để phiên dịch và người ghi biên bản cùng nắm rõ cam kết.',
    },
  },
  {
    id: 'partnership-follow-up-contact',
    category: 'partnership',
    en: 'Please direct any follow-up correspondence to our international office, and copy me so that nothing is missed.',
    vi: 'Mọi trao đổi tiếp theo xin gửi về phòng hợp tác quốc tế của chúng tôi, đồng thời gửi bản sao cho tôi để không bị bỏ sót.',
    context: {
      en: 'Use when closing a partnership meeting and assigning a channel for later work.',
      vi: 'Dùng khi kết thúc cuộc họp hợp tác và chỉ định đầu mối trao đổi tiếp theo.',
    },
  },

  /* ------------------------------- Study abroad ------------------------------ */
  {
    id: 'study-abroad-admission-requirements',
    category: 'study-abroad',
    en: 'For undergraduate entry, applicants need a high school diploma, a recognised English certificate, and a statement of purpose.',
    vi: 'Đối với bậc đại học, ứng viên cần bằng tốt nghiệp trung học phổ thông, chứng chỉ tiếng Anh được công nhận và bài luận mục tiêu học tập.',
    context: {
      en: 'Use when explaining the basic application package to students or parents.',
      vi: 'Dùng khi giải thích hồ sơ cơ bản cho sinh viên hoặc phụ huynh.',
    },
    note: {
      en: '"Statement of purpose" is not "personal statement"; the two are different documents in most applications.',
      vi: '"Statement of purpose" khác "personal statement"; đây là hai loại giấy tờ khác nhau trong phần lớn hồ sơ.',
    },
  },
  {
    id: 'study-abroad-tuition-living-costs',
    category: 'study-abroad',
    en: 'Tuition is around eighteen thousand dollars a year, and living costs, including accommodation, add roughly twelve thousand more.',
    vi: 'Học phí khoảng mười tám nghìn đô-la một năm, còn chi phí sinh hoạt, gồm cả chỗ ở, thêm khoảng mười hai nghìn đô-la.',
    context: {
      en: 'Use when a family asks for a realistic total rather than tuition alone.',
      vi: 'Dùng khi gia đình hỏi tổng chi phí thực tế thay vì chỉ học phí.',
    },
    note: {
      en: 'Always say whether figures are per year and in which currency; "đô-la" alone is ambiguous between USD and AUD.',
      vi: 'Luôn nói rõ đơn vị tính theo năm và loại tiền tệ; "đô-la" không rõ là USD hay AUD.',
    },
  },
  {
    id: 'study-abroad-scholarship-coverage',
    category: 'study-abroad',
    en: 'The scholarship covers tuition and a monthly stipend, but it does not cover flights, insurance, or visa fees.',
    vi: 'Học bổng chi trả học phí và sinh hoạt phí hằng tháng, nhưng không bao gồm vé máy bay, bảo hiểm và lệ phí thị thực.',
    context: {
      en: 'Use when clarifying exactly what a scholarship does and does not pay for.',
      vi: 'Dùng khi làm rõ học bổng chi trả và không chi trả những khoản nào.',
    },
    note: {
      en: 'State exclusions explicitly; Vietnamese applicants often assume "full scholarship" includes airfare.',
      vi: 'Phải nêu rõ các khoản loại trừ; ứng viên Việt Nam thường hiểu "học bổng toàn phần" là bao gồm vé máy bay.',
    },
  },
  {
    id: 'study-abroad-application-timeline',
    category: 'study-abroad',
    en: 'Applications open in September and close in December, and offers are usually released by the end of March.',
    vi: 'Hồ sơ nhận từ tháng Chín đến hết tháng Mười Hai, và kết quả thường được công bố trước cuối tháng Ba.',
    context: {
      en: 'Use to give a simple annual timeline in a consultation.',
      vi: 'Dùng để cung cấp lộ trình thời gian hằng năm trong buổi tư vấn.',
    },
  },
  {
    id: 'study-abroad-language-proficiency',
    category: 'study-abroad',
    en: 'An IELTS score of 6.5 is the general requirement, though some departments may ask for 7.0 in the writing component.',
    vi: 'Yêu cầu chung là IELTS 6.5, tuy nhiên một số khoa có thể yêu cầu 7.0 ở kỹ năng viết.',
    context: {
      en: 'Use when explaining language thresholds, especially where programmes differ.',
      vi: 'Dùng khi giải thích ngưỡng ngoại ngữ, nhất là khi các ngành có yêu cầu khác nhau.',
    },
    note: {
      en: '"Component" means a skill section of the test; avoid translating it as "thành phần hồ sơ".',
      vi: '"Component" là kỹ năng của bài thi; không dịch thành "thành phần hồ sơ".',
    },
  },
  {
    id: 'study-abroad-visa-process',
    category: 'study-abroad',
    en: 'Once you hold an unconditional offer, the visa process takes roughly eight weeks, so you should not book flights before it is granted.',
    vi: 'Khi đã có thư mời nhập học không điều kiện, quá trình xin thị thực mất khoảng tám tuần, vì vậy quý vị không nên đặt vé trước khi được cấp.',
    context: {
      en: 'Use when advising on sequencing between admission and travel.',
      vi: 'Dùng khi tư vấn thứ tự giữa nhập học và di chuyển.',
    },
  },
  {
    id: 'study-abroad-credit-transfer',
    category: 'study-abroad',
    en: 'Courses completed at a partner institution may be credited, but each syllabus must be assessed individually.',
    vi: 'Các học phần đã hoàn thành tại trường đối tác có thể được công nhận tín chỉ, nhưng phải xét riêng từng đề cương.',
    context: {
      en: 'Use when a student asks whether previous study will shorten their degree.',
      vi: 'Dùng khi sinh viên hỏi liệu chương trình cũ có được rút ngắn thời gian học không.',
    },
  },
  {
    id: 'study-abroad-accommodation',
    category: 'study-abroad',
    en: 'First-year students are usually guaranteed a place in university housing, but they should apply as soon as the offer is accepted.',
    vi: 'Sinh viên năm nhất thường được đảm bảo chỗ ở trong ký túc xá của trường, nhưng cần đăng ký ngay khi nhận thư mời.',
    context: {
      en: 'Use when parents ask about where their child will live in the first year.',
      vi: 'Dùng khi phụ huynh hỏi con sẽ ở đâu trong năm đầu.',
    },
    note: {
      en: '"University housing" is broader than "dormitory"; in Vietnamese, "ký túc xá" is acceptable only if that is what is actually offered.',
      vi: '"University housing" rộng hơn "dormitory"; chỉ dùng "ký túc xá" nếu đúng là hình thức được cung cấp.',
    },
  },

  /* --------------------------------- Closing --------------------------------- */
  {
    id: 'closing-summary',
    category: 'closing',
    en: 'To sum up, we heard three priorities: clearer credit recognition, better funding information, and earlier engagement with schools.',
    vi: 'Tóm lại, chúng ta đã nghe ba ưu tiên: công nhận tín chỉ rõ ràng hơn, thông tin tài trợ tốt hơn và phối hợp với các trường phổ thông sớm hơn.',
    context: {
      en: 'Use to close a discussion by naming the points that will be carried forward.',
      vi: 'Dùng để kết thúc thảo luận bằng cách nêu những điểm sẽ được tiếp tục xử lý.',
    },
  },
  {
    id: 'closing-thank-participants',
    category: 'closing',
    en: 'Thank you all for your attention and for the questions that made this a genuine exchange rather than a series of speeches.',
    vi: 'Cảm ơn quý vị đã chú ý lắng nghe và đặt câu hỏi, để buổi này thực sự là một cuộc trao đổi chứ không chỉ là các bài phát biểu.',
    context: {
      en: 'Use near the end of an event, after the last Q&A.',
      vi: 'Dùng gần cuối sự kiện, sau phần hỏi đáp cuối cùng.',
    },
  },
  {
    id: 'closing-thank-organizers',
    category: 'closing',
    en: 'Our thanks go to the organizing team and the interpreters, whose work was invisible when it went well and indispensable throughout.',
    vi: 'Xin cảm ơn ban tổ chức và các phiên dịch viên, những người mà khi mọi việc suôn sẻ thì công sức thường không được nhìn thấy, nhưng luôn không thể thiếu.',
    context: {
      en: 'Use in the closing remarks of a conference with interpretation or heavy logistics.',
      vi: 'Dùng trong lời bế mạc hội nghị có phiên dịch hoặc công tác tổ chức phức tạp.',
    },
    note: {
      en: 'A light compliment to interpreters is conventional; avoid drawing attention to errors in the same breath.',
      vi: 'Khen nhẹ phiên dịch viên là thông lệ; tránh vừa khen vừa nhắc lỗi trong cùng một câu.',
    },
  },
  {
    id: 'closing-group-photo',
    category: 'closing',
    en: 'Before you leave, we would like to invite all speakers and guests to the front for a group photograph.',
    vi: 'Trước khi ra về, chúng tôi xin mời toàn thể diễn giả và khách quý lên phía trước để chụp ảnh lưu niệm.',
    context: {
      en: 'Use immediately after the formal programme ends, before guests disperse.',
      vi: 'Dùng ngay sau khi chương trình chính kết thúc, trước khi khách ra về.',
    },
    note: {
      en: '"Group photograph" is the formal term; "chụp ảnh lưu niệm" is the fixed Vietnamese phrase, not "chụp ảnh nhóm".',
      vi: '"Group photograph" là cách nói trang trọng; tiếng Việt dùng cố định "chụp ảnh lưu niệm", không dùng "chụp ảnh nhóm".',
    },
  },
  {
    id: 'closing-close-ceremony',
    category: 'closing',
    en: 'Ladies and gentlemen, that concludes our programme for today. May I wish you all a safe journey home.',
    vi: 'Kính thưa quý vị, chương trình của chúng ta hôm nay đến đây là kết thúc. Kính chúc quý vị thượng lộ bình an.',
    context: {
      en: 'Use as the final announcement of a formal ceremony.',
      vi: 'Dùng làm lời tuyên bố kết thúc cuối cùng của một lễ chính thức.',
    },
    note: {
      en: '"Ladies and gentlemen" maps to "Kính thưa quý vị"; "thượng lộ bình an" is the idiom for a formal farewell, not "đi về an toàn".',
      vi: '"Ladies and gentlemen" tương ứng "Kính thưa quý vị"; dùng thành ngữ "thượng lộ bình an", không dùng "đi về an toàn".',
    },
  },
  {
    id: 'closing-next-steps-announcement',
    category: 'closing',
    en: 'The presentations will be circulated by email next week, and registration for the follow-up workshop opens on Monday.',
    vi: 'Tài liệu trình bày sẽ được gửi qua email vào tuần sau, và đăng ký tham dự hội thảo tiếp theo sẽ mở vào thứ Hai.',
    context: {
      en: 'Use to leave the audience with one concrete action after the event.',
      vi: 'Dùng để khán giả có một việc cụ thể cần làm sau sự kiện.',
    },
  },
  {
    id: 'closing-thank-host-institution',
    category: 'closing',
    en: 'Finally, our sincere thanks to the host university, whose staff made this event run so smoothly.',
    vi: 'Cuối cùng, xin chân thành cảm ơn trường đại học chủ nhà, nơi đội ngũ cán bộ đã giúp sự kiện diễn ra suôn sẻ.',
    context: {
      en: 'Use as the last institutional thank-you before the final farewell.',
      vi: 'Dùng làm lời cảm ơn đơn vị cuối cùng trước lời chào kết thúc.',
    },
  },
  {
    id: 'closing-stay-connected',
    category: 'closing',
    en: 'Please do stay in touch with our international office, and we hope to welcome you to our campus in the coming year.',
    vi: 'Rất mong quý vị tiếp tục liên hệ với phòng hợp tác quốc tế của chúng tôi, và hy vọng sẽ được đón quý vị đến thăm trường trong năm tới.',
    context: {
      en: 'Use at the end of a recruitment or partnership event to keep the channel open.',
      vi: 'Dùng ở cuối sự kiện tuyển sinh hoặc hợp tác để giữ đầu mối liên lạc.',
    },
  },
];
