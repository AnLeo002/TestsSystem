import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent implements OnInit {
  examId: any;
  questions: any;

  pointsEarned = 0;
  answersCorrect = 0;
  attempts = 0;

  sendQuestions = false;
  time: any;

  constructor(
    private locationSt: LocationStrategy,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    console.log(this.examId);
    this.loadQuestion();
    this.lockingTheBackButton();
  }
  //Funcion para que no podamos retroceder despues de iniciar el examen
  public lockingTheBackButton() {
    //Cuando queramos retroceder no podemos
    history.pushState(null, null!, location.href); //null refleja el estado, null! es el parametro del titulo del historial al que se enviara, location.href es la direccion del historial al que se enviara al oprimir la <=
    this.locationSt.onPopState(() => {
      //no permite retroceder por que lo que hace es reenviarnos a la direccion actual
      history.pushState(null, null!, location.href);
    });
  }
  public loadQuestion() {
    this.questionService.findAllQuestionByExam(this.examId).subscribe(
      (data) => {
        this.questions = data;
        console.log(data);
        this.time = this.questions.length * 2 * 60; //Tiempo para realizar el examen
        this.startTimer();
      },
      (e) => {
        console.error(e);
        Swal.fire('Error', 'Error al cargar las preguntas del examen', 'error');
      }
    );
  }

  public startTimer() {
    let t = window.setInterval(() => {
      if (this.time <= 0) {
        this.evaluateExam();
        clearInterval(t);
      } else {
        this.time--;
      }
    }, 1000);
  }

  public evaluateExam(){
    this.questions.forEach((q: any) => {
      if (q.answerUser == q.response) {
        this.answersCorrect ++;
        this.pointsEarned =
          (this.questions[0].exam.points / this.questions.length) *
          this.answersCorrect;
      }
      this.sendQuestions = true;
    });
    this.attempts++;
  }
  public sendExam() {
    Swal.fire({
      title: 'Enviar examen',
      text: '¿Estas seguro de terminar el examen?',
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questions.forEach((q: any) => {
          if (q.answerUser == null) {
            this.snack.open('Complete todas las preguntas', '', {
              duration: 3000,
              verticalPosition: 'top',
            });
            return;
          } else if (q.answerUser == q.response) {
            this.answersCorrect++;
            this.pointsEarned =
              (this.questions[0].exam.points / this.questions.length) *
              this.answersCorrect;
          }
          this.sendQuestions = true;
        });
        this.attempts++;
        /* alert("Puntos conseguidos: " + this.pointsEarned)
        alert("Respuestas correctas: " + this.answersCorrect)
        alert("Cantidad de intentos: " + this.attempts) */
      }
    });
  }
  changeHourFormat() {
    let m = Math.floor(this.time / 60);
    let ss = this.time - m * 60;
    return `${m} min : ${ss} seg`;
  }
  public printPage(){
    window.print();
  }
}
