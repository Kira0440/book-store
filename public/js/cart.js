"use strict";

import { getCart, addToCart, minusFromCart } from "./cartService.js";

function getCartLineItem(data){
    return `
        <div>
            <span>${data.name} : Price ${data.price} -- <span></span>
            <br/>
            <span>
                <button class="minus" data-book-id=${data.id}>-</button>
                ${data.quantity}
                <button class="plus" data-book-id=${data.id}>+</button>
                --
                Total : ${data.quantity * data.price}
            </span>

        </div>
    `
}

function printCartContent(){

    const cart = getCart();

    let cartConetnt = ""

    cart.forEach(book => {
        cartConetnt += getCartLineItem(book);
    })

    const el = document.getElementById("cart-content");
    
    el.innerHTML = cartConetnt;

    document.querySelectorAll("button.plus").forEach(button => {
        button.addEventListener('click', onAdd);
    });


    document.querySelectorAll("button.minus").forEach(button => {
        button.addEventListener('click', onMinus);
    });
}

function onAdd(e) {
    const button = e.target;
    const bookId = button.getAttribute("data-book-id");
    addToCart(bookId);
    printCartContent();
}

function onMinus(e) {
    console.log("on minus")
    const button = e.target;
    const bookId = button.getAttribute("data-book-id");
    minusFromCart(bookId);
    printCartContent();
}


function init(){
    printCartContent()

    console.log("GDE!")
}

init();