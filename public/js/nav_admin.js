import authService from "./services/authService.js";

function printUsername(el){

    el.innerHTML = authService.getUsername()

}

function init() {
    
    document.addEventListener('DOMContentLoaded', (event) => {

        const usernameEl = document.getElementById("username")
        const logoutButtonEl = document.getElementById("logout")


        printUsername(usernameEl);


        logoutButtonEl.onclick = () => {
            authService.logout()
        }
    })
}

init();