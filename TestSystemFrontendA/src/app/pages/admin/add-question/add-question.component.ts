import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit {

  examId :any;
  title:any;
  question:any = {
    exam: {},
    content: '',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    response:''
  }

  constructor(private route:ActivatedRoute, private questionService:QuestionService, private snack:MatSnackBar, private router:Router){}
  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    this.question.exam['id'] = this.examId;
  }

  public formSubmit(){
    if(this.question.content.trim() == ''|| this.question.content == null || this.question.option1.trim() == ''|| this.question.option1 == null || this.question.option2.trim() == ''|| this.question.option2 == null || this.question.option3.trim() == ''|| this.question.option3 == null || this.question.option4.trim() == ''|| this.question.option4 == null || this.question.response.trim() == ''|| this.question.response == null  ){
      this.snack.open("Complete todos los campos","",{
        duration:3000,
        verticalPosition:"top"
      });
      return ;
    }
    this.questionService.createQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Pregunta agregada","Pregunta agregada al examen correctamente","success");
        this.router.navigate([`/admin/see-questions/${this.examId}/${this.title}`])
      },(e)=>{
        console.error(e);
        Swal.fire("Error","Error al agregar la pregunta","error");
      }
    )
  }
  

}
