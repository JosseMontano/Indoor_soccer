import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { teamDto } from './team.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
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
    private formBuilder: FormBuilder
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
    console.log('click');
    const request: teamDto = {
      id: 0,
      name: this.formTeam.value.name,
    };

    this._teamService.add(request).subscribe({
      next: (v) => {
        this.teamList.push(request);
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
}
