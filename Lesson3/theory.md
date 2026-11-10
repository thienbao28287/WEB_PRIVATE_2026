# Buổi 3: CSS cơ bản, selector, cascade và BEM

## Mục tiêu

Sau bài này, bạn có thể:

- Viết quy tắc CSS và liên kết CSS với HTML.
- Chọn phần tử bằng selector, pseudo-selector và combinator.
- Giải thích cascade, specificity và đặt tên class theo BEM.

**Kiến thức cần biết trước:** Biết cấu trúc HTML, `class`, `id` và cách lồng phần tử (buổi 2).

## 1. Khái niệm và mục đích

### 1.1. CSS là gì?

- **Khái niệm:** CSS (Cascading Style Sheets) là ngôn ngữ định kiểu, được sử dụng để mô tả cách hiển thị của tài liệu HTML (màu sắc, chữ viết, khoảng cách, bố cục, v.v.).

- **Bản chất:** Nếu HTML là bộ khung xương xây dựng cấu trúc nội dung, thì CSS chính là lớp da thịt và quần áo quyết định hình thức bên ngoài của trang web.

> Lưu ý: CSS không phải là ngôn ngữ lập trình, mà là ngôn ngữ định dạng (style sheet language).

## 2. Cú pháp cơ bản

### 2.1. Cấu trúc quy tắc CSS

Một khối lệnh CSS tiêu chuẩn bao gồm Selector (Bộ chọn) và Declaration block (Khối khai báo).

```css
/* Định dạng các phần tử có class title */
.title {
  color: blue;
  background-color: lightyellow;
}
```

| Thành phần      | Ví dụ trong code | Ý nghĩa                                                         |
| --------------- | ---------------- | --------------------------------------------------------------- |
| **Selector**    | `.title`         | Bộ chọn: Xác định phần tử HTML nào sẽ được định dạng.           |
| **Property**    | `color`          | Thuộc tính: Đặc điểm cần thay đổi (VD: màu chữ).                |
| **Value**       | `blue`           | Giá trị: Giá trị cụ thể áp dụng cho thuộc tính đó.              |
| **Declaration** | `color: blue;`   | Khai báo: Một cặp thuộc tính và giá trị, kết thúc bằng dấu `;`. |

### 2.2. Các cách thêm CSS vào HTML

Có 3 phương pháp chính để tích hợp CSS vào trang web:

1. **Inline CSS:** Viết trực tiếp vào thuộc tính `style` của thẻ HTML. (Chỉ tác động đến một thẻ duy nhất).

2. **Internal CSS:** Viết bên trong thẻ `<style>` đặt ở phần `<head>` của file HTML. (Tác động trong phạm vi một trang).

3. **External CSS:** Viết vào một file `.css` riêng biệt và liên kết vào HTML bằng thẻ `<link>`. (Tái sử dụng được cho nhiều trang).

> Best Practice: Luôn ưu tiên sử dụng External CSS để mã nguồn gọn gàng, dễ bảo trì và tối ưu hiệu suất tải trang.

## 3. Cách hoạt động

### 3.1. Từ selector đến kiểu hiển thị

Trình duyệt đối chiếu selector với cây DOM. Một phần tử có thể khớp nhiều quy tắc; cascade xác định giá trị dùng cho từng thuộc tính. Một số thuộc tính như `color` có thể kế thừa từ cha khi phần tử không có giá trị riêng.

### 3.2. Cơ chế Cascade (Xếp tầng)

Khi có nhiều quy tắc CSS cùng tác động lên một phần tử, CSS sử dụng cơ chế Cascade để quyết định quy tắc nào sẽ "thắng". Trong phạm vi quy tắc của tác giả cùng nguồn và cùng cascade layer, có thể học theo thứ tự đơn giản sau. Cascade đầy đủ còn xét nguồn kiểu, layer, animation và transition:

1. **Importance (Tầm quan trọng):** Khai báo `!important` ưu tiên hơn khai báo thường trong phạm vi đang xét, không có nghĩa thắng mọi nguồn kiểu hoặc transition.

2. **Specificity (Độ đặc hiệu - Trọng số):** Selector nào chi tiết hơn sẽ thắng.

3. **Source Order (Thứ tự mã nguồn):** Nếu 2 yếu tố trên bằng nhau, đoạn code viết sau (dưới cùng) sẽ thắng.

### 3.3. Tính toán Specificity (Độ ưu tiên của Selector)

Trọng số được tính theo 3 cột `(A, B, C)`:

- **Cột A:** Số lượng ID.

- **Cột B:** Số lượng Class, Attribute, Pseudo-class.

- **Cột C:** Số lượng Type (Tên thẻ), Pseudo-element.

| Selector        | Điểm (A, B, C) | Giải thích           |
| --------------- | -------------- | -------------------- |
| `p`             | `(0, 0, 1)`    | 1 thẻ `p`            |
| `.text`         | `(0, 1, 0)`    | 1 class              |
| `#welcome`      | `(1, 0, 0)`    | 1 ID                 |
| `#main .card p` | `(1, 1, 1)`    | 1 ID, 1 class, 1 thẻ |

> So sánh từ trái sang phải, ID mạnh hơn Class, Class mạnh hơn Thẻ. VD: `(1, 0, 0)` luôn thắng `(0, 10, 0)`.

## 4. Ví dụ minh họa

### Yêu cầu

Định dạng thông báo thường có chữ xanh lá, thông báo quan trọng có chữ đỏ.

### Code

Lưu thành `index.html`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thông báo lớp học</title>
  <style>
    p { color: black; }
    .notice { color: green; background-color: lightyellow; }
    .notice--important { color: red; }
  </style>
</head>
<body>
  <p class="notice">Buổi học bắt đầu lúc 18 giờ.</p>
  <p class="notice notice--important">Nhớ mang theo laptop.</p>
</body>
</html>
```

### Giải thích và kết quả

Cả hai đoạn có nền vàng nhạt. Đoạn đầu có chữ xanh vì selector `.notice` có specificity cao hơn `p`. Đoạn sau có chữ đỏ vì hai selector class có cùng specificity và `.notice--important` xuất hiện sau. Chỉ `color` bị ghi đè; nền vẫn từ `.notice`. Quy ước đặt tên biến thể nằm ở mục 5.5.

## 5. Các trường hợp thường dùng

### 5.1. DOM Selectors (Bộ chọn cơ bản)

Đây là các bộ chọn dựa trên thuộc tính sẵn có của thẻ HTML.

```html
<!-- Cấu trúc HTML mẫu -->
<h2 id="intro">Giới thiệu</h2>
<p class="notice">Thông báo quan trọng.</p>
```

```css
/* 1. Universal Selector (Chọn tất cả) */
* {
  margin: 0;
}

/* 2. Type Selector (Chọn theo tên thẻ) */
p {
  color: black;
}

/* 3. Class Selector (Chọn theo class - Dùng dấu chấm) */
.notice {
  color: green;
}

/* 4. ID Selector (Chọn theo ID - Dùng dấu thăng) */
#intro {
  color: navy;
}
```

### 5.2. Pseudo Selectors (Bộ chọn giả)

Sử dụng để định dạng phần tử dựa trên trạng thái hoặc vị trí của nó.

- **Pseudo-class (`:`):** Chọn trạng thái (VD: di chuột, focus) hoặc vị trí.

- **Pseudo-element (`::`):** Định dạng một phần nhỏ của phần tử hoặc tạo nội dung ảo.

```css
/* Khi người dùng di chuột (hover) vào thẻ a */
a:hover {
  color: red;
}

/* Chọn thẻ li lẻ (1, 3, 5...) */
li:nth-child(odd) {
  background-color: lightgray;
}

/* Tạo thêm một ký tự ngôi sao ảo trước nội dung của class notice */
.notice::before {
  content: "★ ";
  color: orange;
}
```

### 5.3. Combinators (Bộ chọn kết hợp)

Dùng để nhắm mục tiêu dựa trên mối quan hệ họ hàng (Cha-con, anh-em) trong cây DOM.

```html
<div class="content">
  <p>Đoạn A (Con trực tiếp)</p>
  <div><p>Đoạn B (Cháu)</p></div>
  <p>Đoạn C (Con trực tiếp)</p>
</div>
```

```css
/* Descendant (Khoảng trắng): Chọn tất cả thẻ p nằm trong .content (Chọn A, B, C) */
.content p {
  color: blue;
}

/* Child (>): Chỉ chọn thẻ p là con trực tiếp của .content (Chọn A, C) */
.content > p {
  color: red;
}

/* Adjacent Sibling (+): Chọn thẻ p ngay lập tức theo sau thẻ div khác */
div + p {
  font-weight: bold;
}
```

### 5.4. Các thuộc tính CSS giao diện cơ bản

Dù chưa cần dùng đến các kỹ thuật Layout, Box Model hay Typography, bạn vẫn có thể trang trí website bằng các thuộc tính thị giác mạnh mẽ sau:

**a. Nhóm Nền (Background) và Độ trong suốt**

- `background-color`: Chỉnh màu nền của phần tử (VD: `red`, `#ff0000`, `rgba(0,0,0, 0.5)`).
- `background-image`: Đặt hình ảnh làm nền (VD: `url('anh-nen.jpg')`).
- `background-size`: Điều chỉnh kích thước ảnh nền (VD: `cover` để phủ kín, `contain` để hiển thị trọn vẹn ảnh).
- `background-position`: Vị trí của ảnh nền (VD: `center`, `top left`).
- `opacity`: Chỉnh độ trong suốt của toàn bộ phần tử, giá trị từ `0.0` (vô hình) đến `1.0` (hiển thị 100%).

**b. Nhóm Hiệu ứng thị giác (Visual Effects)**

- `border-radius`: Bo tròn các góc của phần tử (VD: `5px` để bo nhẹ, `50%` để tạo hình tròn hoàn hảo).
- `box-shadow`: Tạo hiệu ứng đổ bóng cho phần tử (VD: `2px 2px 10px rgba(0,0,0, 0.2)`).
- `cursor`: Thay đổi hình dáng con trỏ chuột khi di chuột vào phần tử (VD: `pointer` (hình bàn tay), `not-allowed` (hình cấm), `help` (dấu chấm hỏi)).

**c. Nhóm Trạng thái hiển thị cơ bản (Display)**
Quyết định cách phần tử hiển thị trên một dòng (Flexbox và Grid sẽ được học chuyên sâu ở bài sau).

- `display: block`: Hiển thị thành một khối, tự động xuống dòng và chiếm 100% chiều ngang khả dụng.
- `display: inline`: Hiển thị trên cùng một dòng, kích thước bọc vừa đủ nội dung (không thể chỉnh width/height).
- `display: inline-block`: Nằm trên cùng một dòng như `inline`, nhưng cho phép thiết lập kích thước như `block`.
- `display: none`: Ẩn phần tử hoàn toàn khỏi trang web (không chiếm không gian).

**d. Nhóm Định dạng danh sách (List)**

- `list-style-type`: Đổi ký hiệu đầu dòng của danh sách `<ul>` hoặc `<ol>` (VD: `none` để xóa dấu chấm, `square` để đổi thành hình vuông, `circle`...).

### 5.5. Quy ước đặt tên BEM (Block - Element - Modifier)

BEM là một tiêu chuẩn Clean Code trong CSS giúp đặt tên class rõ ràng, dễ bảo trì và hạn chế xung đột Specificity.

- **Block:** Thành phần độc lập (VD: `.card`, `.button`).

- **Element:** Bộ phận con của Block, ngăn cách bởi `__` (VD: `.card__title`).

- **Modifier:** Biến thể/trạng thái, ngăn cách bởi `--` (VD: `.button--primary`).

**Cấu trúc chuẩn BEM:**

```html
<!-- HTML -->
<article class="card">
  <h2 class="card__title card__title--highlight">Tiêu đề</h2>
  <button class="button button--primary">Đọc tiếp</button>
</article>
```

```css
/* CSS */
.card {
  background: white;
}
.card__title {
  color: black;
}

/* Modifier giữ nguyên class gốc và ghi đè phần cần thay đổi */
.card__title--highlight {
  color: red;
}

.button {
  border: none;
  cursor: pointer;
}
.button--primary {
  background: blue;
  color: white;
}
```

**Lợi ích:**

- Tên class nói lên rõ vai trò của phần tử.

- Khi dùng selector class đơn lẻ, specificity là `(0, 1, 0)`, giúp quản lý việc ghi đè và giảm nhu cầu dùng `!important`.

## 6. Lỗi thường gặp và lưu ý

### 6.1. Lỗi viết sai Selector nhóm và Class kết hợp

Sinh viên thường nhầm lẫn giữa việc chọn nhiều class trên một phần tử và chọn phần tử con.

❌ **Code sai (Nhầm lẫn ý nghĩa):**

```css
/* Viết như thế này nghĩa là chọn phần tử .active nằm BÊN TRONG phần tử .menu */
.menu .active {
  color: red;
}
```

✅ **Code đúng (Chọn phần tử có ĐỒNG THỜI cả 2 class):**

```css
/* Viết liền nhau không có khoảng trắng */
.menu.active {
  color: red;
}
```

### 6.2. Quên thuộc tính `content` ở Pseudo-element

Khi sử dụng `::before` hoặc `::after`, nếu thiếu thuộc tính `content`, phần tử ảo sẽ không được trình duyệt tạo ra.

❌ **Code sai:**

```css
.title::after {
  background-color: red; /* Không hiển thị gì cả */
}
```

✅ **Code đúng:**

```css
.title::after {
  content: ""; /* Tạo pseudo-element */
  height: 2px; /* Tạo chiều cao để thấy nền */
  display: block; /* Thường phải kết hợp với display: block hoặc inline-block */
  background-color: red;
}
```

### 6.3. File CSS không có tác dụng

**Biểu hiện:** Sửa CSS nhưng trang vẫn dùng kiểu mặc định.

**Nguyên nhân:** Sai `href`, chưa lưu hoặc selector không khớp.

**Cách sửa:** Kiểm tra `<link rel="stylesheet" href="style.css">`, vị trí file và tên class. Dùng DevTools xem quy tắc có khớp hay bị ghi đè không.

## 7. Tóm tắt

- CSS gồm selector và các cặp thuộc tính–giá trị.
- Khoảng trắng thể hiện quan hệ phần tử; `.menu.active` chọn cùng một phần tử có hai class.
- Xét cascade trước, sau đó specificity và thứ tự nguồn trong phạm vi áp dụng.
- BEM diễn đạt block, element và modifier bằng tên class.

## 8. Bài tập thực hành

1. Tạo thông báo gồm tiêu đề, mô tả và liên kết.
2. Đặt class theo BEM và thêm biến thể quan trọng.
3. Định dạng liên kết khi `:hover` và `:focus-visible`.
4. Viết hai quy tắc cùng đổi màu chữ, dự đoán quy tắc thắng rồi kiểm tra bằng DevTools.

**Tiêu chí hoàn thành:** Biến thể chỉ đổi thuộc tính cần thiết; giải thích được màu cuối cùng mà không thêm `!important`.

[Bài tập chi tiết buổi 3](homework.md).

## Tài liệu tham khảo

- [MDN: CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Quy ước đặt tên BEM](https://getbem.com/naming/)
