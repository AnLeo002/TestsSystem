import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private httpClient:HttpClient) { }

  public login(loginData:any){
    return this.httpClient.post(`${baseUrl}/login`,loginData);
  }

  //Inicio de sesion y establecemos el token en el sessionStorage
  public resposeToken(token:any){
    sessionStorage.setItem("token",token);
  }

  public isLoggedIn(){
    let tokenStr = sessionStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == "" || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //Cerrar sesion y eliminar el token del sessionStorage
  public logOut(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    return true;
  }

  //obtener el token
  public getToken(){
    return sessionStorage.getItem("token");
  }

  public getUsernameFromToken(){
    return sessionStorage.getItem("token")
    
  }

  //Estableceer un usuario
  public setUser(user:any){
    sessionStorage.setItem("user",JSON.stringify(user));
  }

  //tomar un usuario 
  public getUser(){
    let userStr = sessionStorage.getItem("user");
    if(userStr != null ){
      return JSON.parse(userStr);
    }else{
      this.logOut();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.roles[0].role;
  }

  public getCurrentUser(){
    return this.httpClient.get(`${baseUrl}/v1/sessionUser`)
  }
  
}
