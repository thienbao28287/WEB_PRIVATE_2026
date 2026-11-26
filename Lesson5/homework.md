# Bài tập Buổi 5 — Responsive Web

## Yêu cầu

Tạo `index.html` và `style.css` bằng HTML và CSS thuần. Dựng toàn bộ giao diện theo [trang mẫu này](https://vanphuoc0443.github.io/hit-web-responsive/), từ đầu trang đến chân trang. Mở mẫu bằng trình duyệt, bật DevTools, kéo thay đổi chiều rộng cửa sổ để quan sát bố cục đổi như thế nào ở màn hình hẹp, vừa và rộng. Sau đó dựng lại cho giống.

> Chỉ làm phần giao diện, chưa cần JavaScript. Các hiệu ứng cần JavaScript trong mẫu (nếu có) có thể bỏ qua.

1. **Viewport và Mobile-First.** Thêm thẻ meta viewport vào `<head>`. Viết CSS theo hướng Mobile-First: phần CSS gốc dành cho điện thoại, sau đó dùng `@media (min-width: ...)` để mở rộng bố cục. Chọn breakpoint theo lúc mẫu đổi bố cục khi bạn kéo cửa sổ. Trong comment CSS, ghi lý do chọn từng breakpoint.
2. **Flexbox cho nội dung một chiều.** Dùng Flexbox cho ít nhất hai cụm nội dung sắp xếp theo một hàng hoặc một cột trong mẫu, ví dụ thanh điều hướng, hàng nút hay hàng thông tin. Dùng `display: flex`, `justify-content`, `align-items` và `gap`. Với cụm có thể bị chật trên màn hình hẹp, dùng `flex-wrap` hoặc đổi `flex-direction`, không để tràn ra ngoài trang.
3. **Grid cho khu vực nhiều thẻ.** Dùng Grid cho khu vực gồm nhiều thẻ hoặc nhiều ô trong mẫu. Dùng `display: grid`, `grid-template-columns` với `repeat()` và `minmax(0, 1fr)`, cùng `gap`. Các thẻ nằm cùng hàng phải cao bằng nhau.
4. **Số cột thay đổi theo màn hình.** Khu vực Grid ở yêu cầu 3 phải có số cột khớp mẫu ở ba độ rộng: hẹp, vừa và rộng. Dùng media query hoặc `repeat(auto-fit, minmax(...))`. Trong comment CSS, ghi số cột tại từng độ rộng bạn đã kiểm tra.
5. **Đơn vị và giới hạn kích thước.** Dùng `max-width` kết hợp `margin-inline: auto` để giới hạn độ rộng nội dung trên màn hình lớn. Ảnh có `max-width: 100%` và `height: auto`. Dùng `rem` cho khoảng cách hoặc cỡ chữ, và dùng `clamp()` cho cỡ chữ của tiêu đề chính.
6. **Hình thức.** Chọn màu, font và khoảng cách gần với mẫu. Ảnh có `alt` mô tả đúng nội dung. Chữ dễ đọc và có độ tương phản đủ rõ trên mọi nền.

## Kiểm tra và nộp bài

- Mở `index.html` bằng Live Server và đối chiếu toàn bộ giao diện với mẫu ở ba độ rộng: khoảng `375px`, `768px` và `1200px`.
- Bật chế độ mô phỏng thiết bị trong DevTools, rồi kéo thay đổi chiều rộng liên tục để phát hiện lỗi ở khoảng giữa các breakpoint. Kiểm tra bố cục đổi đúng ở hai phía của mỗi breakpoint.
- Kiểm tra ảnh và thẻ nằm gọn trong khung, văn bản dài xuống dòng hợp lý, các nút và liên kết dễ bấm, trang không có thanh cuộn ngang.
- Dùng DevTools bật lớp phủ Grid và Flex để đối chiếu số cột và hướng sắp xếp với comment CSS.
- Nộp `index.html`, `style.css`, các ảnh dùng trong bài và ba ảnh chụp kết quả ở màn hình hẹp, vừa và rộng. Dùng đường dẫn tương đối cho CSS và ảnh.
