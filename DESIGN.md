# HIT Learning Space — Design system

Source: https://designmd.me/s/admin-test-hithaui-e1aue

## Foundation

HTML/CSS/JavaScript thuần. Giao diện dành cho việc đọc tài liệu dài; chuyển động nhẹ, nội dung là trọng tâm. Nhận diện HIT được thể hiện qua cam thương hiệu, navy, Roboto và các bề mặt sạch.

| Token | Sáng | Vai trò |
| --- | --- | --- |
| `--primary` | `#F47B2A` | CTA, thương hiệu, tiến độ |
| `--primary-hover` | `#DB6E26` | Hover CTA |
| `--on-primary` | `#222222` | Chữ trên cam, đảm bảo độ tương phản |
| `--accent` | `#1E293B` | Tiêu đề |
| `--body` | `#374151` | Nội dung |
| `--muted` | `#687383` | Chú thích |
| `--surface` | `#FFFFFF` | Header, panel, menu |
| `--canvas` | `#FAFBFC` | Nền trang |
| `--hairline` | `#E5E7EB` | Viền, phân cách |
| `--soft` | `#FFF2E8` | Nền trạng thái đang chọn |
| `--link` | `#AD4C0C` | Liên kết chữ, trạng thái active |
| `--focus` | `#80BDFF` | Focus bàn phím |

Theme tối thay đổi semantic tokens trong `[data-theme=dark]`; cam thương hiệu giữ nguyên. Mặc định theo hệ điều hành, lựa chọn thủ công lưu ở `hit-theme`.

## Typography & spacing

- Font Roboto; fallback system sans-serif. Code dùng Consolas/monospace.
- Bài đọc 16px/1.75; h1 30px (mobile 26px), h2 23px, h3 19px. Hero 32–48px.
- Navigation 12–14px, chú thích 10–12px. Các kích thước đọc bài mở rộng từ mẫu trang đăng nhập 12px.
- Spacing unit 4px: 4, 8, 12, 16, 24, 32, 40px.
- Radius 8px input, 12px CTA/panel; shadow nhẹ. Màu chữ tiêu đề và liên kết được làm đậm hơn bản trích xuất để tăng độ tương phản.

## Components

- Primary button: cam, chữ tối 700, cao tối thiểu 48px. Secondary button: nền surface, viền hairline. Icon button: 44×44px.
- Sidebar: nhóm bài học, details/summary mở đóng bằng bàn phím, bài hiện tại có viền cam và nền soft.
- Tabs: liên kết thật để có thể sao chép đường dẫn; mục đang chọn có gạch cam, tài liệu chưa có hiện nhãn rõ ràng.
- Lesson list: hàng phẳng, số buổi và trạng thái tài liệu, phân cách mỏng.
- Search: dialog native, input có label, kết quả truy cập bằng Tab/Enter, đóng Escape và trả focus tự động.
- Code: nền navy cố định, syntax highlighting, toolbar ngôn ngữ và nút sao chép. Bảng cuộn riêng khi rộng.
- Progress: nhãn số và thanh phần trăm; không dùng màu làm tín hiệu duy nhất.
- Image viewer: dialog native; Escape, nút đóng và bấm ngoài; ảnh giữ nguyên tỉ lệ.
- Error state: giải thích ngắn, thử lại, về trang chủ.

## Layout & motion

- Header desktop 76px, mobile 64px; sidebar 264px. Reader tối đa 800px, mục lục 220px.
- Dưới 1200px, mục lục chuyển thành details ở đầu bài. Dưới 768px, menu chuyển thành drawer 280px với overlay, focus trap và inert khi đóng.
- Chuyển bài fade/translate 200ms; drawer 220ms; hover nút dịch 2px. Respect `prefers-reduced-motion`.
- Sticky mục lục, heading có scroll-margin tránh header; không có chuyển động lặp hoặc hiệu ứng 3D gây phân tâm.
- Giữ hệ thống màu/kích thước trong CSS variables, không áp dụng stylesheet bài mẫu vào app.

## Data & accessibility

Markdown được compile bằng marked, code highlight bằng highlight.js tại build; HTML được làm sạch bằng DOMPurify trước khi hiển thị. Đường dẫn ảnh được giải theo vị trí file Markdown. LocalStorage chỉ chứa lựa chọn giao diện, bài gần nhất và ID bài đã hoàn thành, không chứa tài khoản.

Có skip link, landmark, focus-visible, aria-current, aria-pressed, nhãn ảnh, vùng báo trạng thái, reduced-motion và menu bàn phím. Nội dung HTML minh họa trong code fence luôn hiển thị dạng code; để render biểu mẫu thực hành, liên kết tới file HTML riêng.
