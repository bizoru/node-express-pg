// Home
$(function(){
	
	$("#botonconsulta").click(function(){
	
		console.log("Click");
		var consulta = $("#consulta").val();
		$.post("consulta", { consulta: consulta }, function( data ) {
		  $("#resultados").html(data);
		});
			
	});
	
});