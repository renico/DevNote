import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  canActivate = false;
  post: FirebaseListObservable<any>;
  key: string;

  constructor(
    public af: AngularFire,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe((params: Params) => {
        af.database.object('/blog/posts/' + params['id']).subscribe(post => {
          this.post = post;
          // af.auth.subscribe(auth => {
          //   if (auth.uid === post.authorUID) {
          //     this.canActivate = true;
          //   }
          // });
        });
    });


    //       activatedRoute.params.subscribe((params: Params) => {
    //   if (params['id']) {
    //     this.key = params['id'];
    //     console.log('post key:' + this.key);
    //     af.database.object('/blog/posts' + this.key).subscribe(post => {
    //       this.post = post;
    //       console.log('post:' + post);
    //       af.auth.subscribe(auth => {
    //         if (auth.uid === post.authorUID) {
    //           this.canActivate = true;
    //         }
    //       });
    //     });
    //   } else {
    //     // console.log(this.af.database.object('/post').last);
    //   }
    // });
  }

  ngOnInit() {
  }

}
