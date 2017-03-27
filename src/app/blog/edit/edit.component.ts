import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  error: any;
  state: string; // property for animations

  item: FirebaseListObservable<any>;
  auth: any;
  key: string;

  constructor(
    public af: AngularFire,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.af.auth.subscribe(auth => {
      console.log('auth:' + auth);
      this.auth = auth;
    });
  }
  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      this.key = params['id'];
      this.af.database.object('/posts/' + this.key).subscribe(post => {
        this.item = post;
        console.log('this.item:' + this.item);
      });
    });
  }

  onCreate(formData) {
    console.log('onSubmit()');
    console.log('this.auth.displayName:' + this.auth.displayName);
    if (formData) {
      console.log(formData);
      const post = {
        'title': formData.value.title,
        'content': formData.value.content,
        'cols': formData.value.cols,
        'rows': formData.value.rows,
        'color': formData.value.color,
        'authorUID': this.auth.uid,
        'authorName': this.auth.auth.displayName,
        'authorPict': this.auth.auth.photoURL,
        'date': Date.now()
      };
      this.key = this.af.database.list('/posts').push(post).key;
      console.log('key:' + this.key);
    };
  }

  onUpdate(formData) {
    console.log('onUpdate()');
    if (formData) {
      const post = {
        'title': formData.value.title,
        'content': formData.value.content,
        'cols': formData.value.cols,
        'rows': formData.value.rows,
        'color': formData.value.color,
        'authorUID': this.auth.uid,
        'authorName': this.auth.auth.displayName,
        'authorPict': this.auth.auth.photoURL,
        'maj': Date.now()
      };
      this.af.database.object('/posts/' + this.key).update(post).then(
        success => {
          this.router.navigateByUrl('/home');
        }).catch(
        error => {
          console.log(error);
        });
    };
  }

}
