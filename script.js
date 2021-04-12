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

// Open new book form
formBtn.onclick = function () {
    modalForm.style.display = "block"
}

// Close new book form
cancelAddForm.onclick = function () {
    document.querySelector(".form").reset()
    modalForm.style.display = "none"
}

addBookBtn.addEventListener("click", addBookToLibrary)


// *****Constructors*****

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    pages ? this.pages = `${pages} Pages` : this.pages = "0 Pages"
    read ? this.read = "Read" : this.read = "Wish to Read"
}

// Function changes "Read" status
Book.prototype.toogleReadStatus = function(currStatus, index) {
    if(currStatus == "Read") {
        myLibrary[index].read = "Wish to Read"
    } else {
        myLibrary[index].read = "Read"
    }
    displayLibrary(myLibrary)
}



// *****Functions******

function addBookToLibrary() {
    const previousLibrary = myLibrary.length
    const book = new Book(bookName.value, bookAuthor.value, bookPages.value, bookStatus.value)

    if (bookName.value == "" || bookAuthor.value == "") {
        errMsg.innerHTML = "Book name and author has to be filled"
        return false;
    }

    myLibrary.push(book)
    document.querySelector(".form").reset()
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
        button.onclick = function(e) {
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
            if (myLibrary.length < prevLibrary) {
                displayLibrary(myLibrary)
            }
        }
    })
}


displayLibrary(myLibrary);

window.onclick = function(e) {
    if(e.target == modalForm) {
        modalForm.style.display = "none"
    }
}



