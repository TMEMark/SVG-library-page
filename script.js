// Div switch functions

function switchOnInfo () {
  if (document.getElementById('upis').style.display='none') {
    document.getElementById('booklist').style.display='grid';
    document.getElementById('upis_butt').style.opacity = 0.7;
    document.getElementById('info_butt').style.opacity = 1;
  } 
}

function switchOnUpis () {
  if (document.getElementById('upis').style.display='grid') {
    document.getElementById('booklist').style.display='none';
    document.getElementById('upis_butt').style.opacity = 1;
    document.getElementById('info_butt').style.opacity = 0.7;
  }
}

//CRUD function	
// Book Class
class book {
  constructor(aut_ime, aut_prezime,
  knj_naziv, knj_nakladnik, knj_god_izd, knj_mj_izd, knj_udk) {
      this.aut_ime = aut_ime;
      this.aut_prezime = aut_prezime;
      this.knj_naziv = knj_naziv;
      this.knj_nakladnik = knj_nakladnik;
      this.knj_god_izd = knj_god_izd;
      this.knj_mj_izd = knj_mj_izd;
      this.knj_udk = knj_udk;
    }
}

// UI class
class UI {
  static displayBooks () {
    const books = store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#tblBooks');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.aut_ime}</td>
    <td>${book.aut_prezime}</td>
    <td>${book.knj_naziv}</td>
    <td>${book.knj_nakladnik}</td>
    <td>${book.knj_god_izd}</td>
    <td>${book.knj_mj_izd}</td>
    <td>${book.knj_udk}</td>
    <td><a href="#" class="upd_btn">U</a></td>
    <td><a href="#" class="del_btn">X</a></td>
    `;
    
    list.appendChild(row);
  }

  static deleteBook(el) {
    if(el.classList.contains('del_btn')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#form_upis');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.getElementById('aut_ime').value = '';
    document.getElementById('aut_prezime').value = '';
    document.getElementById('knj_naziv').value = '';
    document.getElementById('knj_nakladnik').value = '';
    document.getElementById('knj_god_izd').value = '';
    document.getElementById('knj_mj_izd').value = '';
    document.getElementById('knj_udk').value = '';
  }
}

//Store class
class store {
 static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = []
    }
    else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books))
  }
  
  static removeBook(knj_naziv) {
    const books = store.getBooks();
    
    books.forEach((book, index) => {
      if(book.knj_naziv === knj_naziv) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books))
  }
}

//Event display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event add a book
document.querySelector('#form_upis').addEventListener('submit', (e) => {
  //Prevent default submit
  e.preventDefault();

  //Get form values
  const aut_ime = document.getElementById('aut_ime').value;
  const aut_prezime = document.getElementById('aut_prezime').value;
  const knj_naziv = document.getElementById('knj_naziv').value;
  const knj_nakladnik = document.getElementById('knj_nakladnik').value;
  const knj_god_izd = document.getElementById('knj_god_izd').value;
  const knj_mj_izd = document.getElementById('knj_mj_izd').value;
  const knj_udk = document.getElementById('knj_udk').value;

  //Validate

  if(aut_ime === '' || aut_prezime === '' || knj_naziv === '' || knj_nakladnik === '' 
  || knj_god_izd === '' || knj_mj_izd === '' || knj_udk === '') {
    document.getElementById("neUpisan").beginElement();
    document.getElementById("neUpisanText").beginElement();
    document.getElementById("neUpisanLinija").beginElement();
    document.getElementById("neUpisanPath").beginElement();
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    $("#alertSave").show();
    setTimeout(function() { $("#alertSave").hide(); }, 5000);    
    document.getElementById("upisan").beginElement();
    document.getElementById("upisanText").beginElement();
    document.getElementById("upisanLinija").beginElement();
    document.getElementById("upisanPath").beginElement();

  // Instatiate book
  const bookIn = new book(aut_ime, aut_prezime, 
  knj_naziv, knj_nakladnik, knj_god_izd, knj_mj_izd, knj_udk);
    
  //Add book to list
      UI.addBookToList(bookIn);

  //Add book to storage
  store.addBook(bookIn)

  //Clear input fields
      UI.clearFields();
}});

//Event: Update a Book


// Event: Remove a Book
document.querySelector('#tblBooks').addEventListener('click', (e) => {
  //Remove book from UI
  UI.deleteBook(e.target);

  //Remove book from storage
  store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
  
});


// Animation on hoover

$("#polica6, #knjige_6, #UDK6_sjena, #komp").hover(function(){
  $('#ekran').css('fill', 'black')
},function(){
  $('#ekran').css('fill', '#C4C4C4')
})

$("#polica5, #knjige_5, #UDK5_sjena").hover(function(){
  $('#matematika').css('fill', 'black')
},function(){
  $('#matematika').css('fill', '#46A9A3')
})

$("#polica2, #knjige_2, #UDK2_sjena").hover(function(){
  $('#uspravni_kriz').css('fill', '#E9F638', 'opacity', '1')
  $('#vodoravni_kriz').css('fill', '#E9F638','opacity', '1')
},function(){
  $('#uspravni_kriz').css('fill', '#E9DB53', 'opacity', '0.7')
  $('#vodoravni_kriz').css('fill', '#E9DB53','opacity', '0.7')
})


