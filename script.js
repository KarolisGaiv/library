let myLibrary = [
    {
        name: "Hobbit",
        author: "Tolken",
        pages: 295,
        read: false
    },
    {
        name: "Angels and Demons",
        author: "Dan Brown",
        pages: 300,
        read: true
    }
];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}


function addBookToLibrary() {
    const book = new Book(bookName.value, bookAuthor.value, bookPages.value, bookStatus.value)

    if (bookName.value == "" || bookAuthor.value == "") {
        errMsg.innerHTML = "Please enter something"
        return false;
    }

    myLibrary.push(book)
    document.querySelector(".form").reset()
}

let bookName = document.getElementById("book-name")
let bookAuthor = document.getElementById("book-author")
let bookPages = document.getElementById("book-pages")
let bookStatus = document.getElementById("book-status")
const addBtn = document.querySelector(".add-btn")
const errMsg = document.querySelector(".err-msg")



addBtn.addEventListener("click", addBookToLibrary)
















const cardName = document.querySelector(".book-name")
const cardAuthor = document.querySelector(".book-author")
const cardPages = document.querySelector(".book-pages")
const cardStatus = document.querySelector(".book-status")
