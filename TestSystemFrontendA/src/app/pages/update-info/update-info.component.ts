import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrl: './update-info.component.css'
})
export class UpdateInfoComponent implements OnInit {

  user: any;
  role: any;
  username: any;
  userLogin:any;

  constructor(private loginService: LoginService, private snack: MatSnackBar, private router: Router,private userService:UserService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.username = this.user.username;
    this.validatePassword();
  }
  public validatePassword(){
    Swal.fire({
      title: 'Validar contraseña',
      input: 'password',
      text: "Para modificar el usuario es necesario validar su contraseña",
      confirmButtonText: 'Confirmar',
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      allowOutsideClick: false,
    }).then((result:any) =>{
      if(result.isConfirmed && result.value != ''){
        this.userLogin ={
          "username": this.user.username,
          "password": result.value
        }
        this.loginService.login(this.userLogin).subscribe(
          (data:any)=>{
            this.user.password = result.value;
          },error =>{
            Swal.fire("Error","Intente nuevamente","error")
            this.validatePassword();
          }
        )
      }else if (result.value == ''){
        Swal.fire("Error","Ingrese un valor","warning");
        this.validatePassword();
      }else{
        this.routerUser();
      }
      
      console.log(result)
      
    })
  }
  public formSubmit() {
    if (this.user.username == null || this.user.username.trim() == '' ||
      this.user.name == null || this.user.name.trim() == '' ||
      this.user.lastName == null || this.user.lastName.trim() == '' ||
      this.user.phone == null || this.user.phone.trim() == '' ||
      this.user.email == null || this.user.email.trim() == '' ||
      this.user.username == null || this.user.username.trim() == '' ||
      this.user.password == null || this.user.password.trim() == '') {
      this.snack.open("Complete todos los campos", "", {
        duration: 3000,
        verticalPosition: "top"
      })
      return;
    }
    Swal.fire({
      title: "Actualizar usuario",
      text: "¿Esta seguro de querer actualizar el usuario actual?",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      icon: "warning"
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.updateUser(this.user).subscribe(
          (data:any)=>{
            
            this.userLogin.username = data.user.username;
            this.userLogin.password = data.user.password;
            this.loginService.logOut();

            this.loginService.login(this.userLogin).subscribe(
              (data:any)=>{
                this.loginService.resposeToken(data.token);

                this.loginService.getCurrentUser().subscribe((user:any)=>{
                  this.loginService.setUser(user);
                  this.routerUser();
                  Swal.fire("Usuario actualizado correctamente", "", "success");
                })
              },error =>{
                Swal.fire("Error","Intente nuevamente","error")
              }
            )
          }
        )
        
      }
    })
  }
  public routerUser(){
    if (this.user.roles[0].role == "USER") {
      this.role = "user"
    } else {
      this.role = "admin";
    }
    window.location.href =`/${this.role}/profile`;
  }

}
