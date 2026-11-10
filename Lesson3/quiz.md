# Quiz cuối Buổi 3: CSS cơ bản, Selector, Cascade, Specificity và BEM

20 câu hỏi · Mỗi câu có một đáp án đúng, giải thích và liên kết ôn tập.

## css-cau-01

### Câu hỏi

CSS (Cascading Style Sheets) được định nghĩa là gì?

### Lựa chọn

- [ ] Là ngôn ngữ lập trình dùng để xử lý các logic phức tạp trên trang web.
- [ ] Là bộ khung xương dùng để xây dựng cấu trúc nội dung của trang web.
- [x] Là ngôn ngữ định kiểu, sử dụng để mô tả cách hiển thị của tài liệu HTML (màu sắc, chữ viết, khoảng cách...).
- [ ] Là một thư viện JavaScript dùng để tạo hiệu ứng chuyển động.

### Giải thích

Theo khái niệm, CSS là ngôn ngữ định kiểu, được sử dụng để mô tả cách hiển thị của tài liệu HTML. CSS không phải là ngôn ngữ lập trình.

### Ôn tập

[1.1. CSS là gì?](theory.md#1-1-css-la-gi)

## css-cau-02

### Câu hỏi

Trong cú pháp CSS cơ bản, thành phần nào dùng để xác định phần tử HTML sẽ được định dạng?

### Lựa chọn

- [ ] Value (Giá trị)
- [ ] Property (Thuộc tính)
- [x] Selector (Bộ chọn)
- [ ] Declaration (Khai báo)

### Giải thích

Selector (Bộ chọn) có ý nghĩa là xác định phần tử HTML nào sẽ được định dạng.

### Ôn tập

[1.2. Cú pháp cơ bản](theory.md#2-1-cau-truc-quy-tac-css)

## css-cau-03

### Câu hỏi

Cách thêm CSS nào sau đây tác động đến phạm vi toàn bộ một trang web và được viết bên trong thẻ `<style>` đặt ở `<head>`?

### Lựa chọn

- [ ] Inline CSS
- [x] Internal CSS
- [ ] External CSS
- [ ] Global CSS

### Giải thích

Internal CSS là cách viết bên trong thẻ `<style>` đặt ở phần `<head>` của file HTML và tác động trong phạm vi một trang.

### Ôn tập

[1.3. Các cách thêm CSS vào HTML](theory.md#2-2-cac-cach-them-css-vao-html)

## css-cau-04

### Câu hỏi

Để chọn phần tử theo ID (ID Selector), ta sử dụng ký hiệu nào trước tên ID?

### Lựa chọn

- [ ] Dấu chấm (`.`)
- [ ] Dấu sao (`*`)
- [ ] Dấu gạch ngang (`-`)
- [x] Dấu thăng (`#`)

### Giải thích

ID Selector (Chọn theo ID) sử dụng dấu thăng (`#`). Ví dụ: `#intro`.

### Ôn tập

[2.1. DOM Selectors (Bộ chọn cơ bản)](theory.md#5-1-dom-selectors-bo-chon-co-ban)

## css-cau-05

### Câu hỏi

Pseudo-element (Bộ chọn giả phần tử) `::before` có chức năng gì?

### Lựa chọn

- [ ] Chọn phần tử nằm ngay trước phần tử hiện tại.
- [x] Tạo thêm một phần nội dung ảo trước nội dung của phần tử.
- [ ] Chọn trạng thái khi người dùng di chuột vào phần tử.
- [ ] Xóa nội dung nằm phía trước phần tử.

### Giải thích

`::before` thuộc nhóm Pseudo-element, dùng để định dạng một phần nhỏ hoặc tạo thêm nội dung ảo trước nội dung của phần tử.

### Ôn tập

[2.2. Pseudo Selectors (Bộ chọn giả)](theory.md#5-2-pseudo-selectors-bo-chon-gia)

## css-cau-06

### Câu hỏi

Thuộc tính CSS nào sau đây được dùng để bo tròn các góc của phần tử?

### Lựa chọn

- [ ] `box-shadow`
- [ ] `background-size`
- [x] `border-radius`
- [ ] `opacity`

### Giải thích

`border-radius` dùng để bo tròn các góc của phần tử (VD: `5px` để bo nhẹ, `50%` để tạo hình tròn).

### Ôn tập

[2.4. Các thuộc tính CSS giao diện cơ bản](theory.md#5-4-cac-thuoc-tinh-css-giao-dien-co-ban)

## css-cau-07

### Câu hỏi

Trong cơ chế Cascade, quy tắc nào mang mức ưu tiên (Importance) cao nhất và sẽ thắng tất cả các quy tắc khác?

### Lựa chọn

- [ ] Khai báo có Specificity cao nhất.
- [ ] Khai báo được viết ở dưới cùng của file CSS.
- [ ] Khai báo được viết dưới dạng Inline CSS.
- [x] Khai báo có chứa `!important`.

### Giải thích

Trong trình tự ưu tiên của cơ chế Cascade, khai báo có `!important` (Tầm quan trọng) sẽ thắng tất cả.

### Ôn tập

[4.1. Cơ chế Cascade (Xếp tầng)](theory.md#3-2-co-che-cascade-xep-tang)

## css-cau-08

### Câu hỏi

BEM là tiêu chuẩn Clean Code trong CSS viết tắt của từ gì?

### Lựa chọn

- [ ] Base - Element - Module
- [x] Block - Element - Modifier
- [ ] Box - Effect - Margin
- [ ] Border - Element - Modifier

### Giải thích

BEM là viết tắt của Block - Element - Modifier, là quy ước đặt tên class rõ ràng, dễ bảo trì.

### Ôn tập

[4.3. Quy ước đặt tên BEM (Block - Element - Modifier)](theory.md#5-5-quy-uoc-dat-ten-bem-block-element-modifier)

## css-cau-09

### Câu hỏi

Tại sao phương pháp "External CSS" lại được coi là Best Practice (Thực hành tốt nhất) so với các phương pháp khác?

### Lựa chọn

- [ ] Vì nó là phương pháp duy nhất có thể đổi màu chữ.
- [ ] Vì nó tác động trực tiếp vào từng thẻ HTML, giúp độ ưu tiên cao nhất.
- [x] Vì mã nguồn gọn gàng, dễ bảo trì, tối ưu hiệu suất tải trang và tái sử dụng được cho nhiều trang.
- [ ] Vì nó không yêu cầu phải sử dụng các Selector.

### Giải thích

External CSS viết vào file `.css` riêng biệt, liên kết bằng `<link>`, giúp mã nguồn gọn gàng, dễ bảo trì, tối ưu tải trang và tái sử dụng cho nhiều trang.

### Ôn tập

[1.3. Các cách thêm CSS vào HTML](theory.md#2-2-cac-cach-them-css-vao-html)

## css-cau-10

### Câu hỏi

Sự khác biệt giữa bộ chọn kết hợp Descendant (Khoảng trắng) và Child (`>`) là gì?

### Lựa chọn

- [ ] Khoảng trắng chọn thẻ cha, còn `>` chọn thẻ con.
- [x] Khoảng trắng chọn tất cả phần tử con cháu bên trong, còn `>` chỉ chọn phần tử là con trực tiếp.
- [ ] Khoảng trắng ưu tiên cao hơn `>`.
- [ ] Khoảng trắng chỉ dùng cho class, còn `>` chỉ dùng cho thẻ HTML.

### Giải thích

Descendant (Khoảng trắng) chọn tất cả các phần tử nằm trong phần tử cha, còn Child (`>`) chỉ nhắm mục tiêu đến phần tử là con trực tiếp của phần tử cha đó.

### Ôn tập

[2.3. Combinators (Bộ chọn kết hợp)](theory.md#5-3-combinators-bo-chon-ket-hop)

## css-cau-11

### Câu hỏi

Một phần tử được thiết lập thuộc tính `display: block` sẽ có đặc điểm hiển thị như thế nào?

### Lựa chọn

- [ ] Nằm cùng dòng với nội dung xung quanh và chỉ chiếm không gian vừa đủ.
- [ ] Bị ẩn hoàn toàn khỏi trang web và không chiếm không gian.
- [ ] Nằm trên cùng một dòng nhưng cho phép thiết lập kích thước chiều cao, chiều rộng.
- [x] Hiển thị thành một khối, tự động xuống dòng và chiếm 100% chiều ngang khả dụng.

### Giải thích

`display: block` có đặc điểm là hiển thị thành một khối, tự động xuống dòng và chiếm 100% chiều ngang khả dụng.

### Ôn tập

[2.4. Các thuộc tính CSS giao diện cơ bản](theory.md#5-4-cac-thuoc-tinh-css-giao-dien-co-ban)

## css-cau-12

### Câu hỏi

Khi viết mã CSS, cú pháp `.menu.active` (viết liền không có khoảng trắng) có ý nghĩa gì?

### Lựa chọn

- [ ] Chọn tất cả các phần tử có class `.active` nằm bên trong phần tử `.menu`.
- [x] Chọn phần tử có đồng thời cả 2 class là `.menu` và `.active`.
- [ ] Chọn phần tử `.menu` đứng ngay trước phần tử `.active`.
- [ ] Chọn tất cả các phần tử `.menu` hoặc `.active`.

### Giải thích

Viết liền nhau không có khoảng trắng là để nhắm tới phần tử chứa ĐỒNG THỜI cả 2 class. Việc viết cách khoảng trắng sẽ bị nhầm sang việc chọn phần tử con.

### Ôn tập

[3.1. Lỗi viết sai Selector nhóm và Class kết hợp](theory.md#6-1-loi-viet-sai-selector-nhom-va-class-ket-hop)

## css-cau-13

### Câu hỏi

Nguyên nhân nào khiến một phần tử ảo (như `::before` hoặc `::after`) không được trình duyệt tạo ra và hiển thị?

### Lựa chọn

- [ ] Do phần tử ảo đó chưa được gắn thẻ `display: block`.
- [x] Do quên khai báo thuộc tính `content`.
- [ ] Do viết sai dấu hai chấm thành dấu một chấm.
- [ ] Do pseudo-element không hỗ trợ thêm màu nền (background-color).

### Giải thích

Khi sử dụng `::before` hoặc `::after`, nếu thiếu thuộc tính `content`, phần tử ảo sẽ không được trình duyệt tạo ra (bắt buộc phải có, dù là chuỗi rỗng `""`).

### Ôn tập

[3.2. Quên thuộc tính content ở Pseudo-element](theory.md#6-2-quen-thuoc-tinh-content-o-pseudo-element)

## css-cau-14

### Câu hỏi

Trong cơ chế Cascade, giả sử 2 quy tắc CSS không sử dụng `!important` và có Specificity (trọng số) hoàn toàn bằng nhau, quy tắc nào sẽ được trình duyệt áp dụng?

### Lựa chọn

- [ ] Trình duyệt tự động trộn hai giá trị lại với nhau.
- [ ] Quy tắc áp dụng cho phần tử `div` sẽ thắng.
- [ ] Đoạn code được viết trước (trên cùng) sẽ thắng.
- [x] Đoạn code được viết sau (dưới cùng) sẽ thắng.

### Giải thích

Yếu tố Source Order (Thứ tự mã nguồn): Nếu 2 yếu tố Importance và Specificity bằng nhau, đoạn code viết sau (dưới cùng) sẽ thắng.

### Ôn tập

[4.1. Cơ chế Cascade (Xếp tầng)](theory.md#3-2-co-che-cascade-xep-tang)

## css-cau-15

### Câu hỏi

Dựa theo bảng tính toán Specificity, quy tắc so sánh nào sau đây là chính xác nhất?

### Lựa chọn

- [ ] Một Class mạnh hơn một ID.
- [ ] Một số lượng lớn các Thẻ (Type) có thể thắng được một Class.
- [x] ID mạnh hơn Class, Class mạnh hơn Thẻ (Type).
- [ ] Thuộc tính (Attribute) mạnh hơn Pseudo-class.

### Giải thích

So sánh từ trái sang phải theo 3 cột (A, B, C): ID mạnh hơn Class, Class mạnh hơn Thẻ. Một ID `(1, 0, 0)` luôn thắng nhiều class `(0, 10, 0)`.

### Ôn tập

[4.2. Tính toán Specificity (Độ ưu tiên của Selector)](theory.md#3-3-tinh-toan-specificity-do-uu-tien-cua-selector)

## css-cau-16

### Câu hỏi

Lợi ích lớn nhất của việc sử dụng chuẩn đặt tên BEM trong CSS là gì?

### Lựa chọn

- [ ] Làm cho các hiệu ứng (Animation) hoạt động mượt mà hơn.
- [x] Tên class nói lên rõ vai trò, điểm Specificity luôn thấp và phẳng, dễ ghi đè mà không phải lạm dụng `!important`.
- [ ] Giúp HTML tự động tương thích với mọi kích thước màn hình thiết bị di động.
- [ ] BEM cho phép viết CSS mà không cần sử dụng Class hay ID.

### Giải thích

BEM giúp tên class nói lên rõ vai trò của phần tử, có điểm Specificity luôn thấp và phẳng `(0, 1, 0)`, cực kỳ dễ ghi đè, không bao giờ phải lạm dụng `!important`.

### Ôn tập

[4.3. Quy ước đặt tên BEM (Block - Element - Modifier)](theory.md#5-5-quy-uoc-dat-ten-bem-block-element-modifier)

## css-cau-17

### Câu hỏi

Cho đoạn HTML và CSS sau. Thành phần nào sẽ được tô màu đỏ?

```
<div class="content">
  <p>Đoạn A</p>
  <div><p>Đoạn B</p></div>
  <p>Đoạn C</p>
</div>

```

```
.content > p { color: red; }

```

### Lựa chọn

- [ ] Chỉ Đoạn A có màu đỏ.
- [x] Đoạn A và Đoạn C có màu đỏ.
- [ ] Chỉ Đoạn B có màu đỏ.
- [ ] Cả 3 Đoạn A, B và C đều có màu đỏ.

### Giải thích

Bộ chọn Child (`>`) chỉ nhắm tới thẻ `p` là con trực tiếp của `.content`. Đoạn A và C là con trực tiếp. Đoạn B là cháu (nằm trong một `div` khác) nên không bị ảnh hưởng.

### Ôn tập

[2.3. Combinators (Bộ chọn kết hợp)](theory.md#5-3-combinators-bo-chon-ket-hop)

## css-cau-18

### Câu hỏi

Một phần tử `<p>` bị tác động bởi 3 đoạn CSS dưới đây. Hỏi cuối cùng phần tử đó sẽ có màu gì theo quy tắc tính Specificity?

```
p { color: red; }
.text { color: yellow; }
#welcome { color: blue; }

```

### Lựa chọn

- [x] Màu xanh lam (blue).
- [ ] Màu vàng (yellow).
- [ ] Màu đỏ (red).
- [ ] Trình duyệt báo lỗi do xung đột mã.

### Giải thích

Selector `p` có điểm là `(0, 0, 1)`. Selector `.text` có điểm `(0, 1, 0)`. Selector `#welcome` (ID) có điểm `(1, 0, 0)`. Điểm của `#welcome` là lớn nhất nên quy tắc `color: blue;` sẽ "thắng".

### Ôn tập

[4.2. Tính toán Specificity (Độ ưu tiên của Selector)](theory.md#3-3-tinh-toan-specificity-do-uu-tien-cua-selector)

## css-cau-19

### Câu hỏi

Tính điểm Specificity cho bộ chọn `#main .card p`:

### Lựa chọn

- [ ] `(0, 2, 1)`
- [ ] `(0, 1, 2)`
- [x] `(1, 1, 1)`
- [ ] `(1, 0, 2)`

### Giải thích

Bộ chọn `#main .card p` bao gồm: 1 ID (`#main`), 1 Class (`.card`), và 1 Type/Thẻ (`p`). Áp dụng vào 3 cột (A, B, C) ta có kết quả là `(1, 1, 1)`.

### Ôn tập

[4.2. Tính toán Specificity (Độ ưu tiên của Selector)](theory.md#3-3-tinh-toan-specificity-do-uu-tien-cua-selector)

## css-cau-20

### Câu hỏi

Bạn đang xây dựng một nút bấm (Button) theo chuẩn BEM. Bạn đã có class gốc là `.button`. Bây giờ bạn muốn tạo một biến thể nút với nền màu xanh (Primary). Cách đặt tên class nào sau đây tuân thủ chuẩn BEM?

### Lựa chọn

- [ ] `.button__primary`
- [ ] `.button-primary`
- [ ] `.button_primary`
- [x] `.button--primary`

### Giải thích

Theo cấu trúc BEM, Modifier (Biến thể/trạng thái) được ngăn cách bởi hai dấu gạch ngang `--`. Ví dụ chuẩn là `.button--primary`.

### Ôn tập

[4.3. Quy ước đặt tên BEM (Block - Element - Modifier)](theory.md#5-5-quy-uoc-dat-ten-bem-block-element-modifier)
