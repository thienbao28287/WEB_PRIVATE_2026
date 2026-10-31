# Sổ tay lỗi thường gặp trong lập trình Web

Trong quá trình học và làm việc với HTML, CSS và JavaScript, việc gặp lỗi (bug) là một phần tự nhiên và không thể tránh khỏi. Khả năng tìm kiếm, đọc hiểu thông báo lỗi và sửa lỗi (debugging) chính là kỹ năng quan trọng nhất phân biệt một lập trình viên tự chủ với người mới bắt đầu.

Tài liệu này tổng hợp các lỗi phổ biến nhất mà học viên thường gặp phải, giải thích nguyên nhân gốc rễ kèm ví dụ sai - đúng và hướng dẫn cách sửa chi tiết.

---

## I. Lỗi HTML và Đường dẫn tài nguyên

### 1. Sai đường dẫn hình ảnh (`src`), CSS (`href`) hoặc JavaScript (`src`)

Đây là lỗi phổ biến nhất khiến ảnh bị vỡ, CSS không nhận diện, hoặc mã script không thực thi.

#### Dấu hiệu nhận biết
- Hình ảnh hiển thị biểu tượng ảnh vỡ kèm nội dung văn bản trong thuộc tính `alt`.
- Trang web hiển thị dạng văn bản thô, không có màu sắc hay bố cục CSS.
- Mở DevTools (phím `F12`), chuyển sang tab **Console** thấy thông báo đỏ:
  ```text
  GET http://127.0.0.1:5500/images/banner.png 404 (Not Found)
  ```

#### Nguyên nhân
- Nhầm lẫn giữa **đường dẫn tương đối** (Relative Path) và **đường dẫn tuyệt đối** (Absolute Path).
- Nhầm lẫn vị trí của tệp tin hiện tại so với tệp tin tài nguyên cần trỏ tới.
- Sai quy cách chữ hoa/chữ thường (Case Sensitivity) khi đưa lên môi trường máy chủ Linux hoặc GitHub Pages.

#### Cấu trúc thư mục ví dụ
```text
my-website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── images/
    └── banner.png
```

#### Ví dụ SAI và ĐÚNG

*Trường hợp 1: Chèn ảnh vào `index.html`*
```html
<!-- SAI: Nhầm dấu gạch chéo đầu dòng (trỏ về thư mục gốc của ổ đĩa hoặc domain) -->
<img src="/images/banner.png" alt="Banner">

<!-- SAI: Quên thư mục chứa ảnh -->
<img src="banner.png" alt="Banner">

<!-- ĐÚNG: Đi từ file index.html vào thư mục images -->
<img src="./images/banner.png" alt="Banner">
<!-- hoặc: -->
<img src="images/banner.png" alt="Banner">
```

*Trường hợp 2: Chèn ảnh nền trong tệp `css/style.css`*
```css
/* SAI: Đường dẫn tính từ file HTML thay vì tính từ file style.css */
.hero {
    background-image: url('images/banner.png');
}

/* ĐÚNG: Từ style.css phải lùi ra 1 cấp thư mục cha (../) rồi mới vào images/ */
.hero {
    background-image: url('../images/banner.png');
}
```

*Trường hợp 3: Sự khác biệt chữ hoa - chữ thường khi deploy GitHub Pages*
```html
<!-- Tên file thực tế trên ổ cứng là: banner.PNG hoặc Banner.png -->

<!-- Chạy trên máy tính Windows: Vẫn có thể mở được do Windows không phân biệt hoa thường -->
<img src="images/banner.png" alt="Banner">

<!-- Khi đẩy lên GitHub Pages (chạy Linux): Bị lỗi 404 NOT FOUND ngay lập tức! -->

<!-- ĐÚNG: Khớp chính xác từng ký tự cả chữ hoa, chữ thường và phần mở rộng -->
<img src="images/banner.PNG" alt="Banner">
```

> **Mẹo phòng tránh:**
> 1. Luôn đặt tên tệp và thư mục bằng chữ thường không dấu, dùng dấu gạch ngang nối từ: `banner-hero.png`, `avatar-user.jpg`.
> 2. Gõ `./` trong VS Code để trình soạn thảo gợi ý danh sách tệp chính xác.

---

### 2. Form input không liên kết được với `<label>`

#### Dấu hiệu nhận biết
- Người dùng nhấp chuột vào dòng chữ mô tả (label) nhưng ô nhập liệu hoặc checkbox không được kích hoạt/focus.

#### Nguyên nhân
- Dùng nhầm thuộc tính `name` thay vì `id` trong `<input>`, hoặc giá trị `for` trong `<label>` không khớp hoàn toàn với `id`.

#### Ví dụ SAI và ĐÚNG
```html
<!-- SAI: for trỏ tới name hoặc id bị gõ lệch ký tự -->
<label for="user-email">Địa chỉ Email:</label>
<input type="email" name="user-email" placeholder="email@example.com">

<!-- ĐÚNG: Giá trị của for phải bằng chính xác giá trị của id -->
<label for="user-email">Địa chỉ Email:</label>
<input type="email" id="user-email" name="user-email" placeholder="email@example.com">

<!-- ĐÚNG CÁCH 2: Bọc trực tiếp input bên trong label -->
<label>
    <input type="checkbox" name="terms" required>
    Tôi đồng ý với điều khoản sử dụng
</label>
```

---

### 3. Lồng ghép sai thẻ ngữ nghĩa (Semantic HTML)

#### Ví dụ thường gặp
```html
<!-- SAI: Thẻ đoạn văn <p> không được chứa các phần tử cấp khối (Block-level elements) -->
<p>
    Chào mừng bạn đến với HIT
    <div>Khóa học Web 2026</div>
</p>

<!-- SAI: Thẻ liên kết <a> lồng bên trong một thẻ liên kết <a> khác -->
<a href="#page">
    Xem chi tiết <a href="#author">Tác giả</a>
</a>

<!-- ĐÚNG: Tách các khối cấu trúc độc lập hoặc dùng thẻ inline như <span> -->
<div class="welcome-box">
    <p>Chào mừng bạn đến với HIT</p>
    <p class="subtitle">Khóa học Web 2026</p>
</div>
```

---

## II. Lỗi CSS và Giao diện

### 1. CSS không áp dụng (Unapplied Styles)

Bạn đã viết code CSS rất cẩn thận nhưng giao diện trên trình duyệt hoàn toàn không thay đổi.

#### Bảng kiểm tra nguyên nhân (Checklist)

| Thứ tự | Kiểm tra | Cách nhận biết & Sửa |
| :---: | --- | --- |
| 1 | File CSS đã được liên kết chưa? | Mở tab **Network** trong DevTools, lọc `CSS`. Nếu không thấy file `.css` tải về, kiểm tra lại thẻ `<link rel="stylesheet" href="...">` trong thẻ `<head>`. |
| 2 | Sai cú pháp dòng liền trước? | Nếu thiếu dấu chấm phẩy `;` hoặc dấu ngoặc nhọn `}` ở một selector phía trên, toàn bộ các quy tắc CSS bên dưới sẽ bị vô hiệu hóa! |
| 3 | Tên Class hoặc ID có khớp không? | Kiểm tra chữ hoa chữ thường. CSS phân biệt `.btn-primary` khác `.btn-Primary`. |
| 4 | Trình duyệt bị lưu Cache cũ? | Nhấn `Ctrl + Shift + R` (hoặc `Ctrl + F5`) để xóa cache và tải lại toàn bộ trang. |

#### Ví dụ sai cú pháp làm hỏng CSS tiếp theo
```css
/* SAI: Thiếu dấu chấm phẩy ở thuộc tính color */
.card-title {
    font-size: 20px;
    color: #F47B2A   /* <-- THIẾU DẤU CHẤM PHẨY Ở ĐÂY */
    font-weight: 700;
}

/* Selector này sẽ bị trình duyệt bỏ qua hoàn toàn do lỗi từ khối trên! */
.card-description {
    color: #374151;
    line-height: 1.6;
}
```

---

### 2. Xung đột độ ưu tiên (CSS Specificity)

#### Dấu hiệu nhận biết
- Mở DevTools, chọn phần tử (Inspect Element) và xem tab **Styles**: Dòng CSS bạn viết xuất hiện nhưng bị **gạch ngang** (strike-through), nghĩa là đã bị một quy tắc khác mạnh hơn đè lên.

#### Thang đo độ ưu tiên
1. `!important` (Ưu tiên tuyệt đối — tránh lạm dụng).
2. **Inline style**: `<div style="color: red;">` (1-0-0-0).
3. **ID Selector**: `#main-header` (0-1-0-0).
4. **Class, Pseudo-class, Attribute**: `.menu-item`, `:hover`, `[type="text"]` (0-0-1-0).
5. **Element Selector, Pseudo-element**: `div`, `p`, `h1`, `::before` (0-0-0-1).

#### Ví dụ SAI và ĐÚNG
```css
/* Trong file thư viện hoặc CSS chung dùng ID: */
#navigation a {
    color: #1E293B;
}

/* Bạn muốn nút active có màu cam, viết thế này sẽ KHÔNG ĂN vì class yếu hơn ID: */
.link-active {
    color: #F47B2A; /* Bị gạch ngang vì #navigation a có độ ưu tiên cao hơn! */
}

/* CÁCH SỬA 1: Tăng độ ưu tiên bằng cách kết hợp đúng bộ chọn */
#navigation a.link-active {
    color: #F47B2A;
}

/* CÁCH SỬA BỀN VỮNG (Khuyên dùng): Áp dụng chuẩn BEM, hạn chế dùng ID để định kiểu */
.nav__link {
    color: #1E293B;
}

.nav__link--active {
    color: #F47B2A;
}
```

---

### 3. Vỡ layout do Box Model (`padding` làm tăng chiều rộng)

#### Triệu chứng
- Chia 2 cột `width: 50%` đặt cạnh nhau (float hoặc inline-block), khi thêm `padding` hoặc `border` thì cột thứ hai bị rớt xuống dòng.

#### Nguyên nhân
- Mặc định của trình duyệt là `box-sizing: content-box`. Tổng chiều rộng phần tử = `width` + `padding-left` + `padding-right` + `border-left` + `border-right`. Khiến 50% thực tế trở thành lớn hơn 50%.

#### Cách sửa chuẩn mực
Luôn khai báo quy tắc CSS Reset này ở đầu mỗi dự án:
```css
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
```
Khi có `box-sizing: border-box`, `width: 50%` sẽ là kích thước cố định bao gồm cả `padding` và `border`, phần tử không bao giờ bị phình to bất ngờ.

---

## III. Lỗi JavaScript, DOM và Sự kiện

### 1. Quên `event.preventDefault()` khi xử lý Form hoặc Link

Đây là một trong những lỗi kinh điển nhất của học viên khi bắt đầu làm việc với DOM và Event.

#### Dấu hiệu nhận biết
- Khi bấm nút Submit trên biểu mẫu: Trang web nháy trắng và tự tải lại (Reload trang).
- Mọi dữ liệu người dùng vừa nhập biến mất.
- Các lệnh `console.log()` trong hàm xử lý sự kiện chỉ kịp lóe lên trong chớp mắt rồi biến mất theo trang mới.
- Bấm vào thẻ `<a href="#">` làm màn hình bị giật nảy ngược lên đầu trang.

#### Nguyên nhân
- Trình duyệt có **hành vi mặc định (Default Action)**:
  + Thẻ `<form>` khi được gửi đi sẽ thực hiện gửi HTTP Request và tải lại toàn bộ trang.
  + Thẻ `<a>` khi nhấp chuột sẽ điều hướng đến giá trị trong `href`.
- Khi viết ứng dụng Single Page (SPA) hoặc xử lý dữ liệu bằng JavaScript thuần (AJAX/Fetch), ta phải chủ động chặn hành vi mặc định này.

#### Ví dụ SAI và ĐÚNG

```html
<form id="login-form">
    <input type="text" id="username" placeholder="Tên đăng nhập" required>
    <input type="password" id="password" placeholder="Mật khẩu" required>
    <button type="submit">Đăng nhập</button>
</form>
```

```javascript
const form = document.querySelector('#login-form');

// SAI: Quên nhận đối tượng event hoặc không gọi preventDefault()
form.addEventListener('submit', function() {
    console.log('Đang gửi thông tin đăng nhập...');
    // TRANG WEB SẼ RELOAD NGAY LẬP TỨC! Toàn bộ code sau đây không kịp xử lý!
});

// ĐÚNG: Nhận tham số event (thường đặt là e hoặc event) và chặn reload
form.addEventListener('submit', function(event) {
    event.preventDefault(); // CHẶN HÀNH VI TẢI LẠI TRANG CỦA FORM

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value;

    console.log('Dữ liệu gửi lên:', { username, password });
    // Tiến hành gọi API hoặc validate dữ liệu an toàn
});
```

*Trường hợp thẻ `<a>` dùng làm nút bấm:*
```javascript
const linkBtn = document.querySelector('#toggle-filter');

linkBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn trình duyệt nhảy lên đầu trang do href="#"
    document.querySelector('#filter-panel').classList.toggle('is-open');
});
```

---

### 2. Gọi phần tử DOM bị `null` (`Cannot read properties of null`)

#### Dấu hiệu nhận biết
Console báo lỗi đỏ:
```text
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
hoặc
Uncaught TypeError: Cannot set properties of null (reading 'innerHTML')
```

#### Nguyên nhân
- Thẻ `<script>` được đặt trong thẻ `<head>` hoặc ở đầu trang HTML.
- Khi trình duyệt đọc mã JavaScript từ trên xuống dưới, cây DOM (các thẻ `HTML`) ở phía dưới **chưa được tạo ra**. Vì vậy lệnh `document.getElementById('my-btn')` không tìm thấy phần tử và trả về `null`.

#### Cách sửa

*Cách 1 (Khuyên dùng trong HTML5 hiện đại):* Thêm thuộc tính `defer` vào thẻ `<script>` trong `<head>`:
```html
<head>
    <meta charset="UTF-8">
    <title>Trang web</title>
    <!-- Thuộc tính defer đảm bảo HTML tải xong mới thực thi JS -->
    <script src="app.js" defer></script>
</head>
```

*Cách 2:* Đặt thẻ `<script>` ở cuối cùng, ngay trước thẻ đóng `</body>`:
```html
<body>
    <button id="my-btn">Bấm vào đây</button>

    <!-- Đặt script ở cuối cùng của body -->
    <script src="app.js"></script>
</body>
```

*Cách 3:* Lắng nghe sự kiện `DOMContentLoaded` trong JavaScript:
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('#my-btn');
    btn.addEventListener('click', () => {
        alert('Nút đã sẵn sàng!');
    });
});
```

---

### 3. Lỗi chính tả (Typo) khi thao tác với DOM

JavaScript phân biệt hoa thường và không đưa ra gợi ý nếu bạn gõ sai thuộc tính của một đối tượng động:

| Cú pháp sai | Cú pháp đúng | Giải thích |
| --- | --- | --- |
| `element.class = 'active'` | `element.className = 'active'` hoặc `element.classList.add('active')` | `class` là từ khóa dành riêng (reserved keyword) trong JS. |
| `element.innnerHTML` | `element.innerHTML` | Sai chính tả chữ `inner` (3 chữ n thay vì 2). |
| `input.textContent` | `input.value` | Để lấy giá trị người dùng nhập trong ô `<input>` hoặc `<textarea>`, phải dùng `.value`. |
| `element.addeventlistener` | `element.addEventListener` | JS phân biệt hoa thường, các chữ cái `E` và `L` phải viết hoa (camelCase). |

---

## IV. Lỗi Bất đồng bộ & Gọi API (Async / Await / Fetch)

### 1. In ra `Promise { <pending> }` do quên `await`

#### Dấu hiệu nhận biết
```javascript
const data = fetch('https://jsonplaceholder.typicode.com/todos/1');
console.log(data); // In ra: Promise { <state>: "pending" }
```

#### Nguyên nhân
`fetch()` là một hàm bất đồng bộ, nó trả về một `Promise` (lời hứa) chứ không trả về kết quả ngay lập tức. Nếu không dùng `await` hoặc `.then()`, luồng code sẽ chạy tiếp trong khi mạng chưa kịp trả về dữ liệu.

#### Cách viết đúng
```javascript
async function loadTodo() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        
        // Cần await tiếp hàm response.json() vì việc giải mã JSON cũng là bất đồng bộ!
        const todo = await response.json();
        
        console.log('Dữ liệu đã nhận:', todo);
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
    }
}

loadTodo();
```

---

## V. Cẩm nang Gỡ lỗi bằng Trình duyệt (DevTools Checklist)

Khi gặp lỗi, hãy thực hiện theo thứ tự 4 bước sau trước khi nhờ trợ giúp:

```text
[1. Mở F12] ➔ [2. Tab Console] ➔ [3. Tab Elements] ➔ [4. Tab Network]
```

1. **Tab Console (Bảng điều khiển):**
   - Đọc kỹ dòng lỗi đỏ đầu tiên: Nó nói lỗi gì (`ReferenceError`, `TypeError`, `SyntaxError`)?
   - Nhìn sang góc bên phải của dòng lỗi: Nhấp chuột vào tên file và số dòng (ví dụ: `app.js:42`) để nhảy thẳng đến vị trí bị lỗi trong mã nguồn.

2. **Tab Elements (Cây HTML & Styles):**
   - Dùng công cụ mũi tên (Inspect) chỉ vào phần tử bị lỗi trên màn hình.
   - Kiểm tra HTML có đúng class/id bạn nghĩ không.
   - Nhìn sang tab con **Styles**: Thuộc tính nào bị gạch ngang? Có thuộc tính nào có icon tam giác màu vàng (cú pháp CSS không hợp lệ) không?

3. **Tab Network (Mạng):**
   - Lọc theo loại tài nguyên (`Img`, `CSS`, `JS`, `Fetch/XHR`).
   - Kiểm tra cột **Status**: Mã `200` là thành công, mã `404` là sai đường dẫn, mã `500` là lỗi máy chủ backend.

4. **Kỹ thuật `debugger;` và `console.log()` nâng cao:**
   - Thay vì `console.log(user)`, hãy viết `console.log({ user })` để in ra cả tên biến kèm giá trị dưới dạng object dễ nhìn.
   - Đặt dòng lệnh `debugger;` vào bên trong hàm của bạn. Khi mở DevTools, trình duyệt sẽ tự động dừng lại đúng dòng đó để bạn soi từng giá trị biến tại thời điểm thực thi.
