# HIT Learning Space — Design system

Source: https://designmd.me/s/admin-test-hithaui-e1aue

Tiêu chí rà soát dựa trên hướng dẫn do người dùng cung cấp. Bản gốc và báo cáo kiểm tra được giữ cục bộ tại `docs/agent-design-guide.md` và `docs/layout-review.md`, không xuất bản cùng mã nguồn.

## Foundation

HTML/CSS/JavaScript thuần. Giao diện dành cho việc đọc tài liệu dài; chuyển động nhẹ, nội dung là trọng tâm. Nhận diện HIT được thể hiện qua cam thương hiệu, navy, Roboto và các bề mặt sạch.

| Token | Sáng | Vai trò |
| --- | --- | --- |
| `--primary` | `#F47B2A` | CTA, thương hiệu, tiến độ |
| `--primary-hover` | `#DB6E26` | Hover CTA |
| `--on-primary` | `#222222` | Chữ trên cam, đảm bảo độ tương phản |
| `--accent` | `#1E293B` | Tiêu đề |
| `--body` | `#374151` | Nội dung |
| `--muted` | `#5D6B7B` | Chú thích |
| `--surface` | `#FFFFFF` | Header, panel, menu |
| `--canvas` | `#FAFBFC` | Nền trang |
| `--hairline` | `#E5E7EB` | Viền, phân cách |
| `--soft` | `#FFF2E8` | Nền trạng thái đang chọn |
| `--link` | `#AD4C0C` | Liên kết chữ, trạng thái active |
| `--focus` | `#A84608` | Focus bàn phím |
| `--control-border` | `#8290A1` | Ranh giới ô tìm kiếm/điều khiển |

Theme tối thay đổi semantic tokens trong `[data-theme=dark]`; cam thương hiệu giữ nguyên. Mặc định theo hệ điều hành, lựa chọn thủ công lưu ở `hit-theme`.

## Typography & spacing

- Font Roboto; fallback system sans-serif. Code dùng Consolas/monospace.
- Bài đọc 1rem/1.75; h1 1.875rem (mobile 1.625rem), h2 1.4375rem, h3 1.1875rem. Giới hạn nội dung bài khoảng 72ch.
- Navigation .875rem, chú thích .75rem. Các kích thước đọc bài mở rộng từ mẫu trang đăng nhập 12px; dùng rem để hỗ trợ phóng to chữ.
- Spacing unit 4px: 4, 8, 12, 16, 24, 32, 40px.
- Radius 8px input, 12px CTA/panel; shadow nhẹ. Màu chữ tiêu đề và liên kết được làm đậm hơn bản trích xuất để tăng độ tương phản.

## Components

- Primary button: cam, chữ tối 700, cao tối thiểu 48px. Secondary button: nền surface, viền hairline. Icon button: 44×44px.
- Sidebar: các mục “Tuần 1” đến tuần cuối theo thứ tự tăng dần; details/summary mở đóng bằng bàn phím, bài hiện tại có viền cam và nền soft. Tiêu đề xuất hiện nhẹ theo lượt, hover dịch 3px, mũi tên xoay và tài liệu fade/slide khi mở; chiều cao accordion chuyển động 200ms. Tôn trọng reduced-motion.
- Tabs: liên kết thật để có thể sao chép đường dẫn; mục đang chọn có gạch cam, tài liệu chưa có hiện nhãn rõ ràng.
- Lesson list: hàng phẳng, số buổi và trạng thái tài liệu, phân cách mỏng.
- Search: dialog native, input có label, kết quả truy cập bằng Tab/Enter, đóng Escape và trả focus tự động.
- Code: nền navy cố định, syntax highlighting, toolbar ngôn ngữ và nút sao chép. Bảng cuộn riêng khi rộng.
- Progress: nhãn số và thanh phần trăm; không dùng màu làm tín hiệu duy nhất.
- Image viewer: nút native bao ảnh; dialog native hỗ trợ Escape, nút đóng, bấm ngoài và trả focus. Ảnh PNG/JPEG trong Markdown có width/height từ build; ảnh lỗi có mô tả và nút tải lại. Ảnh ngoài hoặc định dạng khác nên khai báo kích thước sẵn trong nội dung.
- Error state: giải thích ngắn, thử lại, về trang chủ.

## Layout & motion

- Tổng quan khóa học là roadmap dọc một cột: tiêu đề ngắn, các buổi theo thứ tự số tăng dần, mốc tròn nối bằng đường thẳng; mỗi buổi có chủ đề và liên kết tài liệu. Mốc hoàn thành có dấu tích kèm nhãn chữ. Không dùng hero quảng bá hoặc panel tiến độ trên trang tổng quan.
- Header desktop 4.5rem, mobile 4rem; sidebar 16rem. Reader giới hạn 72ch, mục lục 13rem.
- Logo dùng nguyên bản `Lesson1/img/logoHIT.png`, có kích thước ảnh khai báo sẵn. Nút ở đầu header thu gọn/mở rộng sidebar trên desktop và ghi nhớ lựa chọn; trên mobile nút mở/đóng drawer. Primary thương hiệu giữ chính xác `#F47B2A`.
- Điều hướng bài dùng vai trò `pagination-prev`/`pagination-next`: bài trước luôn căn trái, bài sau luôn căn phải, kể cả khi chỉ còn một liên kết.
- Mục lục chuyển thành details khi viewport dưới 1280px hoặc vùng nội dung dưới 64rem. Dưới 768px, menu chuyển thành drawer tối đa 18rem với overlay, focus trap và inert khi đóng.
- Chuyển bài fade/translate 200ms; drawer 220ms; hover nút dịch 2px. Respect `prefers-reduced-motion`.
- Sticky mục lục, heading có scroll-margin tránh header; không có chuyển động lặp hoặc hiệu ứng 3D gây phân tâm.
- Khi chọn mục lục, danh sách mobile được đóng và focus chuyển tới heading; header và control không lấy focus khi drawer đang mở.
- Giữ hệ thống màu/kích thước trong CSS variables, không áp dụng stylesheet bài mẫu vào app.

## Data & accessibility

Markdown được compile bằng marked, code highlight bằng highlight.js tại build; HTML được làm sạch bằng DOMPurify trước khi hiển thị. Đường dẫn ảnh được giải theo vị trí file Markdown. LocalStorage chỉ chứa lựa chọn giao diện, bài gần nhất và ID bài đã hoàn thành, không chứa tài khoản.

Có skip link, landmark, focus-visible, aria-current, aria-pressed, nhãn ảnh, vùng báo trạng thái, reduced-motion và menu bàn phím. Nội dung HTML minh họa trong code fence luôn hiển thị dạng code; để render biểu mẫu thực hành, liên kết tới file HTML riêng.
