import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  dataSource: User[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.dataSource = this.userService.listUsers((a, b) => a.name.localeCompare(b.name));
  }

}
