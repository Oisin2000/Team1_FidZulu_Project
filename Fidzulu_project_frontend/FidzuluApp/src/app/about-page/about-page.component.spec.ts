import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPageComponent } from './about-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TeamServiceService } from '../services/team-service.service';

describe('AboutPageComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;
  let teamService: TeamServiceService;
  let getTeamDataSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPageComponent],
      imports: [HttpClientModule],
      providers: [TeamServiceService]
    });
    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
    teamService = TestBed.inject(TeamServiceService);

    getTeamDataSpy = spyOn(teamService, 'getTeamData').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct button text', () => {
    const element = fixture.nativeElement;
    const button = element.querySelector('.team-button');
  
    expect(button.textContent).toContain('About Our Team');
  });

  it('should display the correct h1 content', () => {
    const element = fixture.nativeElement;
    const h1 = element.querySelector('.project-title');
  
    expect(h1.textContent).toContain('Team One Fidzulu Shop Front');
  });

  it('should display the correct h2 content', () => {
    const element = fixture.nativeElement;
    const h2 = element.querySelector('.project-sub-title');
  
    expect(h2.textContent).toContain('Click below to shop!');
  });
  
  it('should toggle team data', () => {
    component.toggleTeamData();
    expect(component.showTeamData).toBe(true);
    component.toggleTeamData();
    expect(component.showTeamData).toBe(false);
  });

  it('should fetch team data on init', () => {
    expect(getTeamDataSpy).toHaveBeenCalled();
  });

})

