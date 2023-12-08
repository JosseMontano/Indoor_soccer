import { Component, WritableSignal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStoreService } from '../../login/login.store.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  auth = inject(LoginStoreService);

  userLogged = false;
  constructor(private router: Router) {
    effect(() => {
      this.userLogged = this.auth.userAuth();
    });
  }

  redirectTo(param:string){
    this.router.navigate([param])
  }
}
