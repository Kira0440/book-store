import { getBooks as getAllBooks } from "./public/js/bookService.js";


const genres = [
    {
        id: 1,
        href : "Childrens",
        title : "Дитячі"
    },
    {
        id: 2,
        href : "Fantasy",
        title : "Фантастика"
    },
    {
        id : 3,
        href : "Horror",
        title : "Жахіття"
    },
    {
        id: 4,
        href : "Romance",
        title : "Романтика"
    },

    {
        id: 5,
        href : "New one",
        title : "New one"
    },

    {
        id: 6,
        href : "Second one",
        title : "Second one"
    }
    
]
  

let search = {
    word: "",
    genreId : null,
    minPrice : 1,
    maxPrice : 9999
};


function getBooks() {

    let res = getAllBooks();
    res = res.filter(book =>book.name.toLowerCase().includes(search.word.toLowerCase()) || book.author.toLowerCase().includes(search.word.toLowerCase()))
    res = res.filter(book => book.price > search.minPrice)

    if (search.genreId){
        res = res.filter(book => book.genreId == search.genreId)
    }

    return res;     
}

function getBookHtmlContent(book) {
    return  `
            <div class="item_box">
                <h3>${book.name}</h3>
                <p>${book.author}</p>
                <a href="/books/details.html?id=${book.id}">
                    <img src="${book.image}">
                 </a>
                <p>Ціна:${book.price}грн</p>
                <button onclick="addToCart('${book.name}', ${book.price})">Додати в кошик</button>
                <p><strong>Опис</strong></p>
                <p>${book.description}</p>
            </div>
    `
}

function getGenreSectionHtmlContent(genre, books) {
    const sectionTop = `
        <section id="${genre.href}">
            <h2>${genre.title}</h2><br><div class="book-container">
    `

    const sectionBottom = `
       </div></section>
    `

    let booksHtml = "";

    
    for(let i = 0; i < books.length; i++){
        booksHtml += getBookHtmlContent(books[i])
    }

    return sectionTop + booksHtml + sectionBottom;
}

function insertBooks(booksToShow) {
    
    const el = document.getElementById("books-content")

    if (el) {
        let allHtml = ""

        for(let i = 0; i < genres.length; i++){
            const genre = genres[i];
    
            if (search.genreId != null && search.genreId != genre.id){
                continue;
            }

            const sectionsBooks = booksToShow.filter(book => book.genreId == genre.id);
            allHtml += getGenreSectionHtmlContent(genre, sectionsBooks);
            
            //allHtml += getGenreSectionHtmlContent(genre, []);
        }
    
        el.innerHTML = allHtml
    }
}

function getNavLink(href, title) {
    return `<a href="${href}">${title}</a>`;
}

function insertNavigation() {
    const el =document.getElementById("nav");
    
    if (el){
        let allHtml = "";

        for(let i = 0; i < genres.length; i++){
            let genre = genres[i];

            allHtml += getNavLink("#" + genre.href, genre.title);
        }

         el.innerHTML = allHtml;
    }
    
}

function onSearchTextChanged(event) {
    const inputEl = event.target;
    searchWord = inputEl.value;

    search.word = searchWord;

    insertBooks(getBooks());
}

// function onGenreSelected(e){
//     const selectEl = e.target;
//     searchGenre = selectEl.href;

//     search.genres = searchGenre;

//     insertBooks(getBooks());
// }

function initSearch() {
    const inputText = document.getElementById("searchInput");
    inputText.addEventListener("input", onSearchTextChanged);

}



insertBooks(getBooks());
insertNavigation();
initSearch();