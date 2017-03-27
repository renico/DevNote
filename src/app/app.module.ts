import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './firebase.config';

import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { CKEditorModule } from 'ng2-ckeditor';

import { CurrentUserComponent } from './auth/current-user/current-user.component';

import { AuthService } from './auth.service';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmailComponent } from './auth/email/email.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './blog/edit/edit.component';
import { PostsListComponent } from './blog/posts-list/posts-list.component';
import { PostComponent } from './blog/post/post.component';




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
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes,
    MaterialModule.forRoot(),
    CKEditorModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
