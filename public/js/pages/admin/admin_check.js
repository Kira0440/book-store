import authService from "../../services/authService.js";
import bookServis from "../../services/bookService.js";

function init(){

    const isAdmin = authService.checkIfAdmin();

    if (isAdmin){
        
    } else {
        window.location.href = "/"
    }
}

function getTdHtmlContent(book) {

    
    return  `
    <tr class="books">
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.price}</td>
        <td><button class="edit" data-book-id="${book.id}" >Edit</button></td>
    </tr>
    `
}

function getTableHtmlContent(books) {
    const trTop = ""

    const trBottom = ""

    let booksHtml = "";

    
    for(let i = 0; i < books.length; i++){
        booksHtml += getTdHtmlContent(books[i])
    }

    return trTop + booksHtml + trBottom;
}

function insertTable(){
    let books = bookServis.getBooks();
    const el = document.getElementById("table-content")
    let allHtml = getTableHtmlContent(books);
    el.innerHTML = allHtml

    const allEditButtons = document.querySelectorAll("button.edit");
    allEditButtons.forEach(button => {
        button.onclick = () => {
            const id = button.getAttribute("data-book-id");
            window.location.href = "/admin/editBook.html?id="+id;
        }
    })
}

insertTable();
init();