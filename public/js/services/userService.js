"use strict";

class UserService {

    readFromStorage(){
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    saveToStorage(data){
        localStorage.setItem('users', JSON.stringify(data));
    }

    createUser(user) {
        
        let allUsers = this.readFromStorage();

        if (!checkUsernameIsUnique(allUsers, user.username)){
            alert("Цей юзер вже існує")
            return false;
        }

        let id = 1;
        if (allUsers.length > 1){
            const ids = allUsers.map(u=>u.id);
            id = Math.max(...ids) + 1;
        }

        user.id = id;
        allUsers.push(user);

        this.saveToStorage(allUsers);

        return user;
    }

    getAllUsers() {
        const allUsers = this.readFromStorage();
        return allUsers;
    }

    getUserByUsername(username) {
        let allUsers = this.readFromStorage();

        return allUsers.find(u => u.username == username);
    }

    checkUsernameIsUnique(users, username){
        for ( let i = 0; i < users.length; i++){
            if(users[i].username == username){
                return false;
            } 
        }

        return true;
    }

}

export default new UserService();