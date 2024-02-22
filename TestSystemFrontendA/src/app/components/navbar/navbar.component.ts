import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  username:any;

  constructor(public login:LoginService){}

  user:any = null;

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.user = this.login.getUser();
      }
    )

  }

  public logOut(){
    this.login.logOut();
    window.location.reload();
  }
}
