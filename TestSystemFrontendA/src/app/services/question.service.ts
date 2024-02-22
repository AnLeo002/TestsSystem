import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public findAllQuestionByExam(id:any){
    return this.http.get(`${baseUrl}/question/findAllByExam/${id}`);
  }
  public createQuestion(question:any){
    return this.http.post(`${baseUrl}/question/create`,question);
  }
  public deleteQuestion(id:any){
    return this.http.delete(`${baseUrl}/question/delete/${id}`)
  }
  public updateQuestion(id:any,question:any){
    return this.http.put(`${baseUrl}/question/update/${id}`,question);
  }
  public findQuestion(id:any){
    return this.http.get(`${baseUrl}/question/find/${id}`);
  }
  public findAllUnansweredQuestions(examId:any){
    return this.http.get(`${baseUrl}/question/findAllUnanswered/${examId}`);
  }
}
