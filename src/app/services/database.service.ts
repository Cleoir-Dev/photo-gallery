import { User } from './../Models/user.model';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  registers = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    if (this.plt.is('mobile')) {
      this.plt.ready().then(() => {
        this.sqlite.create({
          name: 'register.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
            this.database = db;
            this.seedDatabase();
        });
      });
    }
  }

  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadUsers();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getUsers(): Observable<User[]> {
    return this.registers.asObservable();
  }

  loadUsers() {
    return this.database.executeSql('SELECT * FROM register', []).then(data => {
      const users: User[] = [];

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          users.push({
            id: data.rows.item(i).id,
            firstName: data.rows.item(i).firstName,
            lastName: data.rows.item(i).lastName,
            email: data.rows.item(i).email
           });
        }
      }
      this.registers.next(users);
    });
  }

  addUser(firstName, lastName, email) {
    const data = [firstName, lastName, email];
    return this.database.executeSql('INSERT INTO register (firstName, lastName, email) VALUES (?, ?, ?)', data).then(data => {
      this.loadUsers();
    });
  }

  getUser(id): Promise<User> {
    return this.database.executeSql('SELECT * FROM register WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        firstName: data.rows.item(0).firstName,
        lastName: data.rows.item(0).lastName,
        email: data.rows.item(0).email
      };
    });
  }

  getUserExist(email, password): Promise<User> {
    const param = [email, password];
    return this.database.executeSql('SELECT * FROM register WHERE email = ? and password = ? ', param).then(data => {
      return {
        id: data.rows.item(0).id,
        firstName: data.rows.item(0).firstName,
        lastName: data.rows.item(0).lastName,
        email: data.rows.item(0).email
      };
    });
  }

  deleteUser(id) {
    return this.database.executeSql('DELETE FROM register WHERE id = ?', [id]).then(_ => {
      this.loadUsers();
    });
  }

  updateUser(user: User) {
    const data = [user.firstName, user.lastName, user.email];
    return this.database.executeSql(`UPDATE register SET name = ?, skills = ?, img = ? WHERE id = ${user.id}`, data).then(data => {
      this.loadUsers();
    });
  }

}
