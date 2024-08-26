import cartService from "./services/cartService.js";

/**
 * 
 * @param {Element} cartEl - HTML єлемент кошика в навігаціі
 */
function printCartCount(cartEl, cart){


    let total = 0;
    cart.forEach(item => {
        total += item.quantity;
    });

    cartEl.innerHTML = total

}

function init(){

    document.addEventListener('DOMContentLoaded', (event) => {

        const cartEl = document.getElementById("cart_count");

        const cart = cartService.getCart();
        printCartCount(cartEl, cart);

        cartService.addOnCartUpdateListener(cart => {
            printCartCount(cartEl, cart);
        })
    })



}

init();