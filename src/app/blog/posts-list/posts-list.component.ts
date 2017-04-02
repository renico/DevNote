import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { ImgPipe} from './../img-pipe.pipe';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: FirebaseListObservable<any>;
  private storage: any;

  constructor( public af: AngularFire,
               private router: Router,
               @Inject(FirebaseApp) firebaseApp: firebase.app.App) {
    this.storage = firebaseApp.storage();
    this.posts = af.database.list('/blog/postsDesc');
    this.posts.forEach( post => console.log(post));
   }

  ngOnInit() {
  }
}


