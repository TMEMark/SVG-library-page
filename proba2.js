$(function(){
	var selected_index = -1; //Index of the selected list item
	var tbBooks = localStorage.getItem("tbBooks");//Retrieve the stored data
	tbBooks = JSON.parse(tbBooks); //Converts string to object
	if (tbBooks == null) {//If there is no data, initialize an empty array
		tbBooks = [];
	}
}); 

function addBooks(){
	var book = JSON.stringify({
		ImeAutora  : document.getElementById("aut_ime").value,
		PrezimeAutora : document.getElementById("aut_prezime").value,
		NazivKnjige : document.getElementById("knj_naziv").value,
    	NakladnikKnjige : document.getElementById("knj_nakladnik").value,
   	 	GodinaIzd : document.getElementById("knj_god_izd").value,
    	MjestoIzd : document.getElementById("knj_mj_izd").value,
    	UDK : document.getElementById("knj_udk").value
	});
	var tbBooks = localStorage.getItem("tbBooks");
	tbBooks.push(book);
	localStorage.setItem("tbBooks", JSON.stringify(tbBooks));
	alert("The data was saved.");
	return true;
} 

function editBooks(){
	tbBooks[selected_index] = JSON.stringify({
    	ImeAutora  : document.getElementById("aut_ime").value,
		PrezimeAutora : document.getElementById("aut_prezime").value,
		NazivKnjige : document.getElementById("knj_naziv").value,
    	NakladnikKnjige : document.getElementById("knj_nakladnik").value,
    	GodinaIzd : document.getElementById("knj_god_izd").value,
   	 	MjestoIzd : document.getElementById("knj_mj_izd").value,
    	UDK : document.getElementById("knj_udk").value
		});//Alter the selected item on the table
	localStorage.setItem("tbBooks", JSON.stringify(tbBooks));
	alert("The data was edited.")
	var operation = "A";
	operation = "A"; //Return to default value
	return true;
} 

function deleteBooks(){
	tbBooks.splice(selected_index, 1);
	localStorage.setItem("tbBooks", JSON.stringify(tbBooks));
	alert("Client deleted.");
} 

function listBooks(){		
	$("#tblBooks").html("");
	$("#tblBooks").html(
		"<thead>"+
		"	<tr>"+
		"	<th></th>"+
		"	<th>Ime autora</th>"+
		"	<th>Prezime autora</th>"+
		"	<th>Naziv knjige</th>"+
		"	<th>Nakladnik</th>"+
    "	<th>Godina izdanja</th>"+
    "	<th>Mjesto izdanja</th>"+
    "	<th>UDK</th>"+
		"	</tr>"+
		"</thead>"+
		"<tbody>"+
		"</tbody>"
		);
	for(var i in tbBooks){
		var books = JSON.parse(tbBooks[i]);
	  	$("#tblBooks tbody").append("<tr>"+
								 	 "	<td><img src='edit.png' alt='Edit"+i+"' class='btnEdit'/><img src='delete.png' alt='Delete"+i+"' class='btnDelete'/></td>" + 
									 "	<td>"+books.ImeAutora+"</td>" + 
									 "	<td>"+books.PrezimeAutora+"</td>" + 
									 "	<td>"+books.NazivKnjige+"</td>" + 
									 "	<td>"+books.NakladnikKnjige+"</td>" +
                   "	<td>"+books.GodinaIzd+"</td>" +
                   "	<td>"+books.MjestoIzd+"</td>" +
				   "	<td>"+books.UDK+"</td>" +    
	  								 "</tr>");
	}
} 

$("#form_upis").bind("submit",function(){
	if(operation == "A")
		return Add();
	else
		return Edit();		
}); 

$(".btnEdit").bind("click", function(){
	operation = "E";
	selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
	var books = JSON.parse(tbBooks[selected_index]);
  $("#aut_ime").val(),
  $("#aut_prezime").val(),
  $("#knj_naziv").val(),
  $("#knj_nakladnik").val(),
  $("#knj_god_izd").val(),
  $("#knj_mj_izd").val(),
  $("#knj_udk").val()
	$("#aut_ime").attr("readonly","readonly");
	$("#knj_naziv").focus();
}); 

$(".btnDelete").bind("click", function(){
	selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
	Delete();
	List();
}); 















if (localStorage.getItem('bookList') === null) {
	var initBooks = [
    $('#tblBooks').html(
      "<thead>" +
            "<tr>" +
                "<th>Ime autora</th>" +
                "<th>Prezime autora</th>" +
                "<th>Naziv knjige</th>" +
                "<th>Nakladnik</th>" +
                "<th>Godina izdanja</th>" +
                "<th>Mjesto izdanja</th>" +
                "<th>UDK</th>" +
            "</tr>" +
        "</thead>" +
        "<tbody>" +
        "</tbody>" 
    )
  ]; 
	localStorage.setItem('bookList', JSON.stringify(initBooks));
}

var books = JSON.parse(localStorage.getItem('bookList'));

function addBooks () {
  var book = JSON.stringify({
		ImeAutora  : $('#aut_ime').val(),
		PrezimeAutora : $('#aut_prezime').val(),
		NazivKnjige : $('#knj_naziv').val(),
    NakladnikKnjige : $('#knj_nakladnik').val(),
   	GodinaIzd : $('#knj_god_izd').val(),
    MjestoIzd : $('#knj_mj_izd').val(),
    UDK : $('#knj_udk').val()
	});
  var bookList = localStorage.getItem("bookList");
	bookList.push(book);
	localStorage.setItem('bookList', JSON.stringify(bookList));
	alert("The data was saved.");
	return true;
}

function readBooks () {
    $('#tblBooks').html(
      "<thead>" +
              "<tr>" +
                  "<th>Ime autora</th>" +
                  "<th>Prezime autora</th>" +
                  "<th>Naziv knjige</th>" +
                  "<th>Nakladnik</th>" +
                  "<th>Godina izdanja</th>" +
                  "<th>Mjesto izdanja</th>" +
                  "<th>UDK</th>" +
              "</tr>" +
          "</thead>" +
          "<tbody>" +
          "</tbody>" 
    );
    for(var i in bookList){
      if (localStorage.getItem('bookList') != null){
        var book = JSON.parse(bookList[i]);
          $("#tblBooks tbody").append(
                      "<tr>"+
                        "<td><img src='edit.png' alt='Edit"+i+"' class='btnEdit'/><img src='delete.png' alt='Delete"+i+"' class='btnDelete'/></td>" + 
                        "<td>"+book.ImeAutora+"</td>" + 
                        "<td>"+book.PrezimeAutora+"</td>" + 
                        "<td>"+book.NazivKnjige+"</td>" + 
                        "<td>"+book.NakladnikKnjige+"</td>" +
                        "<td>"+book.GodinaIzd+"</td>" +
                        "<td>"+book.MjestoIzd+"</td>" +
                        "<td>"+book.UDK+"</td>" +    
                         "</tr>");
      }                    
    }
}

function updateBooks () {

}

function deleteBooks () {

}
