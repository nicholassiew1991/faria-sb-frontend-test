import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  sortProperty: string = 'name';
  sortDirection: string = 'asc';
  dataSource: User[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.dataSource = this.userService.listUsers(this.getSortFunction());
  }

  sort(clickColumn: string) {

    if (clickColumn != this.sortProperty) {
      this.sortProperty = clickColumn;
      this.sortDirection = 'asc';
      console.log(this.sortProperty, this.sortDirection);
      return;
    }

    this.sortDirection = this.sortDirection == 'asc' ? 'desc' : 'asc';

    this.dataSource.sort(this.getSortFunction())
  }

  search(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource = this.userService.searchByName(value, this.getSortFunction());
  }

  private getSortFunction(): (a: User, b: User) => number {

    if (this.sortProperty == 'name') {
      return this.sortDirection == 'asc' ? (a, b) => a.name.localeCompare(b.name) : (a, b) => b.name.localeCompare(a.name);
    }
    else if (this.sortProperty == 'age') {
      return this.sortDirection == 'asc' ? (a, b) => a.age - b.age : (a, b) => b.age - a.age;
    }
    else if (this.sortProperty == 'registered') {
      return this.sortDirection == 'asc' ? (a, b) => a.registered.getTime() - b.registered.getTime() : (a, b) => b.registered.getTime() - a.registered.getTime();
    }
    else if (this.sortProperty == 'email') {
      return this.sortDirection == 'asc' ? (a, b) => a.email.localeCompare(b.email) : (a, b) => b.email.localeCompare(a.email)
    }
    else if (this.sortProperty == 'balance') {
      return this.sortDirection == 'asc' ? (a, b) => a.balance - b.balance : (a, b) => b.balance - a.balance;
    }

    /// default
    return (a, b) => a.name.localeCompare(b.name);
  }
}
