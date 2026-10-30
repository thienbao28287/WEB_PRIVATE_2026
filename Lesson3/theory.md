# Buổi 3: CSS cơ bản, Selector, Cascade, Specificity và BEM

## I. CSS cơ bản

CSS (Cascading Style Sheets) là ngôn ngữ định kiểu, dùng để mô tả cách hiển thị của tài liệu HTML: màu sắc, chữ viết, khoảng cách, bố cục…

- HTML xây dựng cấu trúc và nội dung.
- CSS định dạng cách nội dung được hiển thị.
- JavaScript xử lý hành vi và tương tác.

**Mục tiêu buổi học:** Viết được CSS cơ bản, chọn đúng phần tử, giải thích được quy tắc nào được áp dụng khi có xung đột và đặt tên class theo BEM.

Buổi này tập trung vào cách CSS hoạt động. Box model, đơn vị và typography sẽ học ở Buổi 4; Flexbox, Grid và responsive ở Buổi 5.

### 1. Cú pháp cơ bản

```css
/* Định dạng các phần tử có class title */
.title {
    color: blue;
    background-color: lightyellow;
}
```

| Thành phần | Ý nghĩa |
| --- | --- |
| `.title` | Selector: chọn phần tử cần định dạng. |
| `color`, `background-color` | Property: thuộc tính cần thay đổi. |
| `blue`, `lightyellow` | Value: giá trị của thuộc tính. |
| `color: blue;` | Declaration: một khai báo CSS. |
| `{ ... }` | Khối chứa các khai báo. |

Mỗi khai báo có dấu `:` giữa thuộc tính và giá trị; dùng `;` để phân tách các khai báo. Comment CSS viết bằng `/* ... */`, khác comment HTML `<!-- ... -->`.

### 2. Ba cách thêm CSS vào HTML

**Inline CSS:** Viết trong thuộc tính `style` của phần tử.

```html
<p style="color: red;">Đoạn văn màu đỏ.</p>
```

**Internal CSS:** Viết trong thẻ `<style>` ở phần `<head>`.

```html
<style>
    p {
        color: green;
    }
</style>
```

**External CSS:** Viết trong file riêng và liên kết từ HTML.

Tạo hai file cùng thư mục:

```text
lesson3/
├── index.html
└── style.css
```

File `index.html`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thực hành CSS</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1 class="title">Xin chào CSS!</h1>
    <p>Tôi đang học cách định dạng trang web.</p>
</body>
</html>
```

File `style.css`:

```css
.title {
    color: blue;
}

p {
    background-color: lightyellow;
}
```

**Kết quả:** Tiêu đề màu xanh dương; đoạn văn có nền vàng nhạt. Mở bằng Live Server và sửa file CSS để quan sát thay đổi.

Ưu tiên external CSS khi thực hành để dễ quản lý và tái sử dụng. File `.css` chỉ chứa mã CSS, không bọc bằng thẻ `<style>`.

### 3. Một số thuộc tính dùng trong buổi học

| Thuộc tính | Tác dụng | Ví dụ |
| --- | --- | --- |
| `color` | Màu chữ. | `color: red;` |
| `background-color` | Màu nền. | `background-color: lightblue;` |
| `border` | Đường viền. | `border: 1px solid black;` |
| `text-decoration` | Trang trí văn bản. | `text-decoration: underline;` |

## II. Selector — Bộ chọn CSS

Selector xác định phần tử được áp dụng một quy tắc CSS.

```css
p {
    color: blue;
}
```

Ở đây, `p` chọn các đoạn văn. Theo cách tổ chức của [bài CSS Selectors trên Viblo](https://viblo.asia/p/css-selectors-XogBG2bGxnLd), có thể học theo ba nhóm: **DOM selectors**, **Pseudo selectors** và **Combinator**. Đây là cách nhóm nội dung để học, không phải phân loại đầy đủ của đặc tả.

### 1. DOM selectors — Chọn theo phần tử và thuộc tính

#### a. Các bộ chọn cơ bản

| Loại | Cú pháp | Ví dụ |
| --- | --- | --- |
| Type | `E` | `p`: chọn thẻ `p`. |
| Class | `.class` | `.notice`: chọn phần tử có class `notice`. |
| ID | `#id` | `#intro`: chọn phần tử có id `intro`. |
| Universal | `*` | `*`: chọn mọi phần tử. |

```html
<h2 id="intro">Giới thiệu</h2>
<p class="notice">Thông báo học HTML.</p>
<p class="notice important">Nhớ mang laptop.</p>
```

```css
#intro { color: navy; }
.notice { color: green; }
.notice.important { color: red; }
```

**Kết quả:** Tiêu đề xanh đậm, thông báo đầu xanh lá, thông báo cuối đỏ.

Class có thể dùng lại; một phần tử có thể có nhiều class. ID phải duy nhất trong trang. `.notice.important` yêu cầu cùng một phần tử có cả hai class.

#### b. Attribute selectors — Bộ chọn thuộc tính

| Selector | Điều kiện |
| --- | --- |
| `[title]` | Có thuộc tính `title`. |
| `[type="email"]` | `type` bằng `email`. |
| `[class~="notice"]` | Danh sách từ trong `class` có từ `notice`. |
| `[lang|="en"]` | `lang` bằng `en` hoặc bắt đầu bằng `en-`, như `en-US`. |
| `[href^="https://"]` | `href` bắt đầu bằng `https://`. |
| `[href$=".pdf"]` | `href` kết thúc bằng `.pdf`. |
| `[href*="example"]` | `href` chứa chuỗi `example`. |

Có thể thêm tên thẻ phía trước, ví dụ `input[type="email"]`.

```html
<label>Email: <input type="email" name="email"></label>
<a href="huong-dan.pdf">Tải hướng dẫn</a>
```

```css
input[type="email"] { background-color: lightyellow; }
a[href$=".pdf"] { color: red; }
```

**Kết quả:** Ô email nền vàng nhạt; liên kết PDF màu đỏ.

**Phân biệt:** `[class~="note"]` khớp `class="note active"`, nhưng không khớp `class="notebook"`; `[class*="note"]` khớp cả hai.

### 2. Pseudo selectors — Bộ chọn giả

#### a. Pseudo-class — Lớp giả

Dùng một dấu `:` để chọn theo trạng thái hoặc vị trí.

| Nhóm | Selector thường gặp |
| --- | --- |
| Liên kết | `:link`, `:visited` |
| Tương tác | `:hover`, `:active`, `:focus` |
| Biểu mẫu | `:enabled`, `:disabled`, `:checked` |
| Vị trí | `:first-child`, `:last-child`, `:nth-child(n)` |
| Theo loại thẻ | `:first-of-type`, `:last-of-type`, `:nth-of-type(n)` |
| Đếm từ cuối | `:nth-last-child(n)`, `:nth-last-of-type(n)` |
| Duy nhất | `:only-child`, `:only-of-type` |
| Khác | `:root`, `:empty`, `:target`, `:lang(vi)`, `:not(.active)` |

```css
a:hover { color: red; }
input:focus { background-color: lightyellow; }
input:checked + label { color: green; }
li:nth-child(odd) { color: blue; }
```

`:active` là trạng thái đang kích hoạt, ví dụ đang nhấn chuột; `:focus` là nhận tiêu điểm nhập liệu. Với ví dụ checkbox, dùng HTML sau:

```html
<input type="checkbox" id="practice" name="practice">
<label for="practice">Tham gia thực hành</label>
```

**Phân biệt cách đếm:**

```html
<section>
    <h2>Danh sách</h2>
    <p>Đoạn A</p>
    <p>Đoạn B</p>
</section>
```

- `p:nth-child(2)` chọn đoạn A: phần tử con thứ hai là `p`.
- `p:nth-of-type(2)` chọn đoạn B: thẻ `p` thứ hai.
- Vị trí bắt đầu từ 1; `even` hoặc `2n` chọn vị trí chẵn, `odd` hoặc `2n+1` chọn vị trí lẻ.

`:empty` không khớp phần tử có văn bản, kể cả khoảng trắng, theo hành vi trình duyệt thông dụng. `:target` khớp phần tử có ID trùng fragment trên URL, ví dụ `#intro`. `:lang(vi)` còn xét ngôn ngữ kế thừa từ cha.

#### b. Pseudo-element — Phần tử giả

Dùng hai dấu `::` để định dạng một phần nội dung hoặc nội dung được tạo thêm.

| Selector | Tác dụng |
| --- | --- |
| `p::first-line` | Chọn dòng hiển thị đầu tiên. |
| `p::first-letter` | Chọn chữ cái đầu tiên. |
| `.notice::before` | Tạo nội dung trước nội dung phần tử. |
| `.notice::after` | Tạo nội dung sau nội dung phần tử. |

```html
<p class="notice">Đăng ký trước buổi học.</p>
```

```css
.notice::before {
    content: "★ ";
    color: orange;
}

.notice::after {
    content: " ✓";
    color: green;
}
```

**Kết quả:** Ngôi sao xuất hiện trước thông báo, dấu tích xuất hiện sau. Nội dung chính vẫn viết trong HTML; không dùng pseudo-element để chứa thông tin thiết yếu. `::before` và `::after` trong ví dụ cần `content` để hiển thị.

### 3. Combinator — Kết hợp theo quan hệ giữa phần tử

| Cú pháp | Quan hệ |
| --- | --- |
| `E F` | `F` là hậu duệ của `E`, ở bất kỳ độ sâu nào. |
| `E > F` | `F` là con trực tiếp của `E`. |
| `E + F` | `F` là phần tử anh em ngay sau `E`. |
| `E ~ F` | `F` là phần tử anh em phía sau `E`, không cần liền kề. |

```html
<div class="content">
    <h3>Tiêu đề</h3>
    <p>Đoạn A</p>
    <div><p>Đoạn B</p></div>
    <p>Đoạn C</p>
</div>
```

Thử từng selector riêng:

- `.content p`: chọn A, B, C.
- `.content > p`: chọn A, C.
- `h3 + p`: chọn A.
- `h3 ~ p`: chọn A, C.

Các phần tử anh em phải cùng cha. `~` không chọn phần tử đứng trước và không chọn đoạn B nằm trong `div` con.

### 4. Nhóm selector và lỗi dễ nhầm

```css
h1, h2, h3 {
    color: navy;
}
```

Dấu phẩy tạo danh sách selector để dùng chung khai báo, không phải combinator.

| Selector | Ý nghĩa |
| --- | --- |
| `.menu.active` | Một phần tử có cả hai class. |
| `.menu .active` | Phần tử `.active` nằm bên trong `.menu`. |
| `.menu, .active` | Chọn các phần tử `.menu` hoặc `.active`. |

**Tham khảo kỹ thuật:** [Selectors Level 4](https://www.w3.org/TR/selectors-4/) và [CSS Pseudo-Elements](https://www.w3.org/TR/css-pseudo-4/) của W3C.

## III. Cascade — Cơ chế xếp tầng trong CSS

Cascade giúp chọn giá trị khi nhiều khai báo cùng tác động đến một thuộc tính của một phần tử.

Phần này theo mạch **Importance → Specificity → Source Order** của [bài “Cascading” trên Viblo](https://viblo.asia/p/cascading-trong-css-OeVKBdb2lkW). Ví dụ chưa dùng cascade layers, `@scope`, animation hoặc transition.

### 1. Importance — Nguồn gốc và mức quan trọng

| Nguồn CSS | Ý nghĩa |
| --- | --- |
| User Agent | Kiểu mặc định của trình duyệt. |
| User | Kiểu do người dùng thiết lập. |
| Author | Kiểu do người xây dựng trang viết. |

Với khai báo thông thường, ưu tiên tăng dần:

```text
User Agent < User < Author
```

Với khai báo `!important`, thứ tự nguồn đảo ngược:

```text
Author !important < User !important < User Agent !important
```

Các khai báo important ưu tiên hơn khai báo thông thường. Vì vậy, CSS của tác giả không phải lúc nào cũng thắng CSS người dùng hoặc trình duyệt. Xem [quy tắc cascade của W3C](https://www.w3.org/TR/css-cascade-5/#cascade-sort).

```html
<p class="message" style="color: purple;">Thông báo lớp học</p>
```

```css
.message {
    color: red !important;
}
```

**Kết quả:** Chữ đỏ; khai báo important thắng inline thông thường.

`!important` không tăng specificity. Hạn chế dùng để vá xung đột CSS.

### 2. Specificity — Độ ưu tiên của selector

Sau khi các yếu tố ở bước trước ngang nhau, so sánh selector. Trong ví dụ thông thường:

```text
ID > Class / Attribute / Pseudo-class > Type / Pseudo-element
```

```html
<h1 id="heading" class="heading">Học CSS</h1>
```

```css
#heading { color: orange; }
.heading { color: red; }
h1 { color: blue; }
```

**Kết quả:** Màu cam do selector ID ưu tiên hơn. Cách tính chi tiết nằm ở phần IV.

Inline thông thường ưu tiên hơn khai báo thông thường trong stylesheet của tác giả; không thể hiểu rằng inline luôn thắng mọi khai báo.

### 3. Source Order — Thứ tự xuất hiện

Khi các yếu tố trước bằng nhau, khai báo sau thắng.

```css
.heading {
    color: orange;
    color: gray;
}
```

**Kết quả:** Chữ xám. Điều này cũng áp dụng giữa các quy tắc hoặc file:

```html
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="custom.css">
```

```css
/* base.css */
.heading { color: blue; }

/* custom.css */
.heading { color: green; }
```

**Kết quả:** Chữ xanh lá. File sau chỉ thắng trong trường hợp các yếu tố trước ngang nhau; không phụ thuộc tốc độ tải file.

**Ghi nhớ:** Không mặc định “viết sau là thắng”. Xét nguồn và mức quan trọng trước, rồi specificity, cuối cùng mới đến thứ tự. Internal CSS cũng không tự động ưu tiên hơn external CSS.

## IV. Specificity — Độ ưu tiên của selector

Theo mạch của [bài CSS Specificity trên Viblo](https://viblo.asia/p/css-specificity-la-gi-vay-XL6lA2GD5ek), phần này đi từ tình huống xung đột đến cách đếm, so sánh và các trường hợp dễ nhầm.

### 1. Specificity là gì?

Specificity là trọng số của selector, dùng trong cascade khi các yếu tố ưu tiên trước đó đã ngang nhau.

```html
<p id="welcome" class="text">Chào mừng đến lớp Web!</p>
```

```css
p { color: red; }
.text { color: green; }
#welcome { color: blue; }
```

**Kết quả:** Chữ xanh dương vì selector ID có trọng số lớn nhất.

### 2. Cách tính và so sánh

Đếm theo ba cột **(A, B, C)**:

| Cột | Thành phần |
| --- | --- |
| A | ID selector |
| B | Class, attribute selector, pseudo-class thông thường |
| C | Type selector, pseudo-element |

| Selector | Trọng số |
| --- | --- |
| `*` | `(0, 0, 0)` |
| `p` | `(0, 0, 1)` |
| `.text` | `(0, 1, 0)` |
| `#welcome` | `(1, 0, 0)` |
| `[id="welcome"]` | `(0, 1, 0)` |
| `ul > li` | `(0, 0, 2)` |
| `.menu li.active` | `(0, 2, 1)` |
| `a.link:hover` | `(0, 2, 1)` |
| `.notice::before` | `(0, 1, 1)` |
| `#main .card p` | `(1, 1, 1)` |

So sánh từ trái sang phải; cột khác nhau đầu tiên quyết định:

```text
(1, 0, 0) > (0, 10, 0)
(0, 2, 0) > (0, 1, 5)
(0, 1, 2) > (0, 1, 1)
```

Không đổi thành điểm thập phân. `[id="welcome"]` vẫn là selector thuộc tính, không phải ID selector.

### 3. Khi trọng số bằng nhau

```css
body h1 { color: green; }
html h1 { color: purple; }
```

Cả hai có trọng số `(0, 0, 2)`. Trong phạm vi ví dụ không dùng `@scope`, khi các yếu tố trước ngang nhau, khai báo sau thắng: tiêu đề màu tím.

Việc `body` gần `h1` hơn `html` trong cây DOM không làm tăng specificity.

### 4. Các trường hợp cần nhớ

- `*` và combinator như khoảng trắng, `>`, `+`, `~` không cộng trọng số.
- Inline style được xét riêng; không đếm vào bộ ba của selector.
- `!important` thuộc bước xét mức quan trọng, không phải specificity.
- Giá trị kế thừa không cạnh tranh trọng số với khai báo áp dụng trực tiếp lên phần tử.

**Đọc thêm về selector hàm:** Theo [Selectors Level 4 của W3C](https://www.w3.org/TR/selectors-4/#specificity), `:is()`, `:not()` và `:has()` lấy trọng số lớn nhất trong danh sách đối số; `:where()` cùng đối số luôn đóng góp 0.

```css
/* (1, 1, 0): .card cộng đối số mạnh nhất #featured */
.card:is(.basic, #featured) { color: blue; }

/* (0, 1, 1): button cộng .disabled */
button:not(.disabled) { color: green; }

/* (0, 1, 0): chỉ tính .title */
:where(#main) .title { color: purple; }
```

Trọng số của `:is()` không thay đổi theo nhánh nào khớp và không cộng tất cả các nhánh.

### 5. Áp dụng khi viết CSS

Ưu tiên class và selector đơn giản để dễ ghi đè. Ví dụ `.card__title` có `(0, 1, 0)`, còn `.card .title` có `(0, 2, 0)`. Đây là một lợi ích của cách đặt tên BEM ở phần tiếp theo.

Khi giao diện không đúng dự kiến, mở **Inspect → Styles** để xem khai báo bị ghi đè trước khi tăng specificity hoặc thêm `!important`.

## V. BEM — Quy ước đặt tên class

### 1. BEM là gì?

BEM viết tắt của **Block – Element – Modifier**, là quy ước tổ chức và đặt tên class trong HTML/CSS. Phần này tham khảo mạch giải thích của [bài BEM trên Viblo](https://viblo.asia/p/tim-hieu-ve-bem-trong-15-phut-924lJOk65PM).

### 2. Quy ước đặt tên

| Thành phần | Vai trò | Ví dụ |
| --- | --- | --- |
| Block | Thành phần độc lập, có thể tái sử dụng. | `.card`, `.button` |
| Element | Bộ phận thuộc một block. | `.card__title` |
| Modifier | Biến thể hoặc trạng thái của block/element. | `.card--featured`, `.card__title--highlighted` |

```css
.block { }
.block__element { }
.block--modifier { }
.block__element--modifier { }
```

Dùng `__` cho element, `--` cho modifier. Block trong BEM không đồng nghĩa với cách hiển thị `display: block` của CSS.

### 3. Ví dụ áp dụng

#### a. Block và Modifier

```html
<button type="button" class="button">Nút thường</button>
<button type="button" class="button button--primary">Nút chính</button>
```

```css
.button {
    color: white;
    background-color: gray;
    border: 1px solid black;
}

.button--primary {
    background-color: navy;
}
```

**Kết quả:** Hai nút có chung kiểu cơ bản; nút chính đổi nền sang xanh đậm. Modifier đi cùng class gốc, không thay thế class gốc.

#### b. Element

```html
<article class="card">
    <h2 class="card__title">HTML cơ bản</h2>
    <p class="card__description">Xây dựng trang web đầu tiên.</p>
</article>
```

```css
.card {
    background-color: whitesmoke;
    border: 1px solid gray;
}

.card__title {
    color: navy;
}

.card__description {
    color: darkslategray;
}
```

`card` là block; `card__title` và `card__description` là các element. Tên class thể hiện quan hệ, nhưng không tự tạo CSS kế thừa hay bố cục.

#### c. Modifier của Element

```html
<h2 class="card__title card__title--highlighted">Khóa học nổi bật</h2>
```

```css
.card__title--highlighted {
    color: darkred;
}
```

Thêm class modifier để đổi màu tiêu đề, giữ class `card__title` để nhận kiểu cơ bản.

### 4. Vì sao sử dụng BEM?

- Tên class cho biết thành phần thuộc block nào.
- Dùng lại component và thêm biến thể dễ hơn.
- Selector class đơn giản giúp hạn chế xung đột và dễ ghi đè.

```css
/* Specificity: (0, 1, 0) */
.card__title { color: navy; }

/* Specificity: (0, 2, 0) */
.card .title { color: navy; }
```

BEM không tự ngăn xung đột; vẫn cần tuân thủ cách tổ chức CSS.

### 5. Các bước thực hiện và lưu ý

1. Xác định thành phần độc lập: card, menu, button…
2. Đặt tên cho các bộ phận bên trong.
3. Thêm modifier khi có biến thể hoặc trạng thái.
4. Viết kiểu chung trước, kiểu modifier sau; kiểm tra khả năng tái sử dụng.

Theo [hướng dẫn đặt tên BEM](https://getbem.com/naming/), giữ selector chủ yếu theo class. Không cần viết `.card .card__title` khi `.card__title` đã đủ.

Element có thể nằm sâu trong HTML; dùng `.card__title`, tránh chuỗi `.card__body__title`. Tên nên mô tả vai trò, như `button--primary`, để không phụ thuộc một màu cố định.

### 6. Biến thể BEM trong bài tham khảo

Bài Viblo còn giới thiệu cách viết `class="button -primary"`. Đây là một biến thể đặt tên, không phải cú pháp bắt buộc của BEM. Trong buổi học này, thống nhất dùng `class="button button--primary"`.

Các ví dụ trên dùng CSS thuần. Không cần học Sass/SCSS để sử dụng BEM.
