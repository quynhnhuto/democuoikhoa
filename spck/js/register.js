const register = (event) =>{
    event.preventDefault(); // Ngăn chặn hành vi mặc định

    // Bước 1: Lấy dữ liệu từ form đăng ký 
    let email = document.querySelector("#signup-email").value.trim();
    let password = document.querySelector("#signup-password").value.trim();
    let confirmPassword = document.querySelector("#confirm-password").value.trim();

    // Bước 2: Kiểm tra dữ liệu hợp lệ 
    // regular expression (biểu thức chính quy) 
    let lowerCaseLetter = /[a-z]/g;
    let upperCaseLetter = /[A-Z]/g;
    let numbers = /[0-9]/g;

    if (!username || !email || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    if (!password.match(lowerCaseLetter)) {
        alert("Mật khẩu phải chứa ít nhất một chữ cái thường!");
        return;
    }

    if (!password.match(upperCaseLetter)) {
        alert("Mật khẩu phải chứa ít nhất một chữ cái hoa!");
        return;
    }

    if (!password.match(numbers)) {
        alert("Mật khẩu phải chứa ít nhất một chữ số!");
        return;
    }

    // Bước 3: Lưu dữ liệu vào localStorage 
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // Kiểm tra email đã được đăng ký chưa
    if (users[email]){
        alert("Email này đã được đăng ký!");
        return;
    }else{
        users[email] = {
            email: email,
            password: password
        };
        console.log(users);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Đăng ký thành công!");
        window.location.href = "dangnhap.html"; // Chuyển hướng đến trang đăng nhập
    }

}

document.querySelector("#signup-form").addEventListener("submit", register)