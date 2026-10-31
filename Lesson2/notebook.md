# Sổ tay lỗi · Tuần 2

## Sai đường dẫn hình ảnh (Lỗi 404 Not Found)

### Nhóm
HTML & Đường dẫn

### Dấu hiệu
Hình ảnh hiển thị icon ảnh vỡ kèm nội dung alt. Console báo đỏ GET ... 404 (Not Found).

### Mã sai

```text
<!-- SAI: Nhầm đường dẫn tuyệt đối bắt đầu bằng / hoặc quên cấp thư mục -->
<img src="/images/banner.png" alt="Banner">
<img src="banner.png" alt="Banner">
```

### Cách sửa

```text
<!-- ĐÚNG: Dùng đường dẫn tương đối từ file HTML -->
<img src="./images/banner.png" alt="Banner">
<!-- Nếu ảnh ở thư mục ngoài: -->
<img src="../img/banner.png" alt="Banner">
```

### Ghi nhớ
Đường dẫn bắt đầu bằng "/" sẽ nhảy về gốc ổ đĩa hoặc domain root. Khi deploy lên GitHub Pages (ví dụ github.io/repo/), đường dẫn "/" chắc chắn bị 404.

## Label không kết nối được với ô Input

### Nhóm
HTML Form

### Dấu hiệu
Nhấp chuột vào dòng chữ của label nhưng ô nhập liệu hoặc checkbox không được focus hay kích hoạt.

### Mã sai

```text
<!-- SAI: for trỏ tới name hoặc id gõ sai ký tự -->
<label for="user-email">Email:</label>
<input type="email" name="user-email">
```

### Cách sửa

```text
<!-- ĐÚNG: Giá trị thuộc tính for phải trùng khớp 100% với id của input -->
<label for="user-email">Email:</label>
<input type="email" id="user-email" name="user-email">
```

### Ghi nhớ
Trình duyệt liên kết ngữ nghĩa giữa <label> và <input> thông qua cặp thuộc tính for và id, chứ không thông qua name.

## Quên preventDefault() làm Form tải lại trang

### Nhóm
Sự kiện & Form

### Dấu hiệu
Bấm nút submit thì trang web nhấp nháy tải lại, dữ liệu form vừa nhập và console.log biến mất ngay lập tức.

### Mã sai

```text
form.addEventListener("submit", function() {
    // SAI: Quên nhận e và gọi e.preventDefault()
    console.log("Đã gửi form!"); // Bị xóa mất ngay do trang reload!
});
```

### Cách sửa

```text
form.addEventListener("submit", function(event) {
    event.preventDefault(); // CHẶN HÀNH VI RELOAD MẶC ĐỊNH
    console.log("Xử lý form an toàn bằng JavaScript!");
});
```

### Ghi nhớ
Thẻ <form> có hành vi mặc định khi submit là gửi HTTP request và tải lại toàn bộ trang. Phải dùng event.preventDefault() để xử lý bằng JS.

## Lồng thẻ sai ngữ nghĩa (Invalid Nesting)

### Nhóm
Semantic HTML

### Dấu hiệu
Trình duyệt tự động đóng thẻ sớm hoặc nhảy phần tử ra ngoài, làm bố cục vỡ bất ngờ.

### Mã sai

```text
<!-- SAI: <p> không được chứa các thẻ khối như <div>, <h1>, <ul> -->
<p>Giới thiệu khóa học <div>CLB Tin học HIT</div></p>
<!-- SAI: <a> lồng trong <a> -->
<a href="#page">Xem bài <a href="#author">Tác giả</a></a>
```

### Cách sửa

```text
<!-- ĐÚNG: Dùng các khối độc lập hoặc thẻ nội dòng như <span> -->
<div class="intro">
    <p>Giới thiệu khóa học <span class="highlight">CLB Tin học HIT</span></p>
</div>
```

### Ghi nhớ
Theo đặc tả HTML5, trình duyệt gặp thẻ block bên trong <p> sẽ tự động chèn thẻ đóng </p> ngầm định ngay trước đó.
