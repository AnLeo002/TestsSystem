import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginData ={
    "username": "",
    "password": ""
  }

  constructor(private snack:MatSnackBar, private loginService:LoginService){

  }

  ngOnInit(): void {
    
  }

  formSubmit(){
    if(this.loginData.username.trim() == "" || this.loginData.username == null){
      this.snack.open("El nombre de usuario es requerido","Aceptar",{
        duration:3000,
        verticalPosition:"top"
      });
    }else if(this.loginData.password.trim() == "" || this.loginData.password == null){
      this.snack.open("La contraseña es requerido","Aceptar",{
        duration:3000,
        verticalPosition:"top"
      });
    }

    this.loginService.login(this.loginData).subscribe(
      (data:any)=>{
        console.log(data.Token);

        this.loginService.resposeToken(data.Token);
        
        this.loginService.getCurrentUser().subscribe((user:any)=>{
          this.loginService.setUser(user);
          console.log(user);

          if(this.loginService.getUserRole() == "ADMIN" || this.loginService.getUserRole() == "INVITED"){
            //dashboard admin
            window.location.href ="/admin";
          }else if(this.loginService.getUserRole()== "USER"){
            //dashboard user
            window.location.href = "/user/0";
          }else{
            this.loginService.logOut();
          }
        })
      },error =>{
        console.error(error);
        this.snack.open("No fue posible la validación, intente nuevamente","Aceptar",{
          duration:3000,
          verticalPosition:"top"
        })
      }
    );
    
  }

}
