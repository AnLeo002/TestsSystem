import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{

  userList: any ;
  userLogin:any;
  user:any;

  constructor(private loginService:LoginService, private userService:UserService){}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.loadUsers();
    
  }
  loadUsers(){
    this.userService.findAllUsers().subscribe(
      (data:any)=>{
        this.userList = data;
        console.log(data)
      },error =>{
        console.error(error)
      }
    )
  }
  deleteProfile(id:any){
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

                this.userService.deleteUser(id).subscribe(
                  (data)=>{
                    Swal.fire("El usuario fue eliminado","","success");
                    this.loadUsers();
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

  changeEnabled(user:any){
    Swal.fire({
      title:  'Cambiar estado del usuario',
      text: '¿Desea cambiar el estado de usuario?',
      showCancelButton:true,
      icon:"question",
      confirmButtonText:"Confirmar"
    }).then(result =>{
      if(result.isConfirmed){
        if(user.enabled){
          user.enabled = false;
        }else{
          user.enabled = true;
        }
        this.userService.updateEnabled(user).subscribe(
          (data)=>{
            Swal.fire("Estado del Usuario actualizado","","success");
          },error=>{
            Swal.fire("No fue posible actualizar el estado del usuario","","error");
          }
        )
      }
    })
  }

}
