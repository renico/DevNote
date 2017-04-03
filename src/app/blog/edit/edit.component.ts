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
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('params["id"]: ' + params['id']);
      if (params['id']) {
        bs.readPost(params['id']).subscribe(post => {
          this.post = post;
        });
      } else {
        bs.currentKey = null;
      }
    });
  }

  onUpdate(formData) {
    this.bs.updatePost(formData);
  }

  saveImage(filePicker) {
    this.bs.saveImage(filePicker);
  }
  // saveImage(filePicker) {
  //   console.dir(filePicker);
  //   const file = filePicker.files[0];


  //   // Check if the file is an image.
  //   if (!file) {
  //    this.snackBar.open('Need a image to upload ', 'Yes', { duration: 3000, });
  //     return;
  //   } else if (!file.type.match('image.*')) {
  //     this.snackBar.open('You can only share images ', 'Yes', { duration: 3000, });
  //     return;
  //   } else {
  //     this.snackBar.open('You are ready to share images ', 'Yes', { duration: 3000, });
  //   }

  //   this.af.database.object('/blog/postsDesc/' + this.key).update({
  //     imageUrl: this.LOADING_IMAGE_URL,
  //   }).then(function (data) {

  //     // Upload the image to Cloud Storage.
  //     const filePath = 'blog/posts/' + this.key + '/' + file.name;
  //     return this.storage.ref(filePath).put(file).then(function (snapshot) {

  //       // Get the file's Storage URI and update the post placeholder.
  //       const fullPath = snapshot.metadata.fullPath;
  //       console.log('imageUrl:' + fullPath);
  //       console.log(data);
  //       return this.af.database.object('/blog/postsDesc/' + this.key)
  //         .update({ imageUrl: this.storage.ref(fullPath).toString() })
  //         .then(
  //           this.af.database.object('/blog/posts/' + this.key)
  //           .update({ imageUrl: this.storage.ref(fullPath).toString() }));
  //     }.bind(this));
  //   }.bind(this)).catch(function (error) {
  //     console.error('There was an error uploading a file to Cloud Storage:', error);
  //   });

  // }


/*
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
        this.af.database.object('/blog/posts/' + this.key).update(post).then(
          success => {
            // this.router.navigateByUrl('/home');
          }).catch(
          error => {
            console.log(error);
          });

        this.af.database.object('/blog/postsDesc/' + this.key).update(desc).then(
          success => {
            this.snackBar.open('post saved', '', {duration: 2000, });
          }).catch(
          error => {
            console.log(error);
          });
      } else {
        this.key = this.af.database.list('/blog/posts').push(post).key;
        this.af.database.object('/blog/postsDesc/' + this.key).update(desc);
      }
    }
  }

  onDelete() {
    console.log('onDelete');
    this.snackBar.open('Do you want to delete this post? ', 'Yes', {duration: 3000, })
      .onAction().subscribe(() => {
        this.deletePost();
      });
  }

  deletePost() {
     console.log('deletePost');
    this.af.database.list('/blog/posts/' + this.key).remove();
    this.af.database.list('/blog/postsDesc/' + this.key).remove()
    .then( success =>  {
      this.snackBar.open('post deleted', '', {duration: 2000, });
      this.router.navigateByUrl('/home');
    });
  }
  */

  // loadImage( _imageUri, imgElement) {
  //   console.log('loadImage');
  //   const imageUri = _imageUri;
  //   if (imageUri.startsWith('gs://')) {
  //     imgElement.src = this.LOADING_IMAGE_URL; // Display a loading image first.
  //     this.storage.refFromURL(imageUri).getMetadata().then(function (metadata) {
  //       imgElement.src = metadata.downloadURLs[0];
  //     });
  //   } else {
  //     imgElement.src = imageUri;
  //   }
  // }

}
