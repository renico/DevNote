import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  AfterContentInit,
  ElementRef,
  ViewChild,
  ContentChildren,
  Renderer2
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseApp} from 'angularfire2';

import { FirebaseUrlPipe } from './../../pipe/firebase-url.pipe';
import { BlogService } from './../../services/blog.service';
// import { HighlightJsService } from 'angular2-highlight-js';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements AfterViewInit, AfterContentInit {
  node: string;
  @ViewChild('divContent') el: ElementRef;
  @ContentChildren('divContent') divContent: ElementRef;
  canActivate = false;
  post: FirebaseListObservable<any>;
  // service: HighlightJsService;

  constructor(
    private rd: Renderer2,
    private bs: BlogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private _service: HighlightJsService,
    ) {
      // this.service = _service;
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        bs.readPost(params['id']).subscribe(post => {
          this.post = post;
        });
      }
    });
  }

  ngAfterViewInit(){
    // this.el.nativeElement.querySelector('.highlight');
  }

  ngAfterContentInit() {
    //console.log(this.rd.selectRootElement('.divContent'));
    // this.service.highlight(this.el.nativeElement.querySelector('.highlight'));
    // this.service.highlight(this.ref.nativeElement.querySelector('#divContent'));
    //console.log(this.divContent);
    //this.service.highlight(this.divContent.nativeElement.querySelector('divContent'));
  }

}
