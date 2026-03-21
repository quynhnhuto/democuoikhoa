// Login form handling
const login = (event) => {
    event.preventDefault();

    let email = document.querySelector("#email").value.trim();
    let password = document.querySelector("#password").value.trim();

    // Validate fields
    if (!email || !password) {
        alert("Vui lòng điền đầy đủ thông tin!");
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

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // Check if user exists with correct password
    if (users[email] && users[email].password === password) {
        // Save current user session
        localStorage.setItem("currentUser", JSON.stringify(users[email]));
        alert("Đăng nhập thành công!");
        window.location.href = "main.html";
    } else {
        alert("Email hoặc mật khẩu không đúng!");
    }
};

document.querySelector("#loginForm").addEventListener("submit", login);