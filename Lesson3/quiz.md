# Quiz cuối Buổi 3

## compound-selector

### Câu hỏi
Selector nào chọn một phần tử có đồng thời hai class menu và active?

### Lựa chọn
- [ ] `.menu .active`
- [x] `.menu.active`
- [ ] `.menu, .active`
- [ ] `#menu #active`

### Giải thích
.menu.active yêu cầu cùng một phần tử có cả hai class. Dấu cách chọn hậu duệ; dấu phẩy tạo hai selector độc lập.

### Ôn tập
[Nhóm selector và lỗi dễ nhầm](theory.md#4-nhom-selector-va-loi-de-nham)

## direct-child

### Câu hỏi
Selector nào chỉ chọn các p là con trực tiếp của phần tử content?

### Lựa chọn
- [ ] `.content p`
- [ ] `.content + p`
- [x] `.content > p`
- [ ] `.content ~ p`

### Giải thích
Dấu > biểu diễn quan hệ con trực tiếp. Dấu cách chọn hậu duệ ở mọi độ sâu; + và ~ biểu diễn quan hệ anh em phía sau.

### Ôn tập
[Combinator](theory.md#3-combinator-ket-hop-theo-quan-he-giua-phan-tu)

## pseudo-class

### Câu hỏi
Pseudo-class nào áp dụng khi con trỏ chuột đang ở trên phần tử?

### Lựa chọn
- [ ] `:focus`
- [ ] `:checked`
- [ ] `:active`
- [x] `:hover`

### Giải thích
:hover mô tả trạng thái con trỏ ở trên phần tử. :focus là nhận tiêu điểm; :active là đang kích hoạt; :checked dùng cho điều khiển được chọn.

### Ôn tập
[Pseudo selectors](theory.md#2-pseudo-selectors-bo-chon-gia)

## specificity

### Câu hỏi
Với h1 có id="heading" và class="heading", ba rule thông thường cùng nguồn và không có layer: #heading màu cam, .heading màu đỏ, h1 màu xanh. Màu nào thắng?

### Lựa chọn
- [x] Cam từ `#heading`
- [ ] Đỏ từ `.heading`
- [ ] Xanh từ `h1`
- [ ] Rule tải xong đầu tiên

### Giải thích
Khi nguồn và mức quan trọng ngang nhau, selector ID có specificity cao hơn class và selector thẻ. Thứ tự xuất hiện chỉ được xét khi các yếu tố trước ngang nhau.

### Ôn tập
[Specificity](theory.md#iv-specificity-do-uu-tien-cua-selector)

## bem-modifier

### Câu hỏi
Theo quy ước BEM trong bài, nút chính nên dùng class nào để giữ kiểu chung và thêm biến thể?

### Lựa chọn
- [ ] `class="button--primary"`
- [ ] `class="button__primary__active"`
- [x] `class="button button--primary"`
- [ ] `class="button primary modifier"`

### Giải thích
Modifier đi cùng class gốc: button nhận kiểu chung, button--primary bổ sung biến thể. Tên giống nhau không tự làm CSS kế thừa.

### Ôn tập
[BEM](theory.md#v-bem-quy-uoc-dat-ten-class)
