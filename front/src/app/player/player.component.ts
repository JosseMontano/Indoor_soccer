import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerDto } from './plater.dto';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PlayerService } from './player.service';
import { TeamService } from '../team/team.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { teamDto } from '../team/team.dto';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit {
  showHello = false;

  handleModal(): void {
    this.showHello = !this.showHello;
  }

  msgBtnNavbar = 'Cerrar sesion';
  redirectLogin() {
    this.router.navigate(['/login']);
  }

  playerList: PlayerDto[] = [];
  formPlayer!: FormGroup;

  constructor(
    private _playerService: PlayerService,
    private _teamService: TeamService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formPlayer = this.formBuilder.group({
      age: [0],
      birthday: null,
      cellphone: [0],
      lastNames: [''],
      names: [''],
      photo: [''],
      teamId: [0],
      id: [0],
    });
  }

  ngOnInit(): void {
    this.getPlayers();
    this.getTeams();
  }
  
  teamList: teamDto[] = [];
  getTeams() {
    this._teamService.getList().subscribe({
      next: (v) => {
        this.teamList = v;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getPlayers() {
    this._playerService.getList().subscribe({
      next: (v) => {
        this.playerList = v;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  deletePlayer(id: number) {
    this._playerService.delete(id!).subscribe({
      next: () => {
        const nuevaList = this.playerList.filter((v) => v.id != id); //this is diferrend? so add it
        this.playerList = nuevaList;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  addPlayer() {
    const request: PlayerDto = {
      id: 0,
      age: this.formPlayer.value.age,
      birthday: this.formPlayer.value.birthday,
      cellphone: this.formPlayer.value.cellphone,
      lastNames: this.formPlayer.value.lastNames,
      names: this.formPlayer.value.names,
      photo: this.formPlayer.value.photo,
      teamId: this.formPlayer.value.teamId,
    };

    console.log(request);

    this._playerService.add(request).subscribe({
      next: (v) => {
        this.playerList.push(v.data);
        /*    this.formTeam.patchValue({
          name: '',
        }); */
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
