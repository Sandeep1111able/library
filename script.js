const btnAddBook = document.querySelector('.btn-newbook');
const modalContainer = document.querySelector('.modal-container');
const exit = document.querySelector('h2');
const btnSubmit = document.querySelector('.btn-submit');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const readStatus = document.querySelector('#read-status');
const error = document.querySelector('span');
const bookContainer = document.querySelector('.book-container');


btnAddBook.addEventListener('click', function() {
    modalContainer.classList.add('show');
});

exit.addEventListener('click', function() {
    modalContainer.classList.remove('show');
    error.classList.remove('span-active');
    clear();
});


function clear() {
    title.value = "";
    author.value = "";
    pages.value = "";
    readStatus.value = "";
}


let library = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pages, readStatus) {

    return library.push(new Book(title.value, author.value, pages.value, readStatus.value));

}


function displayBook(library) {
    library.forEach((books) => {

        const div = document.createElement('div');
        const titleShow = document.createElement('h2');
        const authorShow = document.createElement('h2');
        const pagesShow = document.createElement('h2');
        const toggleButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        div.classList.add('book-card');
        titleShow.innerHTML = books.title;
        authorShow.innerHTML = books.author;
        pagesShow.innerHTML = books.pages;
        toggleButton.innerHTML = books.readStatus;
        deleteButton.innerHTML = "Delete";
        bookContainer.appendChild(div);
        div.append(titleShow, authorShow, pagesShow, toggleButton, deleteButton);
        toggleButton.addEventListener('click', function() {
            if (toggleButton.textContent === "Read") {
                toggleButton.textContent = "Not Read";
            } else {
                toggleButton.textContent = "Read";
            }
        });
        deleteButton.addEventListener('click', function() {
            bookContainer.removeChild(div);
        });

    })


}

btnSubmit.addEventListener('click', function() {

    if (title.value === '' || author.value === '' || pages.value === '' || readStatus === '' || typeof(+pages) !== 'number') {
        error.classList.add('span-active');
    } else {
        error.classList.remove('span-active');
        while (bookContainer.hasChildNodes()) {
            bookContainer.removeChild(bookContainer.lastChild);
        }
        addBookToLibrary(title, author, pages, readStatus);
        modalContainer.classList.remove('show');
        displayBook(library);
        clear();

    }



});