var pg = require('pg');
var conString = "postgres://root:root@localhost/taxisint";


var traerResultados = function(query, cb) {
	pg.connect(conString, function(err, cliente, done) {
		if (err) {
			return console.error('no se puede conectar a postgres', err);
		}

		cliente.query(query, function(err, resultado) {
			done();

			if (err) {

				console.error('error con la consulta', err);
				cb({
					mensaje: ""+err,
					resultados: []
				});

			} else {

				if (resultado.rows.length == 0) {

					cb({
						mensaje: 'sin registros',
						resultados: resultado.rows
					});
				} else {

					cb({
						mensaje: 'correcto',
						resultados: resultado.rows
					});

				}



			}

		});


	});

}

exports.traerResultados = traerResultados;
