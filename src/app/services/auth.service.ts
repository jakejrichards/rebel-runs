import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public angularFireAuth: AngularFireAuth,
  ) {}

  user = this.angularFireAuth.user;

  login() {
    this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }
}
