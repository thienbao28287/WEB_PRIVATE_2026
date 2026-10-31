/**
 * Sổ tay ghi lỗi thường gặp theo từng bài học (Lesson Pitfalls Notebook)
 * Giao diện cuốn vở kẻ dòng có lò xo ở giữa (Open Spiral Lined Notebook)
 * với hoạt ảnh lật trang 3D từ phải sang trái (Page Flip 3D).
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
 * Render nội dung một trang giấy vở kẻ ô (Lined Paper Page)
 */
function renderSinglePage(item, pageIndex, totalPages, lessonTitle, side = 'left') {
  if (!item) {
    // Trang kết thúc hoặc ghi chú thêm
    return `
      <div class="notebook-page-surface lined-paper ${side === 'left' ? 'paper-left' : 'paper-right'}">
        <div class="paper-margin-line" aria-hidden="true"></div>
        <header class="paper-header">
          <div class="paper-header-brand">
            <span class="paper-brand-logo">▲</span>
            <div class="paper-brand-text">
              <strong>HIT WEBSPACE</strong>
              <small>way towards clean code</small>
            </div>
          </div>
          <div class="paper-header-date">
            <span>Date:</span> <span class="date-dots">..... / ..... / 2026</span>
          </div>
        </header>
        <div class="paper-content paper-summary-page">
          <div class="handwritten-title">
            <span class="pen-icon">✍️</span>
            <h3>Lời dặn dò từ Mentor</h3>
          </div>
          <p class="paper-text">“Mỗi dòng code bị lỗi là một cơ hội để bạn hiểu sâu hơn về bản chất của trình duyệt và ngôn ngữ lập trình.”</p>
          <div class="paper-sticky-note">
            <p><strong>Checklist kiểm tra khi gặp bug:</strong></p>
            <ul>
              <li>1. Mở F12 kiểm tra tab <strong>Console</strong> (Lỗi đỏ).</li>
              <li>2. Kiểm tra tab <strong>Network</strong> xem có file nào bị 404 không.</li>
              <li>3. Soi tab <strong>Elements / Styles</strong> xem CSS có bị gạch ngang không.</li>
              <li>4. Nhấn <code>Ctrl + Shift + R</code> để xóa cache trình duyệt.</li>
            </ul>
          </div>
        </div>
        <footer class="paper-footer">
          <span class="paper-page-num">${pageIndex}</span>
        </footer>
      </div>
    `;
  }

  return `
    <div class="notebook-page-surface lined-paper ${side === 'left' ? 'paper-left' : 'paper-right'}">
      <div class="paper-margin-line" aria-hidden="true"></div>
      
      <header class="paper-header">
        <div class="paper-header-brand">
          <span class="paper-brand-logo">▲</span>
          <div class="paper-brand-text">
            <strong>HIT WEBSPACE</strong>
            <small>way towards clean code</small>
          </div>
        </div>
        <div class="paper-header-date">
          <span>Date:</span> <span class="date-dots">..... / ..... / 2026</span>
        </div>
      </header>

      <div class="paper-content">
        <article class="notebook-entry" data-id="${esc(item.id)}">
          <div class="paper-entry-header">
            <div class="paper-tag-row">
              <span class="paper-badge-num">LỖI #${pageIndex}</span>
              <span class="paper-badge-tag">${esc(item.tag)}</span>
            </div>
            <h3 class="paper-entry-title">${esc(item.title)}</h3>
          </div>

          <div class="paper-symptom-box">
            <span class="symptom-pen-mark">⚠️</span>
            <p class="notebook-entry-symptom"><strong>Dấu hiệu:</strong> ${esc(item.symptom)}</p>
          </div>

          <div class="notebook-comparison paper-code-grid">
            <div class="code-box code-box-bad paper-memo-bad">
              <div class="code-box-header">
                <span class="memo-tape" aria-hidden="true"></span>
                <span class="code-status-badge badge-bad">❌ Mã SAI / LỖI</span>
                <button class="copy-code-mini" data-code="${esc(item.badCode)}" aria-label="Sao chép mã lỗi">Sao chép</button>
              </div>
              <pre class="code-snippet"><code>${esc(item.badCode)}</code></pre>
            </div>

            <div class="code-box code-box-good paper-memo-good">
              <div class="code-box-header">
                <span class="memo-tape" aria-hidden="true"></span>
                <span class="code-status-badge badge-good">✅ Cách sửa ĐÚNG</span>
                <button class="copy-code-mini" data-code="${esc(item.goodCode)}" aria-label="Sao chép mã chuẩn">Sao chép</button>
              </div>
              <pre class="code-snippet"><code>${esc(item.goodCode)}</code></pre>
            </div>
          </div>

          <div class="notebook-entry-footer paper-note-callout">
            <span class="bulb-icon" aria-hidden="true">💡</span>
            <p><strong>Ghi nhớ:</strong> ${esc(item.explanation)}</p>
          </div>
        </article>
      </div>

      <footer class="paper-footer">
        <span class="paper-topic-hint">${esc(lessonTitle)}</span>
        <span class="paper-page-num">${pageIndex}</span>
      </footer>
    </div>
  `;
}

/**
 * Render toàn bộ cuốn sổ tay lò xo 2 trang (Two-Page Open Notebook)
 */
export function renderNotebookDialog(lesson, page, pitfalls) {
  const lessonTitle = lesson ? `Tuần ${lesson.number} · ${lesson.title}` : 'Bài học';
  const totalItems = pitfalls.length;
  // Mỗi Spread chứa 2 lỗi (Trang trái & Trang phải)
  const totalSpreads = Math.ceil(totalItems / 2);

  return `
  <dialog id="notebook-dialog" class="notebook-dialog shadcn-dialog notebook-spiral-dialog" aria-labelledby="notebook-dialog-title" aria-modal="true">
    <!-- Khung điều khiển trên cùng -->
    <div class="notebook-top-bar">
      <div class="notebook-top-info">
        <span class="spiral-indicator-icon">📖</span>
        <h2 id="notebook-dialog-title" class="notebook-top-title">
          Vở ghi chép lỗi: ${esc(lessonTitle)}
        </h2>
        <span class="page-spread-counter" id="page-spread-counter">Trang 1-2 / ${Math.max(2, totalItems)}</span>
      </div>
      
      <div class="notebook-top-actions">
        <button id="flip-prev-btn" class="notebook-flip-btn" title="Lật về trang trước" aria-label="Trang trước" disabled>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><path d="m15 18-6-6 6-6"/></svg>
          <span>Trang trước</span>
        </button>
        <button id="flip-next-btn" class="notebook-flip-btn primary-flip" title="Lật trang tiếp (hoặc click vào trang phải)" aria-label="Lật trang tiếp">
          <span>Lật trang tiếp</span>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        <button id="notebook-close" class="notebook-close-circle" aria-label="Đóng sổ tay (Phím Esc)">
          ✕
        </button>
      </div>
    </div>

    <!-- Cuốn sổ mở đôi dạng lò xo 3D -->
    <div class="notebook-book shadcn-sheet open-spiral-notebook" id="open-spiral-notebook" data-current-spread="0" data-total-spreads="${totalSpreads}">
      <!-- Bìa nền giả lập bàn gỗ mờ sang trọng -->
      <div class="notebook-desk-mat" aria-hidden="true"></div>

      <!-- Khung 3D Perspective -->
      <div class="notebook-3d-stage">
        
        <!-- TRANG TRÁI DƯỚI (Left Page Underneath) -->
        <div class="notebook-spread-side spread-left" id="spread-left-container">
          ${renderSinglePage(pitfalls[0], 1, totalItems, lessonTitle, 'left')}
        </div>

        <!-- GÁY XOẮN LÒ XO KIM LOẠI ĐÔI Ở CHÍNH GIỮA (Center Double Wire Spiral) -->
        <div class="notebook-spine notebook-spine-center" aria-hidden="true">
          <div class="notebook-rings-double">
            ${Array.from({ length: 16 }).map(() => `
              <div class="spiral-wire-loop">
                <span class="hole hole-left"></span>
                <span class="wire-curve"></span>
                <span class="hole hole-right"></span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- TỜ GIẤY LẬT 3D TỪ PHẢI SANG TRÁI (Flipping Page 3D) -->
        <div class="notebook-flipping-sheet" id="notebook-flipping-sheet" aria-hidden="true">
          <div class="flipping-face flipping-front" id="flipping-front">
            ${renderSinglePage(pitfalls[1], 2, totalItems, lessonTitle, 'right')}
          </div>
          <div class="flipping-face flipping-back" id="flipping-back">
            ${renderSinglePage(pitfalls[2], 3, totalItems, lessonTitle, 'left')}
          </div>
        </div>

        <!-- TRANG PHẢI DƯỚI (Right Page Underneath) -->
        <div class="notebook-spread-side spread-right" id="spread-right-container" title="Click vào đây để lật trang tiếp ➔">
          ${renderSinglePage(pitfalls[1], 2, totalItems, lessonTitle, 'right')}
          <!-- Góc gấp trang gợi ý lật (Dog-ear curl) -->
          <div class="page-curl-corner" aria-hidden="true">
            <span class="curl-text">Lật ➔</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Thanh chân trang phụ trợ -->
    <div class="notebook-bottom-hint">
      <span>💡 Nhấp vào trang bên phải hoặc nút <strong>"Lật trang tiếp"</strong> để xem các lỗi tiếp theo với hiệu ứng lật trang 3D.</span>
      <button id="notebook-bottom-close" class="notebook-link-close">Đóng sổ</button>
    </div>
  </dialog>
  `;
}

/**
 * Xử lý logic và hoạt ảnh lật trang 3D từ phải sang trái
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

  const lessonTitle = lesson ? `Tuần ${lesson.number} · ${lesson.title}` : 'Bài học';
  let currentSpread = 0;
  const totalItems = pitfalls.length;
  const totalSpreads = Math.ceil(totalItems / 2);
  let isAnimating = false;

  const leftContainer = dialog.querySelector('#spread-left-container');
  const rightContainer = dialog.querySelector('#spread-right-container');
  const flippingSheet = dialog.querySelector('#notebook-flipping-sheet');
  const flippingFront = dialog.querySelector('#flipping-front');
  const flippingBack = dialog.querySelector('#flipping-back');
  const prevBtn = dialog.querySelector('#flip-prev-btn');
  const nextBtn = dialog.querySelector('#flip-next-btn');
  const counterEl = dialog.querySelector('#page-spread-counter');

  function updateControls() {
    prevBtn.disabled = currentSpread === 0;
    nextBtn.disabled = currentSpread >= totalSpreads - 1;
    const startNum = currentSpread * 2 + 1;
    const endNum = Math.min(startNum + 1, totalItems);
    counterEl.textContent = `Trang ${startNum}-${endNum} / ${totalItems}`;
  }

  // LẬT TRANG TỪ PHẢI SANG TRÁI (Forward Flip)
  function flipForward() {
    if (isAnimating || currentSpread >= totalSpreads - 1) return;
    isAnimating = true;

    const nextSpread = currentSpread + 1;
    const nextLeftItem = pitfalls[nextSpread * 2];
    const nextRightItem = pitfalls[nextSpread * 2 + 1];

    // Chuẩn bị mặt sau của tờ lật và trang phải bên dưới
    flippingFront.innerHTML = renderSinglePage(pitfalls[currentSpread * 2 + 1], currentSpread * 2 + 2, totalItems, lessonTitle, 'right');
    flippingBack.innerHTML = renderSinglePage(nextLeftItem, nextSpread * 2 + 1, totalItems, lessonTitle, 'left');
    rightContainer.innerHTML = renderSinglePage(nextRightItem, nextSpread * 2 + 2, totalItems, lessonTitle, 'right') + `
      <div class="page-curl-corner" aria-hidden="true"><span class="curl-text">Lật ➔</span></div>
    `;

    // Kích hoạt class lật 3D rotateY(-180deg)
    flippingSheet.classList.add('is-flipping-forward');

    setTimeout(() => {
      // Khi đã lật xong qua trái
      currentSpread = nextSpread;
      leftContainer.innerHTML = renderSinglePage(nextLeftItem, currentSpread * 2 + 1, totalItems, lessonTitle, 'left');
      flippingSheet.classList.remove('is-flipping-forward');
      updateControls();
      isAnimating = false;
      bindCopyButtons();
    }, 600);
  }

  // LẬT NGƯỢC TỪ TRÁI SANG PHẢI (Backward Flip)
  function flipBackward() {
    if (isAnimating || currentSpread <= 0) return;
    isAnimating = true;

    const prevSpread = currentSpread - 1;
    const prevLeftItem = pitfalls[prevSpread * 2];
    const prevRightItem = pitfalls[prevSpread * 2 + 1];

    // Đặt tờ lật ở bên trái
    flippingFront.innerHTML = renderSinglePage(prevRightItem, prevSpread * 2 + 2, totalItems, lessonTitle, 'right');
    flippingBack.innerHTML = renderSinglePage(pitfalls[currentSpread * 2], currentSpread * 2 + 1, totalItems, lessonTitle, 'left');
    
    // Bắt đầu từ vị trí -180deg quay về 0deg
    flippingSheet.classList.add('is-flipping-backward-prepare');
    
    requestAnimationFrame(() => {
      flippingSheet.classList.remove('is-flipping-backward-prepare');
      flippingSheet.classList.add('is-flipping-backward');

      setTimeout(() => {
        currentSpread = prevSpread;
        leftContainer.innerHTML = renderSinglePage(prevLeftItem, currentSpread * 2 + 1, totalItems, lessonTitle, 'left');
        rightContainer.innerHTML = renderSinglePage(prevRightItem, currentSpread * 2 + 2, totalItems, lessonTitle, 'right') + `
          <div class="page-curl-corner" aria-hidden="true"><span class="curl-text">Lật ➔</span></div>
        `;
        flippingSheet.classList.remove('is-flipping-backward');
        updateControls();
        isAnimating = false;
        bindCopyButtons();
      }, 600);
    });
  }

  // Gán sự kiện click nút lật và click vào trang
  nextBtn.addEventListener('click', flipForward);
  prevBtn.addEventListener('click', flipBackward);

  rightContainer.addEventListener('click', (e) => {
    if (e.target.closest('.copy-code-mini')) return;
    flipForward();
  });

  leftContainer.addEventListener('click', (e) => {
    if (e.target.closest('.copy-code-mini')) return;
    flipBackward();
  });

  // Sao chép code
  function bindCopyButtons() {
    dialog.querySelectorAll('.copy-code-mini').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const code = btn.dataset.code;
        if (code) {
          try {
            await navigator.clipboard.writeText(code);
            const original = btn.textContent;
            btn.textContent = 'Đã chép ✓';
            setTimeout(() => { btn.textContent = original; }, 1500);
          } catch {}
        }
      };
    });
  }
  bindCopyButtons();

  // Đóng dialog
  const closeDialog = () => {
    dialog.close();
    dialog.remove();
    document.body.style.overflow = originalOverflow;
    const toggleBtn = document.getElementById('notebook-toggle');
    toggleBtn?.setAttribute('aria-expanded', 'false');
    toggleBtn?.focus();
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

  // Bàn phím mũi tên lật trang
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') flipForward();
    if (e.key === 'ArrowLeft') flipBackward();
  });

  const toggleBtn = document.getElementById('notebook-toggle');
  toggleBtn?.setAttribute('aria-expanded', 'true');
}
