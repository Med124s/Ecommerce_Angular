import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})

export class AuthenticationComponent implements OnInit {
 
 constructor(private serviceAuthenticat:AuthenticationService,private _router:Router){}

  ngOnInit(): void {}
  login(dataForm: any) {
    this.serviceAuthenticat.onLogin(dataForm.username,dataForm.password)
    if(this.serviceAuthenticat.isAuthenticate){
      this.serviceAuthenticat.saveUserStorage();
      this._router.navigateByUrl('');

    }
  }

}
