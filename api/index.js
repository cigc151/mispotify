(function(){
	'use strict'

	var mongoose = require('mongoose');
	//cargamos el fichero app.js 
	var app =require('./app')
	//configuramos el puerto para nuestro servidor
	var port =process.env.PORT || 3977;

	mongoose.Promise=global.Promise;
	mongoose.connect('mongodb://localhost:27017/curso-mean2',{ useMongoClient: true },(err,res)=>{
		if(err){
			throw err;
		}
		else{
			console.log("La conexion a la base de datos esta corriendo correctamente ...");
			//ponemos el servidor a escuchar por el puerto 3977
			app.listen(port,function(){
				console.log("Servidor del api rest de musica escuchando en http://localhost:" + port)
			});
		}
	})

})();

