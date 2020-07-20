import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

export interface User {
  id: string;
  name?: string;
  meetingUUID?: string;
  host?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  private userKey = 'mpUser';

  constructor(
    private localStorage: LocalStorageService
  ) { }

  init() {
    let user = this.localStorage.get(this.userKey);
    if (!user) {
      user = {
        id: this.uuidv4()
      };
      console.log('Creating new user');
      this.user = user;
      this.save();
      return;
    }

    this.user = user;

    console.log('USER', this.user);
  }

  save() {
    console.log('Saved user', this.user);
    this.localStorage.save(this.userKey, this.user);
  }

  setName(name) {
    this.user.name = name;
    this.save();
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (a, b) {
      return b = Math.random() * 16, (a === 'y' ? b & 3 | 8 : b | 0).toString(16);
    });
  }
}
