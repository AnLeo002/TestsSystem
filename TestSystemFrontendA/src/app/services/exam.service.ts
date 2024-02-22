import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamService implements OnInit {

  constructor(private http:HttpClient) { }
  ngOnInit(): void {
  }

  public examList(){
    return this.http.get(`${baseUrl}/exam/findAll`);
  }
  public saveExam(exam:any){
    return this.http.post(`${baseUrl}/exam/create`,exam);
  }
  public deleteExam(id:any){
    return this.http.delete(`${baseUrl}/exam/delete/${id}`);
  }
  public findExam(id:any){
    return this.http.get(`${baseUrl}/exam/find/${id}`);
  }
  public updateExam(exam:any,id:any){
    return this.http.put(`${baseUrl}/exam/update/${id}`,exam);
  }
  public findExamByCategory(categoryId:any){
    return this.http.get(`${baseUrl}/exam/findByCategory/${categoryId}`);
  }
  public findAllExamsIfEnabled(){
    return this.http.get(`${baseUrl}/exam/findAllEnabled`);
  }
}
