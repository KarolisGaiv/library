// ****Selectors*****

let bookName = document.getElementById("book-name")
let bookAuthor = document.getElementById("book-author")
let bookPages = document.getElementById("book-pages")
let bookStatus = document.getElementById("book-status")
const addBtn = document.querySelector(".add-btn")
const errMsg = document.querySelector(".err-msg")
const bookContainer = document.querySelector(".library-wrapper")

// ****Event listeners****
addBtn.addEventListener("click", addBookToLibrary)

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

// Constructors

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// *****Functions******

function addBookToLibrary() {
    const book = new Book(bookName.value, bookAuthor.value, bookPages.value, bookStatus.value)

    if (bookName.value == "" || bookAuthor.value == "") {
        errMsg.innerHTML = "Please enter something"
        return false;
    }

    myLibrary.push(book)
    document.querySelector(".form").reset()
}

function displayLibrary() {
    myLibrary.forEach((item) => {
        // Create div for each book
        book = document.createElement("div")
        book.classList.add("book-card")
        bookContainer.appendChild(book)
        // Iterate through each book object, add book obj contents to book card div
        Object.keys(item).forEach(key => {
            content = document.createElement("div")
            content.classList.add(`${key}`)
            content.innerHTML = `${item[key]}`
            book.appendChild(content)
        })
    })
}

displayLibrary();



