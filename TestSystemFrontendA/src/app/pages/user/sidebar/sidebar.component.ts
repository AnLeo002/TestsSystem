import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  categories:any;

  constructor(private categoryService:CategoryService,private snack:MatSnackBar, private login:LoginService){}
  ngOnInit(): void {
    this.categoryService.categoriesList().subscribe(
      (data:any)=>{
        this.categories = data;
      },(e)=>{
        this.snack.open("Error al cargar las categorias","",{
          duration:3000,
          verticalPosition:"top"
        })
        console.log(e);
      }
    )
  }
  public logOut(){
    this.login.logOut();
    window.location.reload();
  }

}
