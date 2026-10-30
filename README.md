# WEB_PRIVATE_2026

Khung chương trình học Web cơ bản gồm 14 buổi, từ HTML/CSS đến JavaScript và làm việc với API.

## Chạy website tài liệu

Yêu cầu Node.js 24 trở lên. Giao diện dùng HTML/CSS/JavaScript thuần; Node.js phục vụ tạo dữ liệu và xem trước.

```sh
npm ci
npm run dev
```

Mở `http://127.0.0.1:4173`. Khi lưu Markdown, thêm buổi, thêm ảnh hoặc sửa giao diện, bản xem trước tự cập nhật (không mở trực tiếp `index.html` bằng `file://`).

```sh
npm test
npm run build
```

Bản xuất bản nằm trong `dist/`. Thiết kế và component được mô tả trong [DESIGN.md](DESIGN.md).

### Viết và thêm bài

- Giữ cấu trúc `LessonN/theory.md`, `LessonN/homework.md`, ảnh đặt cạnh bài trong `img/`.
- Tiêu đề bài lấy từ heading `#` đầu tiên. Heading `##` và `###` tự tạo mục lục.
- File rỗng hoặc thiếu được coi là chưa có tài liệu. Thêm nội dung rồi lưu để tự bật liên kết/tab.
- Thêm `Lesson4/theory.md` để mở buổi 4; các thư mục buổi mới cũng được tự nhận diện. Chủ đề buổi lấy từ bảng chương trình bên dưới; buổi ngoài bảng lấy tiêu đề bài.
- Dùng đường dẫn tương đối, ví dụ `![Minh họa](img/example.png)`, `[Bài khác](../Lesson2/theory.md)` hoặc `[Bài mẫu](Lesson2.html)`.
- Code đặt trong code fence kèm ngôn ngữ (`html`, `css`, `js`…) để tô màu và sao chép.
- Ghi chú dùng blockquote `> **Lưu ý:** …`. HTML nguy hiểm và biểu mẫu nhúng được loại khỏi vùng đọc; bài thực hành dùng file HTML riêng.
- Tìm kiếm, mục lục và trạng thái tài liệu được tạo lại tự động. Tiến độ lưu riêng trên từng trình duyệt; không đồng bộ tài khoản.

### GitHub Pages

Workflow `.github/workflows/pages.yml` build, test và deploy mỗi khi push lên `main`.

1. Push mã nguồn và các file Markdown lên GitHub.
2. Trong repository, mở **Settings → Pages → Build and deployment → Source → GitHub Actions** (cần quyền quản trị).
3. Xem **Actions → Publish learning docs**. Nếu vừa bật Pages sau một lần lỗi, chạy lại workflow.
4. Khi deploy thành công, website dự kiến ở `https://thienbao28287.github.io/WEB_PRIVATE_2026/`.

Sửa Markdown trên máy chỉ cập nhật bản local. Bản online thay đổi sau khi push và workflow thành công; trang online đang mở cần tải lại để lấy bản mới. Không chỉnh file trong `dist/`, vì thư mục này được tạo lại.

## Khung chương trình

| Buổi | Nội dung | Tài liệu | Bài tập |
| :---: | --- | :---: | :---: |
| 1 | Cài IDE, Extensions, Git/GitHub, tổng quan HTML/CSS/JavaScript | [Lý thuyết](Lesson1/theory.md) | Chưa có |
| 2 | HTML cơ bản, Semantic HTML, Form, bảng, liên kết và hình ảnh | [Lý thuyết](Lesson2/theory.md) | [Bài tập](Lesson2/homework.md) |
| 3 | CSS cơ bản, selector, cascade, specificity, BEM | [Lý thuyết](Lesson3/theory.md) | Chưa có |
| 4 | Box model, đơn vị CSS, typography, nhúng icon và font | Chưa có | Chưa có |
| 5 | Flexbox, Position, Grid, Responsive Design | Chưa có | Chưa có |
| 6 | Kiểm tra HTML/CSS | — | — |
| 7 | JavaScript: biến, kiểu dữ liệu, toán tử, rẽ nhánh, vòng lặp | Chưa có | Chưa có |
| 8 | Function, phạm vi biến và hoisting cơ bản | Chưa có | Chưa có |
| 9 | Array, Object và các phương thức xử lý dữ liệu | Chưa có | Chưa có |
| 10 | Destructuring, Spread/Rest, DOM và Event | Chưa có | Chưa có |
| 11 | Thực hành | — | Chưa có |
| 12 | Callback, Promise, async/await, Fetch API | Chưa có | Chưa có |
| 13 | Thực hành | — | Chưa có |
| 14 | Ôn tập và giải đáp thắc mắc | — | — |

## Cách sử dụng

- Đọc lý thuyết và làm bài tập theo từng buổi.
