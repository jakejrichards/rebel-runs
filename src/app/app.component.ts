import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { Router } from "@angular/router";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  logoutButtonClass: "logout" | "hidden" = "logout";

  constructor(
    private authService: AuthService,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }
  async initializeApp() {
    await this.platform.ready();

    this.authService.angularFireAuth.user.subscribe(user => {
      if (!user) this.router.navigateByUrl("/login");
    });

    this.statusBar.styleDefault();
    this.splashScreen.show();
    this.splashScreen.hide();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
