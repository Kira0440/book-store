import bookService from "../services/bookService.js";

function init() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const book = bookService.getBookById(id);
    if (!book) {
        alert("No book found with id : " + id)
        window.location.href = "/";
        return;
    }

    const div = document.getElementById("bookId");
    div.innerHTML = book.name + book.author + book.price + book.description;

    const imgEl = document.querySelector("img");
    imgEl.setAttribute('src', book.image)
}

init();