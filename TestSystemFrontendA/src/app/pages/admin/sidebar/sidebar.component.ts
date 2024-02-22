import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private login:LoginService){}

  public logOut(){
    this.login.logOut();
    window.location.reload();
  }
}
