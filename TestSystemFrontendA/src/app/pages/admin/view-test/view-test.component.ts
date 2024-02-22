import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../services/exam.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrl: './view-test.component.css'
})
export class ViewTestComponent implements OnInit {

  exams:any = [];

  constructor(private examService:ExamService){}

  ngOnInit(): void {
    this.findList();
  }
  public findList(){
    this.examService.examList().subscribe(
      (data:any)=>{
        this.exams = data;
      },(e)=>{
        console.error(e);
        Swal.fire('Error','Error al cargar los examenes','error');
      }
    )
  }
  public deleteExam(id:any){
    Swal.fire({
      title:"Eliminar examen",
      text:"¿Estas seguro de eliminar el examen?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:"#3085d6",
      cancelButtonColor:"#d33",
      confirmButtonText:"Eliminar",
      cancelButtonText:"Cancelar"
    }).then(result =>{
      if(result.isConfirmed){
        this.examService.deleteExam(id).subscribe(
          (data)=>{
            this.findList();
            Swal.fire("Examen eliminado","Examen eliminado de la base de datos","success");
          },(e)=>{
            console.error(e);
            Swal.fire("Error","Error al eliminar el examen","error");
          }
        );
      }
    })

  }

}
