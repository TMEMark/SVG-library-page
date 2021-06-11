// Div switch functions

function switchOnInfo () {
  if (document.getElementById('upis').style.display='none') {
    document.getElementById('info').style.display='grid';
    document.getElementById('upis_butt').style.opacity = 0.7;
    document.getElementById('info_butt').style.opacity = 1;
  } 
};

function switchOnUpis () {
  if (document.getElementById('upis').style.display='grid') {
    document.getElementById('info').style.display='none';
    document.getElementById('upis_butt').style.opacity = 1;
    document.getElementById('info_butt').style.opacity = 0.7;
  }
};

//CRUD function

(function() {
    var lastId = 0;
    var info = document.getElementById('info');
    var btnUnos = document.getElementById('unos_pod');
    var removeIcon;
    var updateIcon;
    var infoList;

    //Added variables for html elements and for events

    function init() {

        if (!!(window.localStorage.getItem('infoList'))) {
          infoList = JSON.parse(window.localStorage.getItem('infoList'));
        } else {
          infoList = [];
        }
        btnUnos.addEventListener('click', saveBook);
        showList();
      }

    //end

    //CRUD

      function showList() {

        if (!!infoList.length) {
          getLastBookId();
          for (var item in infoList) {
            var book = infoList[item];
            addBookToList(book);
          }
          syncEvents();
        }
        
      }
    
      function saveBook(event) {
    
        var book = {
          bookId: lastId,
          bookAutName: document.getElementById("aut_ime").value,
          bookAutSur: document.getElementById("aut_prezime").value,
          bookName: document.getElementById("knj_naziv").value,
          bookPublisher: document.getElementById("knj_nakladnik").value,
          bookPublishingYear: document.getElementById("knj_god_izd").value,
          bookPublishingPlace: document.getElementById("knj_mj_izd").value,
          bookUDK: document.getElementById("knj_udk").value
        };
        infoList.push(book);
        syncBook();
        addBookToList(book);
        syncEvents();
        lastId++; 
      }
    
      function addBookToList(book) {
    
        var removeIcon = document.createElement('span');
        var element = document.createElement('li');
        var updateIcon = document.createElement('span');
    
        removeIcon.innerHTML = "X";
        removeIcon.className = "remove_item clickeable";
        removeIcon.setAttribute("title", "Remove");
    
        updateIcon.innerHTML = "U";
        updateIcon.className = "update_icon clickeable";
        updateIcon.setAttribute("title", "Update");
    
    
        element.appendChild(removeIcon);
        element.appendChild(updateIcon);
        element.setAttribute("id", book.bookId);
        element.innerHTML += book.bookAutName;
        element.innerHTML += book.bookAutSur;
        element.innerHTML += book.bookName;
        element.innerHTML += book.bookPublisher;
        element.innerHTML += book.bookPublishingYear;
        element.innerHTML += book.bookPublishingPlace;
        element.innerHTML += book.bookUDK;
        info.appendChild(element);
      }
    
      function updateBook(event) {
    
        var bookTag = event.currentTarget.parentNode;
        var bookId = bookTag.id;
        var bookToUpdate = findBook(bookId).book;
        var pos = findBook(bookId).pos;
        if (!!bookToUpdate) {
          var autName = prompt("Ime autora", bookToUpdate.bookAutName);
          var autSur = prompt("Prezime autora", bookToUpdate.bookAutSur);
          var name = prompt("Prezime autora", bookToUpdate.bookName);
          var pub = prompt("Prezime autora", bookToUpdate.bookPublisher);
          var year = prompt("Prezime autora", bookToUpdate.bookPublishingYear);
          var place = prompt("Prezime autora", bookToUpdate.bookPublishingPlace);
          var udk = prompt("Prezime autora", bookToUpdate.bookUDK);
          bookToUpdate.bookAutName = autName;
          bookToUpdate.bookAutSur = autSur;
          bookToUpdate.bookName = name;
          bookToUpdate.bookPublisher = pub;
          bookToUpdate.bookPublishingYear = year;
          bookToUpdate.bookPublishingPlace = place;
          bookToUpdate.bookUDK = udk;
          infoList[pos] = bookToUpdate;
          bookTag.lastChild.textContent = bookToUpdate.bookAutName;
          bookTag.lastChild.textContent = bookToUpdate.bookAutSur;
          bookTag.lastChild.textContent = bookToUpdate.bookName;
          bookTag.lastChild.textContent = bookToUpdate.bookPublishingYear;
          bookTag.lastChild.textContent = bookToUpdate.bookPublishingPlace;
          bookTag.lastChild.textContent = bookToUpdate.bookUDK;
          syncBook();
        }
      }
    
      function removeBook(event) {
    
        var bookToRemove = event.currentTarget.parentNode;
        var bookId = bookToRemove.id;
        info.removeChild(bookToRemove);
        infoList.forEach(function(value, i) {
          if (value.bookId == bookId) {
            infoList.splice(i, 1);
          }
        })
    
        syncBook();
      }
    
      // End CRUD
    
    
      //Common
    
      function syncBook() {
    
        window.localStorage.setItem('infoList', JSON.stringify(infoList));
        infoList = JSON.parse(window.localStorage.getItem('infoList'));
      }
    
      function getLastBookId() {
        var lastBook = infoList[infoList.length - 1];
        lastId = lastBook.bookId + 1;
      }
    
      function syncEvents() {
    
        updateIcon = document.getElementsByClassName("update_icon");
        removeIcon = document.getElementsByClassName("remove_item");
        if (!!removeIcon.length) {
          for (var i = 0; i < removeIcon.length; i++) {
            removeIcon[i].addEventListener('click', removeBook);
          }
        }
        if (!!updateIcon.length) {
          for (var j = 0; j < updateIcon.length; j++) {
            updateIcon[j].addEventListener('click', updateBook);
          }
        }
      }
    
      function findBook(id) {
    
        var response = {
          book: '',
          pos: 0
        };
        infoList.forEach(function(value, i) {
          if (value.bookId == id) {
            response.book = value;
            response.pos = i;
          }
        });
    
        return response;
      }
    
      //End Common
    
    
      init();



});