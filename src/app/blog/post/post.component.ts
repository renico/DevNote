import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseApp} from 'angularfire2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  LOADING_IMAGE_URL: string = 'https://www.google.com/images/spin-32.gif';
  canActivate = false;
  post: FirebaseListObservable<any>;
  key: string;
  imageSrc = 'https://www.google.com/images/spin-32.gif';
  private storage: any;
  private firebase: any;

  constructor(
    @Inject(FirebaseApp) firebaseApp: firebase.app.App,
    public af: AngularFire,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
      this.storage = firebaseApp.storage();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.af.database.object('/blog/posts/' + params['id']).subscribe(post => {
          this.post = post;
          if (post['imageUrl'] && post['imageUrl'].startsWith('gs://')) {
            // this.imageSrc = this.LOADING_IMAGE_URL; // Display a loading image first.
            // this.storage.ref().child(this.post['imageUrl'])
            // .getDownloadURL().then( url => this.imageSrc = url );
            this.storage.refFromURL(post['imageUrl']).getMetadata().then(metadata => {
              console.log('metadata.downloadURLs[0]:' + metadata.downloadURLs[0]);
              this.imageSrc = metadata.downloadURLs[0].toString();
            });
          } else {
            this.imageSrc = post['imageUrl'];
          }
        });
      } else {
        this.router.navigateByUrl('/blog/posts');

      }
    });

  }

}
