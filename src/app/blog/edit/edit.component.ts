import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseRef, FirebaseApp } from 'angularfire2';


import { FirebaseUrlPipe } from './../../pipe/firebase-url.pipe';
import { BlogService } from './../../services/blog.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  error: any;
  state: string; // property for animations
  post: FirebaseListObservable<any>;

  constructor(
              private bs: BlogService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        bs.readPost(params['id']).subscribe( post => this.post = post );
      } else {
        bs.currentKey = null;
      }
    });
  }

  onUpdate(formData) {
    this.bs.updatePost(formData);
  }

  onDelete() {
    this.bs.deletePost();
  }

  saveImage(filePicker) {
    this.bs.saveImage(filePicker);
  }

}
