import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  public registerUser(user:any){
    return this.httpClient.post(`${baseUrl}/v1/createUser`,user);
  }
  public updateUser(user:any){
    return this.httpClient.put(`${baseUrl}/v1/updateUser`,user);
  }
  public deleteUser(id:any){
    return this.httpClient.delete(`${baseUrl}/v1/deleteUser/${id}`);
  }
  public findAllUsers(){
    return this.httpClient.get(`${baseUrl}/v1/findAll`);
  }
  public updateEnabled(user:any){
    return this.httpClient.put(`${baseUrl}/v1/updateEnabled`,user);
  }
}
