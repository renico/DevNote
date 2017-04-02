import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseApp} from 'angularfire2';
import { ImgPipe } from './../img-pipe.pipe';

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
        });
      } else {
        this.router.navigateByUrl('/blog/posts');

      }
    });

  }

}
