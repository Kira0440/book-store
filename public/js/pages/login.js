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
        //todo: if admin 
        window.location.href = "/admin/books"
        //else, go to "/"
        if (true){
            ;
        } eles {
            ;
        }
    }
}

function init(){

    document.addEventListener('DOMContentLoaded', (event) => {

        const passwordEye = document.getElementById("password-eye");
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
        const form = document.querySelector("form");

        const signupButton = document.getElementById("sign-up")

        passwordEye.onclick = () => { onPasswordEyeClicked(passwordEye, passwordInput) }

        form.addEventListener('submit', function(event){
            event.preventDefault();
            onFormSubmit(form)
        })

        signupButton.onclick = function() {
            window.location.href = "/signup.html"
        }

    })

};



init();