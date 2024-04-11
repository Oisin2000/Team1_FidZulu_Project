import { TestBed } from '@angular/core/testing';

import { TeamServiceService } from './team-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Team } from '../models/team';

describe('TeamService', () => {
  let service: TeamServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamServiceService]
    });
    service = TestBed.inject(TeamServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch team data from the API via GET', () => {
    const mockTeamData = {
      team: 'Team One',
      membersNames: ['Eve', 'Sean', 'Oisin', 'Liam', 'Robert']
    };

    service.getTeamData().subscribe(data => {
      expect(data).toEqual(jasmine.objectContaining(mockTeamData));
    });

    const req = httpTestingController.expectOne('http://localhost:3021/classA/team');
    expect(req.request.method).toBe('GET');
    req.flush(mockTeamData);
  });
});