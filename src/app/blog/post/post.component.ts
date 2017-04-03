import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseApp} from 'angularfire2';

import { FirebaseUrlPipe } from './../../pipe/firebase-url.pipe';
import { BlogService } from './../../services/blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  canActivate = false;
  post: FirebaseListObservable<any>;

  constructor(
    private bs: BlogService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        bs.readPost(params['id']).subscribe(post => {
          this.post = post;
        });
      }
    });
  }
}
