import { Injectable, Inject } from '@angular/core';
import {
  AngularFire,
  AngularFireAuth,
  FirebaseApp,
  FirebaseListObservable
} from 'angularfire2';
import { Router } from '@angular/router';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Injectable()
export class BlogService {
  public angularFire: AngularFire;
  public auth: any;
  public currentKey: string;
  public currentPost: FirebaseListObservable<any>;
  public storage: any;


  constructor(  public _angularFire: AngularFire,
                public _auth: AngularFireAuth,
                @Inject(FirebaseApp) firebaseApp: firebase.app.App,
                public snackBar: MdSnackBar,
                public router: Router,
            ) {
    this.angularFire = _angularFire;
    this.angularFire.auth.subscribe(auth => this.auth = auth);
    this.storage = firebaseApp.storage();
  }

  readPost(key): any {
    if (key && key !== 'undefind' && key != null) {
      this.currentKey = key;
    } else {
      console.log('Wrong key format: ${key}');
      return null;
    }
    return this.angularFire.database.object('/blog/posts/' + this.currentKey);
  }

  /** U P D A T E
   @param {any} formData
   @param {string} key
   */
  updatePost(formData) {
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

      if ( this.currentKey ) {
        this.angularFire.database.object('/blog/posts/' + this.currentKey)
          .update(post)
          .then(success => {
            this.angularFire.database.object('/blog/postsDesc/' + this.currentKey)
              .update(post)
              .then(_success => this.snackBar.open('post Updated: ' + this.currentKey, '', { duration: 2000, }))
              .catch(error => console.log('Error postsDesc update: ' + this.currentKey + ' ' + error));
          })
          .catch(error => console.log('Error post update: ' + this.currentKey + ' ' + error));
      } else {
        this.currentKey = this.angularFire.database.list('/blog/posts/')
          .push(post)
          .then(success => {
            console.log(success.key);
            this.angularFire.database.object('/blog/postsDesc/' + success.key)
              .update(desc)
              .then( _success => this.snackBar.open('post created: ' + success.key, '', { duration: 2000, }))
              .catch(error => console.log('Error postsDesc created: ' + this.currentKey + ' ' + error));
          })
          .catch(error => console.log('Error post create: ' + error))
          .key;
      }
    }
  }


  saveImage(filePicker) {
    if (this.currentKey && this.currentKey != null) {
      const file = filePicker.files[0];
      // Check if the file is an image.
      if (!file) {
        this.snackBar.open('Need a image to upload ', 'Yes', { duration: 3000, });
        return;
      } else if (!file.type.match('image.*')) {
        this.snackBar.open('You can only share images ', 'Yes', { duration: 3000, });
        return;
      }

      // Upload the image to Cloud Storage.
      const filePath = 'blog/posts/' + this.currentKey + '/' + file.name;
      this.storage.ref(filePath).put(file).then(snapshot => {
        // Get the file's Storage URI and update the post placeholder.
        const fullPath = snapshot.metadata.fullPath;
        this.angularFire.database.object('/blog/postsDesc/' + this.currentKey)
          .update({ imageUrl: this.storage.ref(fullPath).toString() })
          .then(success => {
            this.angularFire.database.object('/blog/posts/' + this.currentKey)
              .update({ imageUrl: this.storage.ref(fullPath).toString() })
              .then(_success => this.snackBar.open('image saved', '', { duration: 2000, }));
          });
      });
    } else {
      this.snackBar.open('You need to save post first ', '', { duration: 3000, });
    }
  }

  deletePost() {
    console.log('onDelete');
    let config = new MdSnackBarConfig();
    config.duration = 30000;
    config.extraClasses = ['bg-danger'];
    this.snackBar.open('Do you want to delete this post? ', 'Yes', config)
      .onAction().subscribe(() => {
        this.deletePosConfirme();
      });
  }
  deletePosConfirme() {
    this.angularFire.database.list('/blog/posts/' + this.currentKey).remove();
    this.angularFire.database.list('/blog/postsDesc/' + this.currentKey).remove()
      .then(success => {
        this.snackBar.open('post deleted', '', { duration: 2000, });
        this.router.navigateByUrl('/home');
      })
      .catch(error => console.log(error));
  }
}
