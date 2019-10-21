import { User } from './../../Models/user.model';
import { DatabaseService } from './../../services/database.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
user = new User();

  constructor(private authService: AuthenticationService,
              private db: DatabaseService,
              ) { }

  ngOnInit() {
    this.authService.checkToken();
  }

  login(form: NgForm) {
      this.db.getDatabaseState().subscribe(data => {
        if (data) {
          this.db.getUserExist(form.controls['email'].value, form.controls['password'].value).then(users => {
            this.user = users;
            if (this.user.id) {
              this.authService.getToken();
            }
          }).catch(() => {
             this.authService.login();
          });
        }
      });
      this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }

}
