const login = (event) =>{
    event.preventDefault();
    let email = document.querySelector("#email").value.trim();
    let password = document.querySelector("#password").value.trim();
    let confirmPassword = document.querySelector("#confirmPassword").value.trim();

    if (!email || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]){
        alert("Email đã được đăng ký!");
        return;
    }

    users[email] = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");

    window.location.href = "main.html";
}

document.querySelector("#registerForm").addEventListener("submit", register);