import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage {
  accountType: "owner" | "driver" | "customer" = "customer";

  constructor(
    public auth: AuthService,
    public alertController: AlertController,
    private router: Router
  ) {}

  async login() {
    if (!this.accountType) alert("You must select an account type");
    else this.auth.login(this.accountType);
  }

  homepage() {
    this.router.navigateByUrl("/home");
  }

  restaurants() {
    this.router.navigateByUrl("/restaurants");
  }

  logout() {
    this.auth.logout();
  }
}
