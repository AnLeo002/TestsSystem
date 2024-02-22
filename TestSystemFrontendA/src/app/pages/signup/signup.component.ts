import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  public user ={
    username: '',
    password:'',
    name:'',
    lastName:'',
    email:'',
    phone:''
  }

  constructor(private userService:UserService, private snack:MatSnackBar){
    
  }

  ngOnInit(): void{
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username =='' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido','Aceptar',{
        duration:3000,
        horizontalPosition:"right",
        verticalPosition:'top'
      });
      return;
    }

    this.userService.registerUser(this.user).subscribe(
      (data) =>{
        //console.log(data);
        Swal.fire("Usuario guardado",'Usuario registrado con exito','success')//Esta clase la tenemos que descargar desde el npm i sweetalert2
      },e => {
        //console.error(e.status);
        if(e.status == 409){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El nombre de usuario ya existe, por favor intente nuevamente"
          });
        }
        this.snack.open('Ha ocurrido un error en el sistema','Aceptar',{
          duration:3000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
      }
    )
  }

}
