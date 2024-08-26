import authService from "../services/authService.js"

function onPasswordEyeClicked(passwordEye, passwordInput){
    let type = passwordInput.getAttribute("type");
    if (type == "password"){
        type = "text"
        passwordEye.classList.remove("mdi-eye")
        passwordEye.classList.add("mdi-eye-closed")
    } else {
        type = "password"
        passwordEye.classList.remove("mdi-eye-closed")
        passwordEye.classList.add("mdi-eye")
    }

    passwordInput.setAttribute("type", type);
}

function onFormSubmit(form){
    const username = form.elements['username'].value;
    const password = form.elements['password'].value;

    const res = authService.login(username, password);

    if (res){
        window.location.href = "/admin/books"
    }
}

function init(){

    document.addEventListener('DOMContentLoaded', (event) => {

        const passwordEye = document.getElementById("password-eye");
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
        const form = document.querySelector("form");

        passwordEye.onclick = () => { onPasswordEyeClicked(passwordEye, passwordInput) }

        form.addEventListener('submit', function(event){
            event.preventDefault();
            onFormSubmit(form)
        })

    })

};



init();