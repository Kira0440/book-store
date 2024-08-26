import authService from "../../services/authService.js";

function init(){

    const isAdmin = authService.checkIfAdmin();

    if (isAdmin){
        
    } else {
        window.location.href = "/"
    }
}

init();