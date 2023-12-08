import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { teamDto } from './team.dto';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { TeamService } from './team.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router } from '@angular/router';
import { PlayerI } from '../../interfaces/player';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
  showHello = false;

  handleModal(): void {
    this.showHello = !this.showHello;
  }

  teamList: teamDto[] = [];
  formTeam!: FormGroup;

  constructor(
    private _teamService: TeamService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formTeam = this.formBuilder.group({
      name: [''],
    });
  }

  getTeam() {
    this._teamService.getList().subscribe({
      next: (v) => {
        this.teamList = v;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  addTeam() {
    const player: PlayerI[] = [
      {
        id: 0,
        names: '0',
        lastNames: '0',
        teamId: 0,
      },
    ];
    const request: teamDto = {
      id: 0,
      name: this.formTeam.value.name,
      players: player,
    };
    
    this._teamService.add(request).subscribe({
      next: (v) => {
        this.teamList.push(v.data);
        this.formTeam.patchValue({
          name: '',
        });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  deleteTeam(id: number) {
    this._teamService.delete(id!).subscribe({
      next: () => {
        const nuevaList = this.teamList.filter((v) => v.id != id); //this is diferrend? so add it
        this.teamList = nuevaList;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {
    this.getTeam();
  }

  msgBtnNavbar = 'Cerrar sesion';
  redirectLogin() {
    this.router.navigate(['/login']);
  }
}
