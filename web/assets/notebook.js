/**
 * Sổ tay ghi lỗi thường gặp theo từng bài học (Lesson Pitfalls Notebook)
 * Thiết kế theo chuẩn shadcn/ui components kết hợp animation Motion & ThreeJS-style Canvas.
 */

export const LESSON_PITFALLS = {
  1: [
    {
      id: 'l1-path-git',
      title: 'Lệnh git/node báo "not recognized"',
      tag: 'Cài đặt môi trường',
      symptom: 'Mở Terminal gõ git hoặc node thì báo lỗi "The term is not recognized as the name of a cmdlet...".',
      badCode: '# Gõ trên PowerShell/CMD:\ngit --version\n# -> Lỗi: git : The term \'git\' is not recognized...',
      goodCode: '# Sửa: Mở Windows Search -> "Edit the system environment variables"\n# Thêm đường dẫn cài đặt Git vào biến PATH, ví dụ:\nC:\\Program Files\\Git\\cmd\n# Sau đó khởi động lại hoàn toàn VS Code / Terminal',
      explanation: 'Khi cài đặt Git hoặc Node.js, bạn quên chưa tích chọn tùy chọn "Add to PATH", hoặc chưa khởi động lại Terminal sau khi cài đặt.'
    },
    {
      id: 'l1-file-ext',
      title: 'Lưu file thành index.html.txt',
      tag: 'Thao tác tệp',
      symptom: 'Mở file trên trình duyệt thì thấy hiện nguyên văn mã nguồn HTML như tệp văn bản thô, không hiện giao diện web.',
      badCode: '<!-- Tên tệp trên ổ cứng bị ẩn đuôi: -->\nindex.html.txt',
      goodCode: '<!-- Bật tính năng hiển thị đuôi file trên Windows: -->\n<!-- File Explorer -> View -> Tích chọn "File name extensions" -->\nindex.html',
      explanation: 'Windows mặc định ẩn phần mở rộng (.txt). Khi bạn lưu index.html bằng Notepad hoặc tạo file mới, hệ điều hành tự gắn thêm đuôi .txt.'
    },
    {
      id: 'l1-file-protocol',
      title: 'Mở trực tiếp file:// thay vì máy chủ cục bộ',
      tag: 'Môi trường chạy',
      symptom: 'Các tính năng như ES Modules (import/export), Fetch API, hình ảnh cục bộ bị chặn với thông báo CORS policy.',
      badCode: '// Đường dẫn trên thanh URL trình duyệt:\nfile:///C:/HIT/project/index.html',
      goodCode: '// Sử dụng Live Server trong VS Code hoặc npm dev:\nhttp://127.0.0.1:5500/index.html',
      explanation: 'Trình duyệt áp dụng chính sách bảo mật Same-Origin nghiêm ngặt trên giao thức file:///. Luôn sử dụng extension Live Server hoặc dev server.'
    }
  ],
  2: [
    {
      id: 'l2-img-404',
      title: 'Sai đường dẫn hình ảnh (Lỗi 404 Not Found)',
      tag: 'HTML & Đường dẫn',
      symptom: 'Hình ảnh hiển thị icon ảnh vỡ kèm nội dung alt. Console báo đỏ GET ... 404 (Not Found).',
      badCode: '<!-- SAI: Nhầm đường dẫn tuyệt đối bắt đầu bằng / hoặc quên cấp thư mục -->\n<img src="/images/banner.png" alt="Banner">\n<img src="banner.png" alt="Banner">',
      goodCode: '<!-- ĐÚNG: Dùng đường dẫn tương đối từ file HTML -->\n<img src="./images/banner.png" alt="Banner">\n<!-- Nếu ảnh ở thư mục ngoài: -->\n<img src="../img/banner.png" alt="Banner">',
      explanation: 'Đường dẫn bắt đầu bằng "/" sẽ nhảy về gốc ổ đĩa hoặc domain root. Khi deploy lên GitHub Pages (ví dụ github.io/repo/), đường dẫn "/" chắc chắn bị 404.'
    },
    {
      id: 'l2-label-id',
      title: 'Label không kết nối được với ô Input',
      tag: 'HTML Form',
      symptom: 'Nhấp chuột vào dòng chữ của label nhưng ô nhập liệu hoặc checkbox không được focus hay kích hoạt.',
      badCode: '<!-- SAI: for trỏ tới name hoặc id gõ sai ký tự -->\n<label for="user-email">Email:</label>\n<input type="email" name="user-email">',
      goodCode: '<!-- ĐÚNG: Giá trị thuộc tính for phải trùng khớp 100% với id của input -->\n<label for="user-email">Email:</label>\n<input type="email" id="user-email" name="user-email">',
      explanation: 'Trình duyệt liên kết ngữ nghĩa giữa <label> và <input> thông qua cặp thuộc tính for và id, chứ không thông qua name.'
    },
    {
      id: 'l2-form-reload',
      title: 'Quên preventDefault() làm Form tải lại trang',
      tag: 'Sự kiện & Form',
      symptom: 'Bấm nút submit thì trang web nhấp nháy tải lại, dữ liệu form vừa nhập và console.log biến mất ngay lập tức.',
      badCode: 'form.addEventListener("submit", function() {\n    // SAI: Quên nhận e và gọi e.preventDefault()\n    console.log("Đã gửi form!"); // Bị xóa mất ngay do trang reload!\n});',
      goodCode: 'form.addEventListener("submit", function(event) {\n    event.preventDefault(); // CHẶN HÀNH VI RELOAD MẶC ĐỊNH\n    console.log("Xử lý form an toàn bằng JavaScript!");\n});',
      explanation: 'Thẻ <form> có hành vi mặc định khi submit là gửi HTTP request và tải lại toàn bộ trang. Phải dùng event.preventDefault() để xử lý bằng JS.'
    },
    {
      id: 'l2-semantic-nest',
      title: 'Lồng thẻ sai ngữ nghĩa (Invalid Nesting)',
      tag: 'Semantic HTML',
      symptom: 'Trình duyệt tự động đóng thẻ sớm hoặc nhảy phần tử ra ngoài, làm bố cục vỡ bất ngờ.',
      badCode: '<!-- SAI: <p> không được chứa các thẻ khối như <div>, <h1>, <ul> -->\n<p>Giới thiệu khóa học <div>CLB Tin học HIT</div></p>\n<!-- SAI: <a> lồng trong <a> -->\n<a href="#page">Xem bài <a href="#author">Tác giả</a></a>',
      goodCode: '<!-- ĐÚNG: Dùng các khối độc lập hoặc thẻ nội dòng như <span> -->\n<div class="intro">\n    <p>Giới thiệu khóa học <span class="highlight">CLB Tin học HIT</span></p>\n</div>',
      explanation: 'Theo đặc tả HTML5, trình duyệt gặp thẻ block bên trong <p> sẽ tự động chèn thẻ đóng </p> ngầm định ngay trước đó.'
    }
  ],
  3: [
    {
      id: 'l3-css-link',
      title: 'CSS không áp dụng do chưa link hoặc sai đường dẫn',
      tag: 'CSS Cơ bản',
      symptom: 'Trang web trơ trọi chỉ có văn bản thô, kiểm tra F12 tab Network không thấy file .css nào được tải.',
      badCode: '<!-- SAI: Quên rel="stylesheet" hoặc sai đường dẫn file -->\n<link href="style.css">\n<link rel="stylesheet" href="/style.css">',
      goodCode: '<!-- ĐÚNG: Đặt trong <head>, có rel="stylesheet" và đường dẫn tương đối chính xác -->\n<link rel="stylesheet" href="./css/style.css">',
      explanation: 'Nếu thiếu rel="stylesheet", trình duyệt coi đó là một tài nguyên thông thường chứ không nạp vào hệ thống tạo kiểu CSS.'
    },
    {
      id: 'l3-specificity',
      title: 'Xung đột độ ưu tiên (CSS Specificity bị đè)',
      tag: 'CSS Specificity',
      symptom: 'Viết class đúng nhưng màu sắc/kích thước không đổi; mở F12 thấy thuộc tính bị gạch ngang (strike-through).',
      badCode: '/* CSS thư viện hoặc CSS chung dùng ID: */\n#main-menu a { color: #1E293B; }\n\n/* Class này sẽ KHÔNG ĂN vì ID mạnh hơn class: */\n.menu-active { color: #F47B2A; }',
      goodCode: '/* CÁCH SỬA: Tăng độ ưu tiên khớp với cha, hoặc dùng BEM hạn chế dùng ID */\n#main-menu a.menu-active { color: #F47B2A; }\n\n/* BEM chuẩn mực: */\n.menu__link--active { color: #F47B2A; }',
      explanation: 'Thứ tự ưu tiên: Inline Style > ID Selector (100đ) > Class/Attribute/Pseudo-class (10đ) > Element Selector (1đ).'
    },
    {
      id: 'l3-syntax-semicolon',
      title: 'Thiếu dấu chấm phẩy ; làm hỏng toàn bộ CSS phía sau',
      tag: 'Cú pháp CSS',
      symptom: 'Một số class ở nửa dưới file CSS hoàn toàn không có tác dụng mặc dù viết đúng.',
      badCode: '.btn-primary {\n    background-color: #F47B2A   /* <-- THIẾU DẤU ; */\n    color: #FFFFFF;\n}\n/* Rule tiếp theo bị trình duyệt bỏ qua hoàn toàn: */\n.btn-secondary { color: #374151; }',
      goodCode: '.btn-primary {\n    background-color: #F47B2A; /* Đầy đủ dấu ; */\n    color: #FFFFFF;\n}\n.btn-secondary {\n    color: #374151;\n}',
      explanation: 'Khi thiếu dấu chấm phẩy, CSS parser coi dòng tiếp theo là giá trị mở rộng không hợp lệ của thuộc tính trước và vứt bỏ cả khối.'
    },
    {
      id: 'l3-browser-cache',
      title: 'Trình duyệt lưu cache file CSS cũ',
      tag: 'Trình duyệt',
      symptom: 'Sửa code trong file CSS, lưu lại rồi bấm F5 trên trình duyệt nhưng giao diện vẫn giữ nguyên mẫu cũ.',
      badCode: '# Chỉ bấm F5 thông thường -> Trình duyệt đọc lại file CSS từ bộ nhớ đệm (disk cache)',
      goodCode: '# SỬA BẰNG PHÍM TẮT:\nCtrl + Shift + R (hoặc Ctrl + F5)\n# Hoặc mở F12 -> tab Network -> Tích chọn "Disable cache"',
      explanation: 'Để tăng tốc độ tải trang, trình duyệt lưu cache file tĩnh (.css, .js). Hãy dùng Hard Reload khi đang trong quá trình phát triển.'
    }
  ],
  4: [
    {
      id: 'l4-box-model',
      title: 'Padding và Border làm phình to kích thước (Vỡ dòng)',
      tag: 'Box Model',
      symptom: 'Đặt 2 khối width: 50% đứng cạnh nhau, khi thêm padding hoặc viền thì khối thứ 2 bị rớt xuống dòng.',
      badCode: '/* Mặc định box-sizing: content-box */\n.col {\n    width: 50%;\n    padding: 20px; /* Tổng chiều rộng thực tế = 50% + 40px > 100%! */\n}',
      goodCode: '/* Khai báo Reset chuẩn mực ở đầu file CSS: */\n*, *::before, *::after {\n    box-sizing: border-box;\n}\n.col {\n    width: 50%;\n    padding: 20px; /* Chiều rộng luôn đúng chuẩn 50% */\n}',
      explanation: 'Với content-box, padding và border được cộng thêm vào width. Với border-box, padding và border nằm gọn bên trong width đã khai báo.'
    },
    {
      id: 'l4-rem-em',
      title: 'Nhầm lẫn giữa đơn vị em và rem',
      tag: 'Typography',
      symptom: 'Cỡ chữ bị phóng đại to quá mức khi các thẻ lồng nhau nhiều cấp.',
      badCode: '/* em bị nhân dồn từ các cấp cha con: */\n.card { font-size: 1.2em; }\n.card-body { font-size: 1.2em; } /* Sẽ thành 1.2 * 1.2 = 1.44em */',
      goodCode: '/* rem luôn tính theo gốc root <html> (16px), không bị nhân dồn: */\n.card { font-size: 1.125rem; }\n.card-body { font-size: 1rem; }',
      explanation: 'Đơn vị rem (root em) tham chiếu trực tiếp đến font-size của thẻ <html>, mang lại khả năng kiểm soát kích thước đồng đều và dễ dự đoán.'
    }
  ],
  5: [
    {
      id: 'l5-flex-parent',
      title: 'justify-content không hoạt động',
      tag: 'Flexbox',
      symptom: 'Khai báo justify-content: center hoặc space-between nhưng các phần tử con vẫn xếp chồng dọc như thường.',
      badCode: '.container {\n    /* SAI: Quên bật flexbox ở thẻ cha */\n    justify-content: center;\n    align-items: center;\n}',
      goodCode: '.container {\n    display: flex; /* BẮT BUỘC KHAI BÁO DISPLAY: FLEX */\n    justify-content: center;\n    align-items: center;\n}',
      explanation: 'Các thuộc tính căn chỉnh trục như justify-content, align-items chỉ có tác dụng khi phần tử cha được thiết lập display: flex hoặc display: grid.'
    },
    {
      id: 'l5-absolute-relative',
      title: 'position: absolute bay ra ngoài ý muốn',
      tag: 'Positioning',
      symptom: 'Đặt tọa độ top: 0, right: 0 cho icon nhưng icon bay thẳng lên góc trên cùng của toàn bộ trang web.',
      badCode: '.card-badge {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n}\n/* Thẻ cha .card chưa có định vị, nên badge tìm lên tận <body> */',
      goodCode: '.card {\n    position: relative; /* ĐẶT KHUNG NEO TỌA ĐỘ CHO CON */\n}\n.card-badge {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n}',
      explanation: 'Phần tử absolute sẽ tìm thẻ tổ tiên gần nhất có position khác static (thường là relative) để làm gốc tọa độ. Nếu không thấy, nó sẽ neo theo <html>.'
    },
    {
      id: 'l5-viewport-meta',
      title: 'Giao diện bị thu nhỏ tí hon trên điện thoại',
      tag: 'Responsive Web',
      symptom: 'Mở web trên smartphone thì thấy toàn bộ trang web bị co cụm lại như xem trên máy tính từ xa.',
      badCode: '<!-- SAI: Thiếu thẻ viewport trong <head> -->\n<head>\n    <meta charset="UTF-8">\n    <title>Trang web</title>\n</head>',
      goodCode: '<!-- ĐÚNG: Luôn có meta viewport để tỷ lệ 1:1 theo màn hình thiết bị -->\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Trang web</title>\n</head>',
      explanation: 'Nếu thiếu meta viewport, trình duyệt điện thoại sẽ giả lập màn hình máy tính 980px và thu nhỏ trang web lại.'
    }
  ],
  7: [
    {
      id: 'l7-reference-error',
      title: 'Lỗi ReferenceError: variable is not defined',
      tag: 'JavaScript Biến & Kiểu',
      symptom: 'Console báo đỏ Uncaught ReferenceError: userName is not defined.',
      badCode: 'console.log(userName); // Dùng trước khi khai báo!\nlet userName = "HIT HaUI";',
      goodCode: '// Luôn khai báo trước khi sử dụng:\nlet userName = "HIT HaUI";\nconsole.log(userName);',
      explanation: 'Biến khai báo bằng let và const nằm trong vùng "Temporal Dead Zone" (TDZ) từ đầu block cho đến khi dòng khai báo được thực thi.'
    },
    {
      id: 'l7-type-coercion',
      title: 'Ép kiểu chuỗi ngầm định khi cộng số',
      tag: 'Toán tử JS',
      symptom: 'Lấy giá trị từ ô input cộng với số nhưng kết quả bị ghép chuỗi ("5" + 2 = "52" thay vì 7).',
      badCode: 'const count = input.value; // Trả về chuỗi: "5"\nconst total = count + 2;   // Kết quả: "52"!',
      goodCode: 'const count = Number(input.value); // Hoặc +input.value\nconst total = count + 2;             // Kết quả đúng: 7',
      explanation: 'Thuộc tính .value của input luôn là kiểu String. Toán tử + khi gặp chuỗi sẽ ưu tiên thực hiện phép nối chuỗi (concatenation).'
    },
    {
      id: 'l7-assign-vs-equal',
      title: 'Nhầm giữa phép gán = và so sánh ===',
      tag: 'Rẽ nhánh & Điều kiện',
      symptom: 'Điều kiện if luôn luôn đúng (truthy) ngoài ý muốn.',
      badCode: 'let role = "member";\nif (role = "admin") { // SAI: Đây là phép GÁN, gán role thành "admin"!\n    console.log("Chào Admin"); // Luôn chạy!\n}',
      goodCode: 'let role = "member";\nif (role === "admin") { // ĐÚNG: So sánh bằng nghiêm ngặt cả giá trị lẫn kiểu\n    console.log("Chào Admin");\n}',
      explanation: 'Dấu = là phép gán giá trị. Dấu == hoặc === là phép so sánh. Hãy luôn dùng === để so sánh an toàn trong JavaScript.'
    }
  ],
  10: [
    {
      id: 'l10-dom-null',
      title: 'Cannot read properties of null (reading "addEventListener")',
      tag: 'DOM & Script',
      symptom: 'Console báo đỏ lỗi Cannot read properties of null khi cố gắng bắt sự kiện cho nút bấm.',
      badCode: '<!-- SAI: Script đặt trong <head> không có defer -->\n<head>\n    <script src="app.js"></script>\n</head>\n<!-- JS chạy trước khi nút được tạo ra trong DOM: -->\n<button id="btn">Click me</button>',
      goodCode: '<!-- ĐÚNG: Thêm thuộc tính defer trong <head> -->\n<head>\n    <script src="app.js" defer></script>\n</head>\n<!-- Hoặc đặt script ở cuối cùng của <body> -->',
      explanation: 'Khi file script chạy ở <head>, cây HTML phía dưới chưa được phân tích. Do đó document.getElementById trả về null.'
    },
    {
      id: 'l10-typo-dom',
      title: 'Lỗi chính tả DOM: class, innnerHTML, getElementByID',
      tag: 'DOM API Typo',
      symptom: 'Code không báo lỗi nhưng không đổi class, hoặc báo hàm không tồn tại.',
      badCode: 'element.class = "active";    // SAI: class là từ khóa dành riêng\nelement.innnerHTML = "text"; // SAI: 3 chữ n\ndocument.getElementByID("x"); // SAI: chữ D viết hoa',
      goodCode: 'element.classList.add("active"); // ĐÚNG\nelement.innerHTML = "text";         // ĐÚNG\ndocument.getElementById("x");        // ĐÚNG (id viết thường)',
      explanation: 'JavaScript phân biệt hoa thường và các thuộc tính/phương thức DOM tuân theo quy tắc camelCase.'
    },
    {
      id: 'l10-prevent-default',
      title: 'Quên event.preventDefault() làm nhảy trang hoặc mất dữ liệu',
      tag: 'Event Handling',
      symptom: 'Bấm thẻ <a href="#"> làm trang bị cuộn vọt lên đỉnh đầu, form tự reload trang.',
      badCode: 'link.addEventListener("click", function() {\n    // SAI: Không chặn hành vi mặc định\n    openModal();\n});',
      goodCode: 'link.addEventListener("click", function(event) {\n    event.preventDefault(); // CHẶN NHẢY TRANG\n    openModal();\n});',
      explanation: 'event.preventDefault() vô hiệu hóa hành vi mặc định sẵn có của thẻ HTML mà không ảnh hưởng đến logic JavaScript.'
    }
  ],
  12: [
    {
      id: 'l12-promise-pending',
      title: 'In ra Promise { <pending> } do quên await',
      tag: 'Async / Await',
      symptom: 'console.log thấy in ra đối tượng Promise trạng thái pending thay vì dữ liệu JSON thực tế.',
      badCode: 'async function getData() {\n    const res = fetch("https://api.example.com/users"); // Quên await!\n    console.log(res); // In ra: Promise { <pending> }\n}',
      goodCode: 'async function getData() {\n    const res = await fetch("https://api.example.com/users");\n    const data = await res.json(); // Nhớ await cả res.json()!\n    console.log(data); // In ra dữ liệu mảng/đối tượng chuẩn\n}',
      explanation: 'fetch() và response.json() là các tác vụ bất đồng bộ trả về Promise. Cần dùng await bên trong hàm async để chờ kết quả hoàn thành.'
    },
    {
      id: 'l12-cors-error',
      title: 'Lỗi CORS Policy khi gọi API',
      tag: 'Fetch & API',
      symptom: 'Console báo đỏ: Access to fetch at ... has been blocked by CORS policy: No "Access-Control-Allow-Origin" header.',
      badCode: '// Gọi API từ một domain khác mà server chưa cấu hình header CORS\nfetch("https://private-api.com/data");',
      goodCode: '// Giải pháp:\n// 1. Dùng API có hỗ trợ CORS mở (Public API)\n// 2. Cấu hình Backend cho phép domain frontend truy cập (Access-Control-Allow-Origin)\n// 3. Hoặc dùng server trung gian (Proxy Server)',
      explanation: 'CORS là cơ chế bảo mật do trình duyệt thực thi nhằm ngăn chặn trang web đọc trộm tài nguyên nhạy cảm từ domain khác.'
    }
  ],
  14: [
    {
      id: 'l14-summary-paths',
      title: 'Sai đường dẫn tệp trên GitHub Pages (Case sensitivity)',
      tag: 'HTML & Deploy',
      symptom: 'Chạy trên máy tính Windows thì ảnh và CSS chạy tốt, nhưng đưa lên GitHub Pages thì bị lỗi 404.',
      badCode: '<!-- Tên tệp trên Git là logo-02.PNG nhưng code viết: -->\n<img src="./img/logo-02.png">',
      goodCode: '<!-- Khớp chính xác 100% từng chữ hoa và chữ thường: -->\n<img src="./img/logo-02.PNG">\n<!-- Khuyên dùng: Đổi toàn bộ tên tệp sang chữ thường trước khi commit -->',
      explanation: 'Windows không phân biệt chữ hoa thường (Case-insensitive) nhưng máy chủ Linux (GitHub Actions / Pages) phân biệt nghiêm ngặt.'
    },
    {
      id: 'l14-summary-prevent',
      title: 'Quên event.preventDefault() trong Form',
      tag: 'DOM & Event',
      symptom: 'Submit form khiến trang web reload, làm mất toàn bộ state trên trình duyệt.',
      badCode: 'form.onsubmit = () => {\n    sendData(); // Bị reload ngay!\n};',
      goodCode: 'form.onsubmit = (e) => {\n    e.preventDefault(); // Luôn luôn chặn reload\n    sendData();\n};',
      explanation: 'Xem chi tiết hướng dẫn xử lý và các ví dụ tại bài lý thuyết [Sổ tay lỗi thường gặp](#/Lesson14/theory).'
    },
    {
      id: 'l14-summary-css-over',
      title: 'Độ ưu tiên CSS Specificity và !important',
      tag: 'CSS Architecture',
      symptom: 'Lạm dụng !important để ghi đè CSS khiến dự án về sau không thể sửa hay mở rộng giao diện.',
      badCode: '.title { color: #F47B2A !important; }\n.card-title { color: #1E293B !important; } /* Gây hỗn loạn */',
      goodCode: '/* Sử dụng phương pháp đặt tên BEM: */\n.card__title { color: #1E293B; }\n.card__title--highlight { color: #F47B2A; }',
      explanation: 'Hạn chế tối đa !important. Hãy cấu trúc CSS theo BEM để giữ độ ưu tiên phẳng và dễ kiểm soát.'
    }
  ]
};

/**
 * Lấy danh sách các lỗi phù hợp với bài học hiện tại
 */
export function getLessonPitfalls(lessonNumber, pageType = 'theory') {
  if (LESSON_PITFALLS[lessonNumber]) {
    return LESSON_PITFALLS[lessonNumber];
  }
  if (lessonNumber <= 2) return LESSON_PITFALLS[2];
  if (lessonNumber <= 6) return LESSON_PITFALLS[3];
  if (lessonNumber <= 11) return LESSON_PITFALLS[10];
  if (lessonNumber <= 13) return LESSON_PITFALLS[12];
  return LESSON_PITFALLS[14];
}

const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/**
 * ThreeJS-inspired Interactive 3D Mesh Particle Canvas
 * Tạo không gian hình học 3D tương tác chạy nhẹ nhàng ở nền header của panel
 */
class ThreeJSMeshCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 26;
    this.angleX = 0;
    this.angleY = 0;
    this.targetAngleX = 0;
    this.targetAngleY = 0;
    this.fov = 240;
    this.running = false;
    this.resize();
    this.initParticles();
    this.bindEvents();
    this.start();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width || 600;
    this.height = rect.height || 180;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * 360,
        y: (Math.random() - 0.5) * 160,
        z: (Math.random() - 0.5) * 260,
        radius: Math.random() * 2.2 + 1.2,
        color: i % 3 === 0 ? '#F47B2A' : '#DB6E26'
      });
    }
  }

  bindEvents() {
    this.onMouseMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      this.targetAngleY = nx * 0.8;
      this.targetAngleX = -ny * 0.5;
    };
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
  }

  start() {
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  render() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Damping rotation
    this.angleX += (this.targetAngleX - this.angleX) * 0.05 + 0.0015;
    this.angleY += (this.targetAngleY - this.angleY) * 0.05 + 0.003;

    const cx = this.width / 2;
    const cy = this.height / 2;

    const cosX = Math.cos(this.angleX), sinX = Math.sin(this.angleX);
    const cosY = Math.cos(this.angleY), sinY = Math.sin(this.angleY);

    const projected = this.particles.map(p => {
      // Rotate Y
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;
      // Rotate X
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const scale = this.fov / (this.fov + z2 + 200);
      return {
        px: cx + x1 * scale,
        py: cy + y2 * scale,
        scale,
        alpha: Math.max(0.1, Math.min(0.85, (z2 + 130) / 260)),
        color: p.color
      };
    });

    // Draw lines (3D Mesh constellation)
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].px - projected[j].px;
        const dy = projected[i].py - projected[j].py;
        const dist = Math.hypot(dx, dy);
        if (dist < 85) {
          const alpha = (1 - dist / 85) * 0.28 * Math.min(projected[i].alpha, projected[j].alpha);
          this.ctx.strokeStyle = `rgba(244, 123, 42, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(projected[i].px, projected[i].py);
          this.ctx.lineTo(projected[j].px, projected[j].py);
          this.ctx.stroke();
        }
      }
    }

    // Draw particle points
    projected.forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.px, p.py, Math.max(1, p.scale * 2.8), 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(244, 123, 42, ${p.alpha * 0.9})`;
      this.ctx.fill();
    });
  }
}

/**
 * Render HTML cho Panel Sổ tay chuẩn phong cách shadcn/ui components
 */
export function renderNotebookDialog(lesson, page, pitfalls) {
  const lessonTitle = lesson ? `Tuần ${lesson.number} · ${lesson.title}` : 'Bài học';
  const pageLabel = page.type === 'theory' ? 'Lý thuyết' : 'Bài tập';

  // Thống kê số lượng theo từng tag
  const tagCounts = pitfalls.reduce((acc, p) => {
    acc[p.tag] = (acc[p.tag] || 0) + 1;
    return acc;
  }, {});
  const tags = [{ name: 'Tất cả', count: pitfalls.length }, ...Object.entries(tagCounts).map(([name, count]) => ({ name, count }))];

  return `
  <dialog id="notebook-dialog" class="notebook-dialog shadcn-dialog" aria-labelledby="notebook-dialog-title" aria-modal="true">
    <div class="notebook-book shadcn-sheet">
      <!-- Gáy sổ phong cách Spiral / Bookmark giữ cho test pass -->
      <div class="notebook-spine" aria-hidden="true">
        <div class="notebook-rings">
          ${Array.from({ length: 6 }).map(() => '<span class="notebook-ring"></span>').join('')}
        </div>
      </div>

      <!-- Nội dung trang sổ phong cách shadcn/ui -->
      <div class="notebook-page-surface shadcn-sheet-content">
        <!-- Canvas 3D Mesh Animation kiểu ThreeJS ở phần đầu -->
        <div class="notebook-canvas-wrap" aria-hidden="true">
          <canvas id="notebook-3d-canvas" class="notebook-3d-canvas"></canvas>
          <div class="notebook-canvas-glow"></div>
        </div>

        <header class="notebook-header shadcn-sheet-header">
          <div class="notebook-header-top">
            <div class="notebook-badge-wrap">
              <span class="shadcn-badge shadcn-badge-primary">HIT POCKET HANDBOOK</span>
              <span class="shadcn-badge shadcn-badge-outline">Buổi ${lesson ? lesson.number : ''}</span>
              <span class="shadcn-badge shadcn-badge-secondary">${esc(pageLabel)}</span>
            </div>
            <button id="notebook-close" class="shadcn-btn-ghost notebook-close-btn" aria-label="Đóng sổ tay (Phím Esc)">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <h2 id="notebook-dialog-title" class="notebook-title shadcn-title">
            <span class="notebook-title-icon" aria-hidden="true">⚡</span>
            Sổ tay lỗi: ${esc(lessonTitle)}
          </h2>
          <p class="notebook-subtitle shadcn-description">
            Tổng hợp <strong>${pitfalls.length} lỗi trọng tâm</strong> hay gặp khi học ${esc(pageLabel.toLowerCase())}, kèm mã so sánh đối chiếu và cách khắc phục chuẩn.
          </p>

          <!-- shadcn Tabs Component (Segmented control) kèm số lượng lỗi -->
          <div class="shadcn-tabs-list" role="tablist" aria-label="Lọc nhóm lỗi">
            ${tags.map((t, idx) => `
              <button class="shadcn-tab-trigger ${idx === 0 ? 'active' : ''}" role="tab" data-filter="${esc(t.name)}" aria-selected="${idx === 0}">
                <span>${esc(t.name)}</span>
                <span class="tab-count-badge">${t.count}</span>
              </button>
            `).join('')}
          </div>
        </header>

        <div class="notebook-body shadcn-sheet-body" id="notebook-entries-container">
          ${pitfalls.map((item, index) => `
            <article class="notebook-entry shadcn-card spotlight-card" data-tag="${esc(item.tag)}" style="--entry-index: ${index};">
              <div class="spotlight-layer" aria-hidden="true"></div>
              
              <div class="shadcn-card-header">
                <div class="notebook-entry-head">
                  <span class="notebook-entry-num">LỖI #${index + 1}</span>
                  <span class="shadcn-badge shadcn-badge-outline notebook-entry-tag">${esc(item.tag)}</span>
                </div>
                <h3 class="notebook-entry-title shadcn-card-title">${esc(item.title)}</h3>
              </div>

              <div class="shadcn-card-content">
                <div class="shadcn-alert-destructive" role="alert">
                  <svg class="alert-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  <p class="notebook-entry-symptom"><strong class="symptom-label">Dấu hiệu nhận biết:</strong> ${esc(item.symptom)}</p>
                </div>

                <div class="notebook-comparison shadcn-comparison-grid">
                  <div class="code-box code-box-bad shadcn-code-panel">
                    <div class="code-box-header">
                      <div class="code-window-dots" aria-hidden="true">
                        <span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span>
                      </div>
                      <span class="code-status-badge badge-bad">❌ Mã SAI / LỖI</span>
                      <button class="copy-code-mini" data-code="${esc(item.badCode)}" aria-label="Sao chép đoạn mã lỗi">Sao chép</button>
                    </div>
                    <pre class="code-snippet"><code>${esc(item.badCode)}</code></pre>
                  </div>

                  <div class="code-box code-box-good shadcn-code-panel">
                    <div class="code-box-header">
                      <div class="code-window-dots" aria-hidden="true">
                        <span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span>
                      </div>
                      <span class="code-status-badge badge-good">✅ Cách sửa ĐÚNG</span>
                      <button class="copy-code-mini" data-code="${esc(item.goodCode)}" aria-label="Sao chép đoạn mã đúng">Sao chép</button>
                    </div>
                    <pre class="code-snippet"><code>${esc(item.goodCode)}</code></pre>
                  </div>
                </div>

                <div class="notebook-entry-footer shadcn-callout">
                  <span class="bulb-icon" aria-hidden="true">💡</span>
                  <p><strong>Nguyên nhân & Cách phòng tránh:</strong> ${esc(item.explanation)}</p>
                </div>
              </div>
            </article>
          `).join('')}
        </div>

        <footer class="notebook-page-footer shadcn-sheet-footer">
          <p>Xem toàn bộ cẩm nang chi tiết tại <a href="#/Lesson14/theory" class="notebook-full-link">Sổ tay lỗi tổng hợp Buổi 14 ➔</a></p>
          <button id="notebook-bottom-close" class="button secondary notebook-bottom-close-btn shadcn-btn-outline">Đóng sổ tay</button>
        </footer>
      </div>
    </div>
  </dialog>
  `;
}

/**
 * Mở modal Sổ tay ghi lỗi với Motion Spring Physics & ThreeJS-style Canvas
 */
export function openNotebookModal(lesson, page) {
  const pitfalls = getLessonPitfalls(lesson?.number || 1, page?.type || 'theory');

  let dialog = document.getElementById('notebook-dialog');
  if (dialog) dialog.remove();

  document.body.insertAdjacentHTML('beforeend', renderNotebookDialog(lesson, page, pitfalls));
  dialog = document.getElementById('notebook-dialog');

  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  dialog.showModal();

  // Khởi tạo Canvas 3D Mesh
  const canvasEl = dialog.querySelector('#notebook-3d-canvas');
  let meshCanvas = null;
  if (canvasEl && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    meshCanvas = new ThreeJSMeshCanvas(canvasEl);
  }

  // Spotlight Card 3D Hover Effect theo tọa độ chuột (shadcn / Aceternity style)
  const cards = dialog.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Sao chép code trong popup
  dialog.querySelectorAll('.copy-code-mini').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.dataset.code;
      if (code) {
        try {
          await navigator.clipboard.writeText(code);
          const original = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = original; }, 1500);
        } catch {}
      }
    });
  });

  // Tab Filtering (shadcn tabs) kèm Motion transition
  const tabTriggers = dialog.querySelectorAll('.shadcn-tab-trigger');
  tabTriggers.forEach(tab => {
    tab.addEventListener('click', () => {
      tabTriggers.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;
      const targetCards = [];
      cards.forEach(card => {
        const match = filter === 'Tất cả' || card.dataset.tag === filter;
        if (match) {
          card.style.display = 'block';
          targetCards.push(card);
        } else {
          card.style.display = 'none';
        }
      });

      // Animate các thẻ phù hợp bằng Motion
      if (globalThis.Motion && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        globalThis.Motion.animate(targetCards, { opacity: [0, 1], y: [16, 0] }, {
          duration: 0.35,
          delay: globalThis.Motion.stagger(0.05),
          ease: 'easeOut'
        });
      }
    });
  });

  // Đóng dialog với Motion
  const closeDialog = () => {
    meshCanvas?.stop();
    if (globalThis.Motion && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const sheet = dialog.querySelector('.shadcn-sheet');
      globalThis.Motion.animate(sheet, { opacity: [1, 0], scale: [1, 0.95], y: [0, 16] }, { duration: 0.2 }).finished.then(() => {
        dialog.close();
        dialog.remove();
        document.body.style.overflow = originalOverflow;
        const toggleBtn = document.getElementById('notebook-toggle');
        toggleBtn?.setAttribute('aria-expanded', 'false');
        toggleBtn?.focus();
      });
    } else {
      dialog.close();
      dialog.remove();
      document.body.style.overflow = originalOverflow;
      const toggleBtn = document.getElementById('notebook-toggle');
      toggleBtn?.setAttribute('aria-expanded', 'false');
      toggleBtn?.focus();
    }
  };

  document.getElementById('notebook-close')?.addEventListener('click', closeDialog);
  document.getElementById('notebook-bottom-close')?.addEventListener('click', closeDialog);

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeDialog();
  });

  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeDialog();
  });

  // ANIMATION: Spring Physics & Stagger Reveal bằng thư viện Motion
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const sheet = dialog.querySelector('.shadcn-sheet');
    const header = dialog.querySelector('.shadcn-sheet-header');
    const cardElements = Array.from(dialog.querySelectorAll('.shadcn-card'));
    const footer = dialog.querySelector('.shadcn-sheet-footer');

    if (globalThis.Motion) {
      const { animate, stagger } = globalThis.Motion;

      // Spring physics cho cả khung Sheet
      animate(sheet, {
        opacity: [0, 1],
        scale: [0.93, 1],
        y: [24, 0]
      }, {
        type: 'spring',
        damping: 24,
        stiffness: 300
      });

      // Staggered reveal cho Header, Cards và Footer
      animate([header, ...cardElements, footer].filter(Boolean), {
        opacity: [0, 1],
        y: [18, 0]
      }, {
        duration: 0.45,
        delay: stagger(0.06),
        ease: 'easeOut'
      });
    } else {
      // Fallback Web Animations API nếu Motion chưa sẵn sàng
      sheet?.animate([
        { opacity: 0, transform: 'scale(0.95) translateY(20px)' },
        { opacity: 1, transform: 'scale(1) translateY(0)' }
      ], {
        duration: 320,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      });

      [header, ...cardElements, footer].filter(Boolean).forEach((el, index) => {
        el.animate([
          { opacity: 0, transform: 'translateY(16px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 350,
          delay: 50 + index * 55,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards'
        });
      });
    }
  }

  const toggleBtn = document.getElementById('notebook-toggle');
  toggleBtn?.setAttribute('aria-expanded', 'true');
}
