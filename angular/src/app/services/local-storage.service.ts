import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  get(key: string) {
    const val = sessionStorage.getItem(key);
    if (!val) {
      return undefined;
    }
    return JSON.parse(val);
  }

  save(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
}
