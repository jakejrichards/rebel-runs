import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    public angularFireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {}

  user = this.angularFireAuth.user;

  login(accountType: "owner" | "driver" | "customer") {
    return this.angularFireAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(result => {
        const userId = `${accountType}.${result.user.uid}`;
        const account = this.db.collection("accounts").doc(userId);
        return account
          .get()
          .toPromise()
          .then(doc => {
            if (!doc.exists) {
              return this.db
                .collection("accounts")
                .doc(userId)
                .set({
                  id: userId,
                  name: result.user.displayName,
                  email: result.user.email,
                  accountType
                });
            }
          });
      })
      .then(() => {
        if (accountType === "customer") {
          this.router.navigateByUrl(`/restaurants`);
        } else {
          this.router.navigateByUrl(`/${accountType}`);
        }
      });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }
}
