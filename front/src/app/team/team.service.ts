import { Injectable } from '@angular/core';


import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { teamDto } from './team.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TeamService {

  private endPoint = environment.url + 'Team';


  constructor(private http: HttpClient) { }

  getList(): Observable<teamDto[]> {
    return this.http.get<teamDto[]>(`${this.endPoint}`);
  }

  
  add(team: teamDto): Observable<string> {
    return this.http.post<string>(`${this.endPoint}`, team);
  }


  delete(teamId: number): Observable<void> {
    return this.http.delete<void>(`${this.endPoint}/${teamId}`);
  }
}
