import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private loginService:LoginService){

  }
  //Vamos a inceptar peticiones al back para modificar peticiones
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.loginService.getToken();
    if(token != null){
      //Vamos a clonar la peticion y le agregamos una cabecera
      authReq = authReq.clone({
        //En esta interceptacion establecemos una cabecera, la cual me permitira acceder a las peticiones del back(GET,POST,PUT,DELETE) enviando el token
        setHeaders : {Authorization: `Bearer ${token}`}
      }); 
    }
    return next.handle(authReq);
  }

}
//configuracion de inteceptors para autenticacion
export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,//representa un token para la inyeccion de dependencias
    useClass: AuthInterceptor,//Clase que contiene la logica de la autenticacion
    multi:true//Agregar la cantidad de interceptores que necesitemos
  }
]