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
| 14 | Tổng kết & Giải đáp thắc mắc | Chưa có | Chưa có |

## Cách sử dụng

- Đọc lý thuyết và làm bài tập theo từng buổi.

### Tối ưu ảnh và tải trang

Build tự thu nhỏ 5 minh họa trong `web/assets/` và xuất WebP có nền trong suốt, kèm mã phiên bản để cập nhật cache. Giữ PNG gốc để sửa thiết kế; trang xuất bản chỉ tải WebP. Ảnh tác giả ngoài màn hình dùng lazy loading. Loader HTML/CSS xuất hiện trong lúc tải dữ liệu và được thay ngay khi nội dung sẵn sàng; không cố tình trì hoãn mở trang. Motion tải bằng `defer` để không chặn phân tích HTML.

### Bài tập tương tác trong Markdown

Buổi 2 có 3 bài điền code tại phần HTML Form, với kiểm tra từng ô, xem form kết quả, 2 mức gợi ý và làm lại. Tiến độ thực hành tách riêng khỏi nút hoàn thành tài liệu.

Để thêm một nhóm bài, tạo `LessonN/exercises.json` theo cấu trúc mẫu trong `Lesson2/exercises.json`, rồi đặt marker tại vị trí mong muốn trong Markdown:

````md
```exercise
html-form
```
````

- Root JSON có `groups`; mỗi nhóm có `id`, `title`, `exercises`.
- Mỗi bài có `id`, `version` (số nguyên từ 1), `title`, `prompt`, `template`, `fields`, hai `hints` và `explanation`.
- Template dùng token `{{field-id}}`; mỗi token xuất hiện một lần, phải có field tương ứng. ID dùng chữ thường, số và gạch ngang, bắt đầu bằng chữ.
- Field gồm `id`, `label`, `rule`, `error`. `identifier` kiểm tra tên và có thể dùng `matches` để yêu cầu giống ô khác; `value` so với `expected`; `attribute` chỉ chèn thuộc tính boolean đã khai báo nếu câu trả lời khớp `expected`.
- Khi thay đổi yêu cầu/đáp án, tăng `version` để tiến độ cũ không áp dụng nhầm. Đáp án và tiến độ lưu trong `hit-exercises-v1`; không gửi lên máy chủ. Nếu trình duyệt chặn lưu, thao tác vẫn dùng được trong phiên.
- Preview được làm sạch và chạy trong iframe sandbox không có quyền script, gửi form hay điều hướng trang chính. Chỉ dùng template Form có sẵn; đây không phải trình chạy HTML/JS tự do.
- Build báo lỗi nếu ID trùng, thiếu token hoặc marker không tồn tại. `npm test` kiểm tra quy tắc chấm, escape, khôi phục và phiên bản; `npm run build` tạo bản xuất bản.

### Sổ tay lỗi lấy từ Markdown

Mỗi tuần có thể thêm `LessonN/notebook.md`. Nội dung file này là nguồn của nút Sổ tay lỗi; không sửa dữ liệu trong JavaScript. Một ghi chú bắt đầu bằng heading `##`, sau đó dùng các mục `### Nhóm` (tùy chọn), `### Dấu hiệu`, `### Mã sai`, `### Cách sửa`, `### Ghi nhớ`. Hai mục code phải có code fence, ví dụ:

````md
# Sổ tay lỗi · Tuần 2

## Label không nối với input

### Nhóm
HTML Form

### Dấu hiệu
Bấm nhãn nhưng ô nhập không nhận focus.

### Mã sai
```html
<label for="email">Email</label>
<input name="email">
```

### Cách sửa
```html
<label for="email">Email</label>
<input id="email" name="email">
```

### Ghi nhớ
Giá trị `for` cần khớp với `id`.
````

Lưu file khi chạy local sẽ rebuild nội dung. Bản online cập nhật sau push và workflow thành công. Thiếu hoặc để trống notebook.md sẽ hiển thị trạng thái chưa có ghi chú, không mượn lỗi từ tuần khác. Sổ tay trình bày cuộn dọc giống tài liệu Lý thuyết; code dùng chung code-wrap/code-toolbar, nút sao chép và màu cú pháp. Đặt comment giải thích nguyên nhân ngay cạnh dòng sai, dùng cú pháp comment đúng với ngôn ngữ và khai báo ngôn ngữ trong code fence. Nội dung Markdown được làm sạch trước khi đưa vào dialog.

Sổ tay chỉ viết sau khi bài có lý thuyết. Mỗi lỗi cần bám một mục cụ thể trong theory.md của cùng tuần, ghi mục đối chiếu trong Ghi nhớ và giải thích ngay cạnh dòng sai. Không tự sinh lỗi từ tên tuần trong lộ trình; thêm lý thuyết mới cần biên soạn/rà soát notebook.md tương ứng.

### Khung thực hành HTML trực tiếp

Trong phần Form của Lesson2/theory.md, code fence có ngôn ngữ playground chứa mã HTML khởi đầu. Khi lưu Markdown/build, web chuyển khối đó thành vùng Nội dung / Trình duyệt và editor index.html có số dòng. Người học sửa toàn bộ HTML, chạy bằng nút hoặc Ctrl/Command + Enter; bản xem trước tự cập nhật sau 300ms dừng gõ. Mã nháp lưu riêng theo bài và vị trí khung trong trình duyệt; Khôi phục trả về code từ Markdown. Hướng dẫn hiện tại dành cho bài HTML Form. Khung tự do không chấm điểm, ba bài điền code bên dưới vẫn lưu tiến độ riêng. Preview dùng iframe sandbox, loại script/tài nguyên mạng và chặn gửi form.

Các bài HTML Form có chấm điểm cũng dùng editor HTML đầy đủ và tab Nội dung/Trình duyệt. Mỗi field khai báo target (label/input) và attribute (for/id/type/required) để lấy đáp án từ DOM đã làm sạch, không so chuỗi toàn bộ code. Mỗi bài giữ một form, label và input. Mã cũ từ ô điền tự chuyển sang editor; thay đổi code sau khi đúng yêu cầu chấm lại.

Bài 3 dùng code fence playground-css cho thực hành CSS: sửa HTML và thẻ style trong cùng file index.html. Preview giữ CSS nội bộ sau khi làm sạch, cô lập bằng sandbox/CSP; không chạy JS hay tải CSS ngoài. Nội dung hướng dẫn bám selector, cascade, specificity và BEM; mã nháp tách biệt giữa các bài.

### Quy tắc thực hành hiện tại
Mỗi bài lý thuyết chỉ có một khung thực hành tổng hợp ở cuối. Bài 1 dùng playground-intro (HTML và quy trình công cụ/Git), Bài 2 dùng playground (HTML Form), Bài 3 dùng playground-css (CSS). Không chèn nhóm ba bài Form nhỏ vào bài học nữa. Mã trong code fence là mẫu khởi đầu, thay đổi Markdown sẽ cập nhật website sau build/deploy.

## Sổ tay ghi nhớ cá nhân

Sổ tay hiện là ghi chú do người học tự viết, theo từng tuần đã có lý thuyết. Bắt đầu trống; không dùng nội dung notebook.md cũ để điền sẵn. Các file notebook.md cũ chỉ còn là tài liệu tham khảo trong repo.

- Mở Sổ tay ghi nhớ, chọn tuần, soạn Markdown hoặc dùng các nút Tiêu đề/Đậm/Danh sách/Code.
- Tự lưu sau 500ms ngừng gõ, trước khi đổi tuần, đóng sổ hoặc rời trang. Xem trước không chạy HTML/script người học nhập.
- Tải Markdown xuất chính xác nội dung đang viết, tên so-tay-tuan-N.md.
- Dữ liệu lưu bằng localStorage theo hit-personal-notes-v1:LessonN, mỗi ghi chú tối đa 100.000 ký tự. Không có tài khoản hay đồng bộ thiết bị; xóa dữ liệu trình duyệt sẽ mất bản lưu. Hãy tải Markdown để sao lưu.
- Khi storage bị chặn/đầy, hiển thị cảnh báo và giữ bản nháp trong phiên đang mở; không báo Đã lưu khi ghi thất bại.

## Quiz cuối buổi từ Markdown

Mỗi bài có thể thêm LessonN/quiz.md. Build tự gắn quiz vào cuối trang Lý thuyết, sau phần thực hành và trước nút hoàn thành; không cần chèn marker hay viết lại câu hỏi trong JavaScript. Bài 1–3 hiện có 5 câu mỗi bài, một đáp án đúng, không đếm giờ.

Một câu hỏi có ID ổn định ở heading cấp 2 và đủ bốn mục như mẫu:

```markdown
# Quiz cuối Buổi 2

## label-input

### Câu hỏi
for của label cần trùng thuộc tính nào của input?

### Lựa chọn
- [ ] name
- [x] id
- [ ] type
- [ ] class

### Giải thích
for liên kết tới id. name đặt tên dữ liệu khi gửi form.

### Ôn tập
[Thẻ biểu mẫu (Form)](theory.md#7-the-bieu-mau-form)
```

- Mỗi câu cần 2–6 lựa chọn, đánh dấu đúng một dòng [x]; các dòng khác dùng [ ]. Heading ID dùng chữ thường ASCII, số, dấu gạch ngang và không trùng trong file.
- Liên kết Ôn tập phải tới một heading có thật trong theory.md của cùng bài. Build kiểm tra ID và báo rõ file/câu hỏi khi sai.
- Chọn đáp án rồi bấm Kiểm tra để xem đúng/sai và giải thích. Câu sai có link Ôn lại cuộn tới đúng mục lý thuyết trong cùng trang; lượt làm hiện tại được giữ. Bấm lại cùng liên kết vẫn cuộn tới mục đó.
- Cuối quiz hiện điểm, các phần cần ôn và nút Làm lại câu sai / Làm lại tất cả. Quiz không tự đánh dấu hoàn thành tài liệu.
- Tiến độ lưu riêng theo trình duyệt. Sửa quiz.md sẽ đổi revision và bắt đầu lượt mới; không tái sử dụng điểm của bộ câu hỏi cũ. Nếu không lưu được, quiz vẫn dùng được trong phiên.
- Sửa Markdown rồi lưu để xem local, push để GitHub Pages cập nhật. File quiz.md thiếu/rỗng thì không hiển thị quiz.
