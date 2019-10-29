import { MenuConfig } from './tab1-config';
import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../Models/user.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {
  users: User[] = [];
  menu = MenuConfig;
  constructor(private db: DatabaseService) { }

  ngOnInit() {
    // this.db.getDatabaseState().subscribe(data => {
    //   if (data) {
    //     this.db.getUsers().subscribe(users => {
    //       this.users = users;
    //     });
    //   }
    // });
  }


  //movimentar menum
  // onRenderItems(event) {
  //   console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
  //   event.detail.complete();
  // }
}
