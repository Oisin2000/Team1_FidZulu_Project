import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Team } from '../team';


@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {
  
  private url = 'http://localhost:3000/fidzulu/team'; // Replace with the actual endpoint path in your Angular application

  constructor(private http: HttpClient) { }

  getTeamData(): Observable<Team[]> {
    return this.http.get<Team[]>(this.url);
  }

}
