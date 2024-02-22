import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit {

  examId:any;
  exam:any;

  constructor(private route:ActivatedRoute, private examService:ExamService,private router:Router){}
  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.examService.findExam(this.examId).subscribe(
      (data:any)=>{
        this.exam = data;
      },(e)=>{
        console.error(e);
      }
    )

  }
  public startExam(){
    Swal.fire({
      title:'¿Quieres comenzar el examen?',
      showCancelButton:true,
      cancelButtonText:"Cancelar",
      confirmButtonText:"Empezar",
      icon:"info"
    }).then(result =>{
      if(result.isConfirmed){
        this.router.navigate([`/start/${this.examId}`]);
      }
    })
  }

}
