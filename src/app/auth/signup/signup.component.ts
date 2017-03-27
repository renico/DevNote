import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { moveIn, fallIn } from '../../router.animation';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]':''}
})
export class SignupComponent implements OnInit {
  error: any;
  state: string = ''; // property for animations.

  constructor(public af: AngularFire, private router : Router) { }

  onSubmit(formData){
    if(formData){
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then((success) =>{
        this.router.navigate(['/home']);
      }).catch((error) => {
        this.error = error;
      })
    }
  }

  ngOnInit() {
  }

}
