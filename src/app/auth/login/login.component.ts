import { Component, OnInit, HostBinding  } from '@angular/core';
import { Router } from '@angular/router';

import { moveIn } from '../../router.animation';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {"[@moveIn]":""}
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.router.navigate(['/home']);
      }
    })
  }

  ngOnInit() {
  }

// login with email with routerlink to '/login-email'

  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup //0
    }).then((success) => {
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.error = error;
    });
  }

  loginGoogle(){
    this.af.auth.login({
      provider: AuthProviders.Google, //3
      method: AuthMethods.Popup //0
    }).then((succes) => {
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.error = error;
    });
  }

}
