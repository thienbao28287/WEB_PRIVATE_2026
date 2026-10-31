# Sổ tay lỗi · Tuần 14

## Sai đường dẫn tệp trên GitHub Pages (Case sensitivity)

### Nhóm
HTML & Deploy

### Dấu hiệu
Chạy trên máy tính Windows thì ảnh và CSS chạy tốt, nhưng đưa lên GitHub Pages thì bị lỗi 404.

### Mã sai

```html
<!-- Tên tệp trên Git là logo-02.PNG nhưng code viết: -->
<img src="./img/logo-02.png"> <!-- Sai: tệp là logo-02.PNG, đuôi .png không khớp chữ hoa/thường -->
```

### Cách sửa

```html
<!-- Khớp chính xác 100% từng chữ hoa và chữ thường: -->
<img src="./img/logo-02.PNG">
<!-- Khuyên dùng: Đổi toàn bộ tên tệp sang chữ thường trước khi commit -->
```

### Ghi nhớ
Windows không phân biệt chữ hoa thường (Case-insensitive) nhưng máy chủ Linux (GitHub Actions / Pages) phân biệt nghiêm ngặt.

## Quên event.preventDefault() trong Form

### Nhóm
DOM & Event

### Dấu hiệu
Submit form khiến trang web reload, làm mất toàn bộ state trên trình duyệt.

### Mã sai

```javascript
form.onsubmit = () => {
    sendData(); // Sai: chưa gọi e.preventDefault(), submit mặc định vẫn tải lại trang
};
```

### Cách sửa

```javascript
form.onsubmit = (e) => {
    e.preventDefault(); // Luôn luôn chặn reload
    sendData();
};
```

### Ghi nhớ
Xem chi tiết hướng dẫn xử lý và các ví dụ tại bài lý thuyết [Sổ tay lỗi thường gặp](#/Lesson14/theory).

## Độ ưu tiên CSS Specificity và !important

### Nhóm
CSS Architecture

### Dấu hiệu
Lạm dụng !important để ghi đè CSS khiến dự án về sau không thể sửa hay mở rộng giao diện.

### Mã sai

```css
.title { color: #F47B2A !important; } /* Lạm dụng !important gây khó ghi đè; bản thân cú pháp này hợp lệ */
.card-title { color: #1E293B !important; } /* Gây hỗn loạn */
```

### Cách sửa

```css
/* Sử dụng phương pháp đặt tên BEM: */
.card__title { color: #1E293B; }
.card__title--highlight { color: #F47B2A; }
```

### Ghi nhớ
Hạn chế tối đa !important. Hãy cấu trúc CSS theo BEM để giữ độ ưu tiên phẳng và dễ kiểm soát.
