import { Component, OnInit, Input, Output } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
 @Input() post;
  comments: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire) { }

  ngOnInit() {
    this.comments = this.af.database.list('postComments' + this.post.$key).then(
      success => {

      }).catch( error => console.log(error));
  }

}
