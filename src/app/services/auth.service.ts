import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    public angularFireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  user = this.angularFireAuth.user;

  login() {
    this.angularFireAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(result => {
        if (result.additionalUserInfo.isNewUser) {
          this.db
            .collection("accounts")
            .doc(result.user.uid)
            .set({
              id: result.user.uid,
              name: result.user.displayName,
              email: result.user.email
            });
        }
      });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }
}
