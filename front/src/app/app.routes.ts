import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'teams', component: TeamComponent },
  { path: 'jugadores', component: PlayerComponent },
];

