import { Component, OnInit } from '@angular/core';
import { UserService} from './services/user.service'

import {User} from './models/user';
import {GLOBAL} from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserService]
})
export class AppComponent implements OnInit{
  public title = 'Mispotify';
  public user : User;
  public user_register : User;
  public identity; 
  public token;
  public errorMessage;
  public alertRegister;
  public url:string;



  constructor(private _userService:UserService){

  	this.user = new User('','','','','','ROLE_USER','');
    this.user_register = new User('','','','','','ROLE_USER','');
    this.url=GLOBAL.url;
    //this.token=this._userService.getToken();

  }

  ngOnInit(){
  	//var texto = this._userService.signup();
  	//console.log(texto);
    this.identity =this._userService.getIdentity();
    this.token=this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);

  }

  public onSubmit(){
  	console.log(this.user);
    //conseguir datos de usuario
  	this._userService.signup(this.user).subscribe(

  		response => {

        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert("El usuario no esta correctamete identificado");

        }else{

          //crear elemento en el local storage para tener al usuario en sesion
          localStorage.setItem('identity', JSON.stringify(identity));

          //conseguir el token para enviarselo a cada peticion
          this._userService.signup(this.user,'true').subscribe(

            response => {

              let token = response.token;
              this.token = token;

              if(this.token.length <= 0){
                alert("El token no se ha generado");

              }else{
                //crear elemento en el local storage para tener el token disponible
             
                localStorage.setItem('token', token);
                console.log(token);
                console.log(identity);
                this.user =  new User('','','','','','ROLE_USER','');

                //conseguir el token para enviarselo a cada peticion
                

              }
      //        console.log(response);

            },
            error => {
            var errorMessage = <any>error;

            if (errorMessage!=null) {
              var body=JSON.parse(error._body);
              this.errorMessage=body.message;
              console.log(error);
            }

            }

          );

        }
//  			console.log(response);

  		},
  		error => {
			var errorMessage = <any>error;

			if (errorMessage!=null) {
        var body=JSON.parse(error._body);
				this.errorMessage=body.message;
				console.log(error);
			}
  		}

  	);
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.identity=null;
    this.token=null;
    //localStorage.clear();
  }


  onSubmitRegister(){
    console.log(this.user_register);

    this._userService.rgeister(this.user_register).subscribe(
        response=>{

          let user =response.user;
          this.user_register = user;


         if(!user._id){
           this.alertRegister = 'Error al registrarse';
         }
         else{
             this.alertRegister = 'El registro se ha realizado correctamente, identificate con ' + this.user_register.email; 
             this.user_register =  new User('','','','','','ROLE_USER','');
         }

        },error=>{
            var errorMessage = <any>error;            
              if (errorMessage!=null) {
                var body=JSON.parse(error._body);
                this.alertRegister=body.message;
                console.log(error);
                }
        }
      );
  }

}
