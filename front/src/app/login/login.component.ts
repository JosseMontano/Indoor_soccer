import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStoreService } from './login.store.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  //signals
  userAuth = inject(LoginStoreService);

  constructor(private router: Router) { }

  login(){
    this.userAuth.login();
    this.router.navigate(['/teams']);
  }
}
