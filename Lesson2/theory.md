# Buổi 2: HTML cơ bản

## Mục tiêu

Sau bài này, bạn có thể:

- Viết cấu trúc HTML và giải thích thẻ, thuộc tính.
- Sử dụng văn bản, ảnh, liên kết, danh sách, bảng và biểu mẫu.
- Chọn thẻ ngữ nghĩa và nhận biết lỗi lồng thẻ.

**Kiến thức cần biết trước:** Đã chuẩn bị trình soạn thảo và biết mở file HTML (buổi 1).

## 1. Khái niệm và mục đích

### 1.1. HTML là gì?

- **Khái niệm:** HTML (`HyperText Markup Language`) là ngôn ngữ đánh dấu siêu văn bản, được sử dụng để xây dựng và cấu trúc các thành phần của một trang web.
- **Bản chất:** HTML không phải là ngôn ngữ lập trình (programming language) vì nó không có các cấu trúc logic (như vòng lặp, điều kiện). HTML là một ngôn ngữ đánh dấu (markup language), dùng các thẻ (tags) để mô tả nội dung.

> Lưu ý: Nói một cách đơn giản, nếu ví website như một ngôi nhà, thì HTML chính là bộ khung xương, nền móng và các bức tường.

### 1.2. Viết HTML ở đâu?

- Mã HTML là văn bản thuần túy (plain text), có thể viết bằng bất kỳ trình soạn thảo nào (Notepad, Visual Studio Code...).
- Tệp cần được lưu với phần mở rộng là `.html` (ví dụ: `index.html`).
- Mã HTML được đọc và hiển thị (render) bởi các trình duyệt web (Chrome, Edge, Safari...).

## 2. Cú pháp cơ bản

### 2.1. Thẻ, nội dung và thuộc tính

Một phần tử (element) HTML tiêu chuẩn được cấu tạo bởi 3 thành phần chính:

1. **Thẻ mở:** Đánh dấu sự bắt đầu của phần tử (VD: `<p>`).
2. **Nội dung:** Đoạn text hoặc các phần tử khác nằm bên trong.
3. **Thẻ đóng:** Đánh dấu sự kết thúc, giống thẻ mở nhưng có thêm dấu `/` (VD: `</p>`).

Cú pháp tổng quát:

```html
<ten-the thuoc-tinh="gia-tri">Nội dung hiển thị ở đây</ten-the>
```

- **Thuộc tính (Attributes):** Cung cấp thông tin bổ sung cho thẻ, luôn nằm ở thẻ mở.
- **Phần tử rỗng (void elements):** Các phần tử như `<img>`, `<br>`, `<hr>` không chứa nội dung và không có thẻ đóng. Dấu `/` cuối thẻ không tạo cơ chế tự đóng trong HTML.

### 2.2. Cấu trúc cơ bản của một file HTML

Mọi file HTML đều phải tuân theo một bộ khung chuẩn mực như sau:

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trang web đầu tiên</title>
  </head>
  <body>
    <h1>Xin chào!</h1>
    <p>Đây là trang web đầu tiên của tôi.</p>
  </body>
</html>
```

**Giải thích các thành phần cốt lõi:**

- `<!DOCTYPE html>`: Khai báo cho trình duyệt biết đây là tài liệu HTML5.
- `<html>`: Phần tử gốc bao bọc toàn bộ mã. Thuộc tính `lang="vi"` xác định ngôn ngữ trang là tiếng Việt.
- `<head>`: Chứa siêu dữ liệu (metadata), tiêu đề trang, liên kết CSS. Nội dung ở đây **không** hiển thị trực tiếp trên màn hình.
- `<meta charset="UTF-8">`: Thiết lập bảng mã UTF-8 để gõ được tiếng Việt có dấu.
- `<title>`: Tiêu đề trang web, hiển thị trên tab của trình duyệt.
- `<body>`: Chứa toàn bộ nội dung hiển thị cho người dùng xem (văn bản, hình ảnh, video...).

## 3. Cách hoạt động

### 3.1. Từ HTML đến trang hiển thị

Trình duyệt phân tích HTML thành cây DOM theo quan hệ cha–con. Nội dung trong `body` tạo thành trang hiển thị; `title` đặt tên tab. Trình duyệt có thể tự sửa một số lỗi cú pháp nên trang mở được chưa có nghĩa mã đã đúng.

### 3.2. Phân biệt phần tử Block và Inline

Nắm vững cơ chế hiển thị Block và Inline là chìa khóa để làm chủ CSS Layout (Bố cục giao diện).

| Đặc điểm                          | Block (Khối)                                          | Inline (Nội tuyến)                                      |
| :-------------------------------- | :---------------------------------------------------- | :------------------------------------------------------ |
| **Xuống dòng**                    | Luôn bắt đầu ở một dòng mới.                          | Nằm cùng dòng với nội dung xung quanh.                  |
| **Chiều rộng**                    | Mặc định chiếm 100% chiều rộng của phần tử cha.       | Chỉ chiếm không gian vừa đủ chứa nội dung.              |
| **Kích thước (`width`/`height`)** | Có thể thiết lập dễ dàng bằng CSS.                    | Không có tác dụng (ngoại trừ thẻ thay thế như `<img>`). |
| **Thẻ tiêu biểu**                 | `<div>`, `<p>`, `<h1>` - `<h6>`, `<ul>`, `<table>`... | `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`...         |

### 3.3. Khi gửi biểu mẫu

`label` nối với ô nhập qua `for` và `id`. Khi gửi, trình duyệt kiểm tra ràng buộc như `required`, rồi gửi dữ liệu các trường đủ điều kiện có `name` đến `action` theo `method`. HTML không tự lưu dữ liệu; ví dụ đăng ký cần phía máy chủ để xử lý thật.

## 4. Ví dụ minh họa

### Yêu cầu

Tạo trang giới thiệu lớp có nội dung chính, danh sách và liên kết liên hệ. Các thẻ thành phần được giải thích thêm ở mục 5.

### Code

Lưu thành `index.html` rồi mở trong trình duyệt:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lớp Web HIT</title>
</head>
<body>
  <header><h1>Lớp Web HIT</h1></header>
  <main>
    <section>
      <h2>Nội dung học</h2>
      <p>Làm quen với cấu trúc trang Web.</p>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
    </section>
  </main>
  <footer><a href="mailto:lopweb@example.com">Liên hệ lớp</a></footer>
</body>
</html>
```

### Giải thích và kết quả

Tab có tên “Lớp Web HIT”. Trang có tiêu đề chính, mục “Nội dung học”, đoạn mô tả, danh sách ba mục và liên kết email. `header`, `main`, `section`, `footer` diễn đạt vai trò nội dung. Giao diện dùng kiểu mặc định của trình duyệt.

## 5. Các trường hợp thường dùng

### 5.1. Các thẻ định dạng văn bản

```html
<h1>Tiêu đề cấp 1 (Lớn nhất)</h1>
<h6>Tiêu đề cấp 6 (Nhỏ nhất)</h6>

<p>Đây là một đoạn văn bản bình thường.</p>
<p>Dòng thứ nhất.<br />Dòng thứ hai (bị ngắt dòng).</p>
<hr />
<!-- Tạo đường kẻ ngang -->

<p>Chữ <b>in đậm</b> hoặc <strong>in đậm có nhấn mạnh ngữ nghĩa</strong>.</p>
<p>Chữ <i>in nghiêng</i> hoặc <em>in nghiêng nhấn mạnh</em>.</p>
<p>Chữ bị <del>gạch bỏ</del> và chữ được <mark>tô sáng (highlight)</mark>.</p>
```

### 5.2. Thẻ liên kết và Hình ảnh

```html
<!-- Thẻ liên kết (Anchor) -->
<a href="https://github.com">Truy cập GitHub</a>

<!-- Thẻ hình ảnh (Image) -->
<img src="img/avatar.png" alt="Ảnh đại diện của tôi" width="200" />
```

> Thẻ `<a>` bắt buộc cần thuộc tính `href` (đường dẫn đích). Thẻ `<img>` bắt buộc cần thuộc tính `src` (đường dẫn ảnh) và nên có thuộc tính `alt` (văn bản thay thế khi ảnh lỗi).

### 5.3. Thẻ danh sách (Lists)

```html
<!-- Danh sách không thứ tự (dấu chấm tròn) -->
<ul>
  <li>Lập trình</li>
  <li>Đọc sách</li>
</ul>

<!-- Danh sách có thứ tự (đánh số 1, 2, 3...) -->
<ol>
  <li>Mở VS Code.</li>
  <li>Tạo file index.html.</li>
</ol>
```

### 5.4. Thẻ bảng (Tables)

```html
<table border="1">
  <thead>
    <tr>
      <th>Buổi</th>
      <th>Nội dung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Buổi 1</td>
      <td>Cài đặt công cụ</td>
    </tr>
    <tr>
      <td>Buổi 2</td>
      <td>HTML cơ bản</td>
    </tr>
  </tbody>
</table>
```

- `<tr>` (Table Row): Tạo hàng.
- `<th>` (Table Header): Tạo ô tiêu đề (chữ đậm, căn giữa).
- `<td>` (Table Data): Tạo ô dữ liệu thường.

### 5.5. Thẻ biểu mẫu (Forms)

Dùng để thu thập dữ liệu người dùng.

```html
<form action="/submit" method="POST">
  <!-- Nhóm label và input -->
  <label for="username">Họ và tên:</label>
  <input type="text" id="username" name="fullName" required />

  <!-- Mật khẩu -->
  <label for="password">Mật khẩu:</label>
  <input type="password" id="password" name="password" minlength="6" />

  <!-- Nút radio -->
  <label><input type="radio" name="gender" value="male" /> Nam</label>
  <label><input type="radio" name="gender" value="female" /> Nữ</label>

  <!-- Dropdown -->
  <select name="level">
    <option value="beginner">Cơ bản</option>
    <option value="advanced">Nâng cao</option>
  </select>

  <button type="submit">Đăng ký</button>
</form>
```

### 5.6. Nhúng CSS và JavaScript

- **CSS:** Đặt trong thẻ `<style>` ở phần `<head>` hoặc file `.css` ngoài.
- **JavaScript:** Đặt trong thẻ `<script>` ngay trước thẻ đóng `</body>`.

```html
<head>
  <style>
    h1 {
      color: blue;
    }
  </style>
  <!-- Hoặc dùng file ngoài: <link rel="stylesheet" href="style.css"> -->
</head>
<body>
  <h1 id="title">Tiêu đề có màu xanh</h1>
  <button id="btn">Click tôi</button>

  <script>
    document.getElementById("btn").addEventListener("click", function () {
      document.getElementById("title").style.color = "red";
    });
  </script>
  <!-- Hoặc dùng file ngoài: <script src="script.js"></script> -->
</body>
```

### 5.7. Thẻ ngữ nghĩa (Semantic HTML)

Thẻ ngữ nghĩa là các thẻ mang ý nghĩa rõ ràng về vai trò của nội dung bên trong nó (thay vì lạm dụng quá nhiều thẻ `<div>` vô nghĩa). Giúp code dễ bảo trì và tối ưu cho SEO.

- `<header>`: Phần đầu trang (Logo, thanh điều hướng).
- `<nav>`: Khu vực chứa các liên kết điều hướng chính (Menu).
- `<main>`: Nội dung cốt lõi của trang web.
- `<section>`: Một phần nội dung độc lập, thường có tiêu đề riêng.
- `<article>`: Nội dung hoàn chỉnh, có thể đứng độc lập (tin tức, bài blog).
- `<aside>`: Nội dung phụ trợ (thanh bên, quảng cáo).
- `<footer>`: Phần chân trang (bản quyền, liên hệ).

### 5.8. Clean Code trong HTML

- Sử dụng chữ in thường (lowercase) cho tất cả các tên thẻ và thuộc tính (`<p>` thay vì `<P>`).
- Thụt lề (indentation) rõ ràng theo từng cấp độ thẻ cha - thẻ con (thường lùi vào 2 hoặc 4 dấu cách).
- Luôn đặt tên `id` hoặc `class` có ý nghĩa, không viết tắt khó hiểu.

## 6. Lỗi thường gặp và lưu ý

### 6.1. Quên thẻ đóng hoặc viết sai cú pháp

Trình duyệt sẽ hiển thị sai lệch toàn bộ cấu trúc phần dưới của trang nếu bạn quên đóng một thẻ cần thiết.

❌ **Mã sai:**

```html
<h1>
  Tiêu đề chính
  <p>Đoạn văn này sẽ bị ảnh hưởng bởi thẻ h1 chưa đóng.</p>
</h1>
```

✅ **Mã đúng:**

```html
<h1>Tiêu đề chính</h1>
<p>Đoạn văn hiển thị bình thường.</p>
```

### 6.2. Lồng các thẻ Khối (Block) và Nội tuyến (Inline) sai quy tắc

Quy tắc lồng thẻ phụ thuộc mô hình nội dung của từng phần tử. `<span>` chỉ chứa nội dung phrasing nên không chứa `<div>`. Không suy ra tính hợp lệ chỉ từ block/inline; `<a>` có thể bọc nội dung dạng khối trong ngữ cảnh phù hợp nhưng không chứa liên kết khác hoặc nội dung tương tác như nút.

❌ **Mã sai:**

```html
<span>
  <div>Đây là một khối nằm trong thẻ nội tuyến - Sai chuẩn HTML.</div>
</span>
```

✅ **Mã đúng:**

```html
<div>
  <span>Đây là thẻ nội tuyến nằm trong khối - Chuẩn HTML.</span>
</div>
```

### 6.3. Bỏ qua thuộc tính `alt` trong thẻ hình ảnh

Việc thiếu `alt` làm giảm khả năng tiếp cận (Accessibility) đối với người khiếm thị dùng trình đọc màn hình, đồng thời ảnh hưởng xấu đến SEO.

❌ **Mã sai:**

```html
<img src="banner.jpg" />
```

✅ **Mã đúng:**

```html
<img src="banner.jpg" alt="Banner quảng cáo khóa học lập trình Web" />
```

## 7. Tóm tắt

- HTML mô tả cấu trúc; thuộc tính bổ sung thông tin cho phần tử.
- Chọn cấp tiêu đề và thẻ ngữ nghĩa theo nội dung.
- Liên kết dùng `href`; ảnh dùng `src` và `alt`; trường form dùng `name` khi gửi dữ liệu.

## 8. Bài tập thực hành

1. Tạo trang cá nhân với một `h1`, đoạn giới thiệu và danh sách sở thích.
2. Thêm ảnh có `alt`, liên kết và bảng lịch học.
3. Thêm form có nhãn, ô tên, ô email và nút gửi; hai ô nhập có `required`.
4. Tổ chức trang bằng `header`, `main`, `footer`.

**Tiêu chí hoàn thành:** Nội dung hiển thị đúng; bấm nhãn sẽ focus vào ô nhập; để trống trường bắt buộc thì trình duyệt chặn gửi. Chưa yêu cầu lưu dữ liệu form.

[Bài tập chi tiết buổi 2](homework.md).

## Tài liệu tham khảo

- [MDN: HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [HTML Living Standard](https://html.spec.whatwg.org/)
