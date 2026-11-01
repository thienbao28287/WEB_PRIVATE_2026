# Sổ tay ghi nhớ · Tuần 1

## Live Server chưa mở đúng trang

### Nhóm
I. Cài đặt IDE, Extensions

### Dấu hiệu
Trình duyệt đang mở trang cũ hoặc sửa HTML mà không thấy thay đổi.

### Mã sai

```text
index.html chưa được lưu  # Sai: Live Server chỉ đọc nội dung đã lưu trên đĩa
```

### Cách sửa

```text
1. Mở thư mục dự án trong VS Code
2. Lưu index.html (Ctrl + S)
3. Chuột phải index.html → Open with Live Server
4. Kiểm tra đúng địa chỉ và tên tệp trên trình duyệt
```

### Ghi nhớ
Cài extension Live Server trong VS Code và lưu tệp trước khi kiểm tra kết quả.

**Đối chiếu lý thuyết:** [Tuần 1 — I. Cài đặt IDE, Extensions](#/Lesson1/theory).

## Commit không chứa thay đổi vừa sửa

### Nhóm
II. Git & GitHub — Các lệnh cơ bản

### Dấu hiệu
Git báo không có thay đổi để commit, hoặc commit thiếu phần vừa sửa.

### Mã sai

```bash
git commit -m "Update page" # Sai nếu chưa git add: thay đổi chưa vào staging
```

### Cách sửa

```bash
git status
git add index.html
git commit -m "Update page"
git status
```

### Ghi nhớ
Sau khi sửa tiếp một tệp đã add, cần add lại để đưa phiên bản mới nhất vào staging.

**Đối chiếu lý thuyết:** [Tuần 1 — II. Git & GitHub — Các lệnh cơ bản](#/Lesson1/theory).

## Git chưa biết thông tin tác giả

### Nhóm
II. Git & GitHub — Thiết lập thông tin cá nhân

### Dấu hiệu
Khi commit, Git yêu cầu khai báo tên và email tác giả.

### Mã sai

```bash
git commit -m "First page" # Không thực hiện được nếu Git chưa có user.name và user.email
```

### Cách sửa

```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
git config --list
git commit -m "First page"
```

### Ghi nhớ
Dùng tên và email của bạn; đây là thông tin tác giả commit, không phải lệnh đăng nhập GitHub.

**Đối chiếu lý thuyết:** [Tuần 1 — II. Git & GitHub — Thiết lập thông tin cá nhân](#/Lesson1/theory).

## GitHub chưa nhận được nội dung vừa sửa

### Nhóm
II. Git & GitHub — GitHub Pages

### Dấu hiệu
Trang GitHub và website chưa có thay đổi sau khi chỉ lưu tệp trên máy.

### Mã sai

```bash
git add . # Chỉ đưa vào staging, chưa tạo commit và chưa gửi lên GitHub
```

### Cách sửa

```bash
git add .
git commit -m "Update homepage"
git push origin main
```

### Ghi nhớ
Lưu tệp, add, commit và push là các bước khác nhau. Sau push còn cần đợi GitHub Pages triển khai thành công; kiểm tra nguồn xuất bản đúng nhánh.

**Đối chiếu lý thuyết:** [Tuần 1 — II. Git & GitHub — GitHub Pages](#/Lesson1/theory).
