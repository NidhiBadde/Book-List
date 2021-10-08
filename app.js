// Book Constructor

function Book(title, author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constrctor

function UI(){

}

UI.prototype.addBooktoList = function(book){
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
console.log(row);

}

//Clear Fields

UI.prototype.clearFields = function(){

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}


//Creating function in prototype to show alert

UI.prototype.showAlert = function(message, className){

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

//Adding fucntion to UI prototype to remove book

UI.prototype.deleteBook = function(target){

    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

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

    ui.showAlert('Book deleted', 'success');
    e.preventDefault();
});