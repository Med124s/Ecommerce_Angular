import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private _router: Router) {}
  // Creation Array of data login
   users = [
    { userName: 'admin', password: '123', roles: ['ADMIN', 'USER'] },
    { userName: 'user1', password: '123', roles: ['USER'] },
    { userName: 'user2', password: '123', roles: ['USER'] },
  ];

  public isAuthenticate!: boolean;
  public userAuthenticat!: any;
  public token:any;

  onLogin(username:String,password:String){
    let user;
    this.users.forEach((u) => {
      if (
        u.userName === username &&
        u.password === password
      ) {
        user = u;
      }
    });
    if (user) {
      this.isAuthenticate = true;
      this.userAuthenticat = user;
      this.token = {userName: this.userAuthenticat.userName,roles: this.userAuthenticat.roles}
    }
    else {
      this.isAuthenticate = false;
      this.userAuthenticat = undefined;
    }
  }

  isAdmin() {
    if(this.userAuthenticat){
    if (this.userAuthenticat.roles.indexOf('ADMIN') > -1) {
      return true;
    }
  }
    return false;
  }

  saveUserStorage() {
    if (this.userAuthenticat) {
      localStorage.setItem('addUserToken', btoa(JSON.stringify(this.token)));
    }
  }
  loadAuthenticatedUserFromStorage(){
    let t = localStorage.getItem('addUserToken');
    if(t){
     let user = JSON.parse(atob(t));
     this.userAuthenticat = {username:user.username,roles:user.roles}
     this.isAuthenticate = true;
    }
  }
  clearLocalStorage(){
    localStorage.removeItem('addUserToken');
  }


}
