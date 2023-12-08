import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStoreService } from './login.store.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../components/alert/alert.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AlertComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  //alert
  msg = 'Contraseña incorrecta';
  showAlert = false;
  handleShowAlert() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
  }

  //form
  formLogin!: FormGroup;

  //signals
  userAuth = inject(LoginStoreService);

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.formLogin = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    const password: string = this.formLogin.value.password;
    const email: string = this.formLogin.value.email;

    if (email == 'admin' && password == '123456') {
      this.userAuth.login();
      this.router.navigate(['/teams']);
    } else {
      this.handleShowAlert();
    }
  }
}
