import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: FirebaseListObservable<any>;

  constructor( public af: AngularFire, private router: Router) {
    this.posts = af.database.list('/blog/postsDesc');
    this.posts.forEach( post => console.log(post));
   }

  ngOnInit() {
  }

}
