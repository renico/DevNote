import { Component, OnInit, Input, Output } from '@angular/core';
import { AngularFire } from 'angularfire2';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: any;

  constructor(public af: AngularFire) {}

  ngOnInit() {

  }

}
