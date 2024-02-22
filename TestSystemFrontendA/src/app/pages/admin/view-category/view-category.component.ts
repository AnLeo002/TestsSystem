import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.css'
})
export class ViewCategoryComponent implements OnInit{
  categories:any = [];
  constructor(private categoryService:CategoryService){

  }
  ngOnInit(): void {
    this.categoryService.categoriesList().subscribe(
      (data:any)=>{
        this.categories = data;
        console.log(this.categories)
      },(error)=>{
        console.error(error);
        Swal.fire('Error',"Error al cargar las categorias","error");
      }
    )
  }
  
}
