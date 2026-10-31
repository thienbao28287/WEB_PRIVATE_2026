# Sổ tay lỗi · Tuần 12

## In ra Promise { <pending> } do quên await

### Nhóm
Async / Await

### Dấu hiệu
console.log thấy in ra đối tượng Promise trạng thái pending thay vì dữ liệu JSON thực tế.

### Mã sai

```text
async function getData() {
    const res = fetch("https://api.example.com/users"); // Quên await!
    console.log(res); // In ra: Promise { <pending> }
}
```

### Cách sửa

```text
async function getData() {
    const res = await fetch("https://api.example.com/users");
    const data = await res.json(); // Nhớ await cả res.json()!
    console.log(data); // In ra dữ liệu mảng/đối tượng chuẩn
}
```

### Ghi nhớ
fetch() và response.json() là các tác vụ bất đồng bộ trả về Promise. Cần dùng await bên trong hàm async để chờ kết quả hoàn thành.

## Lỗi CORS Policy khi gọi API

### Nhóm
Fetch & API

### Dấu hiệu
Console báo đỏ: Access to fetch at ... has been blocked by CORS policy: No "Access-Control-Allow-Origin" header.

### Mã sai

```text
// Gọi API từ một domain khác mà server chưa cấu hình header CORS
fetch("https://private-api.com/data");
```

### Cách sửa

```text
// Giải pháp:
// 1. Dùng API có hỗ trợ CORS mở (Public API)
// 2. Cấu hình Backend cho phép domain frontend truy cập (Access-Control-Allow-Origin)
// 3. Hoặc dùng server trung gian (Proxy Server)
```

### Ghi nhớ
CORS là cơ chế bảo mật do trình duyệt thực thi nhằm ngăn chặn trang web đọc trộm tài nguyên nhạy cảm từ domain khác.
