# Buổi 1: Công cụ lập trình, Git/GitHub và tổng quan Web

## Mục tiêu

Sau bài này, bạn có thể:

- Chuẩn bị trình soạn thảo và các tiện ích phục vụ viết mã Web.
- Phân biệt vai trò của HTML, CSS và JavaScript.
- Sử dụng Git cơ bản và xuất bản trang HTML bằng GitHub Pages.

**Kiến thức cần biết trước:** Biết tạo thư mục, lưu file và sử dụng trình duyệt; chưa cần biết lập trình.

## 1. Khái niệm và mục đích

### Công cụ viết mã

VS Code là trình soạn thảo mã nguồn. Extensions bổ sung các chức năng như gợi ý mã, định dạng và mở bản xem trước.

Git là hệ thống quản lý phiên bản phân tán (VCS - Version Control System), giúp bạn theo dõi mọi thay đổi trong mã nguồn của dự án, từ đó có thể phối hợp và làm việc nhóm một cách dễ dàng và hiệu quả

**Mục đích sử dụng Git:**

 - Theo dõi sự thay đổi của dự án
 - Dễ dàng quay lại phiên bản trước đó nếu có lỗi
 - Hỗ trợ làm việc nhóm nhiều người trên cùng 1 dự án

**Các khái niệm cơ bản:**

- Repo (Repository): kho lưu trữ mã nguồn, nơi chứa toàn bộ các file và lịch sử thay đổi của dự án
    - Local repo: Đây là repo được thiết lập trên máy của lập trình viên và dành cho 1 người sử dụng
    - Remote repo: Đây là repo để chia sẻ giữa nhiều người và bố trí trên server chuyên dụng
- Branch: Tương tự như một workspace mới mà không ảnh hưởng tới nhánh chính
- Commit: là hành động ghi lại sự thay đổi trong repo của bạn
- Clone: là hành động tải một bản sao có sẵn của một remote repo server nào đó có sẵn
- Push: là hành động đưa các commit từ local repo lên remote repo

### GitHub là gì?
- GitHub là một nền tảng dựa trên web được thiết kế để lưu trữ mã nguồn và hỗ trợ quản lý phiên bản (version control) bằng cách sử dụng Git. Nó cung cấp không gian lưu trữ cho các dự án mã nguồn (repository) và các công cụ để quản lý, theo dõi và làm việc trong các dự án phần mềm.

**Mục đích liên kết Git với GitHub:**

- Khi liên kết Git và GitHub, mã nguồn sẽ được lưu trữ online, tức bạn có thể truy cập đến mã nguồn của mình từ bất cứ đâu, chỉ cần có mạng Internet
- Giúp sao lưu dữ liệu tránh trường hợp dữ liệu bị mất hay máy tính hỏng hóc
- Giúp chia sẻ mã nguồn và làm việc nhóm với các công cụ, tính năng giúp kiểm soát mã nguồn, xử lý lỗi

### HTML
- HTML (HyperText Markup Language) là ngôn ngữ đánh dấu được sử dụng để tạo cấu trúc và nội dung cho một trang web.
- HTML không phải là ngôn ngữ lập trình mà là ngôn ngữ đánh dấu để sắp xếp các thành phần như văn bản, hình ảnh, liên kết, biểu mẫu, và các nội dung khác trên trang web.

### CSS
- CSS (Cascading Style Sheets) là ngôn ngữ dùng để mô tả cách hiển thị của các phần tử HTML trên trang web.
- Nó quyết định về bố cục, màu sắc, kiểu chữ, kích thước, khoảng cách giữa các phần tử, v.v. CSS giúp trang web trông trực quan và dễ nhìn hơn.

### JavaScript (JS)
- JavaScript là ngôn ngữ lập trình dùng để bổ sung các chức năng và tính tương tác cho trang web.
- JavaScript có thể xử lý các sự kiện như nhấn nút, nhập dữ liệu, di chuyển chuột; thay đổi nội dung và giao diện trang web mà không cần tải lại toàn bộ trang.
- Ví dụ: nhấn nút để mở menu, kiểm tra thông tin trong biểu mẫu hoặc chuyển đổi giao diện sáng/tối.
- Khi xây dựng trang web, HTML tạo cấu trúc và nội dung, CSS định dạng giao diện, còn JavaScript xử lý hành vi và tương tác.

## 2. Cú pháp cơ bản

### 2.1. Cách đọc câu lệnh

Lệnh Git có dạng `git <lệnh> [tham-số]`. Các chỗ như `<url>` và `<file>` cần thay bằng giá trị thật, không gõ nguyên dấu `< >`. Chạy lệnh trong terminal tại thư mục dự án.

### 2.2. Cấu hình và lệnh Git

1. [Download Git](https://git-scm.com/downloads)

2. Thiết lập thông tin cá nhân của mình với Git

- Mục đích của việc thiết lập thông tin cá nhân trên Git (bao gồm tên và địa chỉ email) là để Git có thể xác định người thực hiện các hành động trong quá trình quản lý phiên bản (version control). Tức là khi thực hiện một commit trong Git, thông tin cá nhân như tên và email sẽ được ghi lại cùng với commit đó.
```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
git config --list
```
3. Các lệnh cơ bản khi dùng `Git`

- Khởi tạo và sao chép
```bash
git init                     # Khởi tạo repo Git mới
git clone <url>              # Sao chép một repo từ GitHub/GitLab...
```
- Theo dõi và thay đổi
```bash
git status                   # Kiểm tra trạng thái file
git add <file>               # Thêm file vào staging area
git add .                    # Thêm tất cả file vào staging
git commit -m "Thông điệp"   # Tạo commit mới
```
- Đẩy và lấy dữ liệu
```bash
git push                     # Đẩy code lên repository
git push origin main         # Đẩy code lên nhánh main
git pull                     # Kéo code mới nhất từ repo về
```
- Quản lý nhánh (Branch)
```bash
git branch                   # Liệt kê các nhánh
git branch <ten-nhanh>       # Tạo nhánh mới
git checkout <ten-nhanh>     # Chuyển sang nhánh khác
git checkout -b <ten-nhanh>  # Tạo và chuyển sang nhánh mới
git merge <ten-nhanh>        # Gộp nhánh vào nhánh hiện tại
git branch -d <ten-nhanh>    # Xoá nhánh đã gộp
```

## 3. Cách hoạt động

### 3.1. Trình duyệt hiển thị trang Web

Bạn lưu file HTML; trình duyệt đọc mã để tạo cây phần tử (DOM), áp dụng CSS rồi hiển thị trang. JavaScript có thể thay đổi nội dung hoặc phản hồi thao tác. Khi sửa file, cần lưu và tải lại trang; Live Server hỗ trợ tự tải lại.

### 3.2. Luồng lưu thay đổi với Git

`Sửa file → git add → git commit → git push`.

- Thư mục làm việc chứa file đang chỉnh sửa.
- Staging chứa các thay đổi đã chọn cho commit tiếp theo.
- Commit lưu mốc lịch sử trong repository local.
- Push đưa commit lên remote; chỉ lưu file hoặc commit chưa cập nhật GitHub.
- GitHub Pages xuất bản từ nguồn đã cấu hình sau khi triển khai hoàn tất.

## 4. Ví dụ minh họa

### Yêu cầu

Trong một thư mục thực hành mới, tạo trang chào và lưu phiên bản đầu tiên bằng Git. Cài VS Code và Git trước khi chạy ví dụ.

### Code

Lưu thành `index.html`:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trang đầu tiên</title>
</head>
<body>
  <h1>Xin chào HIT!</h1>
  <p>Tôi đang học lập trình Web.</p>
</body>
</html>
```

Mở terminal trong thư mục đó:

```bash
git init
git add index.html
git commit -m "Tạo trang chào"
git status
```

### Giải thích và kết quả

Mở file bằng trình duyệt sẽ thấy tiêu đề “Xin chào HIT!” và đoạn giới thiệu. `git add` chọn file, `git commit` lưu mốc lịch sử. Nếu chưa sửa thêm file, `git status` báo thư mục làm việc sạch. Ví dụ này lưu lịch sử trên máy; xem mục 5.4 để kết nối remote.

## 5. Các trường hợp thường dùng

### 5.1. Cài đặt IDE
[Visual Studio Code](https://code.visualstudio.com/)
### 5.2. Extensions
- HTML CSS Support

![Tiện ích HTML CSS Support trong Visual Studio Code](img/htmlsp.png)

- Live Server

![Tiện ích Live Server trong Visual Studio Code](img/livesv.png)

- Auto Close Tag

![Tiện ích Auto Close Tag trong Visual Studio Code](img/att.png)

- Auto Rename Tag

![Tiện ích Auto Rename Tag trong Visual Studio Code](img/atr.png)

- Các extension tham khảo:

| Tên extension | Tác dụng |
| --- | --- |
| IntelliSense for CSS class names in HTML | Gợi ý và tự động hoàn thành tên class trong HTML dựa trên các class đã khai báo trong CSS. |
| htmltagwrap | Bọc đoạn nội dung đang chọn bằng một thẻ HTML để thao tác nhanh hơn. |
| Path Intellisense | Gợi ý đường dẫn đến file và thư mục khi liên kết ảnh, CSS hoặc JavaScript. |
| Prettier - Code formatter | Tự động định dạng mã HTML, CSS và JavaScript, giúp thống nhất cách thụt lề và trình bày mã. |
| Color Highlight | Hiển thị màu tương ứng ngay tại các mã màu trong CSS để dễ nhận biết và kiểm tra. |
| CSS Peek | Xem nhanh hoặc chuyển đến phần định nghĩa CSS của class và ID từ file HTML. |
| Image preview | Xem trước hình ảnh ngay trong trình soạn thảo khi làm việc với đường dẫn ảnh. |
| JavaScript (ES6) code snippets | Cung cấp các mẫu mã JavaScript viết sẵn, giúp nhập nhanh những đoạn mã thường dùng. |
| ESLint | Phân tích mã JavaScript để phát hiện lỗi và các vấn đề về quy tắc viết mã; cần cấu hình ESLint phù hợp cho dự án. |

### 5.3. Tạo repository trên GitHub
- Sau khi tạo tài khoản để tạo một repo mới làm được nhấn vào button `new` như hình này:

![Nút New để tạo repository trên GitHub](img/new.png)

- Sau khi vào trang chính của tạo repo chúng ta đặt tên cho repo chuẩn bị tạo bằng cách nhập tên vào ô `input` như hình:

![Ô nhập tên repository mới trên GitHub](img/name.png)

- Cuối cùng kéo xuống dưới và nhấn vào `Create repository`:

![Nút Create repository để hoàn tất tạo kho mã nguồn](img/create.png)

### 5.4. Kết nối thư mục với repository

B1: Tạo một folder bất kỳ trên Laptop

![Tạo thư mục dự án trên máy tính](img/tao.png)

B2: Click chuột phải vào folder vừa tạo chọn `Show more options` sau đó chọn `Git Bash`:

B3: Sau khi hiển thị bảng như hình

![Cửa sổ Git Bash mở tại thư mục dự án](img/table.png)

thì chúng ta copy code ở GitHub vào đó

![Các lệnh GitHub hướng dẫn kết nối repository với thư mục dự án](img/copy.png)

![Chạy các lệnh kết nối repository trong Git Bash](img/run.png)

B4: Sau khi code chạy xong load lại trang ở GitHub

### 5.5. Xuất bản bằng GitHub Pages

B1: Mở folder vừa tạo trong VS code.
B2: Tạo một file có tên là `index.html`.
B3: Copy đoạn code sau vào file vừa tạo.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello anh em</h1>
</body>
</html>
```

B4: Mở lại Git Bash và gõ lệnh `git add .` và Enter

![Chạy git add để đưa thay đổi vào vùng staging](img/git-add.png)

B5: Tiếp theo gõ lệnh `git commit -m "message"` và Enter

![Chạy git commit để lưu thay đổi vào lịch sử Git](img/git-commit.png)

B6: Cuối cùng gõ lệnh `git push origin main` và Enter

![Chạy git push để đẩy commit lên GitHub](img/git-push.png)

Như vậy là đã thành công, load lại trang GitHub sẽ thấy file index.html đã được tải lên

![File index.html xuất hiện trong repository sau khi push](img/github-result.png)

B7: Tiếp tục ở trang GitHub, nhấn vào mục `Settings`



B8: Chọn vào phần Pages

![Mục Pages trong phần Settings của repository GitHub](img/page.png)

B9: Ở phần `Branch` chọn `main` như ảnh:

![Chọn nhánh main làm nguồn xuất bản GitHub Pages](img/pg.png)

B10: Nhấn vào button `Save` bên cạnh

![Lưu cấu hình GitHub Pages](img/pg%20%281%29.png)

B11: Đợi 1 lúc sau đó nhấn vào `Visit site`

![Nút Visit site để mở website đã xuất bản](img/visit.png)

B12: Nếu cần, thêm `index.html` (tên file vừa tạo ở bước 2) vào cuối địa chỉ. Với file `index.html` ở thư mục gốc, trang web thường mở trực tiếp tại đường dẫn GitHub Pages.

![Địa chỉ website ví dụ được xuất bản bằng GitHub Pages](img/add.png)

## 6. Lỗi thường gặp và lưu ý

| Biểu hiện | Nguyên nhân | Cách sửa |
| --- | --- | --- |
| Không nhận diện lệnh `git` | Chưa cài Git hoặc terminal chưa nhận PATH mới | Cài Git rồi mở lại terminal. |
| Commit yêu cầu danh tính | Chưa đặt tên, email | Chạy hai lệnh cấu hình ở mục 2.2. |
| `not a git repository` | Sai thư mục hoặc chưa khởi tạo | Mở đúng thư mục; chỉ khởi tạo nếu đây là dự án mới. |
| GitHub chưa có thay đổi | Chưa commit hoặc push | Kiểm tra `git status`, commit và push đúng nhánh. |
| Bản xem trước chưa đổi | Chưa lưu hoặc tải lại | Lưu file và kiểm tra đúng địa chỉ đang xem. |
| Pages báo 404 | Sai nguồn hoặc chưa triển khai xong | Kiểm tra cấu hình Pages, `index.html` và trạng thái triển khai. |

## 7. Tóm tắt

- HTML tạo nội dung, CSS định dạng, JavaScript xử lý tương tác.
- Git lưu lịch sử trên máy; GitHub lưu repository trực tuyến.
- Luồng thường dùng: sửa file → add → commit → push.

## 8. Bài tập thực hành

1. Tạo thư mục thực hành riêng và trang giới thiệu bản thân.
2. Mở bằng Live Server và kiểm tra thay đổi sau khi lưu.
3. Tạo hai commit: trang ban đầu và phần giới thiệu đã sửa.
4. Push lên repository riêng và xuất bản bằng Pages.

**Tiêu chí hoàn thành:** Trang mở được qua URL Pages; có hai commit với thông điệp mô tả đúng thay đổi.

## Tài liệu tham khảo

- [Visual Studio Code](https://code.visualstudio.com/)
- [Tài liệu Git](https://git-scm.com/doc)
- [Tài liệu GitHub Pages](https://docs.github.com/en/pages)
