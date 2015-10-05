var handlebars = require('express3-handlebars').create({defaultLayout: 'main', extname: 'hbs'});
var express = require('express');
var app = express();
var db = require('./databasehandler.js')
var bodyParser = require('body-parser');

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

var status = {
	'appname':'node-test-app'
};

app.use('/static', express.static('node_modules/bootstrap/dist'));
app.use('/vendor', express.static('assets'));

app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', function (req,res){
	console.log(req.headers);
	console.log(req.ip);
	console.log(req.cookies);
	console.log(req.acceptedLanguages);
	
	//res.send('Hello world baby');
	res.json(status);
	
});


app.get('/consulta',function(req,res){

	res.render('consulta');
});

app.post('/consulta',function(req,res){
	
	var consulta = req.body.consulta;
	console.log(req.body.consulta);

		
   
	db.traerResultados(consulta, function(consulta){
        var columnas = [];
		if(consulta.resultados.length != 0){
			columnas = Object.keys(consulta.resultados[0]);
		}
		
		estado = true;
		
		if(consulta.mensaje.indexOf("error") > -1){
			estado = false;
		};
		res.render('resultados',{consulta: consulta , columnas: columnas, estado: estado, mensaje: consulta.mensaje, layout: null});

	});
	
});



app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('The URL you requested is not found');
	
});

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Aplicacion consultas SQL corriendo en: http://%s:%s',host, port);		
});

