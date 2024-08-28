import bookService from "../../services/bookService.js"

let id;

function init(){

    document.addEventListener('DOMContentLoaded', (event) => {

    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get("id");
    
        let form = document.getElementById('editBookForm');
        
        if (!form) {
            console.log("no form found : " + addBookForm);
            return;
        }

        const book = bookService.getBookById(id);
        if (!book) {
            alert("No book found with id : " + id)
            window.location.href = "/";
            return;
        }

        form.elements['name'].value = book.name;
        form.elements['author'].value = book.author;
        form.elements['price'].value = book.price;
        form.elements['genreId'].value = book.genreId;
        form.elements['description'].value = book.description;
        form.elements['image'].value = book.image;

        form.addEventListener('submit', function(event){
            event.preventDefault();
                
            let book = {};
            book.name = form.elements['name'].value;
            book.author = form.elements['author'].value;
            book.price = form.elements['price'].value;
            book.genreId = form.elements['genreId'].value;
            book.description = form.elements['description'].value;
            book.image = form.elements['image'].value;
                        
            console.log("book to save: ", book);
                    
            bookService.editBook(id, book);

            alert("saved");
            //form.reset();
        });
    })
}

// export function saveBook(book) {
//     console.log("book to save: ", book);
// }


init();