const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read-status");
const submit = document.querySelector(".submit");
const cancel = document.querySelector(".cancel");
const addBook = document.querySelector(".btn-add");
const modalContainer = document.querySelector(".modal-container");
const form = document.querySelector("form");
const library = document.querySelector(".book-collection");

let mylibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  if (this.read === "Read") {
    return (this.read = "Not Read");
  } else {
    return (this.read = "Read");
  }
};

function addBookToLibrary() {
  populateLibrary();
  const btnDelete = document.querySelectorAll(".delete");
  btnDelete.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = +e.target.parentNode.dataset.card;
      mylibrary.splice(index, 1);
      addBookToLibrary();
    });
  });
}

addBook.addEventListener("click", () => {
  modalContainer.classList.add("show");
});

cancel.addEventListener("click", (e) => {
  modalContainer.classList.remove("show");
  e.preventDefault();
});

submit.addEventListener("click", (e) => {
  if (form.checkValidity()) {
    e.preventDefault();
    newEntry();
    addBookToLibrary();
    resetForm();
  }
});

function newEntry() {
  const newEntry = new Book(
    title.value,
    author.value,
    pages.value,
    read.options[read.selectedIndex].text
  );
  mylibrary.push(newEntry);
}

function resetForm() {
  title.value = "";
  author.value = "";
  pages.value = "";
  modalContainer.classList.remove("show");
}

function populateLibrary() {
  library.innerHTML = "";
  mylibrary.forEach((book, index) => {
    const div = document.createElement("div");
    const cardTitle = document.createElement("p");
    const cardAuthor = document.createElement("p");
    const cardPages = document.createElement("p");
    const cardRead = document.createElement("p");
    const btnUpdate = document.createElement("button");
    const btnDelete = document.createElement("button");

    div.classList.add("card");
    div.dataset.card = index;
    cardTitle.textContent = `Title: ${book.title}`;
    cardAuthor.textContent = `Author: ${book.author}`;
    cardPages.textContent = `Pages: ${book.pages}`;
    cardRead.textContent = `Read Status: ${book.read}`;
    btnUpdate.textContent = "Update";
    btnDelete.textContent = "Delete";
    btnUpdate.classList.add("btn", "update");
    btnDelete.classList.add("btn", "delete");
    btnUpdate.addEventListener("click", () => {
      cardRead.textContent = `Read Status: ${book.toggleRead()}`;
    });
    div.append(
      cardTitle,
      cardAuthor,
      cardPages,
      cardRead,
      btnUpdate,
      btnDelete
    );
    library.append(div);
  });
}
