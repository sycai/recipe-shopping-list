import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Resources } from './shared/resources';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp(Resources.config);
  }
}
