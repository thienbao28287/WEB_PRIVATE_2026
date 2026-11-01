# Quiz cuối Buổi 2

## label-input

### Câu hỏi
Để label liên kết với ô nhập, for của label phải trùng giá trị nào?

### Lựa chọn
- [ ] `name` của input
- [x] `id` của input
- [ ] `type` của input
- [ ] `class` của input

### Giải thích
for của label tham chiếu tới id của ô nhập. name dùng đặt tên dữ liệu khi gửi form, không tạo liên kết với nhãn.

### Ôn tập
[Thẻ biểu mẫu (Form)](theory.md#7-the-bieu-mau-form)

## required

### Câu hỏi
Thuộc tính nào đánh dấu trường nhập không được để trống khi kiểm tra form?

### Lựa chọn
- [ ] `placeholder`
- [ ] `readonly`
- [x] `required`
- [ ] `checked`

### Giải thích
required bật ràng buộc bắt buộc nhập của trình duyệt. placeholder chỉ là gợi ý trong ô và không ngăn người dùng bỏ trống.

### Ôn tập
[Thẻ biểu mẫu (Form)](theory.md#7-the-bieu-mau-form)

## image-path

### Câu hỏi
Thư mục img nằm cùng cấp index.html và chứa avatar.png. Cách viết nào phù hợp để hiển thị ảnh?

### Lựa chọn
- [ ] `<img src="avatar.png">`
- [ ] `<img src="../avatar.png">`
- [x] `<img src="img/avatar.png" alt="Ảnh đại diện">`
- [ ] `<img href="img/avatar.png">`

### Giải thích
src="img/avatar.png" đi từ tệp HTML vào thư mục img. Thẻ img dùng src, không dùng href; alt mô tả nội dung ảnh.

### Ôn tập
[Liên kết và hình ảnh](theory.md#4-the-lien-ket-va-hinh-anh)

## semantic-main

### Câu hỏi
Thẻ nào thể hiện nội dung chính của trang?

### Lựa chọn
- [x] `<main>`
- [ ] `<nav>`
- [ ] `<aside>`
- [ ] `<footer>`

### Giải thích
main đánh dấu nội dung chính. nav là khu vực điều hướng, aside là nội dung bổ sung và footer là phần cuối trang hoặc khu vực.

### Ôn tập
[Thẻ ngữ nghĩa](theory.md#1-the-ngu-nghia-semantic-html)

## radio-group

### Câu hỏi
Hai radio chọn ca học cần cùng thuộc tính nào để chỉ chọn được một ca trong nhóm?

### Lựa chọn
- [ ] `id`
- [ ] `value`
- [ ] `class`
- [x] `name`

### Giải thích
Radio cùng nhóm dùng chung name, mỗi lựa chọn có value riêng. ID của các phần tử vẫn phải duy nhất trong trang.

### Ôn tập
[Thẻ biểu mẫu (Form)](theory.md#7-the-bieu-mau-form)
