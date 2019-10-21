import { AuthenticationService } from './../services/authentication.service';
import { User } from './../Models/user.model';
import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  nameTab: string;
  users: User[] = [];
  constructor(private authService: AuthenticationService, private db: DatabaseService) { }

  ngOnInit() {
    this.nameTab = 'Menu';
    // this.db.getDatabaseState().subscribe(data => {
    //   if (data) {
    //     this.db.getUsers().subscribe(users => {
    //       this.users = users;
    //     });
    //   }
    // });
  }

  menu() {
    this.nameTab = 'Menu';
  }

  galeria() {
    this.nameTab = 'Galeria';
  }

  recursos() {
    this.nameTab = 'Recursos';
  }

  logout() {
    this.authService.logout();
  }
}
