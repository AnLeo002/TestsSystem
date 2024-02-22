import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exam-question',
  templateUrl: './view-exam-question.component.html',
  styleUrl: './view-exam-question.component.css'
})
export class ViewExamQuestionComponent implements OnInit{

  examId:any;
  title:any;
  questions:any = [];

  constructor(private route:ActivatedRoute,private questionService:QuestionService){}
  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    this.findAllQuestions();
  }
  public findAllQuestions(){
    this.questionService.findAllQuestionByExam(this.examId).subscribe(
      (data:any)=>{
        this.questions = data;
        console.log(this.questions)
      },(e)=>{
        console.error(e)
      }
    )
  }
  public deleteQuestion(id:any){
    Swal.fire({
      title:"Eliminar pregunta",
      text:"Esta seguro de eliminar la pregunta?",
      icon:"warning",
      showCancelButton:true,
      cancelButtonColor:"#d33",
      confirmButtonColor:"#3085d6",
      confirmButtonText:"Eliminar",
      cancelButtonText:"Cancelar"
    }).then(result =>{
      if(result.isConfirmed){
        this.questionService.deleteQuestion(id).subscribe(
          (data:any)=>{
            Swal.fire("Pregunta eliminada","Pregunta eliminada correctamente","success");
            this.findAllQuestions();
          },(e)=>{
            Swal.fire("Error","Error al eliminar la pregunta","error");
          }
        )
      }
    }
    )
  }
}
