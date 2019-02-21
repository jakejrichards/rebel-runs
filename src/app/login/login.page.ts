import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(
    public auth: AuthService,
  ) {}

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
