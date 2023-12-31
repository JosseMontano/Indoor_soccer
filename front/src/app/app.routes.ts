import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { SoccerGamesComponent } from './soccer-games/soccer-games.component';

interface RoutesVecType {
  path: string;
  showDash: boolean;
}

export const RoutesVec: RoutesVecType[] = [
  {
    path: '/',
    showDash: true,
  },
  {
    path: '/login',
    showDash: false,
  },
  {
    path: '/user',
    showDash: true,
  },
  {
    path: '/teams',
    showDash: true,
  },
  {
    path: '/jugadores',
    showDash: true,
  },
  {
    path: '/partidos',
    showDash: true,
  },
];

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'teams', component: TeamComponent },
  { path: 'jugadores', component: PlayerComponent },
  { path: 'partidos', component: SoccerGamesComponent },
];
