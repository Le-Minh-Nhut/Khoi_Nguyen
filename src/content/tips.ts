import type { Tip } from '@/types/content';

export const tips: Tip[] = [
  {
    id: 'word-for-word',
    number: 1,
    title: { en: 'Avoiding word-for-word translation', vi: 'Tránh dịch từng từ một' },
    problem: {
      en: 'Literal rendering follows the source syntax until the target sentence no longer says anything a native speaker would say. It is most common when the interpreter is tired or hears an unfamiliar structure.',
      vi: 'Dịch sát chạy theo cú pháp nguồn cho đến khi câu đích không còn là điều người bản ngữ sẽ nói. Lỗi này thường xuất hiện khi phiên dịch viên mệt hoặc gặp cấu trúc lạ.',
    },
    example: {
      en: 'Source: “We look forward to strengthening our partnership.” Flawed: “Chúng tôi nhìn về phía trước để tăng cường quan hệ đối tác của chúng tôi.”',
      vi: 'Nguồn: “We look forward to strengthening our partnership.” Bản dịch lỗi: “Chúng tôi nhìn về phía trước để tăng cường quan hệ đối tác của chúng tôi.”',
    },
    better: {
      en: '“Chúng tôi mong muốn tiếp tục thắt chặt quan hệ hợp tác.”',
      vi: '“Chúng tôi mong muốn tiếp tục thắt chặt quan hệ hợp tác.”',
    },
    explanation: {
      en: '“Look forward to” is a formula of anticipation, not a direction of gaze. “Mong muốn” carries the projection; “thắt chặt” is the collocation Vietnamese uses for partnership, not “tăng cường” alone. The pronoun is dropped because Vietnamese does not repeat it in every clause.',
      vi: '“Look forward to” là công thức thể hiện sự trông đợi, không phải hướng nhìn. “Mong muốn” mang nghĩa hướng tới; “thắt chặt” là cụm tiếng Việt thường dùng với quan hệ hợp tác, mạnh và tự nhiên hơn “tăng cường” đơn thuần. Đại từ được lược vì tiếng Việt không lặp lại ở mọi mệnh đề.',
    },
    advice: [
      { en: 'Recognise formulaic expressions as units and learn their Vietnamese equivalents as units.', vi: 'Nhận diện các công thức như một chỉnh thể và học cách dịch nguyên cụm sang tiếng Việt.' },
      { en: 'If a rendering cannot be said aloud in a meeting, it is not a rendering.', vi: 'Nếu một cách dịch không thể nói thành tiếng trong cuộc họp, thì nó không phải cách dịch.' },
      { en: 'Read the target sentence back to yourself before moving on; syntax errors are audible immediately.', vi: 'Đọc lại câu đích trước khi đi tiếp; lỗi cú pháp nghe ra ngay.' },
    ],
    relatedTerms: ['memorandum-of-understanding'],
  },
  {
    id: 'terminology-consistency',
    number: 2,
    title: { en: 'Maintaining terminology consistency', vi: 'Giữ nhất quán thuật ngữ' },
    problem: {
      en: 'The same concept is rendered with different Vietnamese terms across a session. Listeners conclude that different schemes are being discussed.',
      vi: 'Cùng một khái niệm được dịch bằng nhiều từ tiếng Việt khác nhau trong một phiên. Người nghe kết luận rằng đang nói tới nhiều chương trình khác nhau.',
    },
    example: {
      en: 'Turn one: “tuition fee waiver”. Turn twelve: “miễn giảm học phí”. Turn twenty: “học bổng miễn học phí”.',
      vi: 'Lượt một: “tuition fee waiver”. Lượt mười hai: “miễn giảm học phí”. Lượt hai mươi: “học bổng miễn học phí”.',
    },
    better: {
      en: 'Use “miễn giảm học phí” throughout, and reserve “học bổng” for awards that include a stipend.',
      vi: 'Dùng “miễn giảm học phí” xuyên suốt, và chỉ dùng “học bổng” cho các khoản có kèm sinh hoạt phí.',
    },
    explanation: {
      en: 'The third version turns a bill reduction into an award, which changes what a student will expect to receive. Consistency protects meaning, not just style.',
      vi: 'Cách thứ ba biến việc giảm hóa đơn thành một khoản trao tặng, làm thay đổi điều sinh viên mong nhận được. Nhất quán bảo vệ nghĩa, không chỉ bảo vệ văn phong.',
    },
    advice: [
      { en: 'Agree one preferred rendering per concept in a shared sheet before the event.', vi: 'Thống nhất một cách dịch cho mỗi khái niệm trên bảng chia sẻ trước sự kiện.' },
      { en: 'List rejected renderings too; otherwise colleagues reintroduce them.', vi: 'Liệt kê cả các cách bị loại; nếu không, đồng nghiệp sẽ dùng lại.' },
    ],
    relatedTerms: ['tuition-fee-waiver', 'stipend'],
  },
  {
    id: 'academic-titles',
    number: 3,
    title: { en: 'Translating academic titles', vi: 'Dịch học hàm, học vị' },
    problem: {
      en: 'Titles are mapped one-to-one across systems that do not share a hierarchy. A courtesy “Professor” in English becomes a formal rank in Vietnamese.',
      vi: 'Chức danh được quy đổi một-một giữa các hệ thống không cùng thứ bậc. “Professor” trong tiếng Anh như cách gọi lịch sự lại thành học hàm chính thức trong tiếng Việt.',
    },
    example: {
      en: 'Source: “Professor Smith teaches one course here.” Flawed: “Giáo sư Smith dạy một môn tại đây” — implying a Vietnamese professorial appointment.',
      vi: 'Nguồn: “Professor Smith teaches one course here.” Bản dịch lỗi: “Giáo sư Smith dạy một môn tại đây” — nghe như một học hàm giáo sư của Việt Nam.',
    },
    better: {
      en: '“Ông Smith, giảng viên phụ trách một môn tại trường” — or keep the name with the title as a name form: “GS. Smith”.',
      vi: '“Ông Smith, giảng viên phụ trách một môn tại trường” — hoặc giữ chức danh như một phần của tên: “GS. Smith”.',
    },
    explanation: {
      en: 'Vietnamese distinguishes học hàm (professor, associate professor) from học vị (doctor, master) and from chức danh (dean, head of department). Only translate the rank the person actually holds in the system that granted it.',
      vi: 'Tiếng Việt phân biệt học hàm (giáo sư, phó giáo sư), học vị (tiến sĩ, thạc sĩ) và chức danh (trưởng khoa, trưởng bộ môn). Chỉ dịch cấp bậc người đó thực sự có trong hệ thống đã cấp.',
    },
    advice: [
      { en: 'Ask for the participant list with titles before the event.', vi: 'Xin danh sách đại biểu kèm chức danh trước sự kiện.' },
      { en: 'Read Vietnamese titles in full once, then use the short form consistently.', vi: 'Đọc đầy đủ chức danh tiếng Việt một lần, sau đó dùng dạng ngắn nhất quán.' },
      { en: 'Never upgrade “Mr/Ms” to a professorial title to sound respectful.', vi: 'Không bao giờ nâng “Mr/Ms” thành chức danh giáo sư để nghe kính trọng hơn.' },
    ],
    relatedTerms: ['academic-title', 'professor', 'associate-professor'],
  },
  {
    id: 'scholarship-types',
    number: 4,
    title: { en: 'Distinguishing scholarship types', vi: 'Phân biệt các loại học bổng' },
    problem: {
      en: 'Every funded offer becomes “học bổng toàn phần” in translation, regardless of what it actually covers. Families then plan around money that does not exist.',
      vi: 'Mọi khoản hỗ trợ đều được dịch thành “học bổng toàn phần”, bất kể nó thực sự chi trả gì. Các gia đình lập kế hoạch dựa trên khoản tiền không tồn tại.',
    },
    example: {
      en: 'Source: “The award covers tuition and a partial stipend.” Flawed: “Đây là học bổng toàn phần.”',
      vi: 'Nguồn: “The award covers tuition and a partial stipend.” Bản dịch lỗi: “Đây là học bổng toàn phần.”',
    },
    better: {
      en: '“Học bổng chi trả toàn bộ học phí và một phần sinh hoạt phí; chi phí còn lại sinh viên tự trang trải.”',
      vi: '“Học bổng chi trả toàn bộ học phí và một phần sinh hoạt phí; chi phí còn lại sinh viên tự trang trải.”',
    },
    explanation: {
      en: '“Toàn phần” in Vietnamese scholarship notices usually refers to tuition coverage, not to every expense. Stating the coverage explicitly prevents a family from under-budgeting for flights, insurance, and rent.',
      vi: '“Toàn phần” trong thông báo học bổng tiếng Việt thường chỉ học phí, không phải mọi chi phí. Nêu rõ phạm vi chi trả giúp gia đình không tính thiếu tiền vé máy bay, bảo hiểm và thuê nhà.',
    },
    advice: [
      { en: 'Always state what is covered and what is not, in the same breath.', vi: 'Luôn nêu cái được chi trả và cái không, ngay trong cùng một câu.' },
      { en: 'Do not translate “full” as “toàn phần” when only tuition is covered; say “miễn toàn bộ học phí”.', vi: 'Không dịch “full” thành “toàn phần” khi chỉ có học phí; hãy nói “miễn toàn bộ học phí”.' },
    ],
    relatedTerms: ['full-scholarship', 'partial-scholarship', 'stipend'],
  },
  {
    id: 'unfamiliar-terminology',
    number: 5,
    title: { en: 'Handling unfamiliar terminology', vi: 'Xử lý thuật ngữ chưa quen' },
    problem: {
      en: 'An unknown term arrives mid-sentence and the interpreter either invents an equivalent or falls silent. Both are worse than asking.',
      vi: 'Một thuật ngữ lạ xuất hiện giữa câu; phiên dịch viên hoặc bịa tương đương, hoặc im lặng. Cả hai đều tệ hơn việc hỏi lại.',
    },
    example: {
      en: 'Source: “We use a recognition-of-prior-learning route for these applicants.” Flawed: “Chúng tôi dùng một lộ trình đặc biệt” — which says nothing.',
      vi: 'Nguồn: “We use a recognition-of-prior-learning route for these applicants.” Bản dịch lỗi: “Chúng tôi dùng một lộ trình đặc biệt” — không truyền đạt gì.',
    },
    better: {
      en: '“Với nhóm ứng viên này, chúng tôi áp dụng hình thức công nhận kết quả học tập và kinh nghiệm đã có.” If still unsure: “Xin lỗi, quý vị có thể nói rõ cụm ‘recognition of prior learning’ ở đây nghĩa là gì không?”',
      vi: '“Với nhóm ứng viên này, chúng tôi áp dụng hình thức công nhận kết quả học tập và kinh nghiệm đã có.” Nếu vẫn chưa chắc: “Xin lỗi, quý vị có thể nói rõ cụm ‘recognition of prior learning’ ở đây nghĩa là gì không?”',
    },
    explanation: {
      en: 'Describing the function is honest and useful; inventing a polished term is not. A clarification question costs seconds and is normal professional practice.',
      vi: 'Mô tả chức năng là trung thực và hữu ích; bịa một thuật ngữ nghe hoàn hảo thì không. Một câu hỏi làm rõ tốn vài giây và là thực hành nghề bình thường.',
    },
    advice: [
      { en: 'Describe what the thing does when you lack the label.', vi: 'Mô tả chức năng khi thiếu nhãn gọi.' },
      { en: 'Keep a “clarify” phrase ready in both languages.', vi: 'Chuẩn bị sẵn một câu “làm rõ” ở cả hai ngôn ngữ.' },
      { en: 'Write the term down and add it to your glossary immediately afterwards.', vi: 'Ghi lại thuật ngữ và bổ sung ngay vào bảng thuật ngữ sau đó.' },
    ],
    relatedTerms: ['credit-transfer', 'learning-agreement'],
  },
  {
    id: 'fast-speakers',
    number: 6,
    title: { en: 'Managing fast speakers', vi: 'Xử lý người nói nhanh' },
    problem: {
      en: 'A speaker accelerates as they get excited, and the interpreter follows until the output becomes unintelligible and incomplete.',
      vi: 'Diễn giả nói nhanh dần khi hào hứng, phiên dịch viên chạy theo đến khi bản dịch trở nên khó hiểu và thiếu ý.',
    },
    example: {
      en: 'Source at 200 words per minute: “and so what we’re proposing is essentially a phased roll-out across three faculties beginning in the autumn — really a pilot, but with the ambition of scaling to the whole institution by 2029, subject to review.” Flawed: a rushed, half-finished Vietnamese sentence.',
      vi: 'Nguồn khoảng 200 từ mỗi phút: “and so what we’re proposing is essentially a phased roll-out across three faculties beginning in the autumn — really a pilot, but with the ambition of scaling to the whole institution by 2029, subject to review.” Bản dịch lỗi: một câu tiếng Việt vội vàng, dở dang.',
    },
    better: {
      en: '“Chúng tôi đề xuất triển khai theo từng giai đoạn tại ba khoa, bắt đầu từ mùa thu. Trước mắt là thí điểm, với mục tiêu mở rộng toàn trường vào năm 2029, có rà soát lại.”',
      vi: '“Chúng tôi đề xuất triển khai theo từng giai đoạn tại ba khoa, bắt đầu từ mùa thu. Trước mắt là thí điểm, với mục tiêu mở rộng toàn trường vào năm 2029, có rà soát lại.”',
    },
    explanation: {
      en: 'Two sentences instead of one long one, with the structure preserved: phased, three faculties, autumn, pilot, 2029, review. Splitting is not omission — it is comprehension made possible.',
      vi: 'Hai câu thay vì một câu dài, giữ nguyên các ý: theo giai đoạn, ba khoa, mùa thu, thí điểm, năm 2029, rà soát. Tách câu không phải lược bỏ — đó là cách giúp người nghe hiểu được.',
    },
    advice: [
      { en: 'Ask the chair at the start to slow speakers down; it is easier before than during.', vi: 'Đề nghị chủ tọa nhắc diễn giả nói chậm ngay từ đầu; dễ hơn nhiều so với làm giữa phiên.' },
      { en: 'Split the output at logical boundaries rather than compressing content.', vi: 'Tách câu đích ở ranh giới lô-gíc thay vì nén nội dung.' },
      { en: 'Protect numbers first; if you must lose something, lose adjectives.', vi: 'Bảo vệ số liệu trước tiên; nếu buộc phải mất, hãy mất tính từ.' },
    ],
  },
  {
    id: 'unclear-audio',
    number: 7,
    title: { en: 'Dealing with unclear audio', vi: 'Xử lý âm thanh không rõ' },
    problem: {
      en: 'Audio is muffled, the speaker turns away, or the microphone picks up the room instead of the voice. Interpreting then becomes guesswork presented as fact.',
      vi: 'Âm thanh bị bóp, người nói quay đi, hoặc micro thu cả phòng thay vì giọng nói. Việc phiên dịch trở thành phỏng đoán được trình bày như sự thật.',
    },
    example: {
      en: 'Unclear: “…the MOU expires in [inaudible].” Flawed: “Biên bản ghi nhớ có hiệu lực đến năm 2027” — a guessed date.',
      vi: 'Không rõ: “…the MOU expires in [inaudible].” Bản dịch lỗi: “Biên bản ghi nhớ có hiệu lực đến năm 2027” — một mốc ngày đoán mò.',
    },
    better: {
      en: '“Tôi xin lỗi, phần âm thanh bị mất. Quý vị có thể nhắc lại mốc thời gian của biên bản ghi nhớ không?”',
      vi: '“Tôi xin lỗi, phần âm thanh bị mất. Quý vị có thể nhắc lại mốc thời gian của biên bản ghi nhớ không?”',
    },
    explanation: {
      en: 'A guessed date in an agreement discussion is a material error. Asking is boring and correct; guessing is fluent and wrong.',
      vi: 'Một mốc ngày đoán mò trong thảo luận thỏa thuận là sai sót trọng yếu. Hỏi lại thì nhàm chán nhưng đúng; đoán thì trôi chảy nhưng sai.',
    },
    advice: [
      { en: 'Test audio in the actual room, with the actual microphones, before the session.', vi: 'Kiểm tra âm thanh tại chính phòng đó, với chính micro đó, trước phiên.' },
      { en: 'Agree a hand signal with the chair for “repeat that”.', vi: 'Thống nhất tín hiệu tay với chủ tọa cho ý “nhắc lại”.' },
    ],
    relatedTerms: ['interpretation-booth', 'headset-receiver'],
  },
  {
    id: 'omission',
    number: 8,
    title: { en: 'Avoiding information omission', vi: 'Tránh bỏ sót thông tin' },
    problem: {
      en: 'Under time pressure, small words disappear: negations, conditions, and hedges. These are precisely the words that carry the agreement.',
      vi: 'Dưới áp lực thời gian, những từ nhỏ biến mất: phủ định, điều kiện và sắc thái giảm nhẹ. Đây đúng là những từ mang nội dung thỏa thuận.',
    },
    example: {
      en: 'Source: “We could sign in June, provided the annex is ready.” Flawed: “Chúng tôi có thể ký vào tháng Sáu.”',
      vi: 'Nguồn: “We could sign in June, provided the annex is ready.” Bản dịch lỗi: “Chúng tôi có thể ký vào tháng Sáu.”',
    },
    better: {
      en: '“Chúng tôi có thể ký vào tháng Sáu, với điều kiện phụ lục đã sẵn sàng.”',
      vi: '“Chúng tôi có thể ký vào tháng Sáu, với điều kiện phụ lục đã sẵn sàng.”',
    },
    explanation: {
      en: 'The condition is the substance. With it removed, the sentence becomes a commitment the speaker did not make.',
      vi: 'Điều kiện chính là nội dung thực chất. Bỏ đi, câu trở thành một cam kết mà người nói không hề đưa ra.',
    },
    advice: [
      { en: 'Listen for provided that, unless, subject to, only if — and note them in capitals.', vi: 'Chú ý tới provided that, unless, subject to, only if — và ghi chúng bằng chữ hoa.' },
      { en: 'Check your output for the condition before you finish the sentence.', vi: 'Kiểm tra lại điều kiện trong bản dịch trước khi kết thúc câu.' },
    ],
    relatedTerms: ['annex', 'memorandum-of-understanding'],
  },
  {
    id: 'neutrality',
    number: 9,
    title: { en: 'Maintaining professional neutrality', vi: 'Giữ trung lập nghề nghiệp' },
    problem: {
      en: 'The interpreter agrees with one side, or dislikes the other, and the rendering quietly shifts: a criticism becomes a suggestion, a hesitation becomes enthusiasm.',
      vi: 'Phiên dịch viên đồng tình với một bên hoặc không thích bên kia, và bản dịch lặng lẽ thay đổi: lời phê bình thành đề xuất, sự dè dặt thành hào hứng.',
    },
    example: {
      en: 'Source: “I am not convinced the timeline is realistic.” Flawed: “Chúng tôi nghĩ có thể điều chỉnh tiến độ.”',
      vi: 'Nguồn: “I am not convinced the timeline is realistic.” Bản dịch lỗi: “Chúng tôi nghĩ có thể điều chỉnh tiến độ.”',
    },
    better: {
      en: '“Tôi chưa thấy tiến độ này khả thi.”',
      vi: '“Tôi chưa thấy tiến độ này khả thi.”',
    },
    explanation: {
      en: 'The flawed version invents a proposal. The better version renders disagreement and stops. Interpreting disagreement accurately is not rudeness; softening it is a change of position.',
      vi: 'Bản lỗi bịa ra một đề xuất. Bản đúng chuyển đạt sự bất đồng rồi dừng. Dịch đúng sự bất đồng không phải bất lịch sự; làm mềm nó là thay đổi lập trường.',
    },
    advice: [
      { en: 'If you notice yourself wanting a particular outcome, that is the signal to slow down.', vi: 'Nếu thấy mình mong một kết quả cụ thể, đó là dấu hiệu cần chậm lại.' },
      { en: 'Render criticism as criticism, with the same degree of directness.', vi: 'Chuyển đạt phê bình như phê bình, giữ nguyên mức độ trực tiếp.' },
    ],
    relatedTerms: ['memorandum-of-understanding', 'protocol'],
  },
  {
    id: 'machine-translation',
    number: 10,
    title: { en: 'Using machine translation responsibly', vi: 'Dùng máy dịch có trách nhiệm' },
    problem: {
      en: 'A machine rendering is pasted into an official document or spoken aloud in a meeting without review. The output is fluent enough to be trusted and wrong enough to matter.',
      vi: 'Bản dịch máy được dán vào văn bản chính thức hoặc đọc lên trong cuộc họp mà không rà soát. Kết quả đủ trôi chảy để được tin và đủ sai để gây hậu quả.',
    },
    example: {
      en: 'Machine output: “Memorandum of Understanding” rendered as “Bản ghi nhớ hiểu biết”. Flawed because “biên bản ghi nhớ” is the established document name.',
      vi: 'Kết quả máy dịch: “Memorandum of Understanding” thành “Bản ghi nhớ hiểu biết”. Sai vì “biên bản ghi nhớ” mới là tên văn bản đã ổn định.',
    },
    better: {
      en: 'Use the tool to draft, then check every term with a documented equivalent, every number, and every negation before it is spoken or signed.',
      vi: 'Dùng công cụ để tạo bản nháp, rồi kiểm tra mọi thuật ngữ đã có tương đương chuẩn, mọi con số và mọi phủ định trước khi nói hoặc ký.',
    },
    explanation: {
      en: 'Machine translation is reliable for gist and unreliable for terminology, numbers, and legal effect. The combination is exactly what an education agreement consists of.',
      vi: 'Máy dịch đáng tin ở mức nắm ý và không đáng tin về thuật ngữ, số liệu và hiệu lực pháp lý. Mà một thỏa thuận giáo dục lại đúng là tổ hợp của những thứ đó.',
    },
    advice: [
      { en: 'Never read an unreviewed machine translation aloud at a formal event.', vi: 'Không bao giờ đọc bản dịch máy chưa rà soát tại sự kiện trang trọng.' },
      { en: 'Use the tool for speed on drafts, and a glossary for accuracy on terms.', vi: 'Dùng công cụ để tăng tốc bản nháp, dùng bảng thuật ngữ để đảm bảo độ chính xác.' },
      { en: 'Disclose machine assistance when a document will be signed on the basis of it.', vi: 'Nêu rõ có sự hỗ trợ của máy khi một văn bản sẽ được ký dựa trên bản dịch đó.' },
    ],
    relatedTerms: ['memorandum-of-understanding', 'academic-title', 'tuition-fee-waiver'],
  },
];
