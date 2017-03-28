import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {MdSnackBar} from '@angular/material';

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
  // post = {
  //   'title': '',
  //   'content': '',
  //   'color': formData.value.color,
  //   'authorUID': this.auth.uid,
  //   'authorName': this.auth.auth.displayName,
  //   'authorPict': this.auth.auth.photoURL,
  //   'maj': Date.now()
  // };

  constructor(
    public af: AngularFire,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public snackBar: MdSnackBar) {}

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      this.auth = auth;
    });
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.key = params['id'];
        this.af.database.object('/posts/' + this.key).subscribe(post => {
          this.item = post;
        });
      }
    });
  }

  onUpdate(formData) {
    console.log('onUpdate()key:' + this.key);
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

      const desc = {
        'title': formData.value.title,
        'cols': formData.value.cols,
        'rows': formData.value.rows,
        'color': formData.value.color,
        'authorUID': this.auth.uid
      };

      if (this.key) {
        this.af.database.object('/posts/' + this.key).update(post).then(
          success => {
            // this.router.navigateByUrl('/home');
          }).catch(
          error => {
            console.log(error);
          });

        this.af.database.object('/postsDesc/' + this.key).update(desc).then(
          success => {
            this.snackBar.open('post saved', '', {duration: 2000, });
          }).catch(
          error => {
            console.log(error);
          });
      } else {
        this.key = this.af.database.list('/posts').push(post).key;
        this.af.database.list('/postsDesc/' + this.key).push(desc);
      }
    }
  }

  onDelete() {
    console.log('onDelete');
    this.snackBar.open('Do you want to delete this post? ', 'Yes')
      .onAction().subscribe(() => {
        this.deletePost();
      });
  }

  deletePost() {
     console.log('deletePost');
    this.af.database.list('/posts/' + this.key).remove();
    this.af.database.list('/postsDesc/' + this.key).remove()
    .then( success =>  this.snackBar.open('post deleted', '', {duration: 2000, }));
  }

}
