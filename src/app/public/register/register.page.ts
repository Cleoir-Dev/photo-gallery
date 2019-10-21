import { DatabaseService } from './../../services/database.service';
import { AuthenticationService } from './../../services/authentication.service';
import { User } from './../../Models/user.model';
import { NgForm } from '@angular/forms';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

user: User;

  constructor(private authService: AuthenticationService, private db: DatabaseService) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    this.db.addUser(form.controls['firstName'].value,
                    form.controls['lastName'].value,
                    form.controls['email'].value);
    this.resetForm(form);
    return this.authService.register();
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }
}
