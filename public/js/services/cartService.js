"use strict";

import bookService from "./bookService.js";

class cartService {

    onCartUpdateListeners = [];

    readFromStorage(){
        let data = JSON.parse(localStorage.getItem('cart')) || [];
        
        let booksMap = new Map()
        data.forEach(obj =>{
            booksMap.set(obj.id, obj.quantity);
        })
    
        return booksMap;
    }
    
    saveToStorage(data){
    
        let result = [];
    
        data.keys().forEach(key => {
            result.push({
                id: key,
                quantity: data.get(key)
            });
        })
    
        localStorage.setItem('cart', JSON.stringify(result));

        const cart = this.getCart();
        this.onCartUpdateListeners.forEach(listener => {
            listener(cart)
        })
    }

    addToCart(bookId) {

        bookId = Number(bookId);
        
        let cart = this.readFromStorage()
    
        let quantity = 0;
        if (cart.has(bookId)){
            quantity = cart.get(bookId);
            quantity++;
        } else{
            quantity = 1;
        }
    
        cart.set(bookId, quantity);
        this.saveToStorage(cart);
    
    }
    
    minusFromCart(bookId){
        bookId = Number(bookId);
    
        let cart = this.readFromStorage()
    
        let quantity = 0;
        if (cart.has(bookId)){
            quantity = cart.get(bookId);
            quantity--;
        } 
    
        if (quantity <= 0){
            cart.delete(bookId);
        } else {
            cart.set(bookId,quantity);
        }
    
        this.saveToStorage(cart);
    }
    
    removeFromCart(bookId){
        let cart = this.readFromStorage()
        cart.delete(bookId);
        this.saveToStorage(cart);
    }
    
    clearCart(){
        this.saveToStorage(new Map())
    }
    
    /**
     * Возвращает массив елементов в кошике
     * @returns [ id, name, price, quantity]
     */
    getCart() {
        //book id
        //book name
        //book price
        //book quantity
    
        let cart = this.readFromStorage();
        const allBooks = bookService.getBooks();
    
        let result = [];
        cart.keys().forEach(id => {
            const book = allBooks.find(b => b.id == id);
    
            result.push({
                id: id,
                quantity: cart.get(id),
                name : book.name,
                price: book.price
            });
        });
    
        return result;
    }

    addOnCartUpdateListener(listener) {
        this.onCartUpdateListeners.push(listener);
    }
}

export default new cartService();