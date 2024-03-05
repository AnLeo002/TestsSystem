import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{

  public user ={
    username: '',
    password:'',
    name:'',
    lastName:'',
    email:'',
    phone:'',
    roles:[
      {
        role:''
      }
    ]
  }

  constructor ( private userService:UserService, private snack:MatSnackBar, private router:Router){}

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.user.username.trim() =='' || this.user.username == null || 
    this.user.name.trim()  =='' || this.user.name == null ||
    this.user.lastName.trim()  =='' || this.user.lastName == null ||
    this.user.phone.trim()  =='' || this.user.phone == null ||
    this.user.email.trim()  =='' || this.user.email == null ||
    this.user.password.trim()  =='' || this.user.password == null,
    this.user.roles[0].role.trim() =='' || this.user.roles[0].role == null){
      this.snack.open('Complete todos los campos','Aceptar',{
        duration:3000,
        verticalPosition:'top'
      });
      return ;
    }else{
      this.userService.registerUser(this.user).subscribe(
        (data)=>{
          Swal.fire("Usuario Registrado correctamente","","success");
          this.router.navigate(["/admin/user-list"])
        },error =>{
          Swal.fire("Error al registrar el usuario","","error");
        }
      )
    }
    
  }

}
