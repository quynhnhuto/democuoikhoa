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


    localStorage.setItem("users", JSON.stringify(users));



    window.location.href = "main.html";
}

document.querySelector("#loginForm").addEventListener("submit", login);