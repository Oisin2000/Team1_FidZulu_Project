import { Component } from '@angular/core';
import { TeamServiceService } from '../services/team-service.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent {
  showTeamData: boolean = false;
  teamData: any;

  constructor(private teamService: TeamServiceService) {}

  ngOnInit(): void {
    this.fetchTeamData()
  }

  fetchTeamData(): void {
    this.teamService.getTeamData().subscribe(data => this.teamData = data)
  }

  toggleTeamData(): void {
    this.showTeamData = !this.showTeamData;
  }

}
