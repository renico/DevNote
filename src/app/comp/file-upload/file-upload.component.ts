import { Directive, Component, Inject, Input, OnInit } from '@angular/core';
import {MdSnackBar} from '@angular/material';
import { FirebaseRef, FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'app-file-upload',
  templateUrl: 'file-upload.component.html',
})
export class FileUploadComponent {
  public item: any;
  // private uid: string;
  private ref: any;
  private storage: any;

  constructor( @Inject(FirebaseApp) firebaseApp: firebase.app.App,
               @Inject(FirebaseRef) ref,
               public snackBar: MdSnackBar) {
      this.ref = ref.database().ref();
      this.storage = firebaseApp.storage();
      // this.uid = localStorage.getItem('uid');
  }

// Saves a new message containing an image URI in Firebase.
// This first saves the image in Firebase storage.
saveImage(filePicker) {
  console.dir(filePicker);
  const file = filePicker.files[0];

  // Clear the selection in the file picker input.
  //formData.reset();

  // Check if the file is an image.
  if (!file.type.match('image.*')) {
    this.snackBar.open('You can only share images ', 'Yes', {duration: 3000, });
    return;
  } else {
    this.snackBar.open('You are ready to share images ', 'Yes', {duration: 3000, });
  }
/*
  // We add a message with a loading icon that will get updated with the shared image.
  var currentUser = this.auth.currentUser;
  this.messageRef.push({
    name: currentUser.displayName,
    imageUrl: FriendlyChat.LOADING_IMAGE_URL,
    photoUrl: currentUser.photoURL || '/images/profile_placeholder.png'
  }).then(function (data) {

    // Upload the image to Cloud Storage.
    var filePath = currentUser.uid + '/' + data.key + '/' + file.name;
    return this.storage.ref(filePath).put(file).then(function (snapshot) {

      // Get the file's Storage URI and update the chat message placeholder.
      var fullPath = snapshot.metadata.fullPath;
      return data.update({ imageUrl: this.storage.ref(fullPath).toString() });
    }.bind(this));
  }.bind(this)).catch(function (error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
  });

*/
};

  // public fileOverBase(e: any): void {
  //   this.hasBaseDropZoneOver = e;
  // }

  // public fileOverAnother(e: any): void {
  //   this.hasAnotherDropZoneOver = e;
  // }

  // onUpload(filename, imageRef): void {
  //   console.log(this.uploader);
  //   const fileName: string = filename + new Date().getTime() + '.png';
  //   const timestamp: number = new Date().getTime();

  //   const fileRef: any = this.storage.ref(`images/${fileName}`);
  //   const uploadTask: any = fileRef.put(this.uploader.queue[this.uploader.queue.length - 1]['_file']);

  //   uploadTask.on('state_changed',
  //     (snapshot) => console.log('snapshot progress ' + snapshot),
  //     (error) => console.log(error),
  //     () => {
  //       const data = {
  //         src: uploadTask.snapshot.downloadURL,
  //         raw: fileName,
  //         createdAt: timestamp,
  //         createdBy: this.uid,
  //         updatedAt: timestamp,
  //         updatedBy: this.uid
  //       };
  //       let updates = {};
  //       updates[imageRef] = data;
  //       this.ref.update(updates);
  //     }
  //   );
  // }
}
