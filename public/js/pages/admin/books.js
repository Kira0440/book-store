import authService from "../../services/authService.js";
import bookService from "../../services/bookService.js"

function getBookRow(book) {
    return `
        <tr>

        </tr>
    `
}

function printAllBooks(tableBody, books){

    //

}

function init(){

    const isAdmin = authService.checkIfAdmin();

    if (isAdmin){
        
    } else {
        window.location.href = "/"
    }

    const books = bookService.getBooks();

    document.addEventListener('DOMContentLoaded', (event) => {
        
        const tableBody = document.querySelector("table tbody")
        printAllBooks(tableBody, books);

    })

}

init();