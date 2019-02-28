import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, NavController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(
    public auth: AuthService,
    public alertController: AlertController,
    private router : Router,
  ) {}

  async login() {
    this.auth.login();
  }

  homepage(){
    this.router.navigateByUrl('/home');

  }
  
  logout() {
    this.auth.logout();
  }
  /**
  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Logged In',
      subHeader: '',
      message: 'You have been successfully logged in',
      buttons: ['OK']
    });

    await alert.present();
  }  */
}
