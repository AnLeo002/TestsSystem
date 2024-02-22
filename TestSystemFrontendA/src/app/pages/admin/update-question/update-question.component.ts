import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent implements OnInit {

  question:any;
  questionId:any;

  constructor(private route:ActivatedRoute,private questionService:QuestionService, private router:Router){}
  ngOnInit(): void {
    this.questionId = this.route.snapshot.params['questionId'];
    this.questionService.findQuestion(this.questionId).subscribe(
      (data:any)=>{
        console.log(data)
        this.question = data;
      },(e)=>{
        console.error(e);
      }
    )
  }
  public updateQuestion(){
    this.questionService.updateQuestion(this.questionId,this.question).subscribe(
      (data:any)=>{
        Swal.fire("Pregunta Actualizada","Pregunta actualizada correctamente","success");
        this.router.navigate([`/admin/see-questions/${this.question.exam.id}/${this.question.exam.title}`])

      }
    )
  }

}
