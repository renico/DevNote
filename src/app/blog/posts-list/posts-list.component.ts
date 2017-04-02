import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { ImgPipe} from './../img-pipe.pipe';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: FirebaseListObservable<any>;
  private storage: any;

  constructor( public af: AngularFire,
               private router: Router,
               @Inject(FirebaseApp) firebaseApp: firebase.app.App) {
    this.storage = firebaseApp.storage();
    this.posts = af.database.list('/blog/postsDesc');
    this.posts.forEach( post => console.log(post));
   }

  ngOnInit() {
  }

  // getImageSrc(img: any, imageUrl: string){
  //    if (imageUrl.startsWith('gs://')) {
  //           // this.imageSrc = this.LOADING_IMAGE_URL; // Display a loading image first.
  //           // this.storage.ref().child(this.post['imageUrl'])
  //           // .getDownloadURL().then( url => this.imageSrc = url );
  //           this.storage.refFromURL(imageUrl).getMetadata().then(metadata => {
  //             img.src = metadata.downloadURLs[0].toString();
  //             console.log('getImageSrc:' + metadata.downloadURLs[0].toString());
  //           }).catch( error => console.log(error));
  //         } else {
  //           img.src =  imageUrl;
  //         }
  // }
}


