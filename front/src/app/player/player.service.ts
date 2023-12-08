import { Injectable } from '@angular/core';


import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { PlayerDto } from './plater.dto';
import { HttpClient } from '@angular/common/http';
import { RequestsI } from '../../interfaces/request';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  private endPoint = environment.url + 'Player';


  constructor(private http: HttpClient) { }

  getList(): Observable<PlayerDto[]> {
    return this.http.get<PlayerDto[]>(`${this.endPoint}`);
  }

  
  add(player: PlayerDto): Observable<RequestsI<PlayerDto>> {
    return this.http.post<RequestsI<PlayerDto>>(`${this.endPoint}`, player);
  }


  delete(playerId: number): Observable<void> {
    return this.http.delete<void>(`${this.endPoint}/${playerId}`);
  }
}
