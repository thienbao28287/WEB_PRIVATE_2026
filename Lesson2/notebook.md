# Sổ tay lỗi · Tuần 2

## Sai đường dẫn hình ảnh (Lỗi 404 Not Found)

### Nhóm
III.4. Thẻ liên kết và hình ảnh

### Dấu hiệu
Giả sử index.html cùng cấp với thư mục images/ chứa banner.png: ảnh bị vỡ khi đường dẫn không trỏ đến tệp đó.

### Mã sai

```html
<img src="banner.png" alt="Banner"> <!-- Sai: ảnh nằm trong images/, không cùng cấp index.html -->
```

### Cách sửa

```html
<img src="./images/banner.png" alt="Banner">
```

### Ghi nhớ
Đường dẫn tương đối tính từ tệp HTML. Kiểm tra tên thư mục, tên tệp và chữ hoa/thường; alt mô tả ảnh chứ không sửa đường dẫn.

**Đối chiếu lý thuyết:** [Tuần 2 — III.4. Thẻ liên kết và hình ảnh](#/Lesson2/theory).

## Label không kết nối với ô nhập

### Nhóm
III.7. Thẻ biểu mẫu (Form)

### Dấu hiệu
Bấm nhãn Email nhưng ô nhập không nhận focus.

### Mã sai

```html
<label for="user-email">Email:</label>
<input type="email" name="user-email"> <!-- Sai: name không thay thế id mà for đang tham chiếu -->
```

### Cách sửa

```html
<label for="user-email">Email:</label>
<input type="email" id="user-email" name="email">
```

### Ghi nhớ
for phải khớp id. name là tên trường dữ liệu khi gửi form; id phải duy nhất trong trang.

**Đối chiếu lý thuyết:** [Tuần 2 — III.7. Thẻ biểu mẫu (Form)](#/Lesson2/theory).

## Hai radio chọn được cùng lúc

### Nhóm
III.7. Thẻ biểu mẫu (Form)

### Dấu hiệu
Người học chọn được cả ca sáng lẫn ca tối dù chỉ được đăng ký một ca.

### Mã sai

```html
<input type="radio" name="morning" value="morning"> Sáng
<input type="radio" name="evening" value="evening"> Tối <!-- Sai: khác name nên không cùng nhóm -->
```

### Cách sửa

```html
<label><input type="radio" name="session" value="morning"> Sáng</label>
<label><input type="radio" name="session" value="evening"> Tối</label>
```

### Ghi nhớ
Các radio cùng một nhóm trong form dùng cùng name, mỗi lựa chọn có value riêng.

**Đối chiếu lý thuyết:** [Tuần 2 — III.7. Thẻ biểu mẫu (Form)](#/Lesson2/theory).

## Form chưa kiểm tra email hoặc trường bắt buộc

### Nhóm
III.7. Thẻ biểu mẫu (Form)

### Dấu hiệu
Form chấp nhận trường email trống hoặc chuỗi không phải địa chỉ email.

### Mã sai

```html
<form>
  <input type="text" name="email"> <!-- Sai với yêu cầu: text không kiểm tra email và thiếu required -->
  <button type="button">Gửi</button> <!-- Không submit nên chưa kích hoạt kiểm tra khi gửi -->
</form>
```

### Cách sửa

```html
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Kiểm tra</button>
</form>
```

### Ghi nhớ
Dùng dữ liệu giả khi thử. type=email kiểm tra định dạng cơ bản, required không cho để trống. Ví dụ chưa có backend lưu dữ liệu.

**Đối chiếu lý thuyết:** [Tuần 2 — III.7. Thẻ biểu mẫu (Form)](#/Lesson2/theory).

## Lồng thẻ không hợp lệ

### Nhóm
III.1–2. Thẻ ngữ nghĩa, tiêu đề và văn bản

### Dấu hiệu
Bố cục DOM khác mã đã viết vì trình duyệt tự sửa cấu trúc.

### Mã sai

```html
<p>Giới thiệu <div>CLB HIT</div></p> <!-- Sai: p không chứa div -->
<a href="#intro">Giới thiệu <a href="#contact">Liên hệ</a></a> <!-- Sai: a không được lồng a -->
```

### Cách sửa

```html
<div><p>Giới thiệu <span>CLB HIT</span></p></div>
<a href="#intro">Giới thiệu</a>
<a href="#contact">Liên hệ</a>
```

### Ghi nhớ
Dùng div để nhóm khối, span để bao nội dung trong dòng; chọn thẻ theo vai trò nội dung.

**Đối chiếu lý thuyết:** [Tuần 2 — III.1–2. Thẻ ngữ nghĩa, tiêu đề và văn bản](#/Lesson2/theory).

## Script chạy trước phần tử cần sử dụng

### Nhóm
III.8. Thẻ script và style

### Dấu hiệu
Ví dụ đổi lời chào không hoạt động vì lúc script chạy, nút chưa tồn tại.

### Mã sai

```html
<script src="script.js"></script> <!-- Sai nếu script truy cập ngay hello-button trước khi nút được tạo -->
<button type="button" id="hello-button">Nhấn vào đây</button>
<p id="message">Chưa có lời chào.</p>
```

### Cách sửa

```html
<button type="button" id="hello-button">Nhấn vào đây</button>
<p id="message">Chưa có lời chào.</p>
<script src="script.js"></script>
```

### Ghi nhớ
Làm theo thứ tự ví dụ trong lý thuyết: nút và đoạn văn đứng trước script. Kiểm tra id trong HTML khớp với chuỗi trong getElementById.

**Đối chiếu lý thuyết:** [Tuần 2 — III.8. Thẻ script và style](#/Lesson2/theory).
