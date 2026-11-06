# BUỔI 2: HTML CƠ BẢN

## 1. Tổng quan và Lý thuyết

### 1.1. HTML là gì?

- **Khái niệm:** HTML (`HyperText Markup Language`) là ngôn ngữ đánh dấu siêu văn bản, được sử dụng để xây dựng và cấu trúc các thành phần của một trang web.
- **Bản chất:** HTML không phải là ngôn ngữ lập trình (programming language) vì nó không có các cấu trúc logic (như vòng lặp, điều kiện). HTML là một ngôn ngữ đánh dấu (markup language), dùng các thẻ (tags) để mô tả nội dung.

> Lưu ý: Nói một cách đơn giản, nếu ví website như một ngôi nhà, thì HTML chính là bộ khung xương, nền móng và các bức tường.

### 1.2. Cú pháp cơ bản của HTML

Một phần tử (element) HTML tiêu chuẩn được cấu tạo bởi 3 thành phần chính:

1. **Thẻ mở:** Đánh dấu sự bắt đầu của phần tử (VD: `<p>`).
2. **Nội dung:** Đoạn text hoặc các phần tử khác nằm bên trong.
3. **Thẻ đóng:** Đánh dấu sự kết thúc, giống thẻ mở nhưng có thêm dấu `/` (VD: `</p>`).

Cú pháp tổng quát:

```html
<ten-the thuoc-tinh="gia-tri">Nội dung hiển thị ở đây</ten-the>
```

- **Thuộc tính (Attributes):** Cung cấp thông tin bổ sung cho thẻ, luôn nằm ở thẻ mở.
- **Thẻ tự đóng (Self-closing tags):** Một số thẻ không có nội dung bên trong nên không cần thẻ đóng, ví dụ: `<img>`, `<br>`, `<hr>`.

### 1.3. Viết HTML ở đâu?

- Mã HTML là văn bản thuần túy (plain text), có thể viết bằng bất kỳ trình soạn thảo nào (Notepad, Visual Studio Code...).
- Tệp cần được lưu với phần mở rộng là `.html` (ví dụ: `index.html`).
- Mã HTML được đọc và hiển thị (render) bởi các trình duyệt web (Chrome, Edge, Safari...).

---

## 2. Hướng dẫn triển khai

Phần này hướng dẫn bạn cách xây dựng cấu trúc HTML từ trắng đến khi hoàn thiện các thành phần cơ bản.

### 2.1. Cấu trúc cơ bản của một file HTML

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

### 2.2. Các thẻ định dạng văn bản

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

### 2.3. Thẻ liên kết và Hình ảnh

```html
<!-- Thẻ liên kết (Anchor) -->
<a href="https://github.com">Truy cập GitHub</a>

<!-- Thẻ hình ảnh (Image) -->
<img src="img/avatar.png" alt="Ảnh đại diện của tôi" width="200" />
```

> Thẻ `<a>` bắt buộc cần thuộc tính `href` (đường dẫn đích). Thẻ `<img>` bắt buộc cần thuộc tính `src` (đường dẫn ảnh) và nên có thuộc tính `alt` (văn bản thay thế khi ảnh lỗi).

### 2.4. Thẻ danh sách (Lists)

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

### 2.5. Thẻ bảng (Tables)

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

### 2.6. Thẻ biểu mẫu (Forms)

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

### 2.7. Nhúng CSS và JavaScript

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

---

## 3. Các lỗi thường gặp

### 3.1. Quên thẻ đóng hoặc viết sai cú pháp

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

### 3.2. Lồng các thẻ Khối (Block) và Nội tuyến (Inline) sai quy tắc

Thẻ dạng Inline (như `<span>`, `<a>`, `<strong>`) không được phép chứa thẻ dạng Block (như `<div>`, `<p>`, `<h1>`).

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

### 3.3. Bỏ qua thuộc tính `alt` trong thẻ hình ảnh

Việc thiếu `alt` làm giảm khả năng tiếp cận (Accessibility) đối với người khiếm thị dùng trình đọc màn hình, đồng thời ảnh hưởng xấu đến SEO.

❌ **Mã sai:**

```html
<img src="banner.jpg" />
```

✅ **Mã đúng:**

```html
<img src="banner.jpg" alt="Banner quảng cáo khóa học lập trình Web" />
```

---

## 4. Kiến thức nâng cao

### 4.1. Phân biệt phần tử Block và Inline

Nắm vững cơ chế hiển thị Block và Inline là chìa khóa để làm chủ CSS Layout (Bố cục giao diện).

| Đặc điểm                          | Block (Khối)                                          | Inline (Nội tuyến)                                      |
| :-------------------------------- | :---------------------------------------------------- | :------------------------------------------------------ |
| **Xuống dòng**                    | Luôn bắt đầu ở một dòng mới.                          | Nằm cùng dòng với nội dung xung quanh.                  |
| **Chiều rộng**                    | Mặc định chiếm 100% chiều rộng của phần tử cha.       | Chỉ chiếm không gian vừa đủ chứa nội dung.              |
| **Kích thước (`width`/`height`)** | Có thể thiết lập dễ dàng bằng CSS.                    | Không có tác dụng (ngoại trừ thẻ thay thế như `<img>`). |
| **Thẻ tiêu biểu**                 | `<div>`, `<p>`, `<h1>` - `<h6>`, `<ul>`, `<table>`... | `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`...         |

### 4.2. Thẻ ngữ nghĩa (Semantic HTML)

Thẻ ngữ nghĩa là các thẻ mang ý nghĩa rõ ràng về vai trò của nội dung bên trong nó (thay vì lạm dụng quá nhiều thẻ `<div>` vô nghĩa). Giúp code dễ bảo trì và tối ưu cho SEO.

- `<header>`: Phần đầu trang (Logo, thanh điều hướng).
- `<nav>`: Khu vực chứa các liên kết điều hướng chính (Menu).
- `<main>`: Nội dung cốt lõi của trang web.
- `<section>`: Một phần nội dung độc lập, thường có tiêu đề riêng.
- `<article>`: Nội dung hoàn chỉnh, có thể đứng độc lập (tin tức, bài blog).
- `<aside>`: Nội dung phụ trợ (thanh bên, quảng cáo).
- `<footer>`: Phần chân trang (bản quyền, liên hệ).

### 4.3. Clean Code trong HTML

- Sử dụng chữ in thường (lowercase) cho tất cả các tên thẻ và thuộc tính (`<p>` thay vì `<P>`).
- Thụt lề (indentation) rõ ràng theo từng cấp độ thẻ cha - thẻ con (thường lùi vào 2 hoặc 4 dấu cách).
- Luôn đặt tên `id` hoặc `class` có ý nghĩa, không viết tắt khó hiểu.

---

## 5. Bài tập và Ôn tập

### 5.1. Câu hỏi trắc nghiệm

**Câu 1:** Đâu là cú pháp chuẩn để chèn một hình ảnh vào HTML?

- A. `<image src="image.jpg" alt="My image">`
- B. `<img href="image.jpg" alt="My image">`
- C. `<img src="image.jpg" alt="My image">`
- D. `<pic src="image.jpg">`

**Câu 2:** Thẻ nào sau đây là phần tử cấp Block (Khối)?

- A. `<span>`
- B. `<a>`
- C. `<strong>`
- D. `<div>`

**Câu 3:** Thuộc tính nào được dùng để liên kết nhãn `<label>` với ô nhập liệu `<input>`?

- A. `name`
- B. `class`
- C. `for`
- D. `id`

### 5.2. Câu hỏi lý thuyết

1. Trình bày sự khác biệt cơ bản giữa HTML, CSS và JavaScript.
2. Tại sao chúng ta nên sử dụng Semantic HTML thay vì chỉ dùng thẻ `<div>`?

### 5.3. Bài tập thực hành: Xây dựng Form Đăng Nhập

**Yêu cầu:** Tạo một file `login.html` chứa một biểu mẫu bao gồm:

1. Một thẻ `<header>` chứa tiêu đề "Hệ Thống Đăng Nhập".
2. Một thẻ `<form>` chứa:
   - Ô nhập Tên tài khoản (bắt buộc nhập).
   - Ô nhập Mật khẩu (bắt buộc nhập, độ dài tối thiểu 8 ký tự, che ký tự khi gõ).
   - Một ô checkbox "Ghi nhớ đăng nhập".
   - Một nút "Đăng nhập".
3. Cấu trúc HTML phải tuân thủ chuẩn HTML5 và được thụt lề sạch sẽ.

### 5.4. Đáp án và giải thích chi tiết

**Trắc nghiệm:**

- **Câu 1: C.** (Thẻ `<img>` dùng thuộc tính `src` để chứa đường dẫn).
- **Câu 2: D.** (`<div>` là thẻ khối mặc định, các thẻ còn lại là thẻ nội tuyến).
- **Câu 3: C.** (Thuộc tính `for` của thẻ `<label>` phải trùng giá trị với thuộc tính `id` của thẻ `<input>`).

**Mã code mẫu cho Bài tập thực hành:**

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Trang Đăng Nhập</title>
  </head>
  <body>
    <header>
      <h1>Hệ Thống Đăng Nhập</h1>
    </header>
    <main>
      <form action="/login" method="POST">
        <div>
          <label for="username">Tên tài khoản:</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div>
          <label for="pwd">Mật khẩu:</label>
          <input
            type="password"
            id="pwd"
            name="password"
            minlength="8"
            required
          />
        </div>

        <div>
          <label>
            <input type="checkbox" name="remember" /> Ghi nhớ đăng nhập
          </label>
        </div>

        <button type="submit">Đăng nhập</button>
      </form>
    </main>
  </body>
</html>
```

## 6. Thực hành tương tác cuối bài

Dựa vào mục 5.3, tạo form đăng nhập gồm tên tài khoản, mật khẩu bắt buộc tối thiểu 8 ký tự, checkbox ghi nhớ và nút đăng nhập. Liên kết label với input bằng for/id.

Viết HTML trong body; với bài CSS, viết kiểu trong style. Bấm **Chạy code** hoặc tab **Trình duyệt** để xem kết quả. Bản nháp tự lưu trên trình duyệt; **Khôi phục** đưa code về mẫu trống. Khung này không chấm điểm tự động và chỉ chạy HTML/CSS nội bộ.

```playground
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Form đăng ký học Web</title>
</head>
<body>
 
</body>
</html>
```
