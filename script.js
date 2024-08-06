const myLibrary = [];

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return(title + " by " + author + ", " + pages + " pages, " + read);
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function displayBooks(){
    const bookHolder = document.querySelector('#bookHolder');

    for(let i=0; i<myLibrary.length;i++){
        const bookRow = document.createElement('div');
        bookRow.classList.add('row');
        bookRow.setAttribute('data', i);

        const book = document.createElement('p');
        book.textContent = myLibrary[i].info();
        book.setAttribute('data-index-number', i);

        const removeButton = document.createElement('button');
        removeButton.textContent = "remove";
        removeButton.classList.add('remove');
        removeButton.setAttribute('data-index-number', i);

        const readButton = document.createElement('button');
        readButton.textContent = "read";
        readButton.classList.add('read');
        readButton.setAttribute('data-index-number', i);

        bookRow.appendChild(book);
        bookRow.appendChild(removeButton);
        bookRow.appendChild(readButton);
        bookHolder.appendChild(bookRow);
    }

    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(rb => {
        rb.addEventListener('click', ()=>{
            if(myLibrary.length > 1){
                myLibrary.splice(rb.dataset.indexNumber,1);
            } else {
                myLibrary.pop();
            }
            bookHolder.removeChild(rb.parentNode);
        });
    });
    bookHolder.setAttribute('style','display:block');

    const readButtons = document.querySelectorAll('.read');
    readButtons.forEach(readButton =>{
        readButton.addEventListener('click',()=>{
            myLibrary[readButton.dataset.indexNumber].read = 'read';
            readButton.previousSibling.previousSibling.textContent = myLibrary[readButton.dataset.indexNumber].info();
        });
    });
}


const bookButton = document.querySelector('#addNewBook');
const form = document.querySelector('form');
const submitButton = document.querySelector('#submitButton');

bookButton.addEventListener('click', ()=>{
    form.setAttribute('style', 'display: block');
});

submitButton.addEventListener('click',()=>{
    const bookHolder = document.querySelector('#bookHolder');
    for(let i = 0; i < myLibrary.length; i++){
        bookHolder.removeChild(bookHolder.lastElementChild);
    }

    form.setAttribute('style','display: none');
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;
    const newBook = new Book(title,author,pages,read);
    addBookToLibrary(newBook);
    displayBooks();
    event.preventDefault();
});


