import { getBookById } from "./bookService.js";

function init() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const book = getBookById(id);
    if (!book) {
        alert("No book found with id : " + id)
        window.location.href = "/";
        return;
    }

    const div = document.getElementById("bookId");
    div.innerHTML = "Book id : " + book.id + " ; book title = " + book.name;
}

init();