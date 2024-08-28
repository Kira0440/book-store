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

    const imgEl = document.querySelector("img");
    imgEl.setAttribute('src', book.image)

    const h2 = document.getElementById("name");
    h2.innerHTML = book.name;

    const pAuthor = document.getElementById("author");
    pAuthor.innerHTML = book.author;

    const pDescription = document.getElementById("description");
    pDescription.innerHTML = book.description;
}

init();