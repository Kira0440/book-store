"use strict";

import userService from "./userService.js";

class authService {

    COOKIE_IS_ADMIN="isAdmin"
    COOKIE_USERNAME="username"

    adminCredentials = {
        username: "kira",
        password: "mysecretpassword"
    }

    login(username, password) {
        
        if (username == this.adminCredentials.username && password == this.adminCredentials.password){
            this.onLoginSuccess(username, "true")
            return true;
        } else {

            const user = userService.getUserByUsername(username)
            if (!user){
                alert("Username не вірний")
                return false
            }

            if (user.password == password){
                this.onLoginSuccess(username, "false")
                return true;
            }

            this.onLoginFailed();
            return false;
        }

    }

    logout(){
        document.cookie = `${this.COOKIE_IS_ADMIN}=; Max-Age=0; path=/`
        document.cookie = `${this.COOKIE_USERNAME}=; Max-Age=0; path=/`

        window.location.href = "/";
    }

    /**
     * Зареєструватисб
     * @param {*} user [username, password, name, city, street, phone]
     */
    signup(user) {
        
        if(!user.username) {
            alert("username потрібноввести")
            return false
        }

        if (!this.passwordValidation(user.password)){
            return false
        }

        user = userService.createUser(user)

        return this.login(user.username,user.password)

    }

    passwordValidation(password) {
        //1. мінімум 6 
        //мінімум 1 цифра
        //мінумум 1 Большая буква

        if(password.length < 6){
            alert("Пароль повинен бути більше 6 ")
            return false
        }

        let hasDigit = false;
        let hasCapitaLetter = false;

        for (let i = 0; i < password.length; i++){
            const ch = password.charAt(i);

            if (ch >= '0' && ch <= '9'){
                hasDigit = true;
            }

            if (ch >= 'A' && ch <= "Z" ){
                hasCapitaLetter = true;
            }
        }

        if (!hasDigit){
            alert("Пароль повинен мати цифру")
            return false
        }

        if (!hasCapitaLetter){
            alert("Пароль повинен мати одну велику літеру")
            return false
        }

        return true
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

    onLoginSuccess(username, isAdmin){
        document.cookie = `${this.COOKIE_IS_ADMIN}=${isAdmin};`
        document.cookie = `${this.COOKIE_USERNAME}=${username}`
    }

    onLoginFailed(){
        alert("Невірний логін чи пароль!")
    }



}

export default new authService()