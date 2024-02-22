import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrl: './update-exam.component.css'
})
export class UpdateExamComponent implements OnInit{

  constructor(private route:ActivatedRoute, private examService:ExamService, private categoryService:CategoryService, private router:Router){}

  id = 0;
  exam:any;
  categories:any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];//recuperamos el dato (declarado en el app.routing) que enviamos por el path
    this.examService.findExam(this.id).subscribe(
      (data:any)=>{
        this.exam = data;
      },(e)=>{
        console.error(e);
      }
    )
    this.categoryService.categoriesList().subscribe(
      (data:any)=>{
        this.categories = data;
      },(e)=>{
        console.log(e);
      }
    )
  }

  public updateExam(){
    this.examService.updateExam(this.exam,this.id).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire("Examen actualizado","Examen actualizado correctamente","success");
        this.router.navigate(["/admin/tests"])
      },(e)=>{
        console.error(e);
        Swal.fire("Error","Error al actualizar el examen","error");
      }
    )
  }

}
