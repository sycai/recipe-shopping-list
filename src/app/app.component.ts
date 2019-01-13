import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC32esK6hlrZ0lKRrc2tJf8qlkT1kjmv8o',
      authDomain: 'recipe-book-5c040.firebaseapp.com',
    });
  }
}
