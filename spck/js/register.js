// Register form handling
const register = (event) => {
    event.preventDefault();

    let username = document.querySelector("#username").value.trim();
    let email = document.querySelector("#email").value.trim();
    let password = document.querySelector("#password").value.trim();
    let confirmPassword = document.querySelector("#confirmPassword").value.trim();
    let agreeCheckbox = document.querySelector('input[name="agree"]');

    // Validate all fields are filled
    if (!username || !email || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Validate username length
    if (username.length < 3) {
        alert("Tên đăng nhập phải có ít nhất 3 ký tự!");
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email không hợp lệ!");
        return;
    }

    // Validate password length
    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    // Validate password confirmation matches
    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    // Validate agreement checkbox
    if (agreeCheckbox && !agreeCheckbox.checked) {
        alert("Vui lòng đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật!");
        return;
    }

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // Check if email already registered
    if (users[email]) {
        alert("Email này đã được đăng ký!");
        return;
    }

    // Check if username already taken
    for (let key in users) {
        if (users[key].username === username) {
            alert("Tên đăng nhập này đã được sử dụng!");
            return;
        }
    }

    // Create new user object
    users[email] = {
        username: username,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    // Save users to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    window.location.href = "dangnhap.html";
};

document.querySelector("#registerForm").addEventListener("submit", register);