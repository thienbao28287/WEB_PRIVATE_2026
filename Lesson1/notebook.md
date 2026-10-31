# Sổ tay lỗi · Tuần 1

## Lệnh git/node báo "not recognized"

### Nhóm
Cài đặt môi trường

### Dấu hiệu
Mở Terminal gõ git hoặc node thì báo lỗi "The term is not recognized as the name of a cmdlet...".

### Mã sai

```text
# Gõ trên PowerShell/CMD:
git --version # Sai nếu chưa cài Git hoặc PATH chưa chứa thư mục Git
# -> Lỗi: git : The term 'git' is not recognized...
```

### Cách sửa

```text
# Sửa: Mở Windows Search -> "Edit the system environment variables"
# Thêm đường dẫn cài đặt Git vào biến PATH, ví dụ:
C:\Program Files\Git\cmd
# Sau đó khởi động lại hoàn toàn VS Code / Terminal
```

### Ghi nhớ
Khi cài đặt Git hoặc Node.js, bạn quên chưa tích chọn tùy chọn "Add to PATH", hoặc chưa khởi động lại Terminal sau khi cài đặt.

## Lưu file thành index.html.txt

### Nhóm
Thao tác tệp

### Dấu hiệu
Mở file trên trình duyệt thì thấy hiện nguyên văn mã nguồn HTML như tệp văn bản thô, không hiện giao diện web.

### Mã sai

```text
<!-- Tên tệp trên ổ cứng bị ẩn đuôi: -->
index.html.txt # Sai: phần mở rộng thực tế là .txt, không phải .html
```

### Cách sửa

```text
<!-- Bật tính năng hiển thị đuôi file trên Windows: -->
<!-- File Explorer -> View -> Tích chọn "File name extensions" -->
index.html
```

### Ghi nhớ
Windows mặc định ẩn phần mở rộng (.txt). Khi bạn lưu index.html bằng Notepad hoặc tạo file mới, hệ điều hành tự gắn thêm đuôi .txt.

## Mở trực tiếp file:// thay vì máy chủ cục bộ

### Nhóm
Môi trường chạy

### Dấu hiệu
Các tính năng như ES Modules (import/export), Fetch API, hình ảnh cục bộ bị chặn với thông báo CORS policy.

### Mã sai

```text
// Đường dẫn trên thanh URL trình duyệt:
file:///C:/HIT/project/index.html // Sai: file:// không cung cấp môi trường HTTP cho fetch/module
```

### Cách sửa

```text
// Sử dụng Live Server trong VS Code hoặc npm dev:
http://127.0.0.1:5500/index.html
```

### Ghi nhớ
Trình duyệt áp dụng chính sách bảo mật Same-Origin nghiêm ngặt trên giao thức file:///. Luôn sử dụng extension Live Server hoặc dev server.
