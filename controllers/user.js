'use strict'
var User=require('../models/user')
var bcrypt = require('bcrypt-nodejs')


/*METODO DE PRUEBA PARA RESPUESTA DEL SERVIDOR*/
function pruebas(req,res){

	res.status(200).send({message:'Probando una accion del controlador de usuarios del api rest con node y mongo'});
}

/*METODO PARA EL REGISTRO DE USUARIOS*/
function saveUser(req,res){
	var user = new User();
	var params =req.body;

	//console.log(params);
	user.name=params.name;
	user.surname=params.surname;
	user.email=params.email;
	user.role='ROLE_USER';
	user.image='null';

	if(params.password){
		//encriptar contraseña y guardar datos
		bcrypt.hash(params.password,null,null,function(err,hash){
			user.password = hash;
			if(user.name != null && user.surname != null && user.email != null){

				//Guardar el usuario
				user.save((err,userStored)=>{
					if(err){
						res.status(500).send({message:'Error al guardar el usuario'});
					}
					else{
						if(!userStored){
							res.status(404).send({message:'No se ha registrado el usuario'});
						}
						else{
							res.status(200).send({user:userStored});
						}

					}
				});
			}
			else{
				res.status(200).send({message:'Rellena todos los campos'});
			}
		});
	}
	else{
		res.status(200).send({message:'Introduzca la contraseña'})
	}
}

/*EXPORTAMOS TODOS LOS METODOS EN ESTA SECCION*/
module.exports={
	pruebas,
	saveUser
}