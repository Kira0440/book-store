"use strict";

class authService {

    COOKIE_IS_ADMIN="isAdmin"
    COOKIE_USERNAME="username"

    adminCredentials = {
        username: "kira",
        password: "mysecretpassword"
    }

    login(username, password) {
        
        if (username == this.adminCredentials.username && password == this.adminCredentials.password){
            this.onLoginSuccess(username)
            return true;
        } else {
            this.onLoginFailed();
            return false;
        }

    }

    logout(){
        document.cookie = `${this.COOKIE_IS_ADMIN}=; Max-Age=0; path=/`
        document.cookie = `${this.COOKIE_USERNAME}=; Max-Age=0; path=/`

        window.location.href = "/";
    }

    checkIfAdmin() {
        const allCookies = document.cookie.split("; ");
        
        for(let i=0; i< allCookies.length; i++){
            const cookie = allCookies[i];

            const keyVal = cookie.split("=")
            if  (keyVal[0] == this.COOKIE_IS_ADMIN){
                return keyVal[1] == 'true';
            }
        }

        return false;
    }

    getUsername() {
        const allCookies = document.cookie.split("; ");
        
        for(let i=0; i< allCookies.length; i++){
            const cookie = allCookies[i];

            const keyVal = cookie.split("=")
            if  (keyVal[0] == this.COOKIE_USERNAME){
                return keyVal[1];
            }
        }

        return false;
    }

    onLoginSuccess(username){
        document.cookie = `${this.COOKIE_IS_ADMIN}=true;`
        document.cookie = `${this.COOKIE_USERNAME}=${username}`
    }

    onLoginFailed(){
        alert("Невірний логін чи пароль!")
    }



}

export default new authService()