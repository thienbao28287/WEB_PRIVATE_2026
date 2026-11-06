# TÀI LIỆU HỌC TẬP: BOX MODEL, ĐƠN VỊ CSS, TYPOGRAPHY VÀ TÀI NGUYÊN (FONTS & ICONS)

## 1. Tổng quan và Lý thuyết

### 1.1. Box Model là gì?

Trong CSS, mọi phần tử HTML đều được coi là một **hình hộp chữ nhật (Box)**. Thuật ngữ **Box Model** (Mô hình hộp) được sử dụng để mô tả cấu trúc của cái hộp này. Nó bao gồm 4 thành phần tính từ trong ra ngoài:

1. **Content (Nội dung):** Vùng chứa nội dung thực tế (chữ, hình ảnh...).
2. **Padding ( Vùng đệm):** Khoảng cách từ Content đến viền (Border). Vùng này trong suốt và có cùng màu nền với Content.
3. **Border (Đường viền):** Đường bao quanh Padding và Content.
4. **Margin (Lề):** Khoảng cách từ Border của phần tử này đến phần tử khác. Vùng này luôn trong suốt.

### 1.2. Đơn vị trong CSS (CSS Units)

CSS cung cấp nhiều đơn vị đo lường để xác định kích thước, khoảng cách. Chúng được chia làm 2 nhóm chính:

- **Đơn vị tuyệt đối (Absolute):** Kích thước cố định, không thay đổi theo môi trường (VD: `px` - pixel).
- **Đơn vị tương đối (Relative):** Kích thước thay đổi dựa trên một yếu tố khác (phần tử cha, kích thước màn hình).
  - `rem`: Tương đối theo font-size của thẻ gốc `<html>` (root).
  - `em`: Tương đối theo font-size của chính phần tử đó hoặc phần tử cha gần nhất.
  - `%`: Tương đối theo kích thước (width/height) của phần tử cha.
  - `vh`, `vw`: Tương đối theo 1% chiều cao (viewport height) hoặc chiều rộng (viewport width) của cửa sổ trình duyệt.

### 1.3. Typography (Nghệ thuật sắp chữ)

Typography trong CSS là tập hợp các thuộc tính dùng để định dạng văn bản sao cho dễ đọc và có tính thẩm mỹ. Các thuộc tính cốt lõi bao gồm:

- `font-family`: Kiểu chữ.
- `font-size`: Kích thước chữ.
- `font-weight`: Độ đậm nhạt (400 là bình thường, 700 là in đậm).
- `line-height`: Khoảng cách giữa các dòng.
- `text-align`: Căn lề văn bản (left, center, right, justify).

### 1.4. Tài nguyên ngoại vi (Fonts & Icons)

- **Fonts:** Sử dụng các dịch vụ như Google Fonts để tải các phông chữ đẹp thay vì chỉ dùng phông chữ mặc định của hệ điều hành.
- **Icons:** Sử dụng thư viện icon (như FontAwesome) hoặc file ảnh Vector (SVG) để hiển thị các biểu tượng (nút search, giỏ hàng...) giúp UI trực quan hơn.

---

## 2. Cơ chế hoạt động

### 2.1. Cơ chế tính toán kích thước Box Model

Mặc định, thuộc tính `width` và `height` trong CSS **chỉ áp dụng cho vùng Content**. Điều này dẫn đến cơ chế cộng dồn kích thước rất dễ gây vỡ Layout.

**Sơ đồ Box Model:**

```text
+----------------------------------------------------+
|                      MARGIN                        |
|   +--------------------------------------------+   |
|   |                  BORDER                    |   |
|   |   +------------------------------------+   |   |
|   |   |              PADDING               |   |   |
|   |   |   +----------------------------+   |   |   |
|   |   |   |                            |   |   |   |
|   |   |   |          CONTENT           |   |   |   |
|   |   |   |   (width x height mặc định)|   |   |   |
|   |   |   +----------------------------+   |   |   |
|   |   +------------------------------------+   |   |
|   +--------------------------------------------+   |
+----------------------------------------------------+
```

**Bài toán:** Bạn có 1 thẻ `<div>` thiết lập `width: 300px`, `padding: 20px`, `border: 5px solid black`.

- **Cơ chế mặc định (`box-sizing: content-box`):**
  Tổng chiều rộng thực tế = Width (300) + Padding Left (20) + Padding Right (20) + Border Left (5) + Border Right (5) = **350px**. (Khối bị phình to ra so với dự tính 300px ban đầu).
- **Cơ chế hiện đại (`box-sizing: border-box`):**
  Trình duyệt sẽ tự động ép Padding và Border lùi vào bên trong. Tổng chiều rộng thực tế vẫn được giữ nguyên là **300px**. (Content sẽ tự động nhỏ lại còn 250px).

### 2.2. Cơ chế hoạt động của `rem`

Mặc định, trình duyệt thiết lập kích thước chữ của thẻ `<html>` là `16px`.

- Nếu bạn set `font-size: 2rem` -> Kích thước thực tế = 2 \* 16px = `32px`.
- Khi người dùng vào cài đặt trình duyệt tăng cỡ chữ mặc định lên `20px` (để dễ nhìn hơn), thẻ dùng `2rem` sẽ tự động tăng thành `40px`, đảm bảo tính trợ năng (Accessibility). Đơn vị `px` không làm được điều này.

---

## 3. Hướng dẫn triển khai

Dưới đây là một quy trình chuẩn để thiết lập Layout, Typography và Tài nguyên cho một dự án.

### Bước 1: Khởi tạo Global Styles & Thiết lập Box Model

Luôn luôn bắt đầu file CSS của bạn với đoạn code Reset CSS này để thống nhất cơ chế `border-box` cho mọi phần tử.

```css
/* style.css */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  /* Đặt cơ sở để dùng rem. Mặc định 1rem = 16px */
  font-size: 16px;
}
```

### Bước 2: Nhúng Google Fonts

Truy cập Google Fonts, chọn phông chữ (VD: Roboto) và nhúng vào file HTML.

```html
<!-- index.html (Bên trong thẻ <head>) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

Sau đó áp dụng trong CSS:

```css
body {
  font-family: "Roboto", sans-serif; /* Sử dụng font Roboto */
  line-height: 1.6; /* Chiều cao dòng chuẩn để dễ đọc */
  color: #333333; /* Màu chữ không nên đen xì (#000) */
}
```

### Bước 3: Sử dụng đơn vị tương đối và Typography

Thay vì dùng `px`, hãy tập thói quen dùng `rem` cho kích thước chữ và khoảng cách.

```css
.card {
  width: 100%;
  max-width: 25rem; /* ~400px */
  padding: 1.5rem; /* ~24px */
  border: 1px solid #ddd;
  border-radius: 0.5rem; /* ~8px */
  margin: 2rem auto; /* Căn giữa */
}

.card__title {
  font-size: 1.5rem; /* ~24px */
  font-weight: 700;
  text-transform: uppercase; /* In hoa toàn bộ */
  margin-bottom: 1rem;
}

.card__desc {
  font-size: 1rem; /* ~16px */
  color: #666;
}
```

### Bước 4: Nhúng và sử dụng Icon (SVG)

Trong các dự án hiện đại (đặc biệt khi code ReactJS sau này), sử dụng trực tiếp mã `<svg>` được ưu tiên hơn vì không phải tải thêm toàn bộ thư viện font icon cồng kềnh.

```html
<button class="btn-download">
  <!-- Mã SVG của một chiếc icon tải xuống -->
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
  Tải về ngay
</button>
```

```css
.btn-download {
  display: inline-flex; /* Đưa icon và chữ nằm ngang */
  align-items: center; /* Căn giữa theo chiều dọc */
  gap: 0.5rem; /* Khoảng cách giữa icon và chữ */
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
}
```

---

## 4. Các lỗi thường gặp

### 4.1. Vỡ giao diện do quên thiết lập `border-box`

Đây là lỗi kinh điển nhất của người mới học. Set khối rộng 50%, sau đó thêm `padding`, kết quả khối chiếm hơn 50% màn hình và đẩy khối khác rớt dòng.

❌ **Nguyên nhân:** Dùng `box-sizing` mặc định (content-box).
✅ **Khắc phục:** Luôn khai báo đoạn code Reset CSS bằng thẻ `*` (đã cung cấp ở Bước 1).

### 4.2. Margin Collapse (Sụp lún Margin)

Khi hai khối trên-dưới chạm nhau, nếu khối trên có `margin-bottom: 30px` và khối dưới có `margin-top: 20px`, khoảng cách thực tế giữa chúng **không phải là 50px**, mà bị gộp lại lấy giá trị lớn hơn (là **30px**).

❌ **Hiểu sai:** Nghĩ rằng margin sẽ cộng dồn.
✅ **Khắc phục:** Nên thống nhất chỉ dùng margin một chiều (ví dụ: luôn dùng `margin-bottom` để tạo khoảng cách giữa các phần tử) để tránh nhầm lẫn.

### 4.3. Dùng `px` cho `font-size` làm mất tính trợ năng (Accessibility)

Người dùng khiếm thị thường cài đặt cỡ chữ hệ thống lớn hơn. Nếu bạn set cứng `font-size: 14px`, text sẽ không thể tự phóng to.

❌ **Code sai:** `.text { font-size: 14px; }`
✅ **Code đúng:** `.text { font-size: 0.875rem; }` (Tính bằng 14 / 16 = 0.875).

---

## 5. Kiến thức nâng cao (Chuẩn bị cho ReactJS)

### 5.1. SVG vs Font Icons (Tại sao React thích SVG?)

Trong quá khứ, FontAwesome (dùng thẻ `<i class="fas fa-home"></i>`) rất thịnh hành. Tuy nhiên, ở các dự án React/TS hiện đại, lập trình viên ưa chuộng **Inline SVG** (sử dụng thư viện như `lucide-react` hoặc `react-icons`) bởi vì:

- **Tối ưu hiệu năng:** Ứng dụng chỉ tải đúng những icon được dùng (Tree-shaking), thay vì tải cả bộ font hàng ngàn icon.
- **Tùy biến dễ dàng:** Có thể đổi màu SVG trực tiếp bằng thuộc tính CSS `color` hoặc `fill` kế thừa từ text.
- **Không bị chớp nháy (FOIT):** SVG render cùng lúc với HTML, không bị delay như việc chờ tải file font từ server.

### 5.2. Tối ưu tải Font (Font Display)

Khi nhúng Google Fonts, luôn đảm bảo URL có tham số `&display=swap`. Điều này báo cho trình duyệt: _Hãy hiển thị chữ bằng font mặc định trước, khi nào tải xong font Google thì mới tráo đổi (swap) sang._ Giúp người dùng không phải nhìn thấy "màn hình trống rỗng" lúc mạng chậm.

### 5.3. Fluid Typography (Chữ tự động co giãn)

Sử dụng hàm `clamp()` của CSS hiện đại để chữ tự to nhỏ theo màn hình mà không cần viết quá nhiều Media Queries:

```css
/* Cú pháp: clamp(nhỏ nhất, lý tưởng, lớn nhất) */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
```

_Giải thích:_ Font size sẽ thay đổi theo 5% chiều rộng màn hình, nhưng không bao giờ nhỏ hơn `1.5rem` và không lớn quá `3rem`.

---

## 6. Bài tập và Ôn tập

### 6.1. Câu hỏi lý thuyết

1. Giải thích sự khác biệt cơ bản giữa `padding` và `margin` trong Box Model.
2. Tại sao `box-sizing: border-box` lại giải quyết được vấn đề vỡ layout khi thiết lập kích thước phần tử?
3. Khi nào nên dùng đơn vị `rem`, và khi nào có thể cân nhắc dùng `%`?

### 6.2. Trắc nghiệm

**Câu 1:** Đơn vị nào sau đây có kích thước phụ thuộc vào `font-size` của phần tử `<html`> gốc?

- A. `em`
- B. `rem`
- C. `vw`
- D. `px`

**Câu 2:** Thuộc tính nào thay đổi độ đậm nhạt của phông chữ?

- A. `font-family`
- B. `font-style`
- C. `font-weight`
- D. `text-decoration`

**Câu 3:** Khai báo CSS nào đúng để bo góc tròn cho một phần tử?

- A. `border-style: round;`
- B. `border-corner: 10px;`
- C. `box-radius: 5px;`
- D. `border-radius: 8px;`

### 6.3. Bài tập thực hành

**Yêu cầu:** Hãy tạo một **User Profile Card** (Thẻ thông tin người dùng) tuân thủ các quy tắc sau:

1. Chiều rộng tối đa của thẻ là `20rem`. Căn giữa thẻ trên màn hình bằng `margin`.
2. Có padding `1.5rem`, viền nhạt `1px solid #ccc`, và bo góc.
3. Bắt buộc dùng `box-sizing: border-box`.
4. Typography: Tên người dùng in đậm (`700`), kích thước lớn hơn đoạn mô tả nghề nghiệp. Dùng đơn vị `rem` cho tất cả text.
5. Thêm một button liên hệ bên dưới, bên trong có một biểu tượng (sử dụng SVG tùy ý) đặt cạnh chữ.

### 6.4. Đáp án và giải thích

**Trắc nghiệm:**

- Câu 1: **B** (rem = root em)
- Câu 2: **C** (font-weight quy định độ đậm)
- Câu 3: **D** (border-radius)

**Lý thuyết (Tóm tắt):**

1. `padding` đẩy nội dung vào trong (có màu nền), `margin` đẩy các phần tử khác ra xa (trong suốt).
2. Vì `border-box` tính cả padding và border vào kích thước `width`/`height` tổng, không làm phần tử phình to ra.

**Code mẫu Bài tập:**

```html
<div class="profile-card">
  <h2 class="profile-card__name">Nguyễn Văn A</h2>
  <p class="profile-card__job">Frontend Developer (ReactJS)</p>

  <button class="profile-card__btn">
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      ></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
    Gửi Email
  </button>
</div>
```

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  font-family: sans-serif;
}

.profile-card {
  max-width: 20rem;
  margin: 3rem auto;
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-card__name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #111;
}

.profile-card__job {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.profile-card__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
}
```

## 7. Thực hành tương tác cuối bài

Dựa vào mục 6.3, tạo User Profile Card rộng tối đa 20rem, căn giữa bằng margin, padding 1.5rem và box-sizing: border-box. Dùng rem cho chữ, phân biệt tên và nghề nghiệp, thêm nút liên hệ có SVG nội bộ.

Viết HTML trong body; với bài CSS, viết kiểu trong style. Bấm **Chạy code** hoặc tab **Trình duyệt** để xem kết quả. Bản nháp tự lưu trên trình duyệt; **Khôi phục** đưa code về mẫu trống. Khung này không chấm điểm tự động và chỉ chạy HTML/CSS nội bộ.

```playground-css
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Thực hành CSS · Bài 4</title>
  <style>
    /* Viết CSS tại đây */
  </style>
</head>
<body>
 
</body>
</html>
```
