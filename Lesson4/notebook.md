# Sổ tay lỗi · Tuần 4

## Padding và Border làm phình to kích thước (Vỡ dòng)

### Nhóm
Box Model

### Dấu hiệu
Đặt 2 khối width: 50% đứng cạnh nhau, khi thêm padding hoặc viền thì khối thứ 2 bị rớt xuống dòng.

### Mã sai

```text
/* Mặc định box-sizing: content-box */
.col {
    width: 50%;
    padding: 20px; /* Tổng chiều rộng thực tế = 50% + 40px > 100%! */
}
```

### Cách sửa

```text
/* Khai báo Reset chuẩn mực ở đầu file CSS: */
*, *::before, *::after {
    box-sizing: border-box;
}
.col {
    width: 50%;
    padding: 20px; /* Chiều rộng luôn đúng chuẩn 50% */
}
```

### Ghi nhớ
Với content-box, padding và border được cộng thêm vào width. Với border-box, padding và border nằm gọn bên trong width đã khai báo.

## Nhầm lẫn giữa đơn vị em và rem

### Nhóm
Typography

### Dấu hiệu
Cỡ chữ bị phóng đại to quá mức khi các thẻ lồng nhau nhiều cấp.

### Mã sai

```text
/* em bị nhân dồn từ các cấp cha con: */
.card { font-size: 1.2em; }
.card-body { font-size: 1.2em; } /* Sẽ thành 1.2 * 1.2 = 1.44em */
```

### Cách sửa

```text
/* rem luôn tính theo gốc root <html> (16px), không bị nhân dồn: */
.card { font-size: 1.125rem; }
.card-body { font-size: 1rem; }
```

### Ghi nhớ
Đơn vị rem (root em) tham chiếu trực tiếp đến font-size của thẻ <html>, mang lại khả năng kiểm soát kích thước đồng đều và dễ dự đoán.
