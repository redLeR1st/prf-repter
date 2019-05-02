import { reservation } from './reservation';

export default class user {
  username: String;
  password:  String; 
  fullname: String;
  admin: boolean;
  email: String;
  reservations: reservation[] = [];
  }