import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginStoreService {
  userAuth = signal<boolean>(false);

  login() {
    this.userAuth.update((_) => true);
  }

  logout() {
    this.userAuth.update((v) => !v);
  }
}
