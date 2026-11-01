# Component Tailwind của HIT

Website dùng Tailwind CSS 4, HTML và JavaScript thuần. Component là các lớp dùng lại được viết với `@apply`; hành vi đóng/mở, focus, quiz và lưu tiến độ vẫn do JavaScript quản lý.

## Các thành phần dùng lại

| Thành phần | Class chính | Vai trò |
| --- | --- | --- |
| Nút | `button`, `primary`, `icon-button` | CTA, hành động phụ, nút icon |
| Điều hướng | `sidebar`, `tabs`, `tab` | Chọn tuần và loại tài liệu |
| Code | `code-toolbar`, `copy-code` | Tên ngôn ngữ và sao chép |
| Thực hành | `exercise-buttons`, `playground-editor` | Hành động và vùng nhập code |
| Quiz | `lesson-quiz` | Câu hỏi, đáp án và phản hồi |
| Sổ tay | `notes-document` | Dialog ghi chú cá nhân |

```html
<button class="button primary inline-flex items-center justify-center" type="button">
  Kiểm tra
</button>
<div class="flex flex-col gap-4 min-[901px]:flex-row">
  <p class="text-hit-body">Nội dung dùng màu theo theme.</p>
  <a class="text-hit-link" href="#/overview">Về tổng quan</a>
</div>
```

Khi thêm component, ưu tiên utility trực tiếp cho bố cục nhỏ. Nếu lặp lại nhiều lần, thêm một recipe có tên rõ ràng trong `components.css`. Giữ thứ tự các rule hiện tại vì có điều chỉnh riêng cho kích thước màn hình và trạng thái.

`dark:` đọc thuộc tính `data-theme` của website, `intro:` áp dụng khi trang intro đang mở. Không thêm `flex`/`grid` vào phần tử cần ẩn bằng trạng thái mà thiếu variant ẩn tương ứng. Thuộc tính HTML `hidden` luôn được ưu tiên.

Định nghĩa class đầy đủ trong `web/index.html` hoặc `web/assets/*.js`. Nếu thêm template ở thư mục khác, khai báo `@source` trong entry CSS. Không đưa class Tailwind vào Markdown bài học; nội dung bài dùng bộ định dạng chung.

Token màu, font và khoảng cách vẫn quản lý tập trung trong `tokens.css`. CSS riêng dành cho keyframe, gradient, chi tiết Markdown và hiệu ứng cần giá trị chính xác. Không dùng CDN hay component phụ thuộc React; không cần mua Tailwind Plus.
