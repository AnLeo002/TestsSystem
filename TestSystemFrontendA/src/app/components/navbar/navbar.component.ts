import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  role:any;
  user:any = null;
  
  constructor(public login:LoginService){}

  

  ngOnInit(): void {
    if (this.login.isLoggedIn()) {
      this.user = this.login.getUser();        
          if(this.user.roles[0].role == "USER"){
            this.role = "user"
          }else{
            this.role = "admin";
          }
      
    }
    

  }

  public logOut(){
    this.login.logOut();
    window.location.reload();
  }
}
