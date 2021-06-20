// Div switch functions

function switchOnInfo () {
  if (document.getElementById('upis').style.display='none') {
    document.getElementById('booklist').style.display='grid';
    document.getElementById('upis_butt').style.opacity = 0.7;
    document.getElementById('info_butt').style.opacity = 1;
  } 
};

function switchOnUpis () {
  if (document.getElementById('upis').style.display='grid') {
    document.getElementById('booklist').style.display='none';
    document.getElementById('upis_butt').style.opacity = 1;
    document.getElementById('info_butt').style.opacity = 0.7;
  }
};

//CRUD function
	
$(function(){
	var operation = "A"; //"A"=Adding; "E"=Editing
	var selected_index = -1; //Index of the selected list item
	var tbBooks = localStorage.getItem("tbBooks");//Retrieve the stored data
	var btnUnos = document.getElementById('unos_pod');
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
	localStorage.setItem("tbBooks", JSON.stringify(tbBooks));
	tbBooks.push(book);
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
		var cli = JSON.parse(tbBooks[i]);
	  	$("#tblBooks tbody").append("<tr>"+
								 	 "	<td><img src='edit.png' alt='Edit"+i+"' class='btnEdit'/><img src='delete.png' alt='Delete"+i+"' class='btnDelete'/></td>" + 
									 "	<td>"+cli.ImeAutora+"</td>" + 
									 "	<td>"+cli.PrezimeAutora+"</td>" + 
									 "	<td>"+cli.NazivKnjige+"</td>" + 
									 "	<td>"+cli.NakladnikKnjige+"</td>" +
                   "	<td>"+cli.GodinaIzd+"</td>" +
                   "	<td>"+cli.MjestoIzd+"</td>" +   
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
	var cli = JSON.parse(tbBooks[selected_index]);
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