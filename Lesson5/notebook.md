# Sổ tay lỗi · Tuần 5

## justify-content không hoạt động

### Nhóm
Flexbox

### Dấu hiệu
Khai báo justify-content: center hoặc space-between nhưng các phần tử con vẫn xếp chồng dọc như thường.

### Mã sai

```text
.container {
    /* SAI: Quên bật flexbox ở thẻ cha */
    justify-content: center;
    align-items: center;
}
```

### Cách sửa

```text
.container {
    display: flex; /* BẮT BUỘC KHAI BÁO DISPLAY: FLEX */
    justify-content: center;
    align-items: center;
}
```

### Ghi nhớ
Các thuộc tính căn chỉnh trục như justify-content, align-items chỉ có tác dụng khi phần tử cha được thiết lập display: flex hoặc display: grid.

## position: absolute bay ra ngoài ý muốn

### Nhóm
Positioning

### Dấu hiệu
Đặt tọa độ top: 0, right: 0 cho icon nhưng icon bay thẳng lên góc trên cùng của toàn bộ trang web.

### Mã sai

```text
.card-badge {
    position: absolute;
    top: 10px;
    right: 10px;
}
/* Thẻ cha .card chưa có định vị, nên badge tìm lên tận <body> */
```

### Cách sửa

```text
.card {
    position: relative; /* ĐẶT KHUNG NEO TỌA ĐỘ CHO CON */
}
.card-badge {
    position: absolute;
    top: 10px;
    right: 10px;
}
```

### Ghi nhớ
Phần tử absolute sẽ tìm thẻ tổ tiên gần nhất có position khác static (thường là relative) để làm gốc tọa độ. Nếu không thấy, nó sẽ neo theo <html>.

## Giao diện bị thu nhỏ tí hon trên điện thoại

### Nhóm
Responsive Web

### Dấu hiệu
Mở web trên smartphone thì thấy toàn bộ trang web bị co cụm lại như xem trên máy tính từ xa.

### Mã sai

```text
<!-- SAI: Thiếu thẻ viewport trong <head> -->
<head>
    <meta charset="UTF-8">
    <title>Trang web</title>
</head>
```

### Cách sửa

```text
<!-- ĐÚNG: Luôn có meta viewport để tỷ lệ 1:1 theo màn hình thiết bị -->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang web</title>
</head>
```

### Ghi nhớ
Nếu thiếu meta viewport, trình duyệt điện thoại sẽ giả lập màn hình máy tính 980px và thu nhỏ trang web lại.
