import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user:any = null;
  role:any;

  userLogin:any;

  constructor(private loginService:LoginService,private userService:UserService){

  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();

    if(this.user.roles[0].role == "USER"){
      this.role = "user"
    }else{
      this.role = "admin";
    }
    /* this.loginservice.getCurrentUser().subscribe((user:any)=>{
      this.user = user;
    },e =>{
      console.error(e);
    }) */
  }
  deleteProfile(){
    Swal.fire({
      title: "Eliminar usuario",
      text: "¿Esta seguro de querer eliminar el usuario actual?",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      icon: "warning"
    }).then(result =>{
      if(result.isConfirmed){
        Swal.fire({
          title: 'Validar contraseña',
          input: 'password',
          text: "Para eliminar el usuario es necesario validar su contraseña",
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

                this.userService.deleteUser(this.user.id).subscribe(
                  (data)=>{

                    Swal.fire("El usuario fue eliminado","","success");
                    this.loginService.logOut();
                    window.location.reload();
                    
                  },(error)=>{
                    Swal.fire("El usuario no pudo ser eliminado","","error");
                  }
                )
              },error =>{
                Swal.fire("Error","Intente nuevamente","error")
              }
            )
          }else if (result.value == ''){
            Swal.fire("Error","Ingrese un valor","warning");
          }else{
          }
          console.log(result)
          
        })
      }
    })
  }
}
