let myLibrary = [];

// ****Selectors*****
const formBtn = document.querySelector(".formBtn")
const modalForm = document.querySelector(".modal")
const addBookBtn = document.querySelector(".add-btn")
const cancelAddForm = document.querySelector(".cancel-btn")
const errMsg = document.querySelector(".err-msg")
const bookContainer = document.querySelector(".library-wrapper")
let bookName = document.getElementById("book-name")
let bookAuthor = document.getElementById("book-author")
let bookPages = document.getElementById("book-pages")
const bookStatus = document.getElementById("book-status")

// ****Event listeners****

// Load book cards from localStorage
document.addEventListener("DOMContentLoaded", getBooks)

// Open new book form
formBtn.onclick = function () {
    modalForm.style.display = "block"
}

// Close new book form
cancelAddForm.addEventListener("click", closeForm)

addBookBtn.addEventListener("click", addBookToLibrary)


// *****Constructors*****

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    pages ? this.pages = `${pages} Pages` : this.pages = "0 Pages"
    read ? this.read = "Read" : this.read = "Wish to Read"
}

// Function changes "Read" status
Book.prototype.toogleReadStatus = function (currStatus, index) {
    if (currStatus == "Read") {
        myLibrary[index].read = "Wish to Read"
    } else {
        myLibrary[index].read = "Read"
    }
    displayLibrary(myLibrary)
}



// *****Functions******

function addBookToLibrary() {
    const previousLibrary = myLibrary.length
    const book = new Book(bookName.value, bookAuthor.value, bookPages.value, bookStatus.checked)

    if (bookName.value == "" || bookAuthor.value == "") {
        errMsg.innerHTML = "Book name and author has to be filled"
        return false;
    }

    myLibrary.push(book)
    saveToLocalStorage(book)
    closeForm()

    // Update displayed book cards after new book is added
    if (myLibrary.length > previousLibrary) {
        displayLibrary(myLibrary)
    }

}

function displayLibrary(arr) {
    bookContainer.innerHTML = ""
    arr.forEach((item, index) => {
        // Create div for each book
        book = document.createElement("div")
        book.classList.add("book-card")
        book.setAttribute('data-index', `${index}`);
        bookContainer.appendChild(book)
        // Iterate through each book object, add book obj contents to book card div
        Object.keys(item).forEach(key => {
            content = document.createElement("div")
            content.classList.add(`${key}`)
            content.innerHTML = `${item[key]}`
            book.appendChild(content)
        })
        // Create status change button
        statusBtn = document.createElement("button")
        statusBtn.classList.add("statusBtn")
        statusBtn.innerHTML = "Change Status"
        book.appendChild(statusBtn)
        // Create delete button
        deleteBook = document.createElement("button")
        deleteBook.classList.add("deleteBtn")
        deleteBook.innerHTML = "Delete Book"
        book.appendChild(deleteBook)
    })

    const changeStatusBtn = document.querySelectorAll(".statusBtn")
    changeStatusBtn.forEach((button) => {
        button.onclick = function (e) {
            let currentStatus = e.target.previousSibling.innerHTML
            let indexToChange = e.target.parentElement.attributes["data-index"].value
            myLibrary[indexToChange].toogleReadStatus(currentStatus, indexToChange)
        }
    })

    const deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((button) => {
        button.onclick = function (e) {
            const itemToDelete = e.target.parentElement.attributes["data-index"].value
            const prevLibrary = myLibrary.length
            myLibrary.splice(itemToDelete, 1)
            removeLocalBook(itemToDelete)
            if (myLibrary.length < prevLibrary) {
                displayLibrary(myLibrary)
            }
        }
    })
}

function closeForm() {
    document.querySelector(".form").reset()
    modalForm.style.display = "none"
}

function saveToLocalStorage(book) {
    // Check if book already exist
    let books;
    if (localStorage.getItem("books") === null) {
        books = []
    } else {
        books = JSON.parse(localStorage.getItem("books"))
    }

    books.push(book)
    localStorage.setItem("books", JSON.stringify(books))
}

function getBooks() {
    // Check if book already exist
    let books;
    if (localStorage.getItem("books") === null) {
        books = []
    } else {
        books = JSON.parse(localStorage.getItem("books"))
    }

    books.forEach(function (book) {
        const existingBook = new Book(book.title, book.author, book.pages, book.read)

        myLibrary.push(existingBook)
        displayLibrary(myLibrary)
    })
}

function removeLocalBook(book) {
    // Check if book already exist
    let books;
    if (localStorage.getItem("books") === null) {
        books = []
    } else {
        books = JSON.parse(localStorage.getItem("books"))
    }

    books.splice(book, 1)
    localStorage.setItem("books", JSON.stringify(books))
}


// Close modal when user clicks outside form
window.onclick = function (e) {
    if (e.target == modalForm) {
        closeForm()
    }
}
