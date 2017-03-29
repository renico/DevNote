import { Component, OnInit, Input, Output } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
 @Input() comments: FirebaseListObservable<any[]>;
 @Input() postKey;

  constructor(public af: AngularFire) { }

  ngOnInit() {
    if (!this.comments) {
      this.comments = this.af.database.list('postComments' + this.postKey);
    }
  }

}
