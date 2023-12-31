import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { RoutesVec } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  routesVec = RoutesVec;
  showDash = false;

  constructor(private router: Router) {
    //get the route to show or hide the sidebar
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const routeFound = this.routesVec.find((v) => v.path === e.url);
        if (routeFound?.showDash) {
          this.showDash = routeFound.showDash;
        } else {
          this.showDash = false;
        }
      }
    });
  }
}
