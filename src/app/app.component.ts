import { Component } from '@angular/core';
import firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wash-v3';

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAr0bkQTyoITvkiPFX7OZyezRSHag0s8Z0",
      authDomain: "clean-dev.firebaseapp.com",
      projectId: "clean-dev",
      storageBucket: "clean-dev.appspot.com",
      messagingSenderId: "861823155737",
      appId: "1:861823155737:web:d6c69ca05498b9d508b488",
      measurementId: "G-4W96NN4HZB"

    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Activation de la persistance de donnée
    firebase.firestore().enablePersistence();
  }
}
