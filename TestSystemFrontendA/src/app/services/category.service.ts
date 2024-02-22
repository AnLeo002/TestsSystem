import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public categoriesList(){
    return this.http.get(`${baseUrl}/category/findAll`);
  }

  public saveCategory(category:any){
    return this.http.post(`${baseUrl}/category/create`,category)
  }
}
