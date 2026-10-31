# Sổ tay lỗi · Tuần 3

## CSS không áp dụng do chưa link hoặc sai đường dẫn

### Nhóm
CSS Cơ bản

### Dấu hiệu
Trang web trơ trọi chỉ có văn bản thô, kiểm tra F12 tab Network không thấy file .css nào được tải.

### Mã sai

```html
<!-- SAI: Quên rel="stylesheet" hoặc sai đường dẫn file -->
<link href="style.css"> <!-- Sai: thiếu rel="stylesheet" -->
<link rel="stylesheet" href="/style.css"> <!-- Sai nếu CSS ở trong repo: / trỏ về gốc domain -->
```

### Cách sửa

```html
<!-- ĐÚNG: Đặt trong <head>, có rel="stylesheet" và đường dẫn tương đối chính xác -->
<link rel="stylesheet" href="./css/style.css">
```

### Ghi nhớ
Nếu thiếu rel="stylesheet", trình duyệt coi đó là một tài nguyên thông thường chứ không nạp vào hệ thống tạo kiểu CSS.

## Xung đột độ ưu tiên (CSS Specificity bị đè)

### Nhóm
CSS Specificity

### Dấu hiệu
Viết class đúng nhưng màu sắc/kích thước không đổi; mở F12 thấy thuộc tính bị gạch ngang (strike-through).

### Mã sai

```css
/* CSS thư viện hoặc CSS chung dùng ID: */
#main-menu a { color: #1E293B; }

/* Class này sẽ KHÔNG ĂN vì ID mạnh hơn class: */
.menu-active { color: #F47B2A; } /* Bị selector chứa ID ở trên ghi đè */
```

### Cách sửa

```css
/* CÁCH SỬA: Tăng độ ưu tiên khớp với cha, hoặc dùng BEM hạn chế dùng ID */
#main-menu a.menu-active { color: #F47B2A; }

/* BEM chuẩn mực: */
.menu__link--active { color: #F47B2A; }
```

### Ghi nhớ
Thứ tự ưu tiên: Inline Style > ID Selector (100đ) > Class/Attribute/Pseudo-class (10đ) > Element Selector (1đ).

## Thiếu dấu chấm phẩy giữa hai khai báo CSS

### Nhóm
Cú pháp CSS

### Dấu hiệu
Một số class ở nửa dưới file CSS hoàn toàn không có tác dụng mặc dù viết đúng.

### Mã sai

```css
.btn-primary {
    background-color: #F47B2A   /* <-- THIẾU DẤU ; */
    color: #FFFFFF;
}
/* Rule độc lập phía dưới vẫn hợp lệ: */
.btn-secondary { color: #374151; }
```

### Cách sửa

```css
.btn-primary {
    background-color: #F47B2A; /* Đầy đủ dấu ; */
    color: #FFFFFF;
}
.btn-secondary {
    color: #374151;
}
```

### Ghi nhớ
Khi thiếu dấu chấm phẩy giữa hai khai báo, trình duyệt có thể đọc chúng thành một giá trị không hợp lệ và bỏ khai báo đó. Rule độc lập tiếp theo vẫn được xử lý.

## Trình duyệt lưu cache file CSS cũ

### Nhóm
Trình duyệt

### Dấu hiệu
Sửa code trong file CSS, lưu lại rồi bấm F5 trên trình duyệt nhưng giao diện vẫn giữ nguyên mẫu cũ.

### Mã sai

```text
# Chỉ bấm F5 thông thường -> Trình duyệt đọc lại file CSS từ bộ nhớ đệm (disk cache)
```

### Cách sửa

```text
# SỬA BẰNG PHÍM TẮT:
Ctrl + Shift + R (hoặc Ctrl + F5)
# Hoặc mở F12 -> tab Network -> Tích chọn "Disable cache"
```

### Ghi nhớ
Để tăng tốc độ tải trang, trình duyệt lưu cache file tĩnh (.css, .js). Hãy dùng Hard Reload khi đang trong quá trình phát triển.
