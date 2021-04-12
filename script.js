let myLibrary = [
    {
        name: "Hobbit",
        author: "Tolken",
        pages: `295 Pages`,
        read: false
    },
    {
        name: "Angels and Demons",
        author: "Dan Brown",
        pages: `300 Pages`,
        read: true
    },
    {
        name: "Outliers",
        author: "Malcolm Gladwell",
        pages: `432 Pages`,
        read: true
    }
];

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
let bookStatus = document.getElementById("book-status")

// ****Event listeners****

// Open "Add new book form"
formBtn.onclick = function() {
    modalForm.style.display = "block"
}

// Close "Add new book form"
cancelAddForm.onclick = function() {
    modalForm.style.display = "none"
}




addBookBtn.addEventListener("click", addBookToLibrary)
// cancelAddForm.addEventListener("click", closeForm)

// *****Constructors*****

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages + " Pages"
    read ? this.read = "Read" : this.read = "Not Read"
}

// *****Functions******

function addBookToLibrary() {
    const previousLibrary = myLibrary.length
    const book = new Book(bookName.value, bookAuthor.value, bookPages.value, bookStatus.value)

    if (bookName.value == "" || bookAuthor.value == "") {
        errMsg.innerHTML = "Please enter something"
        return false;
    }

    myLibrary.push(book)
    document.querySelector(".form").reset()
    // Update displayed book cards after new book is added
    if (myLibrary.length > previousLibrary) {
        bookContainer.innerHTML = ""
        displayLibrary(myLibrary)
    }
}

function displayLibrary(arr) {
    arr.forEach((item) => {
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


function displayForm() {
    modalForm.style.display = "block"
}



displayLibrary(myLibrary);



