import { Component } from '@angular/core';

import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Renico dev notes';
  items: Observable<any[]>;

  constructor (public af  : AngularFire){
    this.items = af.database.list('items');
  }
}
