import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../services/exam.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.css'
})
export class AddExamComponent implements OnInit {

  categories:any = [];

  examData = {
    title: '',
    description: '',
    points: '',
    numberOfQuestions: '',
    enable: true,
    category:{
      id: ''
    }
  }

  constructor(private examService:ExamService,private categoryService:CategoryService,private snack:MatSnackBar, private router:Router){}

  ngOnInit(): void {
    this.categoryService.categoriesList().subscribe(
      (data:any)=>{
        console.log(data);
        this.categories = data;
      },(e)=>{
        console.error(e);
        Swal.fire('Error','Error al cargar las categorias','error');
      }
    )
  }
  public saveExam(){
    if(this.examData.title.trim() == "" || this.examData.title == null){
      this.snack.open("El título es requerido","",{
        duration:3000,
        verticalPosition:"top"
      });
      return ;
    }
    this.examService.saveExam(this.examData).subscribe(
      (data:any)=>{
        Swal.fire("Guardado con exito","Examen guardado con exito","success");
        this.router.navigate(['/admin/tests'])
      },e =>{
        console.error(e);
        Swal.fire("Error","Error al guardar los datos del cuestionario","error");
      }
    );
    
  }

}
