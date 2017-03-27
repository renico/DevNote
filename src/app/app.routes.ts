import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmailComponent } from './auth/email/email.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './blog/edit/edit.component';
import { PostComponent } from './blog/post/post.component';
import { PostsListComponent } from './blog/posts-list/posts-list.component';

import { AuthService } from './auth.service';

export const router : Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'home', component: HomeComponent },
    { path: 'blog/posts', component: PostsListComponent },
    { path: 'blog/edit-post/:id', component: EditComponent, canActivate: [AuthService] },
    { path: 'blog/post/:id', component: PostComponent },

    //{ path: 'admin', component: AdminComponent, canActivate: [AuthService] }
    //{ path: 'admin', component: AdminComponent, canActivate: [AuthService] }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);