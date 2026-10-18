# Buổi 2: HTML cơ bản

## I. HTML là gì?

- HTML (HyperText Markup Language) là ngôn ngữ đánh dấu siêu văn bản, dùng để xây dựng cấu trúc của một trang web.
- HTML không phải là ngôn ngữ lập trình (programming language), mà là ngôn ngữ đánh dấu (markup language).
- HTML mô tả các phần tử (elements) trên trang web như tiêu đề, đoạn văn, hình ảnh, liên kết, bảng và biểu mẫu.

Nói đơn giản, HTML là bộ khung xương của website.

### Viết HTML ở đâu?

- Bạn có thể viết HTML bằng trình soạn thảo như Visual Studio Code.
- Tệp văn bản thông thường có thể có phần mở rộng `.txt`. Để lưu mã HTML thành tài liệu HTML, sử dụng phần mở rộng `.html`, ví dụ `index.html`.
- Mở file HTML bằng trình duyệt hoặc chạy bằng Live Server để xem kết quả.

## II. Cấu trúc cơ bản của một file HTML

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang web đầu tiên</title>
</head>
<body>
    <h1>Xin chào!</h1>
    <p>Đây là trang web đầu tiên của tôi.</p>
</body>
</html>
```

| Thành phần | Ý nghĩa |
| --- | --- |
| `<!DOCTYPE html>` | Khai báo tài liệu sử dụng HTML5; đây không phải là một thẻ HTML. |
| `<html>` | Phần tử gốc bao bọc tài liệu HTML. Thuộc tính `lang="vi"` xác định ngôn ngữ chính là tiếng Việt; dùng `lang="en"` cho tiếng Anh. |
| `<head>` | Chứa thông tin về trang như metadata, tiêu đề và liên kết đến tài nguyên CSS. |
| `<meta charset="UTF-8">` | Thiết lập bảng mã UTF-8 để hiển thị tiếng Việt và các ký tự khác. |
| `<meta name="viewport" ...>` | Thiết lập vùng hiển thị để trang phù hợp với chiều rộng thiết bị. |
| `<title>` | Chỉ định tiêu đề trang, thường hiển thị trên tab trình duyệt. |
| `<body>` | Chứa nội dung hiển thị của trang như tiêu đề, văn bản, hình ảnh và biểu mẫu. |

## III. Các thẻ cần biết

**Cách chạy ví dụ:** Tạo file `index.html` theo cấu trúc ở phần II, thay nội dung bên trong `<body>` bằng từng ví dụ rồi mở bằng Live Server. Riêng ví dụ CSS và JavaScript ở mục 8 có hướng dẫn vị trí đặt mã riêng.

### 1. Thẻ ngữ nghĩa (Semantic HTML)

Thẻ ngữ nghĩa thể hiện vai trò của nội dung, giúp cấu trúc trang dễ hiểu hơn đối với người đọc mã, trình duyệt và công cụ hỗ trợ tiếp cận.

| Thẻ | Tác dụng |
| --- | --- |
| `<header>` | Phần giới thiệu hoặc phần đầu của trang hay một khu vực nội dung. |
| `<nav>` | Khu vực chứa các liên kết điều hướng chính. |
| `<main>` | Nội dung chính của trang. |
| `<section>` | Nhóm nội dung theo một chủ đề, thường có tiêu đề. |
| `<article>` | Nội dung độc lập như bài viết hoặc tin tức. |
| `<aside>` | Nội dung liên quan bổ sung, thường dùng cho thanh bên (sidebar). |
| `<footer>` | Phần cuối của trang hoặc một khu vực nội dung. |
| `<figure>` và `<figcaption>` | Nhóm nội dung minh họa như hình ảnh, kèm chú thích. |

**Ví dụ: Bố cục trang giới thiệu câu lạc bộ**

```html
<header>
    <h1>Câu lạc bộ lập trình</h1>
    <nav>
        <a href="#gioi-thieu">Giới thiệu</a>
        <a href="#bai-viet">Bài viết</a>
    </nav>
</header>

<main>
    <section id="gioi-thieu">
        <h2>Giới thiệu</h2>
        <p>Nơi cùng nhau học và thực hành lập trình web.</p>
    </section>

    <section id="bai-viet">
        <h2>Bài viết mới</h2>
        <article>
            <h3>Buổi học HTML đầu tiên</h3>
            <p>Hôm nay chúng mình học cách tạo cấu trúc trang web.</p>
        </article>
    </section>

    <aside>
        <h2>Thông báo</h2>
        <p>Chuẩn bị laptop cho buổi thực hành tiếp theo.</p>
    </aside>
</main>

<footer>
    <p>Liên hệ: clb@example.com</p>
</footer>
```

**Kết quả:** Trang hiển thị phần giới thiệu, bài viết, thông báo và thông tin liên hệ. Nhấn liên kết trong menu để chuyển tới khu vực có `id` tương ứng. Các thẻ ngữ nghĩa không tự tạo bố cục nhiều cột; `<aside>` chỉ trở thành thanh bên về mặt giao diện khi được bố trí bằng CSS. Ví dụ `<figure>` và `<figcaption>` nằm ở mục 4.

### 2. Thẻ tiêu đề và văn bản

| Thẻ | Tác dụng |
| --- | --- |
| `<h1>` đến `<h6>` | Tiêu đề theo cấp độ từ 1 đến 6; `<h1>` có cấp cao nhất. Kích thước hiển thị có thể thay đổi bằng CSS. |
| `<p>` | Đoạn văn bản. |
| `<br>` | Ngắt dòng trong văn bản. |
| `<hr>` | Thể hiện sự chuyển chủ đề, mặc định thường hiển thị bằng đường kẻ ngang. |
| `<span>` | Phần tử bao bọc nội dung nhỏ trong dòng, không mang ý nghĩa ngữ nghĩa riêng. |
| `<div>` | Phần tử bao bọc nội dung dạng khối, không mang ý nghĩa ngữ nghĩa riêng. |

**Ví dụ:**

```html
<h1>Cẩm nang học web</h1>
<h2>Chương 1: HTML</h2>
<h3>Bài 1: Văn bản</h3>
<h4>Phần 1: Tiêu đề</h4>
<h5>Mục nhỏ: Cấp độ tiêu đề</h5>
<h6>Ghi chú trong mục nhỏ</h6>

<div>
    <p>Tôi đang học <span>HTML cơ bản</span>.</p>
    <p>Địa điểm học:<br>Phòng thực hành số 1.</p>
</div>

<hr>
<p>Tiếp theo là phần định dạng văn bản.</p>
```

**Kết quả:** Các tiêu đề mặc định có kích thước khác nhau; `<br>` ngắt dòng trước tên phòng, còn `<hr>` tạo dấu phân cách giữa hai chủ đề. `<div>` nhóm nội dung và `<span>` bao một cụm từ, nhưng chưa tạo hiệu ứng riêng khi chưa có CSS. Chọn cấp tiêu đề theo cấu trúc nội dung, không chỉ theo kích thước chữ mong muốn.

### 3. Thẻ định dạng văn bản

| Thẻ | Tác dụng |
| --- | --- |
| `<b>` | Thu hút sự chú ý vào văn bản, mặc định thường hiển thị in đậm. |
| `<strong>` | Thể hiện nội dung quan trọng, mặc định thường hiển thị in đậm. |
| `<i>` | Đánh dấu văn bản có giọng điệu hoặc tính chất khác, chẳng hạn thuật ngữ; mặc định thường in nghiêng. |
| `<em>` | Nhấn mạnh nội dung, mặc định thường hiển thị in nghiêng. |
| `<u>` | Đánh dấu văn bản có chú giải phi văn bản, mặc định thường gạch dưới. |
| `<mark>` | Đánh dấu nội dung có liên quan cần làm nổi bật trong ngữ cảnh. |
| `<small>` | Thông tin phụ như chú thích hoặc bản quyền, mặc định thường có cỡ chữ nhỏ hơn. |
| `<del>` | Nội dung đã bị xóa, mặc định thường hiển thị gạch ngang chữ. |

**Ví dụ:**

```html
<p>Từ khóa cần chú ý: <b>HTML</b>.</p>
<p><strong>Quan trọng: Hãy lưu bài trước khi đóng VS Code.</strong></p>
<p>Thuật ngữ tiếng Anh: <i>markup language</i>.</p>
<p>Hãy <em>tự viết lại</em> ví dụ để hiểu bài.</p>
<p>Từ cần sửa chính tả: <u>lặp chình</u>.</p>
<p>Buổi này tập trung vào <mark>cấu trúc HTML</mark>.</p>
<p><small>Ví dụ dành cho người mới bắt đầu.</small></p>
<p>Lịch học cũ: <del>Thứ Ba</del>. Lịch mới: Thứ Năm.</p>
```

**Kết quả:** Bạn sẽ thấy chữ đậm, nghiêng, gạch dưới, tô nổi bật, chữ nhỏ và chữ bị gạch bỏ. `<b>` và `<strong>` thường trông giống nhau nhưng khác ý nghĩa; tương tự với `<i>` và `<em>`.

### 4. Thẻ liên kết và hình ảnh

| Thẻ | Tác dụng |
| --- | --- |
| `<a>` | Tạo liên kết; thuộc tính `href` chỉ định địa chỉ đích. |
| `<img>` | Hiển thị hình ảnh; `src` chỉ định đường dẫn và `alt` cung cấp văn bản thay thế. |

```html
<a href="https://github.com">Truy cập GitHub</a>

<figure>
    <img src="img/avatar.png" alt="Ảnh đại diện của tôi" width="200">
    <figcaption>Ảnh đại diện trên trang giới thiệu bản thân.</figcaption>
</figure>
```

**Chuẩn bị:** Tạo thư mục `img` cùng cấp với `index.html`, sau đó đặt ảnh của bạn vào đó với tên `avatar.png` hoặc sửa `src` cho khớp tên ảnh thực tế.

**Kết quả:** Liên kết mở trang GitHub; ảnh hiển thị với chiều rộng 200 pixel và có chú thích bên dưới. `alt` mô tả ảnh cho công cụ hỗ trợ tiếp cận và có thể hiển thị khi không tải được ảnh.

### 5. Thẻ danh sách

| Thẻ | Tác dụng |
| --- | --- |
| `<ul>` | Danh sách không có thứ tự, mặc định dùng dấu đầu dòng. |
| `<ol>` | Danh sách có thứ tự, mặc định đánh số. |
| `<li>` | Một mục trong danh sách. |

**Ví dụ:**

```html
<h2>Sở thích của tôi</h2>
<ul>
    <li>Lập trình</li>
    <li>Đọc sách</li>
    <li>Chơi thể thao</li>
</ul>

<h2>Các bước chạy trang web</h2>
<ol>
    <li>Mở thư mục dự án bằng VS Code.</li>
    <li>Tạo và lưu file index.html.</li>
    <li>Mở trang bằng Live Server.</li>
</ol>
```

**Kết quả:** Sở thích được hiển thị bằng dấu đầu dòng; các bước thực hiện được đánh số theo thứ tự. Mỗi mục là một thẻ `<li>` nằm trong `<ul>` hoặc `<ol>`.

### 6. Thẻ bảng (Table)

| Thẻ | Tác dụng |
| --- | --- |
| `<table>` | Tạo bảng dữ liệu. |
| `<tr>` | Một hàng trong bảng. |
| `<td>` | Một ô dữ liệu. |
| `<th>` | Một ô tiêu đề. |
| `<thead>`, `<tbody>`, `<tfoot>` | Nhóm các hàng thuộc phần đầu, phần thân và phần cuối của bảng. |

**Ví dụ: Bảng thời khóa biểu**

```html
<table>
    <thead>
        <tr>
            <th scope="col">Buổi</th>
            <th scope="col">Nội dung</th>
            <th scope="col">Thời lượng</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Buổi 1</th>
            <td>Cài đặt công cụ và Git</td>
            <td>2 giờ</td>
        </tr>
        <tr>
            <th scope="row">Buổi 2</th>
            <td>HTML cơ bản</td>
            <td>2 giờ</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row" colspan="2">Tổng thời lượng</th>
            <td>4 giờ</td>
        </tr>
    </tfoot>
</table>
```

**Kết quả:** Bảng có ba cột, hai hàng dữ liệu và một hàng tổng kết. `colspan="2"` giúp ô tổng kết chiếm hai cột; `scope` xác định ô tiêu đề áp dụng cho hàng hay cột. Bảng chưa có đường viền khi chưa thêm CSS.

### 7. Thẻ biểu mẫu (Form)

| Thẻ | Tác dụng |
| --- | --- |
| `<form>` | Tạo biểu mẫu thu thập dữ liệu. |
| `<input>` | Tạo điều khiển nhập liệu với các kiểu như `text`, `email`, `password`, `checkbox`, `radio`… |
| `<textarea>` | Ô nhập văn bản nhiều dòng. |
| `<select>` và `<option>` | Tạo danh sách lựa chọn, thường hiển thị dạng dropdown. |
| `<button>` | Tạo nút bấm. |
| `<label>` | Nhãn mô tả trường nhập liệu; có thể dùng `for` trùng với `id` của trường để liên kết chúng. |
| `<fieldset>` và `<legend>` | Nhóm các trường liên quan và đặt tiêu đề cho nhóm. |

**Ví dụ: Form đăng ký học web**

```html
<form>
    <fieldset>
        <legend>Thông tin đăng ký</legend>

        <p>
            <label for="full-name">Họ và tên:</label>
            <input type="text" id="full-name" name="fullName" required>
        </p>

        <p>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </p>

        <p>
            <label for="password">Mật khẩu mẫu:</label>
            <input type="password" id="password" name="password" minlength="6">
        </p>

        <p>
            <label for="level">Trình độ:</label>
            <select id="level" name="level">
                <option value="beginner">Mới bắt đầu</option>
                <option value="basic">Đã biết cơ bản</option>
            </select>
        </p>

        <p>Ca học mong muốn:</p>
        <label><input type="radio" name="session" value="morning"> Buổi sáng</label>
        <label><input type="radio" name="session" value="evening"> Buổi tối</label>

        <p>
            <label for="note">Ghi chú:</label>
            <textarea id="note" name="note" rows="3"></textarea>
        </p>

        <p>
            <label>
                <input type="checkbox" name="practice" value="yes">
                Tôi muốn tham gia buổi thực hành
            </label>
        </p>

        <button type="button">Đăng ký (minh họa)</button>
    </fieldset>
</form>
```

**Kết quả:** Form có ô nhập văn bản, email, mật khẩu được che ký tự, danh sách lựa chọn, nút chọn ca học, ô ghi chú và checkbox. Hai radio có cùng `name="session"` nên chỉ chọn được một ca.

**Giải thích:** `id` kết nối trường nhập với `label`; `name` đặt tên cho dữ liệu khi gửi form; `required` đánh dấu trường bắt buộc và `minlength` quy định độ dài tối thiểu. Nút dùng `type="button"` nên chưa gửi dữ liệu. Có thể đổi thành `type="submit"` để thử kiểm tra dữ liệu mặc định của trình duyệt, dùng dữ liệu giả; ví dụ này chưa có chức năng lưu đăng ký.

### 8. Thẻ script và style

| Thẻ | Tác dụng |
| --- | --- |
| `<style>` | Chứa CSS trong tài liệu HTML (CSS nội bộ). |
| `<script>` | Chứa JavaScript hoặc nạp file JavaScript bên ngoài qua thuộc tính `src`. |
| `<link rel="stylesheet" href="style.css">` | Liên kết đến file CSS bên ngoài. |

Lưu ý: CSS nội tuyến (inline CSS) được viết bằng thuộc tính `style` trên phần tử, ví dụ `<p style="color: red;">Xin chào</p>`; khác với CSS nội bộ trong thẻ `<style>`.

Nắm chắc các nhóm thẻ trên sẽ giúp bạn xây dựng cấu trúc cho nhiều dạng trang web cơ bản.

**Ví dụ CSS nội bộ:** Đặt thẻ `<style>` sau vào trong `<head>` của file HTML.

```html
<style>
    h1 {
        color: blue;
    }
</style>
```

Đặt nội dung sau trong `<body>`:

```html
<h1>Xin chào HTML</h1>
```

**Kết quả:** Tiêu đề có màu xanh dương.

**Ví dụ CSS ngoài:** Tạo file `style.css` cùng cấp với `index.html`:

```css
p {
    color: green;
}
```

Đặt liên kết sau trong `<head>`:

```html
<link rel="stylesheet" href="style.css">
```

Thêm một đoạn văn vào `<body>`:

```html
<p>Đoạn văn được định dạng từ file CSS ngoài.</p>
```

**Kết quả:** Đoạn văn có màu xanh lá.

**Ví dụ JavaScript:** Đặt đoạn sau trong `<body>`, với `<script>` nằm sau nút và đoạn văn để các phần tử đã tồn tại khi mã chạy.

```html
<button type="button" id="hello-button">Nhấn vào đây</button>
<p id="message">Chưa có lời chào.</p>

<script>
    const button = document.getElementById("hello-button");
    const message = document.getElementById("message");

    button.addEventListener("click", function () {
        message.textContent = "Chào mừng bạn đến với lớp học web!";
    });
</script>
```

**Kết quả:** Khi nhấn nút, nội dung đoạn văn đổi thành lời chào. Chỉ cần quan sát tác dụng của JavaScript ở buổi này; cách xử lý sự kiện sẽ được học kỹ ở các buổi sau.

Nếu chuyển phần mã bên trong `<script>` sang file `script.js` cùng cấp với `index.html`, thay thẻ script trên bằng:

```html
<script src="script.js"></script>
```

## IV. Tìm hiểu về Block và Inline

Block và inline mô tả cách phần tử tham gia bố cục. Các đặc điểm dưới đây áp dụng cho cách hiển thị mặc định trong luồng bố cục thông thường; CSS có thể thay đổi chúng bằng thuộc tính `display`.

| Đặc điểm | Block | Inline |
| --- | --- | --- |
| Xuống dòng | Bắt đầu ở dòng mới. | Nằm cùng dòng với nội dung khác nếu còn đủ chỗ, có thể ngắt sang dòng mới khi hết chỗ. |
| Chiều rộng mặc định | Thường chiếm toàn bộ chiều rộng khả dụng của phần tử chứa. | Chiếm không gian theo nội dung. |
| Thiết lập `width`, `height` | Có thể thiết lập. | Không áp dụng trực tiếp cho phần tử inline thông thường như `<span>` và `<a>`. |
| Ví dụ | `<div>`, `<p>`, `<h1>` đến `<h6>`. | `<span>`, `<a>`, `<strong>`, `<em>`. |

### Ví dụ

```html
<div>Khối thứ nhất</div>
<div>Khối thứ hai nằm ở dòng mới</div>

<span>Nội dung thứ nhất</span>
<span>Nội dung thứ hai nằm cùng dòng nếu đủ chỗ</span>
```

Lưu ý: `<img>` mặc định tham gia bố cục inline nhưng là phần tử thay thế (replaced element), nên vẫn có thể thiết lập `width` và `height`.

**Kết quả khi chạy ví dụ:** Hai `<div>` nằm trên hai dòng riêng; hai `<span>` nằm cùng dòng nếu đủ chỗ. Thử thu hẹp cửa sổ trình duyệt để thấy nội dung inline tự ngắt dòng khi hết chỗ.
