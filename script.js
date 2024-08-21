function goToCart() {
    window.location.href='cart.html'
}

function loadCart() {
    let cartContent = "Ваш кошик:\n";
    cart.forEach(item => {
        cartContent += `${item.name} - ${item.price} грн\n`;
    });
    alert(cartContent);
}

// function updateCart() {
//     const totalCount = cart.length;
//     let totalPrice = 0;
    
//     let j = 0
//     for(var i = 0; i < cart.length; i++){
//         //totalPrice = totalPrice + cart[i].price
//         totalPrice += cart[i].price;
//     }

//     const cartCountElement = document.getElementById('cart-count');
//     cartCountElement.innerText = `${totalCount}, ${totalPrice}$`;
// }


// document.addEventListener('DOMContentLoaded', (event) => {
//     updateCart();

//     let form = document.getElementById('feedbackForm');
//     form.addEventListener('submit', function(event){
//         event.preventDefault();
                    
//         let name = form.elements['name'].value;
//         let email = form.elements['email'].value;
//         let message = form.elements['message'].value;
                    
//         console.log("Ім'я: " + name);
//         console.log("Електронна пошта: " + email);
//         console.log("Повідомлення: " + message);
                   
//         form.reset();
//     });

//     let inputFields = form.querySelectorAll('input', 'textarea');
//     inputFields.forEach(function(input) {
//         input.addEventListener('input', function(){
//             input.setCustomValidity('');
//         });
//     });
// });


