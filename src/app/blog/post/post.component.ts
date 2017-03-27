import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  canActivate:boolean=true;
  post: FirebaseListObservable<any>;
  key:string;

  constructor(public af: AngularFire, 
              private router: Router,
              private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id']){
        this.key = params['id'];
        this.af.database.object('/posts/' + this.key).subscribe(post => {
          this.af.auth.subscribe( auth => {
            if(auth.uid == post.authorUID){this.canActivate =true}
          });
          this.post = post;

        });
      }else{
        //console.log(this.af.database.object('/post').last);
      }
    });
  }

}
