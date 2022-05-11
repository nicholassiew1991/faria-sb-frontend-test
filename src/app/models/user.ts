import { Friend } from "./friend";

export interface User {
  _id: string;
  index: number;
  guid: string;
  isActive: boolean;
  balance: number;
  picture: string;
  age: number;
  eyeColor: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  registered: Date;
  latitude: number;
  longitude: number;
  tags: string[];
  friends: Friend[];
  greeting: string;
  favoriteFruit: string;
}
