# Sổ tay lỗi · Tuần 10

## Cannot read properties of null (reading "addEventListener")

### Nhóm
DOM & Script

### Dấu hiệu
Console báo đỏ lỗi Cannot read properties of null khi cố gắng bắt sự kiện cho nút bấm.

### Mã sai

```html
<!-- SAI: Script đặt trong <head> không có defer -->
<head>
    <script src="app.js"></script> <!-- Sai: chạy trước khi DOM phía dưới được tạo, thiếu defer -->
</head>
<!-- JS chạy trước khi nút được tạo ra trong DOM: -->
<button id="btn">Click me</button>
```

### Cách sửa

```html
<!-- ĐÚNG: Thêm thuộc tính defer trong <head> -->
<head>
    <script src="app.js" defer></script>
</head>
<!-- Hoặc đặt script ở cuối cùng của <body> -->
```

### Ghi nhớ
Khi file script chạy ở <head>, cây HTML phía dưới chưa được phân tích. Do đó document.getElementById trả về null.

## Lỗi chính tả DOM: class, innnerHTML, getElementByID

### Nhóm
DOM API Typo

### Dấu hiệu
Code không báo lỗi nhưng không đổi class, hoặc báo hàm không tồn tại.

### Mã sai

```javascript
element.class = "active";    // Sai: đây không phải thuộc tính DOM dùng để đổi class (dùng className/classList)
element.innnerHTML = "text"; // SAI: 3 chữ n
document.getElementByID("x"); // SAI: chữ D viết hoa
```

### Cách sửa

```javascript
element.classList.add("active"); // ĐÚNG
element.innerHTML = "text";         // ĐÚNG
document.getElementById("x");        // ĐÚNG (id viết thường)
```

### Ghi nhớ
JavaScript phân biệt hoa thường và các thuộc tính/phương thức DOM tuân theo quy tắc camelCase.

## Quên event.preventDefault() làm nhảy trang hoặc mất dữ liệu

### Nhóm
Event Handling

### Dấu hiệu
Bấm thẻ <a href="#"> làm trang bị cuộn vọt lên đỉnh đầu, form tự reload trang.

### Mã sai

```javascript
link.addEventListener("click", function() { // Sai: không nhận event để chặn điều hướng mặc định
    // SAI: Không chặn hành vi mặc định
    openModal();
});
```

### Cách sửa

```javascript
link.addEventListener("click", function(event) {
    event.preventDefault(); // CHẶN NHẢY TRANG
    openModal();
});
```

### Ghi nhớ
event.preventDefault() vô hiệu hóa hành vi mặc định sẵn có của thẻ HTML mà không ảnh hưởng đến logic JavaScript.
