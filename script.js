const bookTable = document.getElementById("book-table");
const form = document.getElementById("book-form");

let myLibrary = [];
let libraryIndexNum = 0;

class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;

        this.info = function () {
            return this.title + " " + this.author + ", " + this.pages + " pages, " + (hasRead ? "has been read" : "not read yet");
        };

        this.readToggle = function () {
            this.hasRead = !this.hasRead;
        };
    }
}

function loadBooks() {
    resetTable();
    myLibrary.forEach(addBookToLibrary);
    linkButtons();
}

function addBookToLibrary(book) {
    const newRow = bookTable.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    let button = document.createElement("button");
    button.innerText = "Remove";
    button.className = "table-button";
    button.value = libraryIndexNum;

    let readButton = document.createElement("button");
    readButton.innerText = book.hasRead;
    readButton.className = "table-read-button";
    readButton.value = libraryIndexNum;
    if (book.hasRead) {
        readButton.classList.add("has-read");
    } else {
        readButton.classList.add("has-not-read");
    }
    (book.hasRead ? readButton.classList.add("has-read") : readButton.classList.add("has-not-read"));

    libraryIndexNum++;

    cell1.textContent = book.title;
    cell2.textContent = book.author;
    cell3.textContent = book.pages;
    cell4.append(readButton);
    cell5.append(button);
}

function alternateVisibility() {
    if (form.classList.contains("invisible")) {
        form.classList.remove("invisible");
    } else {
        form.classList.add("invisible");
    }
}

function submitForm() {
    console.log("Added");

    const title = form.titleName.value;
    const author = form.author.value;
    const numOfPages = form.numOfPages.value;

    if (form.hasRead.value.toLowerCase() == "true" || form.hasRead.value.toLowerCase() == "false") {
        const hasRead = (form.hasRead.value === "true");
        document.getElementById("validation-message").classList.add("invisible");
        myLibrary.push(new Book(title, author, numOfPages, hasRead));
        loadBooks();
    } else {
        document.getElementById("validation-message").classList.remove("invisible");
    }
}

function addDeleteListener(button) {
    button.addEventListener('click', () => {
        deleteBook(button.value);
        loadBooks();
    })
}

function addReadListener(button) {
    button.addEventListener('click', () => {
        myLibrary[button.value].readToggle();
        console.log(myLibrary[button.value].info());
        loadBooks();
    })
}

function deleteBook(position) {
    let newLibrary = [];
    for (i=0; i<myLibrary.length; i++) {
        if (i != position) {
            newLibrary.push(myLibrary[i]);
        }
    }
    console.log(newLibrary);
    myLibrary = newLibrary;
}

function resetTable() {
    while(bookTable.rows.length > 1) {
        bookTable.rows[1].remove();
    }
    libraryIndexNum=0;
}

function linkButtons() {
    const tableButtons = document.getElementsByClassName("table-button");
    console.log(tableButtons.length);
    Array.from(tableButtons).forEach(function (button) {
        addDeleteListener(button);
    })

    const readButtons = document.getElementsByClassName("table-read-button")
    Array.from(readButtons).forEach(function (readButton) {
        addReadListener(readButton);
    })
}

const book1 = new Book("The Dark", "John Carthwright", 129, false);
const book2 = new Book("Lord of the Rings", "John Tolkien", 521, false);
const book3 = new Book("Inspector Calls", "J.B. Priestley", 251, true);
const book4 = new Book("Of Mice and Men", "John Steinback", 173, true);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);

window.onload = () => {
    loadBooks();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitForm();
})
