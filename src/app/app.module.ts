import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { firebaseConfig } from './firebase.config';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { CKEditorModule } from 'ng2-ckeditor';


import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { BlogService } from './services/blog.service';

import { CurrentUserComponent } from './auth/current-user/current-user.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmailComponent } from './auth/email/email.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './blog/edit/edit.component';
import { PostsListComponent } from './blog/posts-list/posts-list.component';
import { PostComponent } from './blog/post/post.component';
import { CommentComponent } from './blog/comment/comment.component';
import { CommentsListComponent } from './blog/comments-list/comments-list.component';
import { FirebaseUrlPipe } from './pipe/firebase-url.pipe';

import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmailComponent,
    HomeComponent,
    CurrentUserComponent,
    EditComponent,
    PostsListComponent,
    PostComponent,
    CommentComponent,
    CommentsListComponent,
    FirebaseUrlPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes,
    FlexLayoutModule.forRoot(),
    MaterialModule.forRoot(),
    CKEditorModule,
    BrowserAnimationsModule,
    HighlightJsModule,
  ],
  providers: [AuthService, BlogService, HighlightJsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
