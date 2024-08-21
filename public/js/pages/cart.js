"use strict";

import cartService from "../services/cartService.js";
//{ getCart, addToCart, minusFromCart }
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

function printCartItems(cart) {
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

function printCartTotal(cart){
    let total = 0;
    const el = document.querySelector("p.total span");

    cart.forEach(item => {
        total += item.price * item.quantity;
    })

    el.innerHTML = `$${total}`
}

function printCartContent(){

    const cart = cartService.getCart();

    printCartItems(cart);

    printCartTotal(cart)

}

function onAdd(e) {
    const button = e.target;
    const bookId = button.getAttribute("data-book-id");
    cartService.addToCart(bookId);
    printCartContent();
}

function onMinus(e) {
    console.log("on minus")
    const button = e.target;
    const bookId = button.getAttribute("data-book-id");
    cartService.minusFromCart(bookId);
    printCartContent();
}

function clearCart(){
    localStorage.removeItem('cart');
    loadCartContent()

}


function init(){
    printCartContent()

    console.log("GDE!")

    document.addEventListener('DOMContentLoaded', (event) => {
        document.getElementById("clearCart").onclick = () => {
            cartService.clearCart();
            printCartContent();
        }
    })
}

init();