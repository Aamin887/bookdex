// get input fields elements
const title = document.getElementById('title')
const author = document.getElementById('author')
const releaseDate = document.getElementById('release-date')
const genre = document.getElementById('genre')
const rating = document.getElementById('rating')

// print data to the page
function renderInterface(){
        //get data from sotrage
        let storedData = getBook()

        // console.log(storedData)
        // loop the data in storage
        storedData.forEach((book) =>{
            // pass the book object to the display
            displayBook(book)
        })

        // show a notification when finishes loading
        showAlert('Welcome to Books Rec!! Fill all fields to add a book', 'success')
    }

// function to row the table from book object
function displayBook(bookCreated){
    // element to hold table row
    const booksContainer = document.getElementById('book-list')
    // create table row element
    const row  = document.createElement('tr')
    // add class "row"
    row.classList.add('row')
    // using string literal add table data element to row element
    row.innerHTML = `
    <td id='title' class="values title">${bookCreated.title}</td>
    <td class="values author">${bookCreated.author}</td>
    <td class="values release-date">${bookCreated.releaseDate}</td>
    <td class="values genre">${bookCreated.genre}</td>
    <td class="values rating">${bookCreated.rating}</td>
    <td class='bn'> <a href="#" class="edit btn btn-edit">edit</a></td>
    <td class='bn'><a href="#" class="delete btn btn-danger">X</a></td>
    `
    // append row element to element that all hold all table row 
    booksContainer.appendChild(row)
}

// create book object
function createBook(title,author, releaseDate, genre, rating){
        let book = {
            title: title,
            author: author,
            releaseDate: releaseDate,
            genre: genre,
            rating: rating
            
        }

        return book
}

// clear all fields
function clearFields(){
    // remove value for all input fields in 3ms
    setTimeout(()=>{
    const title = document.getElementById('title').value = ''
    const author = document.getElementById('author').value = ''
    const releaseDate = document.getElementById('release-date').value = ''
    const genre = document.getElementById('genre').value = ''
    const rating = document.getElementById('rating').value = ''
},300)
}

// store books
function storeBook(book){
    //get all all book objects from storage 
    let books = getBook()
    // push new book add to the books retrieved
    books.push(book)
    // update the storage with new book list
    sessionStorage.setItem('books', JSON.stringify(books))
}

// get book
function getBook(){
    //variable to hold books
    let books
    // if the storage is not initialised yet 
    if(sessionStorage.getItem('books') === null){
        //set variable to empty array
        books = []
    }else{
        // set variable to data in storage
        books = JSON.parse(sessionStorage.getItem('books'))
    }
    // return variable
    return books
}


// delete function
function deleteBook(parentEl){
    // get title of row been clicked
    let bookTitle = parentEl.querySelector('td#title').textContent
    // remove element
    parentEl.remove()
    // retrive data from storage
    let booksInstorage = getBook()
    // JSON.parse(sessionStorage.getItem('books'))

    // loop data from storage
    booksInstorage.forEach((book, idx) =>{
        // if title of row click matched
        if(book.title == bookTitle){
            // remove book data from the array
            booksInstorage.splice(idx,1)
        }
    })
    // update sotrage with new list of books data
    sessionStorage.setItem('books',JSON.stringify(booksInstorage))
}


// edit function
function editBooks(parentEl){
    // select all td element with class values
    const rowData = parentEl.querySelectorAll('td.values')
    rowData.forEach(data => {
        //make the td element for row editiable
        data.setAttribute('contenteditable', true)
    })
}
// unedit function
function uneditBooks(parentEl){
    // select all td element with class values
    const rowData = parentEl.querySelectorAll('td.values')
    rowData.forEach(data => {
        //make the td element for row editiable
        data.setAttribute('contenteditable', false)
    })
}

// alert functions
function showAlert(message, alertType){
    // get the header of the page
    const header = document.querySelector('main')
    // get the body of the page
    const body = document.querySelector('body')
    // get the header of the page
    const msg = document.createElement('p')

    // add a div element to the element created using string literal template
    msg.innerHTML = 
    `
    <div class="alert ${alertType}">
        <p> ${message}</p>
    </div>
    `
    // append new created element after the header elelement
    body.insertBefore(msg, header)

    // remove the element aftet 2s
    setTimeout(()=>{
        msg.remove()
    }, 2000)
}   


// display all books in storage when html finish loading
document.addEventListener('DOMContentLoaded', renderInterface)


// when there is submit on form
document.getElementById('book-form').addEventListener('submit',(evt)=>{
    // stop the default behaviour of form submits
    evt.preventDefault()

    // get all value of inputs fields
    const title = document.getElementById('title').value 
    const author = document.getElementById('author').value 
    const releaseDate = document.getElementById('release-date').value 
    const genre = document.getElementById('genre').value 
    const rating = document.getElementById('rating').value 
    
    //check if all input fields are empty
    if(title == '' || author == '' || releaseDate == '' || genre == '' || rating ==''){
        showAlert('Make sure all fields are filled!!!','danger')
    }else{
        // if input fields have pass them to the createBook function
        let book = createBook(title,author, releaseDate, genre, rating)
        //pass book object to display function
        displayBook(book);
        //pass book object to storeBook function to store in storage
        storeBook(book)
        // call clearFields function
        clearFields()
        // show alert
        showAlert('Books added!!!', 'success')
    }
})

// clear the all books from storage
document.getElementById('btn-clear').addEventListener('click', function(){
    // clearsession storage
    sessionStorage.clear()
    // reload the whole page
    location.reload()

})



// handle delete and edit event

// add click event to the table body 
document.getElementById('book-list').addEventListener('click', (e)=>{
    // if area contains a class of delete
    if(e.target.classList.contains('delete')){
        // get parent element of the element click on
        let parentEl = e.target.parentElement.parentElement
        deleteBook(parentEl)
        // if area contains a class of btn-edit
    }else if(e.target.classList.contains('btn-edit')){
        // change text to done
        e.target.innerText ='done'
        // add class of btn-done to element clicked on 
        e.target.classList.add('btn-done')
        // remove class of btn-edit to element clicked on 
        e.target.classList.remove('btn-edit')
        
        // get parent element of the element click on
        let parentEl = e.target.parentElement.parentElement
        // call editBooks function, pass parent to as argument
        editBooks(parentEl)
        
        // if area contains a class of btn-done
    }else if(e.target.classList.contains('btn-done')){
        // get element clicked on
        const el = e.target
        
        // change text to edit
        el.innerText = 'edit'
        // add class of btn-edit to element
        el.classList.add('btn-edit')
        
        // call function to update book edit
        updateBook(el)
    }   
})

// function to update book rows after edit
function updateBook(el){
    //get the table body element
    const parentEls = el.parentElement.parentElement.parentElement
    //get array from sessoin storage
    const booksInstorage = getBook()

    //get all table row
    let allRow = parentEls.querySelectorAll('tr.row')
    //loop all table row
    allRow.forEach((row, idx) =>{
        // immediately call function here
        (function(){
            //update text from the UI
            const title = row.querySelector('.title').textContent
            const author = row.querySelector('.author').textContent
            const releaseDate = row.querySelector('.release-date').textContent
            const genre = row.querySelector('.genre').textContent
            const rating = row.querySelector('.rating').textContent

            // create a book object with createBook function
            const newDetails = createBook(title, author, releaseDate, genre, rating)
            // replace book in old array using splice
            booksInstorage.splice(idx,1,newDetails)
            // update array in storage
            sessionStorage.setItem('books', JSON.stringify(booksInstorage))
    })()
    // call unedited function to remove edit
    uneditBooks(row)
})
// show an alert 
showAlert('Book updated', 'success')
}

