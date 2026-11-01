# HIT Learning Space — Design system

Source: https://designmd.me/s/admin-test-hithaui-e1aue

Tiêu chí rà soát dựa trên hướng dẫn do người dùng cung cấp. Bản gốc và báo cáo kiểm tra được giữ cục bộ tại `docs/agent-design-guide.md` và `docs/layout-review.md`, không xuất bản cùng mã nguồn.

## Foundation

HTML, Tailwind CSS 4 và JavaScript thuần. Giao diện dành cho việc đọc tài liệu dài; chuyển động nhẹ, nội dung là trọng tâm. Nhận diện HIT được thể hiện qua cam thương hiệu, navy, Roboto và các bề mặt sạch.

Tailwind được biên dịch bằng PostCSS trong bước build. Entry `web/assets/styles.css` khai báo theme HIT và nguồn quét class; component dùng `@apply` trong `web/styles/components.css`, token nằm trong `web/styles/tokens.css`, keyframe trong `web/styles/motion.css`. Không bật Preflight để giữ cách trình bày Markdown, code và biểu mẫu hiện tại. Utility viết trực tiếp trong HTML/JS có thể tùy biến component; các trạng thái ẩn phải dùng `hidden`, `intro:hidden` hoặc selector tương ứng để không bị utility display ghi đè. Xem `web/styles/README.md` để tái sử dụng component.

| Token | Sáng | Vai trò |
| --- | --- | --- |
| `--primary` | `#F47B2A` | CTA, thương hiệu, tiến độ |
| `--primary-hover` | `#DB6E26` | Hover CTA |
| `--on-primary` | `#222222` | Chữ trên cam, đảm bảo độ tương phản |
| `--accent` | `#1E293B` | Tiêu đề |
| `--body` | `#374151` | Nội dung |
| `--muted` | `#5D6B7B` | Chú thích |
| `--surface` | `#FFFFFF` | Header, panel, menu |
| `--canvas` | `#F5F6F8` | Nền trang dịu, tách bề mặt đọc trắng |
| `--hairline` | `#E5E7EB` | Viền, phân cách |
| `--soft` | `#FFF2E8` | Nền trạng thái đang chọn |
| `--link` | `#F47B2A` | Liên kết chữ, trạng thái active; giống nhau ở hai theme theo yêu cầu |
| `--focus` | `#A84608` | Focus bàn phím |
| `--control-border` | `#8290A1` | Ranh giới ô tìm kiếm/điều khiển |

Theme tối thay đổi semantic tokens trong `[data-theme=dark]`; cam thương hiệu giữ nguyên. Mặc định theo hệ điều hành, lựa chọn thủ công lưu ở `hit-theme`.

Liên kết dùng chính xác cam thương hiệu theo yêu cầu. Trên nền trắng, cặp màu này có tương phản khoảng 2,72:1; không được tính là đạt kiểm tra chữ thường 4,5:1. Kiểm thử tương phản chữ áp dụng cho body, muted và heading; focus và viền điều khiển tiếp tục dùng token riêng.

## Typography & spacing

- Tiêu đề dùng Lora, weight 600–700; fallback Georgia/serif. Nội dung, sidebar, mục lục và nút vẫn dùng Roboto/system sans-serif. Code dùng Consolas/monospace.
- Bài đọc 1rem/1.75; h1 1.875rem (mobile 1.625rem), h2 1.4375rem, h3 1.1875rem. Giới hạn nội dung bài khoảng 72ch.
- Navigation .875rem, chú thích .75rem. Các kích thước đọc bài mở rộng từ mẫu trang đăng nhập 12px; dùng rem để hỗ trợ phóng to chữ.
- Spacing unit 4px: 4, 8, 12, 16, 24, 32, 40px.
- Radius 8px input, 12px CTA/panel; shadow nhẹ. Tiêu đề dùng navy; liên kết giữ cam thương hiệu.

## Components

- Primary button: cam, chữ tối 700, cao tối thiểu 48px. Secondary button: nền surface, viền hairline. Icon button: 44×44px.
- Sidebar: các mục “Tuần 1” đến tuần cuối theo thứ tự tăng dần; details/summary mở đóng bằng bàn phím, bài hiện tại có viền cam và nền soft. Tiêu đề xuất hiện nhẹ theo lượt, hover dịch 3px, mũi tên xoay và tài liệu fade/slide khi mở; chiều cao accordion chuyển động 300ms. Tôn trọng reduced-motion.
- Tabs: liên kết thật để có thể sao chép đường dẫn; mục đang chọn có gạch cam, tài liệu chưa có hiện nhãn rõ ràng.
- Lesson list: hàng phẳng, số buổi và trạng thái tài liệu, phân cách mỏng.
- Search: dialog native, input có label, kết quả truy cập bằng Tab/Enter, đóng Escape và trả focus tự động.
- Code: nền navy cố định, syntax highlighting, toolbar ngôn ngữ và nút sao chép. Bảng cuộn riêng khi rộng.
- Progress: nhãn số và thanh phần trăm; không dùng màu làm tín hiệu duy nhất.
- Image viewer: nút native bao ảnh; dialog native hỗ trợ Escape, nút đóng, bấm ngoài và trả focus. Ảnh PNG/JPEG trong Markdown có width/height từ build; ảnh lỗi có mô tả và nút tải lại. Ảnh ngoài hoặc định dạng khác nên khai báo kích thước sẵn trong nội dung.
- Error state: giải thích ngắn, thử lại, về trang chủ.

## Layout & motion

- Tổng quan khóa học là stepper dọc theo ảnh tham khảo: mốc tròn có số, đoạn nối mảnh có khoảng hở, tiêu đề ở trên và mô tả tuần/trạng thái ở dưới. Đã hoàn thành dùng dấu tích; tuần đang học có vòng kép màu cam; chưa có tài liệu dùng màu chữ phụ. Trạng thái lấy từ tiến độ thật và bài gần nhất, mặc định là tuần đầu có tài liệu chưa hoàn thành. Các tài liệu sẵn có luôn truy cập được, không khóa theo bước.
- Header desktop 4.5rem, mobile 4rem; sidebar 16rem. Reader giới hạn 72ch, mục lục 13rem.
- Logo dùng nguyên bản `Lesson1/img/logo-02.png`, có kích thước ảnh khai báo sẵn. Nút ở đầu header thu gọn/mở rộng sidebar trên desktop và ghi nhớ lựa chọn; trên mobile nút mở/đóng drawer. Primary thương hiệu giữ chính xác `#F47B2A`.
- Điều hướng bài dùng vai trò `pagination-prev`/`pagination-next`: bài trước luôn căn trái, bài sau luôn căn phải, kể cả khi chỉ còn một liên kết.
- Mục lục chuyển thành details khi viewport dưới 1280px hoặc vùng nội dung dưới 64rem. Dưới 768px, menu chuyển thành drawer tối đa 18rem với overlay, focus trap và inert khi đóng.
- Giao diện sáng có nền trang xám nhẹ, header/sidebar trắng và vùng đọc trắng với padding linh hoạt, viền mảnh. Không thêm bóng lớn; giao diện tối giữ bề mặt và padding cũ. Cam dành cho liên kết, CTA và trạng thái chọn.
- Chuyển bài: nội dung cũ fade 110ms, thay nội dung rồi fade/translate từ 8px lên trong 300ms. Header/sidebar giữ ổn định. Bấm nhanh hoặc Back/Forward hủy hiệu ứng cũ, chỉ URL mới nhất được hiển thị. Liên kết mục trong bài chỉ cuộn/focus tới heading; cập nhật Markdown local giữ vị trí, không chạy chuyển bài.
- Drawer 320ms; hover nút dịch 2px. `prefers-reduced-motion` và trình duyệt thiếu Web Animations đổi trạng thái ngay.
- Sticky mục lục, heading có scroll-margin tránh header; không có chuyển động lặp hoặc hiệu ứng 3D gây phân tâm.
- Khi chọn mục lục, danh sách mobile được đóng và focus chuyển tới heading; header và control không lấy focus khi drawer đang mở.
- Nút Ẩn/Hiện mục lục ở cạnh breadcrumb áp dụng cho cả mục lục desktop và mục lục mobile, có aria-expanded/aria-controls và ghi nhớ lựa chọn theo trình duyệt. Khi ẩn, vùng đọc vẫn giữ giới hạn độ rộng.
- Mục lục desktop fade/dịch ngang 8px cùng cột Grid 13rem→0rem và gap trong 320ms; bên trong giữ rộng 13rem tránh bóp chữ. Mobile/tablet chuyển chiều cao thực tế và opacity trong 300ms. Nhãn, aria-expanded và lưu lựa chọn cập nhật ngay; mục lục đóng nhận inert ngay, hidden sau hiệu ứng. Mở lại hoặc chuyển bài hủy animation cũ; không cuộn về đầu bài khi ẩn/hiện.
- Giữ hệ thống màu/kích thước trong CSS variables, không áp dụng stylesheet bài mẫu vào app.

## Data & accessibility

Markdown được compile bằng marked, code highlight bằng highlight.js tại build; HTML được làm sạch bằng DOMPurify trước khi hiển thị. Đường dẫn ảnh được giải theo vị trí file Markdown. LocalStorage chỉ chứa lựa chọn giao diện, bài gần nhất và ID bài đã hoàn thành, không chứa tài khoản.

Có skip link, landmark, focus-visible, aria-current, aria-pressed, nhãn ảnh, vùng báo trạng thái, reduced-motion và menu bàn phím. Nội dung HTML minh họa trong code fence luôn hiển thị dạng code; để render biểu mẫu thực hành, liên kết tới file HTML riêng.

## Course intro

Intro đặt trên roadmap, dùng Lora cho tiêu đề lớn, Roboto cho nội dung, nút cam HIT và nền grid mờ. Nút bắt đầu/tiếp tục mở bài gần nhất hợp lệ hoặc bài đầu tiên. Số buổi lấy từ curriculum; không hiển thị số câu hỏi hay thời gian giả. Nội dung xuất hiện lần lượt trong 650ms, hai khối minh họa trôi nhẹ theo chu kỳ 7s; tắt animation với reduced-motion. Mobile bỏ các khối trang trí, thông tin khóa học xếp dọc. Theme tối dùng semantic surface/body/hairline của website.

## Standalone intro (updated)

Luồng chính: `/` hoặc `#/` là intro toàn màn hình; `#/overview` là tổng quan có header/sidebar. Nút Học ngay đi tới tổng quan; các link về khóa học cũng đi tới tổng quan. Đường dẫn bài Markdown giữ nguyên. Cấu trúc intro tham khảo `page/intro.html` và các lớp `oq-intro` trong source RAR người dùng cung cấp; chỉ dùng phần giao diện intro, không đưa archive hay dữ liệu Git của archive lên web. Motion được cài qua npm, đóng gói cùng website, điều khiển reveal, floating cards và pulse nodes lặp vô hạn. Có nút tạm dừng/tiếp tục, dừng animation khi rời intro và tôn trọng reduced-motion.

Intro có hai chùm bóng bay cam–trắng bằng SVG inline (không tải ảnh mới), Motion chỉ animate transform trong 6,5–9,25 giây, lệch nhịp giữa các quả. Desktop 3 quả mỗi bên, mobile 1 quả mỗi bên; không khởi tạo animation cho bóng đang ẩn. Dùng chung nút tạm dừng, tự pause khi tab bị ẩn và tôn trọng reduced-motion. Animation xuất hiện nội dung tách riêng để nút tạm dừng không làm nội dung mắc kẹt ở opacity thấp.

## Reading and course status updates

Tổng quan hiển thị bài gần nhất hợp lệ và tiến độ theo số tài liệu có nội dung, loại bỏ ID hoàn thành không còn tồn tại khỏi phép đếm. Tiến độ lưu riêng trên trình duyệt, không tính tuần trống. Sidebar ghi Sắp cập nhật ngay trên summary của tuần thiếu tài liệu. Giữ khung đọc rộng cho code/bảng/ảnh, giới hạn riêng p/ul/ol/blockquote/dl ở 85ch. Accordion lưu trạng thái mở mong muốn và hủy animation cũ khi bấm nhanh. Khi bật reduced-motion, chốt accordion ngay và dừng hiệu ứng; tắt lại sẽ khởi động vòng lặp intro, tôn trọng nút tạm dừng thủ công. Request content.json có timeout 12 giây bao gồm đọc JSON và được hủy nếu có lần tải mới; lỗi hiện nút thử lại.

## Interactive HTML Form exercises

Nhóm thực hành nằm ngay sau ví dụ Form trong Buổi 2. Desktop chia code/preview hai cột; dưới 1100px xếp dọc. Ô điền code và nút có vùng bấm tối thiểu 44px; code cuộn riêng, preview có nhãn và ghi rõ không gửi dữ liệu. Kết quả có chữ và ký hiệu, không chỉ dùng màu; ô sai dùng aria-invalid/aria-describedby và focus ô sai đầu tiên khi chấm. Nhóm hiển thị tiến độ thực hành riêng, giữ theme hiện tại và cập nhật preview khi đổi theme. Không thêm animation vào bài tập. Tài liệu khai báo bằng exercises.json và marker exercise trong Markdown; dữ liệu được kiểm tra lúc build.

## Markdown notebook fixes

Sổ tay lấy nội dung từ LessonN/notebook.md qua build vào lesson.notebook, badge và dialog dùng chung nguồn. Không còn dữ liệu lỗi viết cứng trong JS hay fallback sang tuần không liên quan. Lưới hai trang nằm trong notebook-3d-stage; mobile một trang với bước điều hướng 1, desktop bước 2. Tờ lật chỉ xuất hiện trong animation, không phủ nội dung/sao chép khi đứng yên; đóng/chuyển bài hủy hiệu ứng và trả overflow/focus. Bấm nhanh ưu tiên chỉ số mới nhất, reduced-motion đổi trang ngay. Không lật trang khi người dùng chỉ bấm hoặc chọn văn bản trong trang.

Sổ tay lỗi hiện dùng bố cục tài liệu như Lý thuyết: nội dung cuộn dọc, mục lục đầu trang, prose và code có nút sao chép. Bỏ kiểu sách lật và giấy kẻ dòng; nội dung vẫn lấy từ Markdown.

Khung thực hành HTML Form: hai cột bằng nhau, trái là tab Nội dung/Trình duyệt, phải là textarea nền navy có số dòng và thanh index.html. Dưới 760px xếp dọc. Tab dùng ARIA và phím mũi tên/Home/End; textarea dùng Tab để thoát, Ctrl/Command+Enter để chạy. Preview nền trắng như trình duyệt, không phụ thuộc theme của editor. Không thêm animation trong khi nhập.

Toàn bộ bài thực hành Form dùng chung workspace HTML đầy đủ: nội dung, nút kiểm tra, gợi ý và phản hồi nằm trong tab trái; editor phải có số dòng và chức năng chạy/khôi phục. Không còn ô điền xen giữa code hoặc preview cạnh code theo kiểu cũ.

Responsive: khung thực hành chọn số cột theo chiều rộng khả dụng (mỗi cột tối thiểu 22rem), tablet/điện thoại <=1100px xếp dọc. Nội dung và phản hồi không bị nhốt trong vùng cuộn ngắn trên mobile; editor/preview có chiều cao theo viewport và code cuộn riêng. Điện thoại dùng chữ editor 16px, nút từ 44px. Dialog sổ tay dùng flex với vùng đọc tự co, không trừ chiều cao header cố định. Kiểm tra 320/390/768/1024/1440px cùng intro, tổng quan và bài học.

Quy tắc mới: mỗi bài lý thuyết chỉ hiển thị một workspace thực hành tổng hợp ở cuối bài. Bài 1: HTML đầu tiên và công cụ/Git; Bài 2: HTML Form; Bài 3: CSS. Không hiển thị ba bài Form riêng lẻ hoặc tiến độ 0/3 nữa.

Sổ tay cá nhân thay giao diện đọc ghi chú soạn sẵn: bộ chọn tuần, tab Soạn thảo/Xem trước, toolbar Markdown nhỏ, vùng viết rộng và trạng thái lưu ở chân. Trống khi mở lần đầu, không hiển thị badge đếm lỗi cũ. Giữ nhãn (demo). Lưu cá nhân theo trình duyệt, nút tải Markdown luôn hiện, mobile tự xuống dòng và dùng textarea 16px. Preview dùng marked + DOMPurify, không chạy script hay tải ảnh.

Quiz cuối buổi: một khối duy nhất sau thực hành, mỗi lượt hiện một câu với 3–4 lựa chọn. Radio lớn dễ bấm, nút Kiểm tra chỉ bật sau khi chọn. Sau khi chấm khóa đáp án, hiện giải thích và link Ôn lại cho câu sai; dùng chữ/ký hiệu kèm màu. Có tiến độ, tổng kết điểm và làm lại câu sai/toàn bộ. Layout giữ HIT orange, navy và font hiện có; dưới 600px nút chính toàn chiều rộng, lựa chọn/code tự xuống dòng. Focus chuyển tới phản hồi hoặc câu tiếp theo; không tự thay đổi trạng thái hoàn thành bài học. Nội dung ở LessonN/quiz.md, build kiểm tra link heading, lưu tiến độ theo revision.
