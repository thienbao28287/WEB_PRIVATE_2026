# Quiz cuối Buổi 2: HTML cơ bản

20 câu hỏi · Mỗi câu có một đáp án đúng, giải thích và liên kết ôn tập.

## html-cau-01

### Câu hỏi

HTML được định nghĩa là gì?

### Lựa chọn

- [ ] Ngôn ngữ lập trình xử lý logic trang web
- [x] Ngôn ngữ đánh dấu siêu văn bản
- [ ] Ngôn ngữ định kiểu giao diện trang web
- [ ] Hệ quản trị cơ sở dữ liệu web

### Giải thích

HTML (HyperText Markup Language) là ngôn ngữ đánh dấu siêu văn bản, được sử dụng để xây dựng và cấu trúc các thành phần của một trang web.

### Ôn tập

[1.1. HTML là gì?](theory.md#1-1-html-la-gi)

## html-cau-02

### Câu hỏi

Theo cấu trúc tiêu chuẩn, một phần tử (element) HTML bao gồm những thành phần nào?

### Lựa chọn

- [ ] Thẻ mở, Thuộc tính, Thẻ đóng
- [x] Thẻ mở, Nội dung, Thẻ đóng
- [ ] Thuộc tính, Nội dung, Thẻ đóng
- [ ] Tên thẻ, Giá trị, Nội dung

### Giải thích

Một phần tử HTML tiêu chuẩn được cấu tạo bởi 3 thành phần chính: Thẻ mở, Nội dung, và Thẻ đóng.

### Ôn tập

[1.2. Cú pháp cơ bản của HTML](theory.md#1-2-cu-phap-co-ban-cua-html)

## html-cau-03

### Câu hỏi

Nhóm thẻ nào sau đây thuộc loại thẻ tự đóng (self-closing tags)?

### Lựa chọn

- [ ] `<h1>`, `<p>`, `<div>`
- [ ] `<ul>`, `<li>`, `<a>`
- [x] `<img>`, `<br>`, `<hr>`
- [ ] `<table>`, `<tr>`, `<td>`

### Giải thích

Thẻ tự đóng là thẻ không có nội dung bên trong nên không cần thẻ đóng, ví dụ: `<img>`, `<br>`, `<hr>`.

### Ôn tập

[1.2. Cú pháp cơ bản của HTML](theory.md#1-2-cu-phap-co-ban-cua-html)

## html-cau-04

### Câu hỏi

Khai báo `<!DOCTYPE html>` ở đầu file HTML có tác dụng gì?

### Lựa chọn

- [ ] Đặt tiêu đề cho trang web
- [ ] Xác định ngôn ngữ của trang là tiếng Việt
- [ ] Thiết lập bảng mã UTF-8
- [x] Khai báo cho trình duyệt biết đây là tài liệu HTML5

### Giải thích

`<!DOCTYPE html>` dùng để khai báo cho trình duyệt biết đây là tài liệu tuân theo chuẩn HTML5.

### Ôn tập

[2.1. Cấu trúc cơ bản của một file HTML](theory.md#2-1-cau-truc-co-ban-cua-mot-file-html)

## html-cau-05

### Câu hỏi

Thẻ nào được sử dụng để tạo một danh sách có thứ tự (đánh số 1, 2, 3...)?

### Lựa chọn

- [ ] `<ul>`
- [x] `<ol>`
- [ ] `<li>`
- [ ] `<dl>`

### Giải thích

Thẻ `<ol>` được sử dụng để tạo danh sách có thứ tự (đánh số).

### Ôn tập

[2.4. Thẻ danh sách (Lists)](theory.md#2-4-the-danh-sach-lists)

## html-cau-06

### Câu hỏi

Thuộc tính bắt buộc phải có đối với thẻ liên kết `<a>` là gì?

### Lựa chọn

- [ ] `src`
- [ ] `alt`
- [x] `href`
- [ ] `class`

### Giải thích

Thẻ `<a>` bắt buộc cần thuộc tính `href` để chỉ định đường dẫn đích.

### Ôn tập

[2.3. Thẻ liên kết và Hình ảnh](theory.md#2-3-the-lien-ket-va-hinh-anh)

## html-cau-07

### Câu hỏi

Thẻ nào sau đây được sử dụng để nhúng mã JavaScript vào tài liệu HTML?

### Lựa chọn

- [x] `<script>`
- [ ] `<style>`
- [ ] `<link>`
- [ ] `<meta>`

### Giải thích

JavaScript được đặt trong thẻ `<script>` ngay trước thẻ đóng `</body>`.

### Ôn tập

[2.7. Nhúng CSS và JavaScript](theory.md#2-7-nhung-css-va-javascript)

## html-cau-08

### Câu hỏi

Thẻ ngữ nghĩa nào thường được dùng để chứa nội dung phụ trợ như thanh bên hoặc quảng cáo?

### Lựa chọn

- [ ] `<main>`
- [ ] `<section>`
- [ ] `<article>`
- [x] `<aside>`

### Giải thích

Thẻ `<aside>` đại diện cho phần nội dung phụ trợ (ví dụ: thanh bên, quảng cáo).

### Ôn tập

[4.2. Thẻ ngữ nghĩa (Semantic HTML)](theory.md#4-2-the-ngu-nghia-semantic-html)

## html-cau-09

### Câu hỏi

Tại sao HTML không được coi là một ngôn ngữ lập trình?

### Lựa chọn

- [ ] Vì nó phải chạy trên trình duyệt web
- [x] Vì nó không có các cấu trúc logic như vòng lặp, điều kiện
- [ ] Vì nó không thể lưu trữ dữ liệu
- [ ] Vì mã HTML là văn bản thuần túy

### Giải thích

Bản chất HTML không phải ngôn ngữ lập trình vì nó không có cấu trúc logic (vòng lặp, điều kiện) mà chỉ dùng các thẻ để mô tả nội dung.

### Ôn tập

[1.1. HTML là gì?](theory.md#1-1-html-la-gi)

## html-cau-10

### Câu hỏi

Nội dung nằm bên trong thẻ `<head>` có đặc điểm gì?

### Lựa chọn

- [ ] Hiển thị dưới dạng tiêu đề chính (`<h1>`) của trang
- [ ] Chứa toàn bộ nội dung hiển thị cho người dùng xem
- [x] Không hiển thị trực tiếp trên màn hình của người dùng
- [ ] Tự động chuyển thành mã CSS

### Giải thích

Thẻ `<head>` chứa siêu dữ liệu, tiêu đề trang, liên kết CSS và nội dung ở đây không hiển thị trực tiếp trên màn hình.

### Ôn tập

[2.1. Cấu trúc cơ bản của một file HTML](theory.md#2-1-cau-truc-co-ban-cua-mot-file-html)

## html-cau-11

### Câu hỏi

Việc bỏ qua thuộc tính `alt` trong thẻ `<img>` sẽ dẫn đến hậu quả gì?

### Lựa chọn

- [ ] Hình ảnh sẽ không thể tải được trên mọi trình duyệt
- [x] Làm giảm khả năng tiếp cận đối với người khiếm thị và ảnh hưởng xấu đến SEO
- [ ] Lỗi cú pháp khiến trang web bị sập
- [ ] Trình duyệt tự động chèn một đoạn văn bản mặc định

### Giải thích

Thiếu `alt` làm giảm khả năng tiếp cận (Accessibility) đối với người dùng trình đọc màn hình và ảnh hưởng xấu đến SEO.

### Ôn tập

[3.3. Bỏ qua thuộc tính alt trong thẻ hình ảnh](theory.md#3-3-bo-qua-thuoc-tinh-alt-trong-the-hinh-anh)

## html-cau-12

### Câu hỏi

Trong biểu mẫu (Forms), thuộc tính `for` của thẻ `<label>` cần trùng khớp với thuộc tính nào của thẻ `<input>` để tạo sự liên kết?

### Lựa chọn

- [ ] `type`
- [ ] `name`
- [ ] `value`
- [x] `id`

### Giải thích

Thuộc tính `for` của thẻ `<label>` phải trùng giá trị với thuộc tính `id` của thẻ `<input>` để liên kết chúng với nhau.

### Ôn tập

[2.6. Thẻ biểu mẫu (Forms)](theory.md#2-6-the-bieu-mau-forms)

## html-cau-13

### Câu hỏi

Đặc điểm nào sau đây mô tả đúng nhất về phần tử cấp Nội tuyến (Inline)?

### Lựa chọn

- [ ] Luôn bắt đầu ở một dòng mới
- [ ] Mặc định chiếm 100% chiều rộng của phần tử cha
- [x] Chỉ chiếm không gian vừa đủ chứa nội dung và nằm cùng dòng với nội dung xung quanh
- [ ] Có thể thiết lập dễ dàng kích thước chiều rộng và chiều cao bằng CSS

### Giải thích

Phần tử Inline nằm cùng dòng với nội dung xung quanh, chỉ chiếm không gian vừa đủ và kích thước width/height không có tác dụng.

### Ôn tập

[4.1. Phân biệt phần tử Block và Inline](theory.md#4-1-phan-biet-phan-tu-block-va-inline)

## html-cau-14

### Câu hỏi

Lợi ích chính của việc sử dụng thẻ ngữ nghĩa (Semantic HTML) là gì?

### Lựa chọn

- [ ] Tự động định dạng màu sắc cho trang web
- [ ] Tăng tốc độ chạy các lệnh JavaScript
- [x] Giúp code dễ bảo trì và tối ưu hóa cho công cụ tìm kiếm (SEO)
- [ ] Chặn các mã độc tấn công trang web

### Giải thích

Thẻ ngữ nghĩa mang ý nghĩa rõ ràng về vai trò nội dung, giúp code dễ bảo trì và tối ưu cho SEO.

### Ôn tập

[4.2. Thẻ ngữ nghĩa (Semantic HTML)](theory.md#4-2-the-ngu-nghia-semantic-html)

## html-cau-15

### Câu hỏi

Quy tắc nào sau đây thuộc về tiêu chuẩn "Clean Code" trong HTML được nhắc đến trong tài liệu?

### Lựa chọn

- [ ] Luôn sử dụng chữ in hoa (uppercase) cho tất cả các tên thẻ
- [x] Sử dụng chữ in thường (lowercase) cho tất cả các tên thẻ và thuộc tính
- [ ] Không bao giờ sử dụng thuộc tính `class` hay `id`
- [ ] Viết tất cả mã trên cùng một dòng để tiết kiệm dung lượng

### Giải thích

Clean Code trong HTML khuyên dùng chữ in thường (lowercase) cho tất cả các tên thẻ và thuộc tính.

### Ôn tập

[4.3. Clean Code trong HTML](theory.md#4-3-clean-code-trong-html)

## html-cau-16

### Câu hỏi

Theo tài liệu, vị trí tốt nhất để đặt thẻ `<script>` chứa mã JavaScript trong cấu trúc HTML là ở đâu?

### Lựa chọn

- [ ] Ngay sau thẻ mở `<body>`
- [x] Ở cuối file, ngay trước thẻ đóng `</body>`
- [ ] Bên trong thẻ `<head>`
- [ ] Nằm ngoài thẻ `<html>`

### Giải thích

JavaScript nên được đặt trong thẻ `<script>` ngay trước thẻ đóng `</body>`.

### Ôn tập

[2.7. Nhúng CSS và JavaScript](theory.md#2-7-nhung-css-va-javascript)

## html-cau-17

### Câu hỏi

Đoạn mã nào sau đây đang vi phạm quy tắc lồng thẻ HTML cơ bản?

### Lựa chọn

- [ ] `<div><p>Nội dung</p></div>`
- [ ] `<ul><li>Nội dung</li></ul>`
- [x] `<span><div>Nội dung</div></span>`
- [ ] `<div><span>Nội dung</span></div>`

### Giải thích

Thẻ dạng Inline (như `<span>`) không được phép chứa thẻ dạng Block (như `<div>`). Đoạn mã C lồng thẻ sai quy tắc.

### Ôn tập

[3.2. Lồng các thẻ Khối (Block) và Nội tuyến (Inline) sai quy tắc](theory.md#3-2-long-cac-the-khoi-block-va-noi-tuyen-inline-sai-quy-tac)

## html-cau-18

### Câu hỏi

Để tạo ra một danh sách lựa chọn (Dropdown) thu thập dữ liệu trong Form, bạn cần kết hợp những thẻ nào?

### Lựa chọn

- [ ] `<input>` và `<label>`
- [ ] `<form>` và `<button>`
- [ ] `<radio>` và `<option>`
- [x] `<select>` và `<option>`

### Giải thích

Theo cấu trúc mã Form, thẻ `<select>` kết hợp với các thẻ `<option>` bên trong được dùng để tạo một danh sách lựa chọn (Dropdown).

### Ôn tập

[2.6. Thẻ biểu mẫu (Forms)](theory.md#2-6-the-bieu-mau-forms)

## html-cau-19

### Câu hỏi

Đoạn mã `<table border="1"> <tr> <td>Buổi 1</td> </tr> </table>` sẽ hiển thị cấu trúc bảng như thế nào?

### Lựa chọn

- [ ] Một bảng có 1 hàng và 1 ô tiêu đề (chữ đậm)
- [x] Một bảng có 1 hàng chứa 1 ô dữ liệu bình thường
- [ ] Một bảng có 2 cột
- [ ] Một danh sách chứa chữ "Buổi 1"

### Giải thích

Thẻ `<tr>` tạo ra 1 hàng, bên trong chứa thẻ `<td>` tạo ra 1 ô dữ liệu thường, không phải ô tiêu đề (`<th>`).

### Ôn tập

[2.5. Thẻ bảng (Tables)](theory.md#2-5-the-bang-tables)

## html-cau-20

### Câu hỏi

Nếu bạn vô tình quên đóng thẻ `<h1>` như đoạn mã `<h1>Tiêu đề <p>Đoạn văn</p>`, điều gì có khả năng xảy ra nhất theo lý thuyết?

### Lựa chọn

- [ ] Trình duyệt tự động sửa lỗi và hiển thị chuẩn xác
- [ ] Thẻ `<p>` không hiển thị trên màn hình
- [x] Trình duyệt sẽ hiển thị sai lệch toàn bộ cấu trúc phần dưới của trang (bị ảnh hưởng bởi thẻ h1)
- [ ] Trang web sẽ báo lỗi 404

### Giải thích

Trình duyệt sẽ hiển thị sai lệch toàn bộ cấu trúc phần dưới trang nếu quên đóng một thẻ cần thiết, ví dụ nội dung thẻ `<p>` cũng sẽ bị ảnh hưởng định dạng của `<h1>`.

### Ôn tập

[3.1. Quên thẻ đóng hoặc viết sai cú pháp](theory.md#3-1-quen-the-dong-hoac-viet-sai-cu-phap)
