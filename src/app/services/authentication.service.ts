import { AlertService } from './alert.service';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private router: Router,
              private storage: Storage,
              private plt: Platform,
              public toastController: ToastController,
              private alertService: AlertService) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  login() {
      return this.storage.get(TOKEN_KEY).then(data => {
        if (data) {
          this.alertService.presentToast('Logado');
          this.authenticationState.next(true);
        } else {
          this.alertService.errorToast('Usuário não registrado.');
        }
      });
  }

  register() {
    return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      this.alertService.presentToast('Registrado');
      this.router.navigate(['login']);
    });
  }

  getToken() {
    return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigate(['login']);
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
