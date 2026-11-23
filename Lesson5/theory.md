# Buổi 5: Flexbox, Grid và Responsive Design

## Mục tiêu

- Sắp xếp và căn chỉnh phần tử bằng Flexbox và Grid.
- Phân biệt thuộc tính đặt trên container với thuộc tính đặt trên item.
- Tạo bố cục co giãn, sử dụng media query và kiểm tra trên nhiều kích thước màn hình.

**Kiến thức cần biết trước:** HTML, selector, cascade, Box Model và đơn vị CSS ở các buổi 2–4.

## 1. Khái niệm và mục đích

### 1.1. Flexbox

Flexbox giúp sắp xếp, căn chỉnh và phân chia không gian giữa các phần tử trong một khung chứa. Các ứng dụng thường gặp gồm thanh menu, nhóm nút, danh sách thẻ và bố cục nội dung kèm sidebar.

**Flex Container** là phần tử cha được đặt `display: flex` hoặc `display: inline-flex`. **Flex Items** thường là các phần tử con trực tiếp của container.

```html
<div class="container">
    <div class="item">A</div>
    <div class="item">B</div>
    <div class="item">C</div>
</div>
```

```css
.container {
    display: flex;
}
```

Ba phần tử A, B, C trở thành flex items và mặc định nằm trên một hàng.

**Main Axis** là trục chính mà các item xếp theo. **Cross Axis** là trục phụ vuông góc với trục chính. Hướng trục chính phụ thuộc `flex-direction`.

- Với `row`, trục chính nằm ngang, trục phụ nằm dọc.
- Với `column`, trục chính nằm dọc, trục phụ nằm ngang.
- **Main Size** là kích thước item theo trục chính, tương ứng chiều rộng khi dùng `row` và chiều cao khi dùng `column`.
- **Cross Size** là kích thước item theo trục phụ, tương ứng chiều cao khi dùng `row` và chiều rộng khi dùng `column`.

Các hướng trái, phải, trên, dưới trong phần Flexbox này xét theo cách viết tiếng Việt thông thường, từ trái sang phải và từ trên xuống dưới.

### 1.2. Grid

Grid tổ chức bố cục theo hai chiều hàng và cột, phù hợp cho danh sách sản phẩm, thư viện ảnh hoặc trang có nhiều vùng nội dung.

- **Grid container** là phần tử có `display: grid` hoặc `display: inline-grid`.
- **Grid items** thường là các phần tử con trực tiếp của container.
- **Track** là một hàng hoặc một cột.
- **Grid line** là đường phân chia track. Ba cột có bốn đường kẻ dọc.
- **Grid cell** là một ô tại giao điểm của một hàng và một cột.
- **Grid area** là vùng hình chữ nhật gồm một hoặc nhiều ô.
- **Grid gap** là khoảng cách giữa các hàng hoặc cột.

### 1.3. Responsive Design

Responsive Design giúp giao diện thích ứng với không gian hiển thị. Một danh sách có thể có ba cột trên màn hình rộng, hai cột trên màn hình vừa và một cột trên điện thoại.

Bố cục linh hoạt, hình ảnh co giãn và media query phối hợp để nội dung dễ đọc và thao tác được trên các kích thước khác nhau.

## 2. Cú pháp cơ bản

### 2.1. Thuộc tính cho Flex Container

#### a. `display` kích hoạt Flexbox

```css
.container {
    display: flex;
}
```

`flex` tạo container tham gia luồng ngoài như một khối. `inline-flex` tạo container tham gia luồng ngoài như phần tử inline. Các item bên trong đều được bố trí bằng Flexbox.

#### b. `flex-direction` xác định hướng sắp xếp

- `row` là mặc định, xếp theo chiều ngang từ trái sang phải.
- `row-reverse` xếp theo chiều ngang từ phải sang trái.
- `column` xếp theo chiều dọc từ trên xuống dưới.
- `column-reverse` xếp theo chiều dọc từ dưới lên trên.

```css
.container {
    display: flex;
    flex-direction: column;
}
```

Kết quả là A, B, C xếp dọc. Khi đổi thành `row`, các item chuyển về hàng ngang.

#### c. `justify-content` căn theo trục chính

Với `row`, thuộc tính này phân bố item **theo chiều ngang**.

- `flex-start` dồn item về bên trái.
- `flex-end` dồn item về bên phải.
- `center` căn nhóm item vào giữa theo chiều ngang.
- `space-between` đặt item đầu sát trái, item cuối sát phải, chia đều khoảng trống giữa các item.
- `space-around` tạo khoảng trống quanh mỗi item. Khoảng giữa hai item gấp đôi khoảng ở hai mép ngoài.
- `space-evenly` tạo khoảng trống bằng nhau giữa các item và ở hai mép ngoài.

```css
.container {
    display: flex;
    justify-content: space-between;
}
```

Với `column`, `justify-content` căn **theo chiều dọc**. Container cần có chiều cao đủ lớn để thấy khoảng trống được phân bố. Hướng `reverse` đổi phía bắt đầu và kết thúc của trục chính.

#### d. `align-items` căn theo trục phụ

Với `row`, thuộc tính này căn item **theo chiều dọc trong từng hàng**.

- `flex-start` căn lên đầu hàng.
- `flex-end` căn xuống cuối hàng.
- `center` căn giữa theo chiều dọc.
- `baseline` căn theo đường chân chữ của các item.
- `stretch` kéo giãn chiều cao item cho đầy hàng nếu chiều cao là `auto`. Đây là hành vi mặc định thông thường.

```css
.container {
    display: flex;
    min-height: 200px;
    align-items: center;
}
```

Với `column`, `align-items` căn **theo chiều ngang**. `center` căn giữa ngang, còn `stretch` có thể kéo giãn chiều rộng item.

#### e. `flex-wrap` cho phép tạo nhiều dòng

- `nowrap` là mặc định, giữ các item trên một dòng flex. Item có thể co lại hoặc tràn khi thiếu chỗ.
- `wrap` cho phép tạo dòng mới. Với `row`, hàng mới nằm phía dưới.
- `wrap-reverse` tạo dòng mới về phía ngược lại. Với `row`, hàng mới nằm phía trên.

```css
.container {
    display: flex;
    flex-wrap: wrap;
}

.item {
    flex: 0 0 150px;
}
```

Khi container không chứa đủ các item rộng `150px`, một số item chuyển sang hàng mới. Với `column`, wrap tạo cột mới khi container được giới hạn chiều cao.

#### f. `align-content` phân bố các dòng

Với `row` và `wrap`, thuộc tính này phân bố **các hàng theo chiều dọc**.

- `flex-start` dồn các hàng lên trên.
- `flex-end` dồn các hàng xuống dưới.
- `center` căn cả nhóm hàng vào giữa theo chiều dọc.
- `space-between` chia đều khoảng trống giữa các hàng, hàng đầu và cuối sát hai mép.
- `space-around` tạo khoảng trống quanh mỗi hàng, khoảng ở mép bằng một nửa khoảng giữa các hàng.
- `space-evenly` chia đều khoảng trống giữa các hàng và hai mép.
- `stretch` phân bổ phần trống để kéo giãn các dòng flex.

```css
.container {
    display: flex;
    flex-wrap: wrap;
    height: 300px;
    align-content: space-between;
}

.item {
    flex: 0 0 150px;
}
```

Thêm đủ item để tạo nhiều hàng rồi thay đổi `align-content` để quan sát. Container phải dùng `wrap` hoặc `wrap-reverse` và cần có không gian theo trục phụ để thấy hiệu ứng phân bố.

`align-items` căn từng item trong hàng, còn `align-content` căn các dòng. Với `column`, `align-content` phân bố các cột theo chiều ngang. `wrap-reverse` đảo phía bắt đầu và kết thúc của các dòng.

#### g. `gap` tạo khoảng cách

```css
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 20px;
}
```

- `gap: 10px` đặt cả hai khoảng cách bằng `10px`.
- `gap: 10px 20px` đặt `row-gap` bằng `10px`, `column-gap` bằng `20px`.
- Với `row`, khoảng cách dọc giữa các hàng là `10px`, khoảng cách ngang giữa các item là `20px`.
- Với `column`, khoảng cách dọc giữa các item là `10px`, khoảng cách ngang giữa các cột là `20px`.

Có thể dùng `rem`, chẳng hạn `gap: 1rem`. Dùng padding khi cần khoảng đệm ở mép container.

### 2.2. Thuộc tính cho Flex Items

Các khai báo dưới đây đặt trên item nằm trực tiếp trong flex container.

#### a. `flex-grow` nhận thêm không gian

Giá trị là số không âm, mặc định `0`. Item có grow bằng `0` giữ kích thước thay vì nhận phần không gian dương còn lại. Khi các item cùng có grow bằng `1`, chúng nhận lượng không gian dư bằng nhau.

```css
.item {
    flex-grow: 1;
}

.item--featured {
    flex-grow: 2;
}
```

Item nổi bật nhận phần không gian dư gấp đôi mỗi item grow 1. Chiều rộng cuối cùng còn phụ thuộc kích thước cơ sở và giới hạn min/max-size.

#### b. `flex-shrink` điều chỉnh mức co

Giá trị là số không âm, mặc định `1`. Khi thiếu chỗ, mức co được tính theo cả hệ số shrink và kích thước cơ sở của item.

```css
.item {
    flex-basis: 200px;
    flex-shrink: 1;
}

.item--fixed {
    flex-shrink: 0;
}
```

Item có shrink bằng `0` giữ kích thước cơ sở khi thiếu không gian. Các item còn lại có thể co, trong giới hạn kích thước tối thiểu cho phép.

#### c. `flex-basis` đặt kích thước cơ sở

Giá trị mặc định là `auto`. Với `row`, basis là kích thước cơ sở theo chiều ngang. Với `column`, basis là kích thước cơ sở theo chiều dọc.

```css
.item {
    flex-basis: 200px;
}
```

Kích thước hiển thị có thể thay đổi sau khi grow và shrink được tính. Khi dùng `auto`, trình duyệt có thể lấy `width` hoặc `height` theo trục chính nếu kích thước đó đã được đặt.

#### d. `flex` viết gộp grow, shrink và basis

```css
.item {
    flex: 1 1 200px;
}
```

Item có basis `200px`, được phép giãn và co. Một số cách viết thường gặp gồm `flex: 1` được trình duyệt mở rộng thành `1 1 0%`, `flex: auto` tương đương `1 1 auto`, và `flex: none` tương đương `0 0 auto`. Giá trị mặc định là `0 1 auto`.

#### e. `align-self` căn riêng một item

Các giá trị thường dùng gồm `auto`, `flex-start`, `flex-end`, `center`, `baseline`, `stretch`. `auto` dùng cách căn từ `align-items` của cha.

```css
.container {
    display: flex;
    min-height: 200px;
    align-items: flex-start;
}

.item--special {
    align-self: center;
}
```

Với `row`, các item nằm trên cùng, riêng item đặc biệt được căn giữa theo chiều dọc. Với `column`, cách căn riêng này diễn ra theo chiều ngang.

#### f. `order` thay đổi thứ tự hiển thị

Giá trị là số nguyên, mặc định `0`. Item có số nhỏ hơn được xếp trước. Nếu bằng nhau, giữ thứ tự trong HTML.

```css
.item--first {
    order: -1;
}
```

`order` thay đổi cách hiển thị. Thứ tự đọc và di chuyển bằng bàn phím vẫn cần được tổ chức hợp lý trong HTML.

### 2.3. Thuộc tính cho Grid Container

Các hướng ngang và dọc dưới đây xét với cách viết tiếng Việt thông thường.

#### a. Kích hoạt Grid

```css
.grid {
    display: grid;
}
```

Các phần tử con trực tiếp trở thành grid items. `inline-grid` cũng tạo bố cục Grid bên trong, với container tham gia luồng ngoài như phần tử inline.

#### b. Khai báo cột và hàng

```css
.grid {
    display: grid;
    grid-template-columns: 100px 200px 100px;
    grid-template-rows: 150px 150px;
}
```

`grid-template-columns` tạo ba cột có chiều rộng lần lượt `100px`, `200px`, `100px`. `grid-template-rows` tạo hai hàng, mỗi hàng cao `150px`. Các item chưa đặt vị trí thường tự lấp đầy từng hàng theo thứ tự HTML.

Khi số item vượt số ô đã khai báo, Grid có thể tạo thêm hàng tự động. Dùng `grid-auto-rows: minmax(100px, auto)` nếu muốn các hàng tự sinh cao ít nhất `100px` và vẫn mở rộng theo nội dung.

#### c. Đơn vị `fr` và hàm `repeat()`

```css
.grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1rem;
}
```

`fr` phân chia không gian còn lại theo tỷ lệ. Trong ví dụ, cột giữa nhận hai phần, hai cột ngoài mỗi cột nhận một phần, có xét giới hạn nội dung.

```css
.grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}
```

`repeat()` rút gọn phần khai báo lặp lại. Ví dụ tạo ba cột bằng nhau. `minmax(0, 1fr)` cho phép cột thu nhỏ tới 0 khi cần, còn nội dung dài cần được ngắt dòng phù hợp.

#### d. Khoảng cách giữa hàng và cột

```css
.grid {
    gap: 10px 20px;
}
```

- `row-gap: 10px` tạo khoảng cách dọc giữa các hàng.
- `column-gap: 20px` tạo khoảng cách ngang giữa các cột.
- `gap: 10px 20px` viết gộp hai giá trị trên.
- `gap: 20px` đặt cả hai khoảng cách bằng `20px`.

Các tên `grid-gap`, `grid-row-gap`, `grid-column-gap` xuất hiện trong tài liệu cũ. Trong bài này dùng `gap`, `row-gap`, `column-gap`.

#### e. Đặt tên vùng bằng `grid-template-areas`

```css
.page {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
        "header header"
        "main sidebar"
        "footer footer";
    gap: 1rem;
}

.page__header { grid-area: header; }
.page__main { grid-area: main; }
.page__sidebar { grid-area: sidebar; }
.page__footer { grid-area: footer; }
```

Mỗi chuỗi biểu diễn một hàng. Header và footer chiếm cả hai cột. Main chiếm cột trái, sidebar chiếm cột phải. Mỗi hàng phải có cùng số ô, tên vùng được lặp lại phải tạo hình chữ nhật. Dùng dấu `.` để biểu diễn ô trống.

#### f. Căn item trong vùng Grid

- `justify-items` căn tất cả item theo chiều ngang trong vùng của chúng.
- `align-items` căn tất cả item theo chiều dọc trong vùng của chúng.
- Các giá trị thường gặp gồm `start`, `end`, `center`, `stretch`.

```css
.grid {
    justify-items: center;
    align-items: center;
}
```

Mỗi item được căn giữa trong vùng đã cấp. `stretch` có thể kéo giãn item có kích thước tự động. Item có kích thước cố định hoặc tỷ lệ nội tại cần được xét riêng.

#### g. Căn toàn bộ các track trong container

- `justify-content` phân bố toàn bộ các cột theo chiều ngang.
- `align-content` phân bố toàn bộ các hàng theo chiều dọc.
- Có thể dùng `start`, `end`, `center`, `space-between`, `space-around`, `space-evenly`.

```css
.grid {
    display: grid;
    min-height: 300px;
    grid-template-columns: repeat(2, 100px);
    grid-template-rows: repeat(2, 80px);
    justify-content: center;
    align-content: center;
    gap: 1rem;
}
```

Khi container đủ rộng và cao, cả nhóm track nằm giữa container. Cần có không gian dư theo hướng căn để quan sát hiệu ứng này.

### 2.4. Thuộc tính cho Grid Items

#### a. Đặt vị trí bằng đường kẻ

```css
.featured {
    grid-column: 1 / 3;
    grid-row: 2 / 4;
}
```

`grid-column: 1 / 3` chiếm hai cột giữa đường dọc 1 và 3. `grid-row: 2 / 4` chiếm hai hàng giữa đường ngang 2 và 4. Các số chỉ đường kẻ, không phải số ô. Lưới ba cột có bốn đường dọc.

```css
.featured {
    grid-column: span 2;
    grid-row: span 3;
}
```

`span` khai báo số track cần chiếm. Với ví dụ trên, item chiếm hai cột và ba hàng tại vị trí do cơ chế tự xếp xác định.

#### b. Dùng `grid-area`

```css
.item {
    grid-area: 1 / 1 / 3 / 4;
}
```

Bốn giá trị lần lượt là `row-start`, `column-start`, `row-end`, `column-end`. Item chiếm từ đường hàng 1 đến 3 và đường cột 1 đến 4, tức hai hàng và ba cột.

`grid-area: header` là cách gán vào vùng có tên trong `grid-template-areas` như ví dụ phía trên.

#### c. Căn riêng một item

```css
.badge {
    justify-self: end;
    align-self: center;
}
```

`justify-self` căn riêng theo chiều ngang, ghi đè `justify-items`. `align-self` căn riêng theo chiều dọc, ghi đè `align-items`. Ví dụ đặt item sát phải và giữa theo chiều dọc trong vùng của nó.

### 2.5. Viewport và Media Queries

Đặt khai báo viewport trong `<head>` để trang dùng chiều rộng layout phù hợp với thiết bị di động.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

`width=device-width` dùng chiều rộng thiết bị tính bằng CSS pixel. `initial-scale=1.0` đặt mức thu phóng ban đầu là 1.

Media query áp dụng CSS khi điều kiện về môi trường hiển thị được đáp ứng.

```css
@media (max-width: 768px) {
    .cards {
        grid-template-columns: minmax(0, 1fr);
    }
}
```

Quy tắc trên áp dụng khi viewport rộng tối đa `768px`. Có thể viết điều kiện tương đương bằng cú pháp khoảng.

```css
@media (width <= 768px) {
    .cards {
        grid-template-columns: minmax(0, 1fr);
    }
}

@media (576px <= width < 992px) {
    .page-title {
        font-size: 2rem;
    }
}
```

Ví dụ thứ hai áp dụng từ `576px` đến dưới `992px`. Viết điều kiện có khoảng trắng như ví dụ để dễ đọc. Cú pháp kết hợp `(min-width: 576px) and (max-width: 991px)` cũng thường gặp, nhưng có biên trên khác với điều kiện `< 992px` khi viewport có chiều rộng phân số.

**Breakpoint** là ngưỡng cần thay đổi bố cục. Các mốc tham khảo thường gặp gồm dưới `576px`, từ `576px`, `768px`, `992px` và `1200px`. Chọn điểm ngắt khi nội dung thực tế cần thay đổi, rồi kiểm tra cả độ rộng giữa các mốc.

## 3. Cách hoạt động

### 3.1. Flexbox phân chia không gian

Flexbox xác định kích thước cơ sở, chia item thành dòng nếu cho wrap, rồi phân phối phần thừa hoặc thiếu trong từng dòng.

- Khi thừa chỗ, item có `flex-grow` lớn hơn nhận nhiều phần không gian thừa hơn.
- Khi thiếu chỗ, mức co phụ thuộc cả `flex-shrink` và kích thước cơ sở.
- Sau đó, các thuộc tính căn chỉnh phân bố item và dòng.

Hai item có basis `100px`, grow lần lượt 1 và 2, trong container `500px` không có gap sẽ có `300px` dư. Chúng nhận thêm `100px` và `200px`, thành `200px` và `300px`, nếu không bị giới hạn bởi min/max-size.

`flex-grow: 2` vì vậy không đảm bảo chiều rộng cuối cùng gấp đôi item có grow 1.

### 3.2. Grid chia track rồi đặt item

```css
.layout {
    display: grid;
    grid-template-columns: 200px 1fr 2fr;
    gap: 20px;
}
```

Nếu vùng nội dung container rộng `900px`, cột đầu chiếm `200px`, hai khoảng gap chiếm `40px`. Còn `660px` để chia thành ba phần, hai cột linh hoạt lần lượt nhận `220px` và `440px`, nếu kích thước tối thiểu của nội dung cho phép.

Phân biệt hai nhóm căn chỉnh bằng cách thử các cột cố định nhỏ hơn container. `justify-items: center` căn item trong từng vùng, còn `justify-content: center` đưa toàn bộ các cột vào giữa container.

### 3.3. Mobile-First và Desktop-First

**Mobile-First** viết kiểu mặc định cho màn hình hẹp rồi mở rộng bằng `min-width`.

```css
.cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

@media (min-width: 768px) {
    .cards {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (min-width: 1024px) {
    .cards {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
```

**Desktop-First** viết bố cục rộng trước, dùng `max-width` để thu gọn. Trong bài này, dùng Mobile-First để thực hành từ một cột lên nhiều cột. Hiệu năng tải còn phụ thuộc ảnh, tài nguyên và mã được tải.

### 3.4. Đơn vị và nội dung co giãn

| Đơn vị hoặc quy tắc | Cách dùng |
| --- | --- |
| `%` | Mốc tham chiếu tùy thuộc tính. `width` thường dựa trên chiều rộng khối chứa. |
| `rem` | Dựa trên cỡ chữ phần tử gốc. `1rem` thường là `16px` với thiết lập trình duyệt mặc định. |
| `em` | Với `font-size`, dựa trên cỡ chữ kế thừa. Với padding, dựa trên cỡ chữ của chính phần tử. |
| `vw`, `vh` | Mỗi đơn vị bằng 1% chiều tương ứng của viewport. Banner di động có thể dùng `min-height: 100dvh` để theo vùng nhìn động. |
| `max-width` | Giới hạn độ rộng tối đa, kết hợp `width: 100%` để khung co lại. |

```css
* {
    box-sizing: border-box;
}

.container {
    width: 100%;
    max-width: 72rem;
    margin-inline: auto;
    padding-inline: 1rem;
}

img {
    display: block;
    max-width: 100%;
    height: auto;
}
```

Ảnh thu nhỏ theo khối chứa, giữ tỷ lệ và không bị quy tắc này ép phóng to. Với `border-box`, width bao gồm content, padding và border. Margin nằm ngoài kích thước đó.

### 3.5. Điều chỉnh nhiều thành phần bằng biến CSS

Biến CSS khai báo với tiền tố `--`, được sử dụng qua hàm `var()`. Khi thay đổi biến trong media query, các khai báo dùng biến đó nhận giá trị mới.

```css
:root {
    --title-size: 2rem;
    --body-size: 1rem;
    --section-gap: 1rem;
}

body {
    font-size: var(--body-size);
}

.page-title {
    font-size: var(--title-size);
}

.sections {
    display: grid;
    gap: var(--section-gap);
}

@media (min-width: 768px) {
    :root {
        --title-size: 3rem;
        --body-size: 1.125rem;
        --section-gap: 2rem;
    }
}
```

Trên viewport từ `768px`, tiêu đề, cỡ chữ nội dung và khoảng cách cùng thay đổi. Dùng biến khi nhiều thành phần chia sẻ giá trị để dễ điều chỉnh nhất quán.

## 4. Ví dụ minh họa

### 4.1. Yêu cầu

Tạo trang khóa học có thanh điều hướng dùng Flexbox và ba thẻ dùng Grid. Trên màn hình hẹp, menu được xuống dòng và các thẻ xếp một cột. Từ `768px`, danh sách hiển thị ba cột.

### 4.2. Code

Tạo hai file cùng thư mục. Lưu HTML trong `index.html` và CSS trong `style.css`, sau đó chạy bằng Live Server.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Khóa học Web</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header container">
        <a href="#courses">Lớp Web</a>
        <nav class="menu" aria-label="Điều hướng chính">
            <a href="#courses">Khóa học</a>
            <a href="#contact">Liên hệ</a>
        </nav>
    </header>
    <main class="container" id="courses">
        <h1>Khóa học Web</h1>
        <div class="cards">
            <article class="card">
                <h2>HTML</h2>
                <p>Xây dựng cấu trúc và nội dung trang web.</p>
            </article>
            <article class="card card--featured">
                <h2>CSS</h2>
                <p>Thực hành Flexbox, Grid và Responsive.</p>
            </article>
            <article class="card">
                <h2>JavaScript</h2>
                <p>Tạo tương tác cho trang web.</p>
            </article>
        </div>
    </main>
    <footer class="container" id="contact">
        <p>Liên hệ lớp học qua email web@example.com.</p>
    </footer>
</body>
</html>
```

```css
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #1f2937;
}

.container {
    width: 100%;
    max-width: 72rem;
    margin-inline: auto;
    padding: 1rem;
}

.header,
.menu {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
}

.header {
    justify-content: space-between;
}

.cards {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
}

.card {
    padding: 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.5rem;
    overflow-wrap: anywhere;
}

.card--featured {
    background-color: #eff6ff;
    border-color: #2563eb;
}

@media (min-width: 768px) {
    .cards {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
```

### 4.3. Giải thích và kết quả

- `.header` phân bố tên lớp và menu về hai phía khi đủ chỗ. `flex-wrap` cho phép xuống dòng khi thiếu không gian.
- `.cards` dùng một cột ở mặc định và ba cột từ `768px`, bao gồm đúng mốc `768px`.
- `minmax(0, 1fr)` cho phép track thu nhỏ, kết hợp xử lý xuống dòng để tránh nội dung dài làm tràn thẻ.
- `.container` giới hạn độ rộng trên màn hình lớn và giữ khoảng đệm ở hai bên.

## 5. Các trường hợp thường dùng

### 5.1. Căn giữa bằng Flexbox

```css
.center-box {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 12rem;
}
```

Các item được căn giữa theo hai trục khi container có đủ không gian.

### 5.2. Danh sách tự xuống dòng

```css
.flex-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.flex-cards > article {
    flex: 1 1 15rem;
    min-width: 0;
    overflow-wrap: anywhere;
}
```

Mỗi item có basis `15rem`, có thể giãn hoặc co. Các dòng chia không gian độc lập nên thẻ ở dòng cuối có thể rộng hơn.

#### 5.2.1. Chia đều chiều rộng

Áp dụng cho container có ba phần tử `.item`.

```css
.equal-row {
    display: flex;
    gap: 1rem;
}

.equal-row > .item {
    flex: 1 1 0;
    min-width: 0;
    overflow-wrap: anywhere;
}
```

Các item chia đều không gian theo chiều ngang nếu padding, border và giới hạn kích thước tương đương nhau.

#### 5.2.2. Nội dung và sidebar

Áp dụng cho `.content-layout` chứa `.main-content` và `.sidebar`.

```css
.content-layout {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.main-content {
    flex: 3 1 20rem;
    min-width: 0;
}

.sidebar {
    flex: 1 1 12rem;
    min-width: 0;
}
```

Hai vùng nằm ngang khi đủ chỗ, chuyển thành nhiều dòng khi thiếu chỗ. Nội dung chính nhận phần không gian dư lớn hơn sidebar.

#### 5.2.3. Thanh điều hướng

```html
<header class="navbar">
    <a href="#home">Lớp Web</a>
    <nav class="nav-links" aria-label="Điều hướng chính">
        <a href="#home">Trang chủ</a>
        <a href="#courses">Khóa học</a>
        <a href="#contact">Liên hệ</a>
    </nav>
</header>
```

```css
.navbar,
.nav-links {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.navbar {
    justify-content: space-between;
}
```

Container ngoài đưa tên lớp và nhóm liên kết về hai phía. Container trong sắp xếp các liên kết trên một hàng khi đủ chỗ. Khi ghép vào trang, tạo các phần có ID tương ứng với liên kết.

### 5.3. Grid tự chọn số cột

```css
.auto-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    gap: 1rem;
}
```

`auto-fit` tạo số cột phù hợp. Giới hạn `min(100%, 250px)` giúp thẻ vừa khung chứa ngay cả khi khung hẹp hơn `250px`. Mẫu `minmax(250px, 1fr)` đơn giản có thể gây tràn ở độ rộng đó.

### 5.4. Bố cục đặt tên vùng

Áp dụng CSS sau cho container `.page` có ba phần tử con mang class `.page__header`, `.page__sidebar` và `.page__main`.

```css
.page {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
        "header"
        "sidebar"
        "main";
    gap: 1rem;
}

.page__header { grid-area: header; }
.page__sidebar { grid-area: sidebar; }
.page__main { grid-area: main; }

@media (min-width: 768px) {
    .page {
        grid-template-columns: 15rem minmax(0, 1fr);
        grid-template-areas:
            "header header"
            "sidebar main";
    }
}
```

Mỗi hàng trong `grid-template-areas` phải có cùng số ô. Một vùng được lặp tên phải tạo thành hình chữ nhật.

### 5.5. Giữ footer ở cuối màn hình khi nội dung ngắn

```html
<div class="main-layout">
    <header><h1>Trang lớp học</h1></header>
    <main><p>Nội dung giới thiệu ngắn.</p></main>
    <footer><p>Liên hệ web@example.com</p></footer>
</div>
```

```css
body {
    margin: 0;
}

.main-layout {
    min-height: 100vh;
    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;
}

.main-layout > header,
.main-layout > main,
.main-layout > footer {
    padding: 1rem;
}
```

Header và footer cao theo nội dung, main nhận không gian còn lại. `min-height` cho phép toàn trang tiếp tục dài ra khi nội dung tăng. `100vh` là giá trị dự phòng trước `100dvh`.

### 5.6. Chồng chữ lên ảnh bằng Grid

Chuẩn bị ảnh `img/banner.jpg` hoặc thay đường dẫn bằng ảnh trong bài làm.

```html
<div class="banner">
    <img src="img/banner.jpg" alt="Không gian lớp học Web">
    <h2 class="banner__title">Cùng học lập trình Web</h2>
</div>
```

```css
.banner {
    display: grid;
    align-items: center;
    justify-items: center;
}

.banner > * {
    grid-area: 1 / 1 / 2 / 2;
}

.banner > img {
    display: block;
    width: 100%;
    height: auto;
}

.banner__title {
    z-index: 1;
    margin: 1rem;
    padding: 0.5rem 1rem;
    color: white;
    background-color: rgb(0 0 0 / 70%);
    text-align: center;
    overflow-wrap: anywhere;
}
```

Ảnh và tiêu đề chiếm cùng một ô. Tiêu đề được căn giữa trên ảnh, nền tối giúp chữ dễ đọc. `z-index` xác định lớp hiển thị của tiêu đề.

### 5.7. Form một cột chuyển thành hai cột

```html
<form class="contact-form">
    <div class="form-group">
        <label for="full-name">Họ tên</label>
        <input id="full-name" name="fullName" type="text" required>
    </div>
    <div class="form-group">
        <label for="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" required>
    </div>
    <div class="form-group form-group--full">
        <label for="contact-message">Lời nhắn</label>
        <textarea id="contact-message" name="message" rows="4"></textarea>
    </div>
    <button class="contact-form__button" type="button">Gửi minh họa</button>
</form>
```

```css
.contact-form {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
}

.form-group {
    display: grid;
    gap: 0.5rem;
}

.form-group > input,
.form-group > textarea {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    padding: 0.5rem;
    font: inherit;
}

.form-group--full,
.contact-form__button {
    grid-column: 1 / -1;
}

.contact-form__button {
    justify-self: center;
}

@media (min-width: 768px) {
    .contact-form {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
```

Họ tên và email đứng cạnh nhau từ `768px`. Lời nhắn và nút chiếm toàn bộ cột nhờ `1 / -1`, từ đường đầu đến đường cuối của lưới tường minh. Nút chỉ minh họa bố cục và chưa xử lý gửi dữ liệu.

## 6. Lỗi thường gặp và lưu ý

- Đặt thuộc tính container lên item hoặc ngược lại. Kiểm tra phần tử nào có `display: flex` hoặc `grid` trước khi căn chỉnh.
- Dùng `justify-content` với suy nghĩ luôn căn ngang. Xác định `flex-direction` trước.
- Dùng `align-content` với `nowrap`, hoặc thiếu khoảng trống để thấy hiệu ứng.
- Dùng `justify-content` để căn một item trong ô Grid. Trường hợp đó dùng `justify-items` hoặc `justify-self`.
- Dùng `order` hoặc hướng reverse làm thứ tự hình ảnh lệch với thứ tự đọc và bàn phím. Giữ HTML theo thứ tự nội dung hợp lý.
- Nội dung dài cản item co lại. Xem xét `min-width: 0`, `minmax(0, 1fr)` và cách ngắt dòng.
- Đặt chiều rộng cố định lớn hơn màn hình, quên viewport hoặc cho ảnh vượt khung.
- Coi breakpoint là ranh giới cố định giữa các thiết bị. Kiểm tra cả độ rộng giữa các mốc.

## 7. Tóm tắt

| Nhu cầu | Công cụ |
| --- | --- |
| Căn chỉnh một hàng hoặc cột | Flexbox |
| Điều khiển hàng và cột đồng thời | Grid |
| Điều chỉnh theo chiều rộng viewport | Media query |
| Giữ khung và ảnh co giãn | Đơn vị tương đối, `max-width`, `height: auto` |
| Mở rộng từ màn hình hẹp | Mobile-First với `min-width` |

## 8. Bài tập thực hành

1. Chạy ví dụ ở phần 4 và đổi `flex-direction` để quan sát hai trục.
2. Tạo ba item có `flex-basis` giống nhau, thay đổi `flex-grow` rồi so sánh kích thước.
3. Thử `align-items` và `align-content` trên container có `flex-wrap: wrap`, chiều cao `20rem` và đủ item tạo nhiều dòng.
4. Tạo Grid ba cột, cho thẻ đầu chiếm hai cột bằng `grid-column`, sau đó chuyển về một cột trên màn hình hẹp.
5. Tạo bố cục header, sidebar, main bằng `grid-template-areas`.
6. Kiểm tra ở `375px`, `767px`, `768px`, `1024px` và các kích thước trung gian. Trang cần đọc được, ảnh giữ tỷ lệ và không cuộn ngang.

## Tài liệu tham khảo

- [Grid và Responsive tuần 7 HIT16 Web Private 2025](https://nguyenlehoainam.github.io/HIT16-WEB-PRIVATE-2025/HIT16-WEB-PRIVATE-2025/week-7/README.html)

- [Tài liệu Flexbox tuần 5 HIT16 Web Private 2025](https://nguyenlehoainam.github.io/HIT16-WEB-PRIVATE-2025/HIT16-WEB-PRIVATE-2025/week-5/README.html)

- [CSS Flexible Box Layout](https://www.w3.org/TR/css-flexbox-1/)
- [CSS Grid Layout](https://www.w3.org/TR/css-grid-1/)
- [CSS Box Alignment](https://www.w3.org/TR/css-align-3/)
- [Media Queries](https://www.w3.org/TR/mediaqueries-4/)
