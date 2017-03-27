import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css']
})
export class CurrentUserComponent implements OnInit {
  userConnected:Boolean;
  error: any;

  profilePictUrl: string;
  userName: string;

  constructor(private af : AngularFire, private router: Router) {}

  ngOnInit() {
    this.af.auth.subscribe( auth => {
      if(auth){
        this.profilePictUrl = "url(" + auth.auth.photoURL + ")";
        console.log("profilePictUrl:" + this.profilePictUrl);
        this.userName = auth.auth.displayName;
        this.userConnected = true;
        console.log("userConnected");

      }
    })
  }

  signIn(){
    this.router.navigate(['/login']);
  }

  signOut(){  
    this.af.auth.logout().then((success) => {
      this.userConnected = false;
    }).catch((error) => {
      console.log(error);
    });
  }

}
