import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user:any = null;

  constructor(private loginservice:LoginService){

  }

  ngOnInit(): void {
    this.user = this.loginservice.getUser();

    /* this.loginservice.getCurrentUser().subscribe((user:any)=>{
      this.user = user;
    },e =>{
      console.error(e);
    }) */
  }
}
