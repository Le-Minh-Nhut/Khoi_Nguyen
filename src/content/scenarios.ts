import type { Scenario } from '@/types/content';

export const scenarios: Scenario[] = [
  {
    slug: 'university-partnership-meeting',
    title: {
      en: 'University Partnership Meeting',
      vi: 'Cuộc họp thiết lập quan hệ hợp tác đại học',
    },
    setting: {
      en: 'A ninety-minute meeting in the boardroom of the Vietnamese host university, with six delegates on each side and consecutive interpretation throughout.',
      vi: 'Cuộc họp chín mươi phút tại phòng họp của trường đại học chủ nhà Việt Nam, mỗi bên sáu đại biểu, phiên dịch nối tiếp trong suốt cuộc họp.',
    },
    roles: [
      { en: 'Head of International Relations', vi: 'Trưởng phòng Hợp tác quốc tế' },
      { en: 'Dean of International Programs (partner university)', vi: 'Trưởng khoa Chương trình quốc tế (trường đối tác)' },
      { en: 'Program Coordinator', vi: 'Điều phối viên chương trình' },
      { en: 'Interpreter', vi: 'Phiên dịch viên' },
    ],
    overview: {
      en: 'The two universities are negotiating a 2+2 articulation agreement that would let students complete two years at home and two abroad. Credit recognition and the tuition split are unresolved, and the partner side can only commit up to a fixed sum without its Provost. A wrong figure or a softened refusal could commit a university to costs it cannot carry.',
      vi: 'Hai trường đang đàm phán thỏa thuận liên kết 2+2, cho phép sinh viên học hai năm tại trường nhà rồi hai năm ở nước ngoài. Việc công nhận tín chỉ và tỷ lệ phân chia học phí vẫn chưa ngã ngũ, trong khi phía đối tác chỉ được cam kết tới một mức kinh phí nhất định nếu chưa có ý kiến của Hiệu trưởng phụ trách học thuật. Một con số sai hoặc một lời từ chối bị làm nhẹ đi có thể khiến trường phải gánh khoản chi vượt thẩm quyền.',
    },
    objectives: [
      {
        en: 'Confirm the scope of each delegation’s authority before substantive negotiation begins.',
        vi: 'Xác nhận thẩm quyền của mỗi đoàn trước khi bước vào đàm phán nội dung.',
      },
      {
        en: 'Render every financial figure with its unit (per cohort, per year) and preserve reservations.',
        vi: 'Chuyển đạt mọi con số tài chính kèm đơn vị tính (theo khóa, theo năm) và giữ nguyên các bảo lưu.',
      },
      {
        en: 'Clarify how credit transfer depends on senate approval without weakening the commitment.',
        vi: 'Làm rõ việc công nhận tín chỉ phụ thuộc vào phê duyệt của hội đồng học thuật mà không làm yếu cam kết.',
      },
      {
        en: 'Secure a clear next step: who drafts the annex, in which languages, and by when.',
        vi: 'Chốt bước tiếp theo: ai soạn phụ lục, bằng những ngôn ngữ nào và trong thời hạn nào.',
      },
    ],
    terms: [
      { en: 'Memorandum of Understanding', vi: 'Biên bản ghi nhớ hợp tác', slug: 'memorandum-of-understanding' },
      { en: 'Articulation agreement', vi: 'Thỏa thuận liên kết đào tạo' },
      { en: 'Credit transfer', vi: 'Công nhận và chuyển đổi tín chỉ', slug: 'credit-transfer' },
      { en: 'Double degree', vi: 'Chương trình bằng kép' },
      { en: 'Tuition fee split', vi: 'Tỷ lệ phân chia học phí' },
      { en: 'Academic transcript', vi: 'Bảng điểm học tập' },
    ],
    dialogue: [
      {
        speaker: { en: 'Dr. Nguyen Thi Lan', vi: 'TS. Nguyễn Thị Lan' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Thank you for making the trip. Before we go through the agenda, may I confirm one thing — is your delegation authorised to discuss the 2+2 articulation itself, not just a general MOU?',
        vi: 'Cảm ơn quý vị đã thu xếp thời gian đến. Trước khi đi vào chương trình làm việc, tôi xin xác nhận một điểm: đoàn quý vị có thẩm quyền thảo luận chính thỏa thuận liên kết 2+2, chứ không chỉ biên bản ghi nhớ chung, đúng không ạ?',
        note: {
          en: '“Authorised” is turned into a confirmation question with “đúng không ạ” so the challenge lands as protocol, not distrust. “2+2” stays untranslated because it is a programme code both sides already use.',
          vi: '“Authorised” được chuyển thành câu hỏi xác nhận với “đúng không ạ” để lời chất vấn mang tính thủ tục chứ không thành sự nghi kỵ. “2+2” giữ nguyên vì đây là mã chương trình cả hai bên đều dùng.',
        },
      },
      {
        speaker: { en: 'Professor Michael Grant', vi: 'GS. Michael Grant' },
        role: { en: 'Partner university', vi: 'Trường đối tác' },
        en: 'Yes, within limits. We can negotiate the academic content today, but any commitment above fifty thousand US dollars still goes to our Provost’s office.',
        vi: 'Vâng, trong giới hạn cho phép. Hôm nay chúng tôi có thể đàm phán nội dung học thuật, nhưng mọi cam kết vượt quá năm mươi nghìn đô la Mỹ vẫn phải trình văn phòng Hiệu trưởng phụ trách học thuật của trường.',
        note: {
          en: '“Provost” has no exact Vietnamese equivalent; “Hiệu trưởng phụ trách học thuật” is the closest functional rendering and is safer than leaving the English title unexplained.',
          vi: '“Provost” không có tương đương chính xác trong tiếng Việt; “Hiệu trưởng phụ trách học thuật” là cách gọi theo chức năng gần nhất và an toàn hơn là để nguyên chức danh tiếng Anh mà không giải thích.',
        },
      },
      {
        speaker: { en: 'Ms. Tran Thu Ha', vi: 'Bà Trần Thu Hà' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Sorry to cut in — when you say fifty thousand, is that per cohort or per year?',
        vi: 'Xin lỗi vì đã ngắt lời — khi ngài nói năm mươi nghìn, ý là tính theo mỗi khóa hay mỗi năm ạ?',
        note: {
          en: '“Sorry to cut in” is kept as an explicit apology (“Xin lỗi vì đã ngắt lời”) because the interruption is a floor-taking move that must remain audible in the record.',
          vi: '“Sorry to cut in” được giữ thành lời xin lỗi rõ ràng (“Xin lỗi vì đã ngắt lời”) vì đây là hành động giành quyền phát biểu, cần hiện rõ trong biên bản.',
        },
      },
      {
        speaker: { en: 'Professor Michael Grant', vi: 'GS. Michael Grant' },
        role: { en: 'Partner university', vi: 'Trường đối tác' },
        en: 'Per cohort, and only for the first two cohorts. After that we would revisit the split.',
        vi: 'Tính theo mỗi khóa, và chỉ áp dụng cho hai khóa đầu tiên. Sau đó chúng tôi sẽ xem xét lại tỷ lệ phân chia.',
      },
      {
        speaker: { en: 'Dr. Nguyen Thi Lan', vi: 'TS. Nguyễn Thị Lan' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Understood. Our draft gives sixty-forty in year one and moves to fifty-fifty from the 2027 intake. We could accept sixty-forty for the first cohort, provided transcripts reach us by 15 March.',
        vi: 'Đã rõ. Dự thảo của chúng tôi để tỷ lệ sáu mươi – bốn mươi trong năm đầu và chuyển sang năm mươi – năm mươi từ kỳ tuyển sinh 2027. Chúng tôi có thể chấp nhận sáu mươi – bốn mươi cho khóa đầu tiên, với điều kiện bảng điểm phải đến tay chúng tôi trước ngày 15 tháng 3.',
        note: {
          en: 'Ratios are read as “sáu mươi – bốn mươi” rather than “60/40”, and the date is spoken in full Vietnamese order (“ngày 15 tháng 3”) because the condition is contractual.',
          vi: 'Tỷ lệ được đọc thành “sáu mươi – bốn mươi” thay vì “60/40”, và ngày được đọc đầy đủ theo trật tự tiếng Việt (“ngày 15 tháng 3”) vì đây là điều kiện có tính hợp đồng.',
        },
      },
      {
        speaker: { en: 'Professor Michael Grant', vi: 'GS. Michael Grant' },
        role: { en: 'Partner university', vi: 'Trường đối tác' },
        en: 'That is workable for year one, but I have to be frank: we cannot recognise your first-year credits until our senate approves the mapping, and the senate does not meet again until June.',
        vi: 'Điều đó khả thi cho năm đầu, nhưng tôi phải nói thẳng: chúng tôi chưa thể công nhận tín chỉ năm nhất của quý trường cho đến khi hội đồng học thuật của chúng tôi phê duyệt bảng đối chiếu, mà hội đồng phải đến tháng Sáu mới họp lại.',
        note: {
          en: '“I have to be frank” is rendered as “tôi phải nói thẳng”, keeping the warning force; softening it to “xin lưu ý” would hide a real condition on the deal.',
          vi: '“I have to be frank” được dịch là “tôi phải nói thẳng” để giữ nguyên sức cảnh báo; nếu làm nhẹ thành “xin lưu ý” thì điều kiện thực sự của thỏa thuận sẽ bị che khuất.',
        },
      },
      {
        speaker: { en: 'Ms. Tran Thu Ha', vi: 'Bà Trần Thu Hà' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Then may we sign the MOU now and attach the credit mapping as an annex, to be approved in June?',
        vi: 'Vậy chúng ta có thể ký biên bản ghi nhớ ngay bây giờ và đính kèm bảng đối chiếu tín chỉ như một phụ lục, để được phê duyệt vào tháng Sáu, được không ạ?',
      },
      {
        speaker: { en: 'Dr. Nguyen Thi Lan', vi: 'TS. Nguyễn Thị Lan' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Yes. I will ask legal to prepare both language versions by Friday, and we sign in the rectory at nine on the twenty-sixth.',
        vi: 'Được. Tôi sẽ đề nghị bộ phận pháp chế chuẩn bị cả hai bản ngôn ngữ trước thứ Sáu, và chúng ta sẽ ký tại phòng khánh tiết vào chín giờ ngày hai mươi sáu.',
        note: {
          en: '“Rectory” is rendered “phòng khánh tiết”, the room Vietnamese universities actually use for signing ceremonies, rather than a literal “nhà xứ”.',
          vi: '“Rectory” được dịch là “phòng khánh tiết” — nơi các trường đại học Việt Nam thực tế dùng để tổ chức lễ ký — thay vì dịch sát thành “nhà xứ”.',
        },
      },
    ],
    tips: [
      {
        en: 'Render “Provost” by function (“Hiệu trưởng phụ trách học thuật”), then say it once in English if the counterpart looks uncertain — do not invent a Vietnamese rank.',
        vi: 'Dịch “Provost” theo chức năng (“Hiệu trưởng phụ trách học thuật”), sau đó nhắc lại một lần bằng tiếng Anh nếu đối phương tỏ ra chưa rõ — không tự đặt ra một chức danh tiếng Việt mới.',
      },
      {
        en: 'Never drop the unit on money: “fifty thousand per cohort” must carry “theo mỗi khóa”; a bare number invites a budget error.',
        vi: 'Không bao giờ bỏ đơn vị tính khi nói về tiền: “fifty thousand per cohort” phải kèm “theo mỗi khóa”; một con số trần dễ dẫn đến sai sót ngân sách.',
      },
      {
        en: 'Keep conditions (“provided”, “subject to senate approval”) in the same position in the sentence; moving them to the end makes them sound optional.',
        vi: 'Giữ các điều kiện (“provided”, “subject to senate approval”) đúng vị trí trong câu; đẩy chúng xuống cuối câu sẽ khiến chúng nghe như tùy chọn.',
      },
      {
        en: 'When someone interrupts, translate the apology too — the record must show who took the floor and how.',
        vi: 'Khi có người ngắt lời, hãy dịch cả lời xin lỗi — biên bản cần thể hiện ai đã giành quyền phát biểu và theo cách nào.',
      },
    ],
  },
  {
    slug: 'study-abroad-consultation',
    title: {
      en: 'Study Abroad Consultation',
      vi: 'Tư vấn du học',
    },
    setting: {
      en: 'A forty-five-minute one-to-one consultation at an education agency office, with the student, one parent, and the counsellor seated around a table.',
      vi: 'Buổi tư vấn trực tiếp bốn mươi lăm phút tại văn phòng công ty du học, với sinh viên, một phụ huynh và chuyên viên tư vấn ngồi quanh bàn.',
    },
    roles: [
      { en: 'Prospective student', vi: 'Sinh viên dự tuyển' },
      { en: 'Parent', vi: 'Phụ huynh' },
      { en: 'Education counsellor', vi: 'Chuyên viên tư vấn du học' },
    ],
    overview: {
      en: 'A student with a conditional offer from a UK university is deciding whether to retake IELTS or enrol in a pre-sessional English course. The family is weighing a £4,800 cost against the risk of missing the July intake. The counsellor must be precise about money and honest about timing without pushing the family into a decision.',
      vi: 'Một sinh viên có thư mời nhập học có điều kiện từ một trường đại học Anh đang cân nhắc giữa thi lại IELTS và theo học khóa tiếng Anh dự bị. Gia đình phải cân nhắc khoản chi 4.800 bảng Anh với nguy cơ lỡ kỳ nhập học tháng Bảy. Chuyên viên tư vấn cần nói chính xác về tiền và trung thực về thời hạn, mà không thúc ép gia đình quyết định.',
    },
    objectives: [
      {
        en: 'Explain the gap between the student’s scores and the entry requirement without sounding like a rejection.',
        vi: 'Giải thích khoảng cách giữa điểm số của sinh viên và yêu cầu đầu vào mà không khiến câu nói giống một lời từ chối.',
      },
      {
        en: 'Separate tuition, pre-sessional fees, and living costs so the family can budget.',
        vi: 'Tách bạch học phí, phí khóa dự bị và chi phí sinh hoạt để gia đình có thể lập dự toán.',
      },
      {
        en: 'State clearly that a June test result may arrive too late for the July intake.',
        vi: 'Nói rõ rằng kết quả thi tháng Sáu có thể về quá muộn cho kỳ nhập học tháng Bảy.',
      },
      {
        en: 'Agree a fallback plan and a date for the deposit decision.',
        vi: 'Thống nhất phương án dự phòng và thời điểm quyết định đặt cọc.',
      },
    ],
    terms: [
      { en: 'Conditional offer', vi: 'Thư mời nhập học có điều kiện' },
      { en: 'Pre-sessional English', vi: 'Khóa tiếng Anh dự bị' },
      { en: 'Deposit', vi: 'Tiền đặt cọc' },
      { en: 'Tuition fee', vi: 'Học phí' },
      { en: 'Intake', vi: 'Kỳ nhập học' },
      { en: 'Student visa', vi: 'Thị thực du học' },
      { en: 'Accommodation', vi: 'Chỗ ở' },
    ],
    dialogue: [
      {
        speaker: { en: 'Education counsellor', vi: 'Chuyên viên tư vấn du học' },
        role: { en: 'Agency', vi: 'Công ty tư vấn du học' },
        en: 'Your IELTS is six point five overall, but your writing is five point five, and Leeds asks for six point zero in every band.',
        vi: 'Điểm IELTS tổng của em là 6.5, nhưng kỹ năng Viết chỉ 5.5, trong khi Leeds yêu cầu 6.0 ở từng kỹ năng.',
        note: {
          en: 'Scores are read in full (“six point five”) rather than digit by digit, and “band” becomes “kỹ năng” because Vietnamese families know the four skills, not the test’s internal jargon.',
          vi: 'Điểm được đọc đầy đủ (“six point five”) thay vì đọc từng chữ số, và “band” được dịch là “kỹ năng” vì phụ huynh Việt Nam quen với bốn kỹ năng hơn là thuật ngữ nội bộ của bài thi.',
        },
      },
      {
        speaker: { en: 'Prospective student', vi: 'Sinh viên dự tuyển' },
        role: { en: 'Student', vi: 'Phía sinh viên' },
        en: 'Does that mean I have to retake the test, or can I take their pre-sessional English instead?',
        vi: 'Vậy là em phải thi lại, hay có thể học khóa tiếng Anh dự bị của trường thay thế ạ?',
      },
      {
        speaker: { en: 'Education counsellor', vi: 'Chuyên viên tư vấn du học' },
        role: { en: 'Agency', vi: 'Công ty tư vấn du học' },
        en: 'The ten-week pre-sessional would cover it. It starts on 15 July and costs four thousand eight hundred pounds, not including accommodation.',
        vi: 'Khóa dự bị mười tuần sẽ đáp ứng được yêu cầu. Khóa bắt đầu ngày 15 tháng 7, học phí 4.800 bảng Anh, chưa bao gồm chỗ ở.',
      },
      {
        speaker: { en: 'Parent', vi: 'Phụ huynh' },
        role: { en: 'Student’s family', vi: 'Gia đình sinh viên' },
        en: 'Sorry — four thousand eight hundred pounds just for English? That is on top of the tuition?',
        vi: 'Xin lỗi — 4.800 bảng Anh chỉ để học tiếng Anh thôi ạ? Khoản đó nằm ngoài học phí chính khóa phải không?',
        note: {
          en: 'The interruption is kept as spoken (“Xin lỗi —”) instead of being smoothed into a normal question, because the parent’s concern is part of what the counsellor must answer.',
          vi: 'Lời ngắt lời được giữ nguyên như khi nói (“Xin lỗi —”) thay vì làm mượt thành câu hỏi thông thường, vì chính sự lo lắng của phụ huynh là điều chuyên viên tư vấn phải giải đáp.',
        },
      },
      {
        speaker: { en: 'Education counsellor', vi: 'Chuyên viên tư vấn du học' },
        role: { en: 'Agency', vi: 'Công ty tư vấn du học' },
        en: 'Yes, it is separate, but it is not wasted: students who pass it do not need to retake IELTS for the degree.',
        vi: 'Đúng, đây là khoản riêng, nhưng không hề lãng phí: sinh viên đạt khóa này sẽ không phải thi lại IELTS để vào chương trình chính khóa.',
      },
      {
        speaker: { en: 'Prospective student', vi: 'Sinh viên dự tuyển' },
        role: { en: 'Student', vi: 'Phía sinh viên' },
        en: 'And if I do retake and get six point zero, I could skip it and save the money?',
        vi: 'Và nếu em thi lại và đạt 6.0 thì có thể bỏ khóa dự bị và tiết kiệm khoản đó ạ?',
      },
      {
        speaker: { en: 'Education counsellor', vi: 'Chuyên viên tư vấn du học' },
        role: { en: 'Agency', vi: 'Công ty tư vấn du học' },
        en: 'In theory, yes, but I have to be honest with you: a result on 20 June may come too late for the July intake. The safer route is to hold both options until mid-May.',
        vi: 'Về lý thuyết là được, nhưng em cần biết sự thật: kết quả thi ngày 20 tháng 6 có thể về quá muộn cho kỳ nhập học tháng Bảy. Cách an toàn hơn là giữ cả hai phương án đến giữa tháng Năm.',
        note: {
          en: '“I have to be honest with you” becomes “em cần biết sự thật” — direct but not harsh; “safer route” is rendered as “cách an toàn hơn” so it reads as advice, not a warning.',
          vi: '“I have to be honest with you” được dịch thành “em cần biết sự thật” — thẳng thắn nhưng không nặng nề; “safer route” thành “cách an toàn hơn” để nghe như lời khuyên chứ không phải cảnh báo.',
        },
      },
      {
        speaker: { en: 'Parent', vi: 'Phụ huynh' },
        role: { en: 'Student’s family', vi: 'Gia đình sinh viên' },
        en: 'Then please book the pre-sessional as a backup, but do not pay the deposit until we have seen the Leeds offer letter in writing.',
        vi: 'Vậy nhờ chị giữ suất khóa dự bị như phương án dự phòng, nhưng đừng đóng tiền đặt cọc cho đến khi chúng tôi được xem thư mời nhập học của Leeds bằng văn bản.',
        note: {
          en: '“Book as a backup” is rendered “giữ suất … như phương án dự phòng”, which is what the agency can actually do; “in writing” becomes “bằng văn bản” to preserve the legal force.',
          vi: '“Book as a backup” được dịch là “giữ suất … như phương án dự phòng” — đúng việc công ty có thể làm; “in writing” thành “bằng văn bản” để giữ hiệu lực pháp lý.',
        },
      },
    ],
    tips: [
      {
        en: 'Read IELTS scores consistently: “six point five overall” then “six point zero in every band”; switching between digits and words causes families to mishear requirements.',
        vi: 'Đọc điểm IELTS nhất quán: “six point five overall” rồi “six point zero in every band”; đổi qua lại giữa chữ số và chữ sẽ khiến phụ huynh nghe nhầm yêu cầu.',
      },
      {
        en: 'Do not convert pounds into dong unless asked — a rough conversion invites the family to budget on a rate that will change before payment.',
        vi: 'Không tự quy đổi bảng Anh sang đồng trừ khi được yêu cầu — tỷ giá ước lượng sẽ khiến gia đình lập dự toán theo mức sẽ thay đổi trước ngày thanh toán.',
      },
      {
        en: 'Render “conditional offer” as “thư mời nhập học có điều kiện”, never “thư chấp nhận”, which sounds unconditional.',
        vi: 'Dịch “conditional offer” là “thư mời nhập học có điều kiện”, tuyệt đối không dùng “thư chấp nhận” vì nghe như đã chắc chắn.',
      },
      {
        en: 'When a parent interrupts, translate the interruption before answering; the counsellor needs the full concern, not your paraphrase.',
        vi: 'Khi phụ huynh ngắt lời, hãy dịch lời ngắt lời trước khi trả lời; chuyên viên tư vấn cần nghe trọn nỗi băn khoăn, không phải bản tóm tắt của bạn.',
      },
    ],
  },
  {
    slug: 'international-education-seminar',
    title: {
      en: 'International Education Seminar',
      vi: 'Hội thảo giáo dục quốc tế',
    },
    setting: {
      en: 'A half-day plenary seminar in a university auditorium, with a keynote address, a moderated Q&A, and simultaneous interpretation into headsets.',
      vi: 'Hội thảo toàn thể kéo dài nửa ngày tại hội trường đại học, gồm bài phát biểu chính, phần hỏi đáp có điều hành và phiên dịch song song qua tai nghe.',
    },
    roles: [
      { en: 'Moderator', vi: 'Người điều hành' },
      { en: 'Keynote speaker', vi: 'Diễn giả chính' },
      { en: 'Audience member (lecturer)', vi: 'Khán giả (giảng viên)' },
      { en: 'Interpreter', vi: 'Phiên dịch viên' },
    ],
    overview: {
      en: 'A visiting scholar is presenting completion data for joint programmes, and the numbers are uncomfortable for the host institutions. The interpreter must keep criticism intact while the moderator protects the speaker’s time, and an audience question about a low completion rate could easily turn into a confrontation if the figures are blurred.',
      vi: 'Một học giả khách mời đang trình bày dữ liệu về tỷ lệ hoàn thành của các chương trình liên kết, và những con số này không mấy dễ chịu cho các trường chủ nhà. Phiên dịch viên phải giữ nguyên tính phê bình trong khi người điều hành bảo vệ thời lượng của diễn giả; một câu hỏi từ khán giả về tỷ lệ hoàn thành thấp rất dễ thành đối chất nếu các con số bị làm mờ.',
    },
    objectives: [
      {
        en: 'Deliver the keynote’s statistics with their exact scope and caveats.',
        vi: 'Chuyển đạt các số liệu của bài phát biểu chính kèm đúng phạm vi và lưu ý của chúng.',
      },
      {
        en: 'Handle an audience interruption without losing the moderator’s turn order.',
        vi: 'Xử lý việc khán giả ngắt lời mà không làm mất trật tự điều hành.',
      },
      {
        en: 'Render the speaker’s admission of weakness as candour, not as an attack on the host.',
        vi: 'Chuyển đạt lời thừa nhận điểm yếu của diễn giả như sự thẳng thắn, không phải như công kích trường chủ nhà.',
      },
      {
        en: 'Close the Q&A on time with a clear handover back to the moderator.',
        vi: 'Kết thúc phần hỏi đáp đúng giờ và bàn giao rõ ràng lại cho người điều hành.',
      },
    ],
    terms: [
      { en: 'Keynote speaker', vi: 'Diễn giả chính', slug: 'keynote-speaker' },
      { en: 'Plenary session', vi: 'Phiên toàn thể' },
      { en: 'Cohort', vi: 'Khóa sinh viên' },
      { en: 'Completion rate', vi: 'Tỷ lệ hoàn thành' },
      { en: 'Academic writing module', vi: 'Học phần viết học thuật' },
      { en: 'Zero-credit requirement', vi: 'Yêu cầu không tính tín chỉ' },
    ],
    dialogue: [
      {
        speaker: { en: 'Moderator', vi: 'Người điều hành' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Our keynote this morning is Professor Aisha Rahman, who will speak for thirty minutes, followed by twenty minutes of questions.',
        vi: 'Diễn giả chính của chúng ta sáng nay là Giáo sư Aisha Rahman; bà sẽ trình bày trong ba mươi phút, sau đó là hai mươi phút dành cho câu hỏi.',
        note: {
          en: '“Keynote” is rendered “diễn giả chính” rather than the loanword “người phát biểu keynote”; the time figures are spoken as words so they carry across a noisy hall.',
          vi: '“Keynote” được dịch là “diễn giả chính” thay vì dùng từ vay “người phát biểu keynote”; các mốc thời gian được đọc bằng chữ để truyền qua hội trường ồn.',
        },
      },
      {
        speaker: { en: 'Professor Aisha Rahman', vi: 'GS. Aisha Rahman' },
        role: { en: 'Visiting scholar', vi: 'Học giả khách mời' },
        en: 'Thank you. I want to begin with a number that should unsettle us: in 2024, only thirty-four per cent of Vietnamese students who started a joint programme in Australia completed it within the standard duration.',
        vi: 'Cảm ơn quý vị. Tôi muốn bắt đầu bằng một con số đáng để chúng ta trăn trở: năm 2024, chỉ có ba mươi tư phần trăm sinh viên Việt Nam bắt đầu một chương trình liên kết tại Úc hoàn thành đúng thời hạn chuẩn.',
        note: {
          en: '“Unsettle us” becomes “đáng để chúng ta trăn trở” — critical but not accusatory in Vietnamese. “Standard duration” is rendered “đúng thời hạn chuẩn”, not “thời gian tiêu chuẩn”, which would sound like a schedule.',
          vi: '“Unsettle us” được dịch là “đáng để chúng ta trăn trở” — mang tính phê bình nhưng không buộc tội. “Standard duration” thành “đúng thời hạn chuẩn”, không dùng “thời gian tiêu chuẩn” vì nghe như lịch trình.',
        },
      },
      {
        speaker: { en: 'Audience member', vi: 'Khán giả' },
        role: { en: 'Audience', vi: 'Khán giả' },
        en: 'May I come in there? Is that figure for undergraduate only, or does it include master’s?',
        vi: 'Cho tôi ngắt lời một chút được không ạ? Con số đó chỉ tính bậc đại học, hay có cả bậc thạc sĩ?',
        note: {
          en: '“May I come in there?” is translated as a request for permission (“Cho tôi ngắt lời … được không ạ”), preserving the floor-taking move rather than turning it into a bare question.',
          vi: '“May I come in there?” được dịch thành lời xin phép (“Cho tôi ngắt lời … được không ạ”), giữ nguyên hành động giành quyền phát biểu thay vì biến thành câu hỏi trần.',
        },
      },
      {
        speaker: { en: 'Professor Aisha Rahman', vi: 'GS. Aisha Rahman' },
        role: { en: 'Visiting scholar', vi: 'Học giả khách mời' },
        en: 'Both, but the master’s cohort is small — about two hundred students — so read the percentage with care.',
        vi: 'Cả hai, nhưng khóa thạc sĩ có quy mô nhỏ — khoảng hai trăm sinh viên — nên cần thận trọng khi đọc tỷ lệ phần trăm.',
      },
      {
        speaker: { en: 'Moderator', vi: 'Người điều hành' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Professor, we have about eight minutes left, so perhaps one more data point and then we open the floor.',
        vi: 'Thưa Giáo sư, chúng ta còn khoảng tám phút, vậy có lẽ xin thêm một số liệu nữa rồi chúng ta mở phần thảo luận.',
        note: {
          en: '“Open the floor” is rendered “mở phần thảo luận”, the standard phrase in Vietnamese conference moderation; a literal “mở sàn” would confuse the audience.',
          vi: '“Open the floor” được dịch là “mở phần thảo luận”, cách nói chuẩn khi điều hành hội thảo bằng tiếng Việt; dịch sát thành “mở sàn” sẽ khiến khán giả khó hiểu.',
        },
      },
      {
        speaker: { en: 'Professor Aisha Rahman', vi: 'GS. Aisha Rahman' },
        role: { en: 'Visiting scholar', vi: 'Học giả khách mời' },
        en: 'One more: completion rose to forty-one per cent once we added a compulsory academic-writing module in the first semester.',
        vi: 'Thêm một điểm: tỷ lệ hoàn thành tăng lên bốn mươi mốt phần trăm sau khi chúng tôi bổ sung một học phần viết học thuật bắt buộc trong học kỳ đầu.',
      },
      {
        speaker: { en: 'Audience member', vi: 'Khán giả' },
        role: { en: 'Audience', vi: 'Khán giả' },
        en: 'Would that module be credited towards the degree, or is it a zero-credit requirement?',
        vi: 'Học phần đó có được tính tín chỉ cho văn bằng không, hay chỉ là yêu cầu bắt buộc không tính tín chỉ?',
      },
      {
        speaker: { en: 'Professor Aisha Rahman', vi: 'GS. Aisha Rahman' },
        role: { en: 'Visiting scholar', vi: 'Học giả khách mời' },
        en: 'Zero credit, and I will be candid — that is a weakness. Students resent it until they see their marks, and we are still arguing about it internally.',
        vi: 'Không tính tín chỉ, và tôi xin nói thẳng — đó là một điểm yếu. Sinh viên phản đối cho đến khi thấy điểm của mình, và nội bộ chúng tôi vẫn còn tranh luận về việc này.',
        note: {
          en: '“I will be candid” is kept as “tôi xin nói thẳng”; “students resent it” becomes “sinh viên phản đối” rather than the stronger “oán trách”, which would overstate the speaker’s meaning.',
          vi: '“I will be candid” được giữ là “tôi xin nói thẳng”; “students resent it” thành “sinh viên phản đối” thay vì “oán trách” — từ mạnh hơn mức diễn giả muốn nói.',
        },
      },
    ],
    tips: [
      {
        en: 'Say “ba mươi tư phần trăm” for 34%, not “ba bốn phần trăm”; percentages in a hall are heard, not read.',
        vi: 'Đọc 34% là “ba mươi tư phần trăm”, không phải “ba bốn phần trăm”; trong hội trường người ta nghe chứ không đọc.',
      },
      {
        en: 'Keep “cohort” as “khóa sinh viên”; if you translate it as “nhóm”, the speaker’s methodological point disappears.',
        vi: 'Giữ “cohort” là “khóa sinh viên”; nếu dịch thành “nhóm” thì luận điểm về phương pháp của diễn giả sẽ biến mất.',
      },
      {
        en: 'Respect the moderator’s time signals verbatim — “eight minutes left” is a binding cue for the speaker, not filler.',
        vi: 'Dịch nguyên văn tín hiệu thời gian của người điều hành — “còn tám phút” là chỉ dẫn ràng buộc với diễn giả, không phải lời thừa.',
      },
      {
        en: 'When the speaker admits a weakness, do not add softening words like “chỉ là”; the admission is the point of the answer.',
        vi: 'Khi diễn giả thừa nhận điểm yếu, không thêm các từ làm nhẹ như “chỉ là”; chính sự thừa nhận đó là cốt lõi câu trả lời.',
      },
    ],
  },
  {
    slug: 'student-exchange-discussion',
    title: {
      en: 'Student Exchange Program Discussion',
      vi: 'Trao đổi về chương trình sinh viên trao đổi',
    },
    setting: {
      en: 'A sixty-minute working session by video link between two international offices, with shared slides and a draft exchange schedule on screen.',
      vi: 'Phiên làm việc sáu mươi phút qua cầu truyền hình giữa hai phòng hợp tác quốc tế, có trình chiếu chung và dự thảo lịch trao đổi trên màn hình.',
    },
    roles: [
      { en: 'Host exchange coordinator', vi: 'Điều phối viên trao đổi của trường chủ nhà' },
      { en: 'Partner exchange officer', vi: 'Cán bộ trao đổi của trường đối tác' },
      { en: 'Faculty representative (Engineering)', vi: 'Đại diện khoa (Kỹ thuật)' },
    ],
    overview: {
      en: 'The two offices are fixing the number of exchange places for the coming spring semester. Laboratory capacity limits the host to four students, the partner sent six last year, and the language of instruction is a further obstacle. The host cannot promise dormitory rooms, so costs and expectations must be stated plainly before nominations close.',
      vi: 'Hai phòng đang chốt số suất trao đổi cho học kỳ mùa xuân sắp tới. Năng lực phòng thí nghiệm khiến trường chủ nhà chỉ nhận được bốn sinh viên, trong khi năm ngoái đối tác đã cử sáu; ngôn ngữ giảng dạy là một trở ngại nữa. Trường chủ nhà không thể hứa chỗ ký túc xá, nên chi phí và kỳ vọng phải được nói rõ trước khi chốt danh sách đề cử.',
    },
    objectives: [
      {
        en: 'Explain the four-place cap as a capacity limit, not a lack of goodwill.',
        vi: 'Giải thích giới hạn bốn suất là do năng lực tiếp nhận, không phải thiếu thiện chí.',
      },
      {
        en: 'Clarify the required Vietnamese level before arrival and what the host can offer.',
        vi: 'Làm rõ trình độ tiếng Việt cần có trước khi đến và những gì trường chủ nhà có thể hỗ trợ.',
      },
      {
        en: 'State the housing guarantee honestly, including the private-rental alternative and its cost.',
        vi: 'Nói thật về khả năng bảo đảm chỗ ở, kèm phương án thuê nhà bên ngoài và chi phí.',
      },
      {
        en: 'Agree the number of places, the August intensive, and a nomination deadline.',
        vi: 'Thống nhất số suất, khóa tăng cường tháng Tám và hạn chót đề cử.',
      },
    ],
    terms: [
      { en: 'Exchange student', vi: 'Sinh viên trao đổi', slug: 'exchange-student' },
      { en: 'Semester exchange', vi: 'Trao đổi theo học kỳ' },
      { en: 'Language proficiency', vi: 'Năng lực ngoại ngữ' },
      { en: 'Dormitory place', vi: 'Suất ký túc xá' },
      { en: 'Private rental', vi: 'Thuê nhà bên ngoài' },
      { en: 'Nomination', vi: 'Đề cử' },
    ],
    dialogue: [
      {
        speaker: { en: 'Host exchange coordinator', vi: 'Điều phối viên trao đổi của trường chủ nhà' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'We can take four of your students next spring, but only in the Faculty of Engineering.',
        vi: 'Chúng tôi có thể tiếp nhận bốn sinh viên của quý trường vào mùa xuân tới, nhưng chỉ trong Khoa Kỹ thuật.',
      },
      {
        speaker: { en: 'Partner exchange officer', vi: 'Cán bộ trao đổi của trường đối tác' },
        role: { en: 'Partner university', vi: 'Trường đối tác' },
        en: 'Four is fewer than last year — we sent six. Is the cap a space issue or a funding issue?',
        vi: 'Bốn là ít hơn năm ngoái — chúng tôi đã cử sáu. Giới hạn này là do thiếu chỗ hay do kinh phí?',
      },
      {
        speaker: { en: 'Host exchange coordinator', vi: 'Điều phối viên trao đổi của trường chủ nhà' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Space. Our labs cap at twenty and twelve seats are already taken by local students.',
        vi: 'Do thiếu chỗ. Phòng thí nghiệm của chúng tôi giới hạn hai mươi chỗ và mười hai chỗ đã có sinh viên tại chỗ đăng ký.',
        note: {
          en: '“Space issue” is rendered “do thiếu chỗ” to answer the either/or question directly; keeping “vấn đề không gian” would sound vague in a negotiation.',
          vi: '“Space issue” được dịch là “do thiếu chỗ” để trả lời dứt khoát câu hỏi hoặc/hay; giữ “vấn đề không gian” sẽ nghe mơ hồ trong đàm phán.',
        },
      },
      {
        speaker: { en: 'Partner exchange officer', vi: 'Cán bộ trao đổi của trường đối tác' },
        role: { en: 'Partner university', vi: 'Trường đối tác' },
        en: 'And the language? Your programme is taught in Vietnamese, and our students have had only one year of it.',
        vi: 'Còn ngôn ngữ thì sao? Chương trình của quý trường giảng dạy bằng tiếng Việt, mà sinh viên chúng tôi mới học được một năm.',
      },
      {
        speaker: { en: 'Host exchange coordinator', vi: 'Điều phối viên trao đổi của trường chủ nhà' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Sorry, let me make sure I understand — do you mean one year of Vietnamese before arrival, or would they start from zero here?',
        vi: 'Xin lỗi, để tôi xác nhận cho rõ — ý ngài là sinh viên đã học một năm tiếng Việt trước khi sang, hay sẽ bắt đầu từ con số không tại đây?',
        note: {
          en: 'The clarification is explicitly framed as the speaker checking understanding (“để tôi xác nhận cho rõ”), which is the polite Vietnamese way to ask a counterpart to repeat rather than accuse them of vagueness.',
          vi: 'Câu hỏi làm rõ được đóng khung là người nói tự kiểm tra lại (“để tôi xác nhận cho rõ”) — cách lịch sự trong tiếng Việt để đề nghị đối phương nói lại thay vì cho rằng họ nói mơ hồ.',
        },
      },
      {
        speaker: { en: 'Partner exchange officer', vi: 'Cán bộ trao đổi của trường đối tác' },
        role: { en: 'Partner university', vi: 'Trường đối tác' },
        en: 'One year before arrival, roughly B one. We could add a two-week intensive in August.',
        vi: 'Một năm trước khi sang, khoảng trình độ B1. Chúng tôi có thể bổ sung một khóa tăng cường hai tuần vào tháng Tám.',
        note: {
          en: '“B one” is kept as “B1” because it is a CEFR level, not an ordinary number; “intensive” becomes “khóa tăng cường”, the standard term in Vietnamese course catalogues.',
          vi: '“B one” được giữ là “B1” vì đây là bậc CEFR, không phải số đếm thông thường; “intensive” thành “khóa tăng cường”, thuật ngữ chuẩn trong danh mục khóa học tiếng Việt.',
        },
      },
      {
        speaker: { en: 'Host exchange coordinator', vi: 'Điều phối viên trao đổi của trường chủ nhà' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'That would help. But I must be clear: we cannot guarantee dormitory places; students may have to rent privately at about three million dong a month.',
        vi: 'Điều đó sẽ có ích. Nhưng tôi phải nói rõ: chúng tôi không thể bảo đảm suất ký túc xá; sinh viên có thể phải thuê nhà bên ngoài với chi phí khoảng ba triệu đồng một tháng.',
        note: {
          en: '“I must be clear” is kept as “tôi phải nói rõ” — a caveat that protects the host from later complaints; “about” is preserved as “khoảng” so the figure is not treated as a quote.',
          vi: '“I must be clear” được giữ là “tôi phải nói rõ” — lời bảo lưu giúp trường chủ nhà tránh bị khiếu nại sau này; “about” được giữ là “khoảng” để con số không bị hiểu như báo giá.',
        },
      },
      {
        speaker: { en: 'Partner exchange officer', vi: 'Cán bộ trao đổi của trường đối tác' },
        role: { en: 'Partner university', vi: 'Trường đối tác' },
        en: 'Understood. Let us agree on four places, the August intensive, and we will confirm names by 30 November.',
        vi: 'Đã rõ. Chúng ta thống nhất bốn suất, khóa tăng cường tháng Tám, và chúng tôi sẽ xác nhận danh sách trước ngày 30 tháng 11.',
      },
    ],
    tips: [
      {
        en: 'Distinguish “suất” (a place) from “sinh viên” (a person); “four places” is not automatically “four students” once a faculty sets a cap.',
        vi: 'Phân biệt “suất” (chỗ) với “sinh viên” (người); “bốn suất” không đồng nghĩa “bốn sinh viên” khi khoa đã đặt giới hạn.',
      },
      {
        en: 'Keep CEFR levels as letters and numbers (“B1”); spelling them out can be misheard as “B one” or “before one”.',
        vi: 'Giữ bậc CEFR nguyên dạng chữ và số (“B1”); đánh vần có thể bị nghe nhầm thành “B one” hoặc “before one”.',
      },
      {
        en: 'When a host says “we cannot guarantee”, keep the negative explicit; “có thể sắp xếp” would turn a refusal into a promise.',
        vi: 'Khi trường chủ nhà nói “we cannot guarantee”, phải giữ rõ ý phủ định; “có thể sắp xếp” sẽ biến lời từ chối thành lời hứa.',
      },
      {
        en: 'Currency here is dong, not dollars: say “ba triệu đồng một tháng” with the unit, and do not convert.',
        vi: 'Ở đây đơn vị tiền là đồng, không phải đô la: nói “ba triệu đồng một tháng” kèm đơn vị, và không quy đổi.',
      },
    ],
  },
  {
    slug: 'scholarship-information-session',
    title: {
      en: 'Scholarship Information Session',
      vi: 'Buổi giới thiệu thông tin học bổng',
    },
    setting: {
      en: 'A seventy-five-minute information session in a lecture hall, with a presentation, an alumnus’s testimony, and an open question period.',
      vi: 'Buổi giới thiệu thông tin bảy mươi lăm phút tại giảng đường, gồm phần thuyết trình, chia sẻ của cựu học viên và phần hỏi đáp mở.',
    },
    roles: [
      { en: 'Scholarship officer', vi: 'Cán bộ phụ trách học bổng' },
      { en: 'Alumnus (former recipient)', vi: 'Cựu học viên (từng nhận học bổng)' },
      { en: 'Prospective applicant', vi: 'Ứng viên dự tuyển' },
    ],
    overview: {
      en: 'The session explains a full scholarship covering tuition, stipend, and one return flight per year, but the fine print matters: the stipend starts only with the master’s, and this round depends on budget approval. Applicants are comparing two different deadlines and planning their finances around a payment that may not begin when they expect.',
      vi: 'Buổi giới thiệu trình bày một học bổng toàn phần gồm học phí, trợ cấp và một vé khứ hồi mỗi năm, nhưng phần điều kiện chi tiết rất quan trọng: trợ cấp chỉ bắt đầu khi vào chương trình thạc sĩ, và đợt này còn phụ thuộc vào việc phê duyệt ngân sách. Ứng viên đang đối chiếu hai mốc hạn khác nhau và lập kế hoạch tài chính dựa trên khoản tiền có thể không bắt đầu đúng như họ tưởng.',
    },
    objectives: [
      {
        en: 'State exactly what the scholarship covers and when each component begins.',
        vi: 'Nêu chính xác học bổng chi trả những gì và từng khoản bắt đầu khi nào.',
      },
      {
        en: 'Resolve the conflicting deadlines without guessing which one is correct.',
        vi: 'Làm rõ hai mốc hạn mâu thuẫn mà không đoán bừa mốc nào đúng.',
      },
      {
        en: 'Preserve the budget caveat so applicants do not treat the award as guaranteed.',
        vi: 'Giữ nguyên lưu ý về ngân sách để ứng viên không coi suất học bổng là chắc chắn.',
      },
      {
        en: 'Give a realistic monthly living-cost figure for Hanoi.',
        vi: 'Đưa ra con số sinh hoạt phí thực tế theo tháng tại Hà Nội.',
      },
    ],
    terms: [
      { en: 'Full scholarship', vi: 'Học bổng toàn phần', slug: 'full-scholarship' },
      { en: 'Monthly stipend', vi: 'Trợ cấp hàng tháng' },
      { en: 'Return flight', vi: 'Vé máy bay khứ hồi' },
      { en: 'Eligibility', vi: 'Điều kiện dự tuyển' },
      { en: 'Application portal', vi: 'Cổng nộp hồ sơ' },
      { en: 'Contingent funding', vi: 'Kinh phí có điều kiện' },
    ],
    dialogue: [
      {
        speaker: { en: 'Scholarship officer', vi: 'Cán bộ phụ trách học bổng' },
        role: { en: 'Programme office', vi: 'Văn phòng chương trình' },
        en: 'The full scholarship covers tuition, a monthly stipend of twelve million dong, and one return flight per year — for a maximum of twenty-four months.',
        vi: 'Học bổng toàn phần chi trả học phí, trợ cấp hàng tháng mười hai triệu đồng và một vé máy bay khứ hồi mỗi năm — tối đa trong hai mươi bốn tháng.',
        note: {
          en: 'Amounts are read in Vietnamese units (“mười hai triệu đồng”), never left as “12 million”, because a dropped “đồng” can be heard as dollars.',
          vi: 'Các khoản tiền được đọc theo đơn vị Việt Nam (“mười hai triệu đồng”), không để “12 million”, vì nếu mất chữ “đồng” người nghe có thể hiểu thành đô la.',
        },
      },
      {
        speaker: { en: 'Prospective applicant', vi: 'Ứng viên dự tuyển' },
        role: { en: 'Applicant', vi: 'Phía ứng viên' },
        en: 'Does the stipend continue during the language year, or only once the master’s starts?',
        vi: 'Trợ cấp có được tiếp tục trong năm học tiếng không, hay chỉ bắt đầu khi vào chương trình thạc sĩ?',
      },
      {
        speaker: { en: 'Scholarship officer', vi: 'Cán bộ phụ trách học bổng' },
        role: { en: 'Programme office', vi: 'Văn phòng chương trình' },
        en: 'Only from the master’s. The language year is tuition-free but unpaid.',
        vi: 'Chỉ từ khi vào thạc sĩ. Năm học tiếng được miễn học phí nhưng không có trợ cấp.',
        note: {
          en: '“Unpaid” is rendered “không có trợ cấp” rather than “không lương”, since the recipient is a student, not an employee.',
          vi: '“Unpaid” được dịch là “không có trợ cấp” thay vì “không lương”, vì người nhận là sinh viên, không phải người lao động.',
        },
      },
      {
        speaker: { en: 'Alumnus', vi: 'Cựu học viên' },
        role: { en: 'Alumni', vi: 'Cựu học viên' },
        en: 'If I may add — that caught several of us out in 2023; we had budgeted for a paid language year.',
        vi: 'Cho tôi bổ sung một chút — điều này đã khiến nhiều anh chị em chúng tôi bị động vào năm 2023; chúng tôi đã dự trù kinh phí cho một năm học tiếng có trợ cấp.',
        note: {
          en: 'The idiom “caught us out” is rendered “khiến … bị động”, which conveys the surprise without the colloquial force that would sound informal in a public session.',
          vi: 'Thành ngữ “caught us out” được dịch là “khiến … bị động”, truyền đạt sự bất ngờ mà không mang sắc thái khẩu ngữ quá thân mật trong một buổi công khai.',
        },
      },
      {
        speaker: { en: 'Prospective applicant', vi: 'Ứng viên dự tuyển' },
        role: { en: 'Applicant', vi: 'Phía ứng viên' },
        en: 'So for the first ten months I need my own living costs — roughly how much?',
        vi: 'Vậy trong mười tháng đầu em phải tự lo sinh hoạt phí — khoảng bao nhiêu ạ?',
      },
      {
        speaker: { en: 'Scholarship officer', vi: 'Cán bộ phụ trách học bổng' },
        role: { en: 'Programme office', vi: 'Văn phòng chương trình' },
        en: 'About eight to ten million dong a month in Hanoi, depending on housing.',
        vi: 'Khoảng tám đến mười triệu đồng một tháng tại Hà Nội, tùy vào chỗ ở.',
      },
      {
        speaker: { en: 'Prospective applicant', vi: 'Ứng viên dự tuyển' },
        role: { en: 'Applicant', vi: 'Phía ứng viên' },
        en: 'And the deadline? The website says 15 April, but the portal says 31 March.',
        vi: 'Còn hạn chót thì sao ạ? Trang web ghi ngày 15 tháng 4, nhưng cổng nộp hồ sơ lại ghi ngày 31 tháng 3.',
        note: {
          en: 'Both dates are spoken in full and in the same order as the speaker, because the contradiction itself is the question; reordering would hide it.',
          vi: 'Cả hai mốc ngày đều được đọc đầy đủ và giữ đúng thứ tự người nói, vì chính sự mâu thuẫn là nội dung câu hỏi; đảo thứ tự sẽ che mất điều đó.',
        },
      },
      {
        speaker: { en: 'Scholarship officer', vi: 'Cán bộ phụ trách học bổng' },
        role: { en: 'Programme office', vi: 'Văn phòng chương trình' },
        en: 'The portal is right; the website page is out of date. But I should add a caveat: this round is contingent on the 2027 budget being approved, and we will not know until February.',
        vi: 'Cổng nộp hồ sơ là đúng; trang web đã lỗi thời. Nhưng tôi cần lưu ý thêm một điều: đợt này phụ thuộc vào việc ngân sách năm 2027 được phê duyệt, mà phải đến tháng Hai mới biết kết quả.',
        note: {
          en: '“Caveat” is rendered “lưu ý thêm một điều” — clear enough to function as a warning, without the legalistic “bảo lưu” that would alarm applicants.',
          vi: '“Caveat” được dịch là “lưu ý thêm một điều” — đủ rõ để mang tính cảnh báo, mà không dùng “bảo lưu” theo kiểu pháp lý khiến ứng viên hoang mang.',
        },
      },
    ],
    tips: [
      {
        en: 'Always attach “đồng” to stipend figures; “mười hai triệu” alone is ambiguous to anyone used to dollar budgets.',
        vi: 'Luôn gắn “đồng” vào các con số trợ cấp; “mười hai triệu” đứng một mình sẽ mơ hồ với người quen tính ngân sách bằng đô la.',
      },
      {
        en: 'Distinguish “tuition-free” (miễn học phí) from “funded” (có trợ cấp); the whole misunderstanding in this session rests on that difference.',
        vi: 'Phân biệt “tuition-free” (miễn học phí) với “funded” (có trợ cấp); toàn bộ hiểu nhầm trong buổi này nằm ở khác biệt đó.',
      },
      {
        en: 'When two deadlines conflict, interpret both exactly and let the officer resolve them — never silently pick the earlier date.',
        vi: 'Khi hai mốc hạn mâu thuẫn, hãy dịch chính xác cả hai và để cán bộ phụ trách giải quyết — không tự ý chọn mốc sớm hơn.',
      },
      {
        en: 'Render “contingent on budget approval” with the condition first (“phụ thuộc vào việc …”), so it cannot be mistaken for a routine formality.',
        vi: 'Dịch “contingent on budget approval” với điều kiện đặt trước (“phụ thuộc vào việc …”), để không bị hiểu thành thủ tục hình thức.',
      },
    ],
  },
  {
    slug: 'mou-signing-ceremony',
    title: {
      en: 'MOU Signing Ceremony',
      vi: 'Lễ ký kết biên bản ghi nhớ hợp tác',
    },
    setting: {
      en: 'A formal thirty-minute ceremony in the university’s reception hall, with two signing parties, witnesses, and press photographers.',
      vi: 'Lễ ký kết trang trọng kéo dài ba mươi phút tại phòng khánh tiết của trường, có hai bên ký kết, các nhân chứng và phóng viên ảnh.',
    },
    roles: [
      { en: 'Master of ceremonies', vi: 'Người dẫn chương trình' },
      { en: 'Vice Rector (host university)', vi: 'Phó Hiệu trưởng (trường chủ nhà)' },
      { en: 'Pro-Vice-Chancellor (partner university)', vi: 'Phó Hiệu trưởng phụ trách hợp tác quốc tế (trường đối tác)' },
      { en: 'Interpreter', vi: 'Phiên dịch viên' },
    ],
    overview: {
      en: 'Two universities are signing a memorandum of understanding after a year of negotiation. The ceremony is protocol-heavy: names, titles, and positions must be read exactly, the signing sequence must follow protocol, and a reservation about the credit annex has to be recorded without spoiling the occasion. An error in a title or in the order of signatures would be remembered far longer than the agreement itself.',
      vi: 'Hai trường đại học ký biên bản ghi nhớ hợp tác sau một năm đàm phán. Buổi lễ nặng về nghi thức: tên, chức danh và chức vụ phải được đọc chính xác, trình tự ký phải theo đúng lễ nghi, và một bảo lưu về phụ lục công nhận tín chỉ cần được ghi nhận mà không làm mất không khí buổi lễ. Một sai sót về chức danh hay thứ tự ký sẽ được nhớ lâu hơn chính nội dung thỏa thuận.',
    },
    objectives: [
      {
        en: 'Read each signatory’s full name, title, and position in the correct order.',
        vi: 'Đọc đầy đủ họ tên, học hàm học vị và chức vụ của từng người ký theo đúng thứ tự.',
      },
      {
        en: 'Announce the signing sequence (which originals, which pages, who signs first) without ambiguity.',
        vi: 'Thông báo trình tự ký (bản gốc nào, trang nào, ai ký trước) một cách rõ ràng, không mơ hồ.',
      },
      {
        en: 'Record the parties’ reservations about the credit annex accurately and neutrally.',
        vi: 'Ghi nhận chính xác và trung lập các bảo lưu của hai bên về phụ lục công nhận tín chỉ.',
      },
      {
        en: 'Close with next steps and the agreed wording for the press release.',
        vi: 'Kết thúc bằng các bước tiếp theo và cách diễn đạt đã thống nhất cho thông cáo báo chí.',
      },
    ],
    terms: [
      { en: 'Memorandum of Understanding', vi: 'Biên bản ghi nhớ hợp tác', slug: 'memorandum-of-understanding' },
      { en: 'Signatory', vi: 'Người ký kết' },
      { en: 'Ad referendum', vi: 'Ký với điều kiện phê chuẩn sau' },
      { en: 'Original copy', vi: 'Bản gốc' },
      { en: 'Initialling', vi: 'Ký tắt' },
      { en: 'Effective date', vi: 'Ngày có hiệu lực' },
      { en: 'Press release', vi: 'Thông cáo báo chí' },
    ],
    dialogue: [
      {
        speaker: { en: 'Master of ceremonies', vi: 'Người dẫn chương trình' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Ladies and gentlemen, we now begin the signing ceremony. May I invite Associate Professor Nguyen Van Minh, Vice Rector, and Professor Sarah Whitfield, Pro-Vice-Chancellor for International Affairs, to the signing table.',
        vi: 'Kính thưa quý vị đại biểu, chúng ta bắt đầu lễ ký kết. Xin trân trọng mời Phó Giáo sư Nguyễn Văn Minh, Phó Hiệu trưởng, và Giáo sư Sarah Whitfield, Phó Hiệu trưởng phụ trách Hợp tác quốc tế, lên bàn ký.',
        note: {
          en: 'Titles are read in Vietnamese order: academic rank first (“Phó Giáo sư”, “Giáo sư”), then full name, then position. “Pro-Vice-Chancellor” becomes “Phó Hiệu trưởng phụ trách Hợp tác quốc tế” — functional, not literal, since the UK rank has no Vietnamese equivalent.',
          vi: 'Chức danh được đọc theo trật tự tiếng Việt: học hàm trước (“Phó Giáo sư”, “Giáo sư”), rồi họ tên, rồi chức vụ. “Pro-Vice-Chancellor” được dịch là “Phó Hiệu trưởng phụ trách Hợp tác quốc tế” — theo chức năng chứ không sát chữ, vì cấp bậc này của Anh không có tương đương ở Việt Nam.',
        },
      },
      {
        speaker: { en: 'Interpreter', vi: 'Phiên dịch viên' },
        role: { en: 'Protocol', vi: 'Nghi thức' },
        en: 'The agreement consists of two original copies in English and two in Vietnamese, each initialled on every page by both parties.',
        vi: 'Thỏa thuận gồm hai bản gốc tiếng Anh và hai bản gốc tiếng Việt; mỗi bản đều được cả hai bên ký tắt trên từng trang.',
        note: {
          en: '“Initialled” is rendered “ký tắt” and “original copies” as “bản gốc”; using “bản chính thức” here would blur the legal distinction the ceremony depends on.',
          vi: '“Initialled” được dịch là “ký tắt”, “original copies” là “bản gốc”; nếu dùng “bản chính thức” sẽ làm mờ khác biệt pháp lý mà buổi lễ dựa vào.',
        },
      },
      {
        speaker: { en: 'Vice Rector', vi: 'Phó Hiệu trưởng' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Before we sign, I would like the record to show that the annex on credit recognition is signed ad referendum, subject to our academic council.',
        vi: 'Trước khi ký, tôi đề nghị ghi nhận rằng phụ lục về công nhận tín chỉ được ký với điều kiện phê chuẩn sau, tùy thuộc vào hội đồng học thuật của chúng tôi.',
        note: {
          en: 'The Latin “ad referendum” is not left untranslated; it is rendered “ký với điều kiện phê chuẩn sau” and then anchored by “tùy thuộc vào hội đồng học thuật”.',
          vi: 'Cụm Latinh “ad referendum” không được để nguyên mà dịch là “ký với điều kiện phê chuẩn sau”, rồi neo nghĩa bằng “tùy thuộc vào hội đồng học thuật”.',
        },
      },
      {
        speaker: { en: 'Pro-Vice-Chancellor Sarah Whitfield', vi: 'Phó Hiệu trưởng Sarah Whitfield' },
        role: { en: 'Partner university', vi: 'Trường đối tác' },
        en: 'Noted, and we will add the same reservation on our side, since our senate meets in June.',
        vi: 'Đã ghi nhận, và phía chúng tôi sẽ thêm bảo lưu tương tự, vì hội đồng học thuật của chúng tôi họp vào tháng Sáu.',
        note: {
          en: '“Senate” is rendered “hội đồng học thuật” — the body that actually decides credit matters in Vietnamese universities — rather than the literal “thượng viện”, which would be absurd here.',
          vi: '“Senate” được dịch là “hội đồng học thuật” — cơ quan thực sự quyết định vấn đề tín chỉ ở các trường Việt Nam — thay vì dịch sát thành “thượng viện”, điều sẽ vô lý trong ngữ cảnh này.',
        },
      },
      {
        speaker: { en: 'Master of ceremonies', vi: 'Người dẫn chương trình' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Then may I ask Professor Minh to initial pages one to twelve of the Vietnamese originals, followed by Professor Whitfield on the English originals, after which the two parties will exchange documents and sign the final page.',
        vi: 'Vậy xin mời Phó Giáo sư Minh ký tắt các trang từ một đến mười hai của bản gốc tiếng Việt, sau đó Giáo sư Whitfield ký tắt bản gốc tiếng Anh; tiếp theo hai bên sẽ trao đổi văn bản và ký trang cuối.',
        note: {
          en: 'The sequence is spoken in short clauses with explicit “sau đó” and “tiếp theo” because the photographer and the parties follow it live; a single compressed sentence would cause a wrong-order signature.',
          vi: 'Trình tự được nói thành các mệnh đề ngắn với “sau đó” và “tiếp theo” rõ ràng vì phóng viên và hai bên làm theo ngay tại chỗ; một câu nén lại sẽ dẫn đến ký sai thứ tự.',
        },
      },
      {
        speaker: { en: 'Interpreter', vi: 'Phiên dịch viên' },
        role: { en: 'Protocol', vi: 'Nghi thức' },
        en: 'The record shows: Associate Professor Nguyen Van Minh, Vice Rector of the host university, signing for the Vietnamese side; Professor Sarah Whitfield, Pro-Vice-Chancellor for International Affairs, signing for the partner university.',
        vi: 'Biên bản ghi nhận: Phó Giáo sư Nguyễn Văn Minh, Phó Hiệu trưởng trường chủ nhà, ký thay mặt phía Việt Nam; Giáo sư Sarah Whitfield, Phó Hiệu trưởng phụ trách Hợp tác quốc tế, ký thay mặt trường đối tác.',
        note: {
          en: '“Signing for” becomes “ký thay mặt”, which states authority rather than mere presence; this is the wording that makes the signature defensible later.',
          vi: '“Signing for” được dịch là “ký thay mặt”, thể hiện thẩm quyền chứ không chỉ sự có mặt; đây là cách diễn đạt giúp chữ ký có căn cứ về sau.',
        },
      },
      {
        speaker: { en: 'Pro-Vice-Chancellor Sarah Whitfield', vi: 'Phó Hiệu trưởng Sarah Whitfield' },
        role: { en: 'Partner university', vi: 'Trường đối tác' },
        en: 'Thank you. Our first implementation meeting should be in October, and I would suggest we exchange nominated contact points before then.',
        vi: 'Xin cảm ơn. Cuộc họp triển khai đầu tiên của chúng ta nên diễn ra vào tháng Mười, và tôi đề nghị hai bên trao đổi đầu mối liên hệ được chỉ định trước thời điểm đó.',
      },
      {
        speaker: { en: 'Vice Rector', vi: 'Phó Hiệu trưởng' },
        role: { en: 'Host university', vi: 'Trường chủ nhà' },
        en: 'Agreed. One request before we finish: please do not describe the annex as final in the press release — we can say the parties signed an MOU and are finalising credit recognition.',
        vi: 'Nhất trí. Một đề nghị trước khi kết thúc: xin đừng mô tả phụ lục là đã hoàn tất trong thông cáo báo chí — chúng ta có thể nói hai bên đã ký biên bản ghi nhớ và đang hoàn thiện việc công nhận tín chỉ.',
        note: {
          en: '“Please do not describe … as final” is kept as a direct request with “xin đừng”, which is firm but still courteous in Vietnamese protocol; softening it to “có lẽ nên” would weaken a media instruction.',
          vi: '“Please do not describe … as final” được giữ thành đề nghị trực tiếp với “xin đừng” — dứt khoát nhưng vẫn lịch sự trong nghi thức tiếng Việt; nếu làm nhẹ thành “có lẽ nên” thì chỉ dẫn về truyền thông sẽ bị yếu đi.',
        },
      },
    ],
    tips: [
      {
        en: 'Read Vietnamese titles in fixed order: academic rank, full name, position (“Phó Giáo sư Nguyễn Văn Minh, Phó Hiệu trưởng”). Reordering sounds like a different person.',
        vi: 'Đọc chức danh tiếng Việt theo trật tự cố định: học hàm, họ tên, chức vụ (“Phó Giáo sư Nguyễn Văn Minh, Phó Hiệu trưởng”). Đảo trật tự sẽ nghe như đang nói về người khác.',
      },
      {
        en: 'Translate “Pro-Vice-Chancellor” by portfolio (“Phó Hiệu trưởng phụ trách …”), and say the portfolio, not just the rank.',
        vi: 'Dịch “Pro-Vice-Chancellor” theo mảng phụ trách (“Phó Hiệu trưởng phụ trách …”), và phải nêu mảng đó chứ không chỉ nêu cấp bậc.',
      },
      {
        en: 'Announce the signing sequence in short steps with explicit connectives; the room acts on your words in real time.',
        vi: 'Thông báo trình tự ký thành các bước ngắn với từ nối rõ ràng; cả khán phòng làm theo lời bạn ngay lập tức.',
      },
      {
        en: 'Keep reservations (“ad referendum”, “subject to”) inside the ceremony record — omitting them for a smoother ceremony creates a legal gap.',
        vi: 'Giữ các bảo lưu (“ad referendum”, “subject to”) trong biên bản buổi lễ — bỏ chúng để buổi lễ suôn sẻ hơn sẽ tạo ra lỗ hổng pháp lý.',
      },
    ],
  },
];
