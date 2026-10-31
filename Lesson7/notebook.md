# Sổ tay lỗi · Tuần 7

## Lỗi ReferenceError: variable is not defined

### Nhóm
JavaScript Biến & Kiểu

### Dấu hiệu
Console báo đỏ Uncaught ReferenceError: userName is not defined.

### Mã sai

```text
console.log(userName); // Dùng trước khi khai báo!
let userName = "HIT HaUI";
```

### Cách sửa

```text
// Luôn khai báo trước khi sử dụng:
let userName = "HIT HaUI";
console.log(userName);
```

### Ghi nhớ
Biến khai báo bằng let và const nằm trong vùng "Temporal Dead Zone" (TDZ) từ đầu block cho đến khi dòng khai báo được thực thi.

## Ép kiểu chuỗi ngầm định khi cộng số

### Nhóm
Toán tử JS

### Dấu hiệu
Lấy giá trị từ ô input cộng với số nhưng kết quả bị ghép chuỗi ("5" + 2 = "52" thay vì 7).

### Mã sai

```text
const count = input.value; // Trả về chuỗi: "5"
const total = count + 2;   // Kết quả: "52"!
```

### Cách sửa

```text
const count = Number(input.value); // Hoặc +input.value
const total = count + 2;             // Kết quả đúng: 7
```

### Ghi nhớ
Thuộc tính .value của input luôn là kiểu String. Toán tử + khi gặp chuỗi sẽ ưu tiên thực hiện phép nối chuỗi (concatenation).

## Nhầm giữa phép gán = và so sánh ===

### Nhóm
Rẽ nhánh & Điều kiện

### Dấu hiệu
Điều kiện if luôn luôn đúng (truthy) ngoài ý muốn.

### Mã sai

```text
let role = "member";
if (role = "admin") { // SAI: Đây là phép GÁN, gán role thành "admin"!
    console.log("Chào Admin"); // Luôn chạy!
}
```

### Cách sửa

```text
let role = "member";
if (role === "admin") { // ĐÚNG: So sánh bằng nghiêm ngặt cả giá trị lẫn kiểu
    console.log("Chào Admin");
}
```

### Ghi nhớ
Dấu = là phép gán giá trị. Dấu == hoặc === là phép so sánh. Hãy luôn dùng === để so sánh an toàn trong JavaScript.
