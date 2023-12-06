import { Component, WritableSignal, effect, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStoreService } from '../../login/login.store.service';

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
  constructor() {
    effect(() => {
    this.userLogged = this.auth.userAuth(); 
  
    });
  }
}
