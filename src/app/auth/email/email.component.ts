import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

import {moveIn, fallIn } from '../../router.animation';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn() ],
  host: {'[@moveIn]':''}
})
export class EmailComponent implements OnInit {
  error: any;

  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe( auth =>{
      if(auth){
        this.router.navigateByUrl('/home');
      }
    })
  }

  onsubmit(formData){
    if(formData.valid) {
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },{
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((success) => {
        this.router.navigate(['/home']);
      }).catch((error) => {
        console.log(error);
        this.error = error;
      })
    }
  }



  ngOnInit() {
  }

}
