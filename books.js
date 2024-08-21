import bookService from "./public/js/services/bookService.js";
import cartService from "./public/js/services/cartService.js";

let burgers = document.querySelectorAll('.burger');
let burgerMenus = document.querySelectorAll('.burger-menu');
burgers.forEach(burger => burger.addEventListener('click', function(){
    burgers.forEach(burger => burger.classList.toggle('active'));
    
    for(let i = 0; i < burgerMenus.length; i++){
        const bm = burgerMenus[i];
        bm.classList.toggle('active');
    }
}));

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
    // {
    //     id: 6,
    //     href : "New one",
    //     title : "New one"
    // },

    // {
    //     id: 7,
    //     href : "Second one",
    //     title : "Second one"
    // }
    
]
  

let search = {
    word: "",
    //searchGenre.value
    genreId : null,
    minPrice : 0,
    maxPrice : 99999
};



function getBooks() {

    let res = bookService.getBooks();
    res = res.filter(book =>book.name.toLowerCase().includes(search.word.toLowerCase()) || book.author.toLowerCase().includes(search.word.toLowerCase()))
    
    console.log(search.minPrice, search.maxPrice)
    res = res.filter(book => book.price > search.minPrice)
    res = res.filter(book => book.price < search.maxPrice)

    if (search.genreId && search.genreId >= 0){
        res = res.filter(book => book.genreId == search.genreId)
    }

    console.log("Books ",res)
    return res;     
}

function getBookHtmlContentNew(book) {
    return  `   
        <button class="book" onclick="window.location.href='/books/details.html?id=${book.id}'">
            <div class="item_box">
            <h3>${book.name}</h3>
            <p>${book.author}</p>
            <img src="${book.image}">
            <p>Ціна:${book.price}грн</p>
            </div>
        </button>
        <button class="addToCart" data-book-id="${book.id}">Додати в кошик</button>
    `
}

function getBookHtmlContent(book) {
    const shortDescription = book.description.substr(0, 150)+"..."

    return  `
        <a class="book-wrapper" href="/books/details.html?id=${book.id}">
            <div class="item_box">
                <h3>${book.name}</h3>
                <p>${book.author}</p>
                
                    <img src="${book.image}">
                
                <p>Ціна:${book.price}грн</p>
                <button class="addToCart" data-book-id="${book.id}">Додати в кошик</button>
                <p><strong>Опис</strong></p>
                <p>${shortDescription}</p>
            </div>
        </a>
    `
}


function getSearchGenre(genre) {
    return `
        <option value="${genre.id}">${genre.title}</option>
    `
}

function getSelectSearchGenre() {
  
    let searchGenre = "<option value=-1>Всі жанри</option>";


    for(let i = 0; i < genres.length; i++){
        searchGenre += getSearchGenre(genres[i])
    }


    return searchGenre;
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
    
            if (search.genreId && search.genreId >= 0 && search.genreId != genre.id){
                continue;
            }

            const sectionsBooks = booksToShow.filter(book => book.genreId == genre.id);
            allHtml += getGenreSectionHtmlContent(genre, sectionsBooks);
            
            //allHtml += getGenreSectionHtmlContent(genre, []);
        }
    
        el.innerHTML = allHtml

        const buttons = document.querySelectorAll("button.addToCart");
        buttons.forEach(button =>
            button.addEventListener('click', onAddToCart)
        )
    }
}

function onAddToCart(event) {
    const button = event.target
    const bookId = button.getAttribute("data-book-id");
    
    event.preventDefault();

    cartService.addToCart(bookId)
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
    search.word = inputEl.value;

    insertBooks(getBooks());
}

function onInputMaxPrice(eve){

    search.maxPrice = eve.target.value;

    insertBooks(getBooks());
}

function onInputMinPrice(ev){

    console.log("test min price:", ev.target.value);
    search.minPrice = ev.target.value;

    insertBooks(getBooks());
}

function onGenreSelected(e){
    // const selectEl = e.target;
    // searchGenre = selectEl.href;

    search.genreId = e.target.value;

    insertBooks(getBooks());

    const burger = document.querySelector('.burger');
    burger.click();
}

function insertGenresFilter() {
    const selectEl = document.getElementById("searchGenre")

    const selectHtml = getSelectSearchGenre()

    selectEl.innerHTML = selectHtml;
}

function initSearch() {
    const inputText = document.getElementById("searchInput");
    inputText.addEventListener("input", onSearchTextChanged);

    const selectGenre = document.getElementById("searchGenre");
    selectGenre.addEventListener("change", onGenreSelected);

    const inputMinPrice = document.getElementById("searchMinPrice");
    inputMinPrice.addEventListener("input", onInputMinPrice);

    const inputMaxPrice = document.getElementById("searchMaxPrice");
    inputMaxPrice.addEventListener("input", onInputMaxPrice);
}


insertBooks(getBooks());
insertNavigation();
insertGenresFilter();
initSearch();