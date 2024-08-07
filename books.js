import { getBooks as getAllBooks } from "./public/js/bookService.js";

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
    //     id: 5,
    //     href : "New one",
    //     title : "New one"
    // },

    // {
    //     id: 6,
    //     href : "Second one",
    //     title : "Second one"
    // }
    
]
  

let search = {
    word: "",
    genreId : searchGenre.value,
    minPrice : 0,
    maxPrice : 99999
};


function getBooks() {

    let res = getAllBooks();
    res = res.filter(book =>book.name.toLowerCase().includes(search.word.toLowerCase()) || book.author.toLowerCase().includes(search.word.toLowerCase()))
    
    console.log(search.minPrice, search.maxPrice)
    res = res.filter(book => book.price > search.minPrice)
    res = res.filter(book => book.price < search.maxPrice)

    // if (search.minPrice = []){
    //     search.minPrice = 1;
    // }

    // if (search.maxPrice = []){
    //     search.maxPrice = 9999;
    // }

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

function getSearchGenre(genre) {
    return `
        <option value="${genre.id}">${genre.title}</option>
    `
}

function getSelectSearchGenre() {
  
    let searchGenre = "";

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