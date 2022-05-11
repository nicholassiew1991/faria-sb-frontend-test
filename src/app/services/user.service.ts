import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import UsersJson from '../../assets/users.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = []

  constructor() {
    this.users = (UsersJson as []).map(x => this.rawDataUserMapper(x));
  }

  listUsers(sortFn?: (a: User, b: User) => number): User[] {
    let data = this.users;

    if (sortFn) {
      data = data.sort(sortFn);
    }

    return data;
  }

  searchByName(name: string, sortFn?: (a: User, b: User) => number): User[] {

    if (!name) {
      return this.listUsers(sortFn);
    }

    return this.users.filter(x => x.name.toLowerCase().includes(name.toLowerCase()) == true).sort(sortFn);
  }

  private rawDataUserMapper(obj: any) : User {
    return {
      name: obj.name,
      age: obj.age,
      email: obj.email,
      balance: Number(obj.balance.replace(',', '')),
      registered: this.parseRegisteredDateTime(obj.registered),
      _id: obj._id,
      index: obj.index,
      guid: obj.guid,
      isActive: obj.isActive,
      picture: obj.picture,
      eyeColor: obj.eyeColor,
      gender: obj.gender,
      company: obj.company,
      phone: obj.phone,
      address: obj.address,
      about: obj.about,
      latitude: obj.latitude,
      longitude: obj.longitude,
      tags: obj.tags,
      friends: obj.friends,
      greeting: obj.greeting,
      favoriteFruit: obj.favoriteFruit
    } as User
  }

  private parseRegisteredDateTime(str: string) : Date {

    let lastColonIndex = str.lastIndexOf(':');
    str = str.slice(0, lastColonIndex) + str.slice(lastColonIndex + 1);
    str = str.replace(' ', '');

    return new Date(Date.parse(str))
  }
}
