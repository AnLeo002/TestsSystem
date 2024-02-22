import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  
  category = {
    title: '',
    description:''
  }
  constructor(private categoryService:CategoryService, private snack:MatSnackBar, private router:Router){}
  ngOnInit(): void {
  }

  public formSubmit(){
    if(this.category.title.trim() == '' || this.category.title == null){
      this.snack.open("Por favor inserte un titulo",'',{
        duration:3000
      })
      return ;
    }

    this.categoryService.saveCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title = '';
        this.category.description ='';
        Swal.fire('Categoria agregada','Categoria agregada con exito','success');
        this.router.navigate(['/admin/categories'])
      },
      (error)=>{
        console.error(error);
        Swal.fire("Error",'Error al guardar la categoria','error');
      }
    )
  }
}
