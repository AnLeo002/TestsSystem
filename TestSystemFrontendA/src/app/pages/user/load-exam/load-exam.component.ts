import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-load-exam',
  templateUrl: './load-exam.component.html',
  styleUrl: './load-exam.component.css'
})
export class LoadExamComponent implements OnInit {

  categoryId:any;
  exams:any;
  numberOfQuesitons:any;

  constructor(private route:ActivatedRoute, private examService:ExamService,private questionService: QuestionService){}
  ngOnInit(): void {
    this.categoryId = this.route.params.subscribe((param)=>{
      this.categoryId = param['catId'];
      if(this.categoryId == 0){
        console.log("Cargando todos los exámenes");
        this.examService.findAllExamsIfEnabled().subscribe(
          (data)=>{
            this.exams = data;
          },(e)=>{
            console.log(e);
          }
        )
      }else{
        console.log("Cargando un examen en específico")
        this.examService.findExamByCategory(this.categoryId).subscribe(
          (data:any)=>{
            this.exams = data;
            console.log(this.exams)
          },(e)=>{
            console.error(e);
          }
        )
      }
    })
    
  }
}
