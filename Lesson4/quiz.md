# Quiz cuối Buổi 4: Box Model, Đơn vị CSS, Typography và Tài nguyên

20 câu hỏi · Mỗi câu có một đáp án đúng, giải thích và liên kết ôn tập.

## css-cau-01

### Câu hỏi

Trong mô hình Box Model, thứ tự các thành phần tính từ trong ra ngoài là gì?

### Lựa chọn

- [ ] Margin, Border, Padding, Content.
- [x] Content, Padding, Border, Margin.
- [ ] Content, Margin, Padding, Border.
- [ ] Padding, Content, Margin, Border.

### Giải thích

Theo Box Model, 4 thành phần tính từ trong ra ngoài lần lượt là: Content (Nội dung) -> Padding (Vùng đệm) -> Border (Đường viền) -> Margin (Lề).

### Ôn tập

[1.1. Box Model là gì?](theory.md#1-1-box-model-la-gi)

## css-cau-02

### Câu hỏi

Vùng nào trong Box Model luôn luôn trong suốt và dùng để tạo khoảng cách giữa các phần tử với nhau?

### Lựa chọn

- [ ] Border
- [ ] Content
- [ ] Padding
- [x] Margin

### Giải thích

Margin (Lề) là khoảng cách từ Border của phần tử này đến phần tử khác, và vùng này luôn trong suốt.

### Ôn tập

[1.1. Box Model là gì?](theory.md#1-1-box-model-la-gi)

## css-cau-03

### Câu hỏi

Đơn vị `rem` trong CSS mang tính tương đối dựa trên kích thước font chữ của yếu tố nào?

### Lựa chọn

- [ ] Phần tử cha gần nhất.
- [x] Thẻ gốc `<html>` (root).
- [ ] Chiều rộng của cửa sổ trình duyệt.
- [ ] Kích thước mặc định của chính phần tử đó.

### Giải thích

Đơn vị `rem` có kích thước tương đối tính theo font-size của thẻ gốc `<html>`.

### Ôn tập

[1.2. Đơn vị trong CSS (CSS Units)](theory.md#1-2-don-vi-trong-css-css-units)

## css-cau-04

### Câu hỏi

Thuộc tính CSS nào được sử dụng để điều chỉnh độ đậm nhạt của phông chữ (ví dụ: 400 là bình thường, 700 là in đậm)?

### Lựa chọn

- [ ] `font-family`
- [x] `font-weight`
- [ ] `font-size`
- [ ] `line-height`

### Giải thích

`font-weight` là thuộc tính dùng để quy định độ đậm nhạt của chữ.

### Ôn tập

[1.3. Typography (Nghệ thuật sắp chữ)](theory.md#1-3-typography-nghe-thuat-sap-chu)

## css-cau-05

### Câu hỏi

Thuộc tính nào trong Typography được dùng để thiết lập khoảng cách giữa các dòng văn bản?

### Lựa chọn

- [x] `line-height`
- [ ] `text-align`
- [ ] `margin-bottom`
- [ ] `font-size`

### Giải thích

`line-height` là thuộc tính dùng để điều chỉnh khoảng cách giữa các dòng văn bản giúp văn bản dễ đọc hơn.

### Ôn tập

[1.3. Typography (Nghệ thuật sắp chữ)](theory.md#1-3-typography-nghe-thuat-sap-chu)

## css-cau-06

### Câu hỏi

Định dạng nào được khuyến khích sử dụng cho các biểu tượng (icons) trong các dự án ReactJS hiện đại thay vì dùng thư viện font cồng kềnh?

### Lựa chọn

- [ ] PNG
- [ ] JPG
- [x] Inline SVG
- [ ] GIF

### Giải thích

Trong các dự án React/TS hiện đại, lập trình viên ưa chuộng Inline SVG vì tối ưu hiệu năng (Tree-shaking), dễ tùy biến và không bị chớp nháy (FOIT).

### Ôn tập

[5.1. SVG vs Font Icons (Tại sao React thích SVG?)](theory.md#5-5-lua-chon-svg-va-font-icon)

## css-cau-07

### Câu hỏi

Thuộc tính `box-sizing` mặc định trong CSS có giá trị là gì?

### Lựa chọn

- [ ] `border-box`
- [ ] `padding-box`
- [x] `content-box`
- [ ] `margin-box`

### Giải thích

Mặc định, cơ chế của Box Model là `box-sizing: content-box`, khiến việc thêm padding và border làm khối bị phình to ra ngoài dự tính.

### Ôn tập

[2.1. Cơ chế tính toán kích thước Box Model](theory.md#3-1-co-che-tinh-toan-kich-thuoc-box-model)

## css-cau-08

### Câu hỏi

Hàm CSS nào cho phép chữ tự động co giãn kích thước theo màn hình dựa trên 3 tham số (nhỏ nhất, lý tưởng, lớn nhất)?

### Lựa chọn

- [ ] `calc()`
- [ ] `minmax()`
- [ ] `fluid()`
- [x] `clamp()`

### Giải thích

Hàm `clamp()` của CSS hiện đại giúp chữ tự to nhỏ theo màn hình với 3 tham số (nhỏ nhất, lý tưởng, lớn nhất) mà không cần dùng nhiều Media Queries.

### Ôn tập

[5.3. Fluid Typography (Chữ tự động co giãn)](theory.md#5-7-fluid-typography-chu-tu-dong-co-gian)

## css-cau-09

### Câu hỏi

Sự khác biệt cơ bản về màu sắc (background) giữa Padding và Margin là gì?

### Lựa chọn

- [x] Padding có màu nền trùng với Content, còn Margin luôn trong suốt.
- [ ] Margin có màu nền trùng với Content, còn Padding luôn trong suốt.
- [ ] Cả Padding và Margin đều luôn luôn trong suốt.
- [ ] Cả Padding và Margin đều nhận màu nền của phần tử cha.

### Giải thích

Padding trong suốt nhưng có cùng màu nền với Content. Margin là khoảng cách bên ngoài Border nên luôn luôn trong suốt.

### Ôn tập

[1.1. Box Model là gì?](theory.md#1-1-box-model-la-gi)

## css-cau-10

### Câu hỏi

Tại sao việc sử dụng đơn vị `rem` cho `font-size` lại được coi là Best Practice thay vì dùng `px`?

### Lựa chọn

- [ ] Vì `rem` giúp trình duyệt tải trang nhanh hơn `px`.
- [ ] Vì `rem` tự động đồng bộ màu sắc với thẻ HTML gốc.
- [x] Vì `rem` đảm bảo tính trợ năng (Accessibility), giúp chữ tự động phóng to khi người dùng cài đặt cỡ chữ hệ thống lớn hơn.
- [ ] Vì `rem` là đơn vị duy nhất có thể sử dụng được trong ReactJS.

### Giải thích

Khi người dùng khiếm thị tăng cỡ chữ mặc định trong cài đặt trình duyệt, đơn vị `rem` sẽ tự động tăng theo, đảm bảo tính trợ năng. Đơn vị `px` cứng thì không làm được điều này.

### Ôn tập

[2.2. Cơ chế hoạt động của rem](theory.md#3-2-co-che-hoat-dong-cua-rem)

## css-cau-11

### Câu hỏi

Đơn vị `vh` và `vw` trong CSS mang ý nghĩa là gì?

### Lựa chọn

- [ ] Tương đối theo 1% chiều cao và chiều rộng của phần tử cha.
- [x] Tương đối theo 1% chiều cao (viewport height) hoặc chiều rộng (viewport width) của cửa sổ trình duyệt.
- [ ] Kích thước tuyệt đối được tính bằng độ phân giải màn hình.
- [ ] Tương đối theo kích thước chữ của phần tử hiện tại.

### Giải thích

`vh` và `vw` là đơn vị tương đối theo 1% chiều cao (viewport height) hoặc chiều rộng (viewport width) của cửa sổ trình duyệt.

### Ôn tập

[1.2. Đơn vị trong CSS (CSS Units)](theory.md#1-2-don-vi-trong-css-css-units)

## css-cau-12

### Câu hỏi

Ý nghĩa của việc thêm tham số `&display=swap` vào URL khi nhúng Google Fonts là gì?

### Lựa chọn

- [ ] Để trình duyệt đảo ngược màu sắc của chữ khi ở chế độ Dark Mode.
- [ ] Để tự động chuyển đổi giữa các font chữ có sẵn trong máy tính.
- [ ] Để thay thế các icon bị lỗi hiển thị.
- [x] Để hiển thị chữ bằng font mặc định trước, và tráo đổi (swap) sang font Google khi tải xong, tránh hiện tượng "màn hình trống rỗng".

### Giải thích

Thuộc tính này báo cho trình duyệt hiển thị chữ bằng font mặc định trước, tải xong mới swap, giúp tránh hiện tượng "màn hình trống rỗng" (FOIT) khi mạng chậm.

### Ôn tập

[5.2. Tối ưu tải Font (Font Display)](theory.md#5-6-toi-uu-tai-font-font-display)

## css-cau-13

### Câu hỏi

Ưu điểm của việc sử dụng Inline SVG so với tải toàn bộ thư viện Font Icons (như FontAwesome) là gì?

### Lựa chọn

- [ ] Giúp giảm dung lượng ảnh xuống còn 0 pixel.
- [x] Tối ưu hiệu năng vì chỉ tải những icon được dùng (Tree-shaking), không bị chớp nháy (FOIT) và dễ dàng đổi màu.
- [ ] Tự động chuyển biểu tượng thành mã HTML thuần túy.
- [ ] Inline SVG là định dạng duy nhất hỗ trợ hiệu ứng 3D trên trình duyệt.

### Giải thích

SVG tối ưu hiệu năng (chỉ tải icon được dùng), dễ tùy biến màu sắc bằng CSS và không bị delay chờ tải file (tránh FOIT).

### Ôn tập

[5.1. SVG vs Font Icons (Tại sao React thích SVG?)](theory.md#5-5-lua-chon-svg-va-font-icon)

## css-cau-14

### Câu hỏi

Khi khai báo `box-sizing: border-box`, kích thước của thuộc tính `width` sẽ bao trùm lên các thành phần nào?

### Lựa chọn

- [ ] Chỉ vùng Content.
- [ ] Vùng Content và Padding.
- [x] Vùng Content, Padding và Border.
- [ ] Vùng Content, Padding, Border và Margin.

### Giải thích

Với `border-box`, trình duyệt ép Padding và Border lùi vào bên trong chiều rộng đã thiết lập, nghĩa là tổng chiều rộng (width) đã bao gồm cả Content, Padding và Border.

### Ôn tập

[2.1. Cơ chế tính toán kích thước Box Model](theory.md#3-1-co-che-tinh-toan-kich-thuoc-box-model)

## css-cau-15

### Câu hỏi

Khái niệm "Margin Collapse" (Sụp lún Margin) theo tài liệu được hiểu như thế nào?

### Lựa chọn

- [ ] Khi hai khối liền kề chạm nhau theo chiều ngang (trái - phải), khoảng cách bị gộp lại.
- [ ] Khoảng cách margin tự động biến mất khi màn hình thu nhỏ lại.
- [ ] Khi margin và padding của cùng một khối bị triệt tiêu lẫn nhau.
- [x] Khi hai khối trên-dưới chạm nhau, khoảng cách dọc giữa chúng không cộng dồn mà bị gộp lại lấy giá trị lớn hơn.

### Giải thích

Margin Collapse xảy ra khi hai khối trên-dưới chạm nhau, khoảng cách thực tế không cộng dồn mà gộp lại và lấy giá trị margin lớn hơn.

### Ôn tập

[4.2. Margin Collapse (Sụp lún Margin)](theory.md#6-2-margin-collapse-sup-lun-margin)

## css-cau-16

### Câu hỏi

Trong đoạn mã khởi tạo Global Styles, bộ chọn `*` (Universal Selector) được dùng để làm gì?

### Lựa chọn

- [ ] Chọn tất cả các phần tử con nằm trong thẻ `<body>`.
- [x] Áp dụng cơ chế `border-box` và xóa `margin`, `padding` mặc định cho toàn bộ các phần tử trên trang.
- [ ] Chuyển đổi toàn bộ text trên trang thành chữ in hoa.
- [ ] Xóa toàn bộ định dạng CSS cũ của trình duyệt và thay bằng màu đen mặc định.

### Giải thích

Bộ chọn `*` và các pseudo-elements của nó (`*::before`, `*::after`) được dùng để set `box-sizing: border-box` và reset `margin`, `padding` về 0 cho mọi phần tử.

### Ôn tập

[Bước 1: Khởi tạo Global Styles & Thiết lập Box Model](theory.md#5-1-thiet-lap-box-model-dung-chung)

## css-cau-17

### Câu hỏi

Cho một thẻ `<div>` có `width: 200px`, `padding: 10px` ở cả 4 cạnh, `border: 2px solid black` ở cả 4 cạnh. Nếu phần tử sử dụng cơ chế mặc định `box-sizing: content-box`, tổng chiều rộng (Total Width) thực tế trên màn hình là bao nhiêu?

### Lựa chọn

- [ ] 200px
- [ ] 212px
- [x] 224px
- [ ] 248px

### Giải thích

Tổng chiều rộng = Width (200) + Padding Left (10) + Padding Right (10) + Border Left (2) + Border Right (2) = 224px.

### Ôn tập

[2.1. Cơ chế tính toán kích thước Box Model](theory.md#3-1-co-che-tinh-toan-kich-thuoc-box-model)

## css-cau-18

### Câu hỏi

Giả sử trình duyệt đang có kích thước font chữ mặc định ở thẻ `<html>` là `16px`. Nếu bạn gán cho thẻ tiêu đề thuộc tính `font-size: 1.5rem`, thì tiêu đề đó sẽ hiển thị với kích thước tương đương bao nhiêu pixel?

### Lựa chọn

- [ ] 16px
- [x] 24px
- [ ] 1.5px
- [ ] 32px

### Giải thích

Đơn vị `rem` nhân với font-size của thẻ gốc (html). Kích thước thực tế = 1.5 \* 16px = 24px.

### Ôn tập

[2.2. Cơ chế hoạt động của rem](theory.md#3-2-co-che-hoat-dong-cua-rem)

## css-cau-19

### Câu hỏi

Có hai phần tử khối (block) xếp chồng lên nhau. Khối bên trên được thiết lập `margin-bottom: 40px`. Khối bên dưới được thiết lập `margin-top: 25px`. Theo nguyên lý Margin Collapse, khoảng cách dọc thực tế giữa hai phần tử này là bao nhiêu?

### Lựa chọn

- [ ] 25px
- [x] 40px
- [ ] 65px
- [ ] 15px

### Giải thích

Do Margin Collapse, khoảng cách giữa hai phần tử không cộng dồn (65px) mà lấy giá trị lớn hơn giữa 40px và 25px, kết quả là 40px.

### Ôn tập

[4.2. Margin Collapse (Sụp lún Margin)](theory.md#6-2-margin-collapse-sup-lun-margin)

## css-cau-20

### Câu hỏi

Đoạn mã `font-size: clamp(1rem, 4vw, 2.5rem);` sẽ khiến kích thước chữ hoạt động như thế nào?

### Lựa chọn

- [ ] Kích thước chữ luôn giữ ở mức 4vw, nhưng nếu nhỏ hơn 1rem nó sẽ ẩn đi.
- [ ] Kích thước chữ cố định ở 2.5rem trên máy tính và 1rem trên điện thoại di động.
- [x] Kích thước chữ thay đổi theo 4% chiều rộng màn hình, nhưng luôn được giới hạn không nhỏ hơn 1rem và không lớn hơn 2.5rem.
- [ ] Trình duyệt tự chọn ngẫu nhiên một trong 3 kích thước để hiển thị sao cho phù hợp với nội dung.

### Giải thích

Cú pháp của clamp là `clamp(nhỏ nhất, lý tưởng, lớn nhất)`. Font-size sẽ thay đổi lý tưởng theo 4vw (4% chiều rộng màn hình) nhưng bị chặn (clamp) ở mức tối thiểu 1rem và tối đa 2.5rem.

### Ôn tập

[5.3. Fluid Typography (Chữ tự động co giãn)](theory.md#5-7-fluid-typography-chu-tu-dong-co-gian)
