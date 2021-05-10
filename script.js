let myLibrary = [];

// ****Selectors*****
const formBtn = document.querySelector(".formBtn");
const modalForm = document.querySelector(".modal");
const addBookBtn = document.querySelector(".add-btn");
const cancelAddForm = document.querySelector(".cancel-btn");
const errMsg = document.querySelector(".err-msg");
const bookContainer = document.querySelector(".library-wrapper");
let bookName = document.getElementById("book-name");
let bookAuthor = document.getElementById("book-author");
let bookPages = document.getElementById("book-pages");
let bookStatus = document.getElementById("book-status");

// ****Event listeners****

// Load book cards from localStorage
document.addEventListener("DOMContentLoaded", getBooks);

// Open new book form
formBtn.onclick = function () {
  modalForm.style.display = "block";
};

// Close new book form
cancelAddForm.addEventListener("click", closeForm);

addBookBtn.addEventListener("click", addBookToLibrary);

// *****Constructors*****

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;

    if (read == "Wish to Read") {
      this.read = "Wish to Read";
    } else {
      this.read = "Read";
    }
  }

  toogleReadStatus(currStatus, index) {
    if (currStatus == "Read") {
        myLibrary[index].read = "Wish to Read";
      } else {
        myLibrary[index].read = "Read";
      }
      displayLibrary(myLibrary);
  }
}

// *****Functions******

function addBookToLibrary() {
  const previousLibrary = myLibrary.length;
  let readStatus;

  // Check if customer has checkbox marked when entering new book
  if (bookStatus.checked) {
    readStatus = "Read";
  } else {
    readStatus = "Wish to Read";
  }

  const book = new Book(
    bookName.value,
    bookAuthor.value,
    bookPages.value,
    readStatus
  );

  if (bookName.value == "" || bookAuthor.value == "") {
    return false;
  }

  myLibrary.push(book);
  saveToLocalStorage(book);
  closeForm();

  // Update displayed book cards after new book is added
  if (myLibrary.length > previousLibrary) {
    displayLibrary(myLibrary);
  }
}

function displayLibrary(arr) {
  bookContainer.innerHTML = "";
  arr.forEach((item, index) => {
    // Create div for each book
    book = document.createElement("div");
    book.classList.add("book-card");
    book.setAttribute("data-index", `${index}`);
    bookContainer.appendChild(book);
    // Create book details wrapper
    detailsWrapper = document.createElement("div");
    detailsWrapper.classList.add("detailsWrapper");
    book.appendChild(detailsWrapper);
    // Iterate through each book object, add book obj contents to book card div
    Object.keys(item).forEach((key) => {
      const bookInfo = key[0].toUpperCase() + key.substring(1);
      content = document.createElement("div");
      content.classList.add("book-detail");
      content.innerHTML = `${bookInfo}: `;
      data = document.createElement("span");
      data.classList.add("book-data");
      data.innerHTML = `${item[key]}`;
      content.appendChild(data);
      detailsWrapper.appendChild(content);
    });
    // Create buttons wrapper
    btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btnWrapper");
    book.appendChild(btnWrapper);
    // Create status change button
    statusBtn = document.createElement("button");
    statusBtn.classList.add("statusBtn");
    statusBtn.innerHTML = "Change Status";
    btnWrapper.appendChild(statusBtn);
    // Create delete button
    deleteBook = document.createElement("button");
    deleteBook.classList.add("deleteBtn");
    deleteBook.innerHTML = "Delete Book";
    btnWrapper.appendChild(deleteBook);
  });

  const changeStatusBtn = document.querySelectorAll(".statusBtn");
  changeStatusBtn.forEach((button) => {
    button.onclick = function (e) {
      let currentStatus =
        e.target.parentElement.previousSibling.lastChild.lastChild.innerHTML;
      let indexToChange =
        e.target.parentElement.parentElement.attributes["data-index"].value;
      myLibrary[indexToChange].toogleReadStatus(currentStatus, indexToChange);
      updateLocalStatus(indexToChange);
    };
  });

  const deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((button) => {
    button.onclick = function (e) {
      const itemToDelete =
        e.target.parentElement.parentElement.attributes["data-index"].value;
      const prevLibrary = myLibrary.length;
      myLibrary.splice(itemToDelete, 1);
      removeLocalBook(itemToDelete);
      if (myLibrary.length < prevLibrary) {
        displayLibrary(myLibrary);
      }
    };
  });
}

function closeForm() {
  document.querySelector(".form").reset();
  modalForm.style.display = "none";
}

function saveToLocalStorage(book) {
  // Check if books already exist
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

function getBooks() {
  // Check if books already exist
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  books.forEach(function (book) {
    const existingBook = new Book(
      book.title,
      book.author,
      book.pages,
      book.read
    );

    myLibrary.push(existingBook);
    displayLibrary(myLibrary);
  });
}

function removeLocalBook(book) {
  // Check if books already exist
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  books.splice(book, 1);
  localStorage.setItem("books", JSON.stringify(books));
}

function updateLocalStatus(bookIndex) {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }

  let currentStatus = books[bookIndex].read;
  if (currentStatus == "Read") {
    books[bookIndex].read = "Wish to Read";
  } else {
    books[bookIndex].read = "Read";
  }
  localStorage.setItem("books", JSON.stringify(books));
}

// Close modal when user clicks outside form
window.onclick = function (e) {
  if (e.target == modalForm) {
    closeForm();
  }
};

console.log(localStorage);
