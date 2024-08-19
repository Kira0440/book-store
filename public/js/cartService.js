"use strict";

import { getBookById, getBooks } from "./bookService.js";

function readFromStorage(){
    let data = JSON.parse(localStorage.getItem('cart')) || [];
    
    let booksMap = new Map()
    data.forEach(obj =>{
        booksMap.set(obj.id, obj.quantity);
    })

    return booksMap;
}

function saveToStorage(data){

    let result = [];

    data.keys().forEach(key => {
        result.push({
            id: key,
            quantity: data.get(key)
        });
    })

    localStorage.setItem('cart', JSON.stringify(result));
}

export function addToCart(bookId) {

    bookId = Number(bookId);
    
    let cart = readFromStorage()

    let quantity = 0;
    if (cart.has(bookId)){
        quantity = cart.get(bookId);
        quantity++;
    } else{
        quantity = 1;
    }

    cart.set(bookId, quantity);
    saveToStorage(cart);

}

export function minusFromCart(bookId){
    bookId = Number(bookId);

    let cart = readFromStorage()

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

    saveToStorage(cart);
}

export function removeFromCart(bookId){
    let cart = readFromStorage()
    cart.delete(bookId);
    saveToStorage(cart);
}

export function clearCart(){
    saveToStorage(new Map())
}

export function getCart() {
    //book id
    //book name
    //book price
    //book quantity

    let cart = readFromStorage();
    const allBooks = getBooks();

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