# Sổ tay lỗi · Tuần 3

## CSS ngoài không được nạp

### Nhóm
I.2. Ba cách thêm CSS vào HTML

### Dấu hiệu
style.css cùng cấp index.html nhưng nội dung trang chưa được định dạng.

### Mã sai

```html
<link href="style.css"> <!-- Sai: thiếu rel="stylesheet" -->
```

### Cách sửa

```html
<link rel="stylesheet" href="style.css">
```

### Ghi nhớ
Đặt link trong head. Tệp .css chỉ chứa CSS, không bọc bằng thẻ style.

**Đối chiếu lý thuyết:** [Tuần 3 — I.2. Ba cách thêm CSS vào HTML](#/Lesson3/theory).

## Thiếu dấu chấm phẩy giữa hai khai báo

### Nhóm
I.1. Cú pháp cơ bản

### Dấu hiệu
Màu chữ và màu nền không được áp dụng như mong muốn.

### Mã sai

```css
.title {
  color: blue /* Sai: thiếu ; để kết thúc khai báo trước background-color */
  background-color: lightyellow;
}
```

### Cách sửa

```css
.title {
  color: blue;
  background-color: lightyellow;
}
```

### Ghi nhớ
Dùng dấu : giữa thuộc tính và giá trị, dấu ; giữa các khai báo. Lỗi này không làm mọi rule phía sau tự động mất hiệu lực.

**Đối chiếu lý thuyết:** [Tuần 3 — I.1. Cú pháp cơ bản](#/Lesson3/theory).

## Nhầm class đồng thời với class hậu duệ

### Nhóm
II.4. Nhóm selector và lỗi dễ nhầm

### Dấu hiệu
Phần tử có class="menu active" không đổi màu khi dùng selector hậu duệ.

### Mã sai

```css
.menu .active { color: orange; } /* Sai với yêu cầu: chọn active ở bên trong menu, không phải cùng phần tử */
```

### Cách sửa

```css
.menu.active { color: orange; }
```

### Ghi nhớ
Khoảng trắng biểu diễn quan hệ hậu duệ. Dấu phẩy trong .menu, .active lại chọn hai nhóm độc lập.

**Đối chiếu lý thuyết:** [Tuần 3 — II.4. Nhóm selector và lỗi dễ nhầm](#/Lesson3/theory).

## Nhầm nth-child với nth-of-type

### Nhóm
II.2.a. Pseudo-class

### Dấu hiệu
Với section có lần lượt h2, p A, p B, selector lại chọn đoạn A thay vì đoạn B.

### Mã sai

```css
p:nth-child(2) { color: blue; } /* Sai nếu muốn p thứ hai: phần tử con thứ hai là p A */
```

### Cách sửa

```css
p:nth-of-type(2) { color: blue; }
```

### Ghi nhớ
nth-child đếm vị trí giữa tất cả phần tử anh em; nth-of-type đếm theo loại thẻ. Vị trí bắt đầu từ 1.

**Đối chiếu lý thuyết:** [Tuần 3 — II.2.a. Pseudo-class](#/Lesson3/theory).

## Before không hiển thị nội dung

### Nhóm
II.2.b. Pseudo-element

### Dấu hiệu
Đã đặt màu cho phần tử giả nhưng không thấy ký hiệu trước thông báo.

### Mã sai

```css
.notice::before { color: orange; } /* Thiếu content nên phần tử giả không tạo nội dung hiển thị */
```

### Cách sửa

```css
.notice::before {
  content: "★ ";
  color: orange;
}
```

### Ghi nhớ
Viết nội dung thiết yếu trong HTML. before/after chỉ dùng bổ sung hoặc trang trí như ví dụ bài học.

**Đối chiếu lý thuyết:** [Tuần 3 — II.2.b. Pseudo-element](#/Lesson3/theory).

## Nhầm con trực tiếp với hậu duệ

### Nhóm
II.3. Combinator

### Dấu hiệu
Muốn tô mọi đoạn văn trong content nhưng đoạn nằm trong div con không được chọn.

### Mã sai

```css
.content > p { color: blue; } /* Sai với yêu cầu mọi cấp: > chỉ chọn con trực tiếp */
```

### Cách sửa

```css
.content p { color: blue; }
```

### Ghi nhớ
Dùng > khi thật sự chỉ muốn con trực tiếp. + và ~ chọn anh em phía sau có cùng cha, không chọn hậu duệ.

**Đối chiếu lý thuyết:** [Tuần 3 — II.3. Combinator](#/Lesson3/theory).

## Cho rằng viết sau luôn thắng selector ID

### Nhóm
III. Cascade; IV. Specificity

### Dấu hiệu
Với h1 id="heading" class="heading", tiêu đề vẫn màu cam dù rule class viết sau.

### Mã sai

```css
#heading { color: orange; }
.heading { color: blue; } /* Không thắng: (0,1,0) thấp hơn (1,0,0) khi cùng nguồn/mức quan trọng */
```

### Cách sửa

```css
.heading { color: orange; }
.heading { color: blue; } /* Cùng trọng số và điều kiện cascade: khai báo sau thắng */
```

### Ghi nhớ
Trong ví dụ đơn giản, bỏ selector ID không cần thiết rồi dùng class nhất quán. Xét mức quan trọng trước specificity; chỉ dùng thứ tự khi các yếu tố trước ngang nhau.

**Đối chiếu lý thuyết:** [Tuần 3 — III. Cascade; IV. Specificity](#/Lesson3/theory).

## Modifier BEM thay thế class gốc

### Nhóm
V. BEM — Block và Modifier

### Dấu hiệu
Nút có màu riêng nhưng mất kiểu chung như viền hoặc màu chữ.

### Mã sai

```html
<button class="button--primary">Đăng ký</button> <!-- Sai theo quy ước của bài: thiếu class button chứa kiểu chung -->
```

### Cách sửa

```html
<button type="button" class="button button--primary">Đăng ký</button>
```

### Ghi nhớ
Modifier đi kèm class gốc, không tự kế thừa chỉ vì tên bắt đầu giống nhau. Dùng __ cho element và -- cho modifier.

**Đối chiếu lý thuyết:** [Tuần 3 — V. BEM — Block và Modifier](#/Lesson3/theory).
