// Constructors in ES5 will be classes here

class Book{
constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
}

class UI{

//Adding all the functions 

addBooktoList(book){

const list = document.getElementById('book-list');

//create tr element and append

const row = document.createElement('tr');

row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href ="#" class= "delete">X<a></td>
`;

list.appendChild(row);
}

showAlert(message, className){

    const div =  document.createElement('div');
   
   //Add classname
    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(message));

    const parent = document.querySelector('.container');

    const form = document.querySelector('#book-form');

    parent.insertBefore(div, form);

    //Remove after 3 sec

    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000);
}

deleteBook(target){

    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

clearFields(){

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

}


//Adding book to local storag
class Store{
    static getbook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addbook(book){

        const books =  Store.getbook();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static displaybooks(){
        const books =  Store.getbook();

        books.forEach(function(book){
            const ui = new UI;

            //Add book from local storage to UI
            ui.addBooktoList(book);

        });

    }

    static removerbook(isbn){

        const books = Store.getbook();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displaybooks());

//Even Listeners for add book

document.getElementById('book-form').addEventListener('submit',
function(e){
    
    const title1 = document.getElementById('title').value,
        author1 = document.getElementById('author').value,
        isbn1 = document.getElementById('isbn').value;

        


//Create a book instance
const book = new Book(title1,author1,isbn1);


//Create UI instance
const ui = new UI();

//Validations

if(title1 === '' || author1 === '' || isbn1 === ''){

    //UI alert

    ui.showAlert('Please fill in each field', 'error');

}else{

    //Add book to list
ui.addBooktoList(book);

// add book to local storage
Store.addbook(book);

//Clear fields
ui.clearFields();

ui.showAlert('Great Job.. Book Added', 'success');

}



        
    e.preventDefault();
});


//Event Listerner to delete book
document.getElementById('book-list').addEventListener('click', 
function(e){

    const ui = new UI();

    ui.deleteBook(e.target);

    //Remove book from localstorage
    Store.removerbook(e.target.parentElement.previousElementSibling.textContent);
    

    ui.showAlert('Book deleted', 'success');
    e.preventDefault();
});