import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page.component';
import { MainService } from '../services/main.service';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let mainService: MainService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      imports: [HttpClientModule],
      providers: [MainService] // Provide your MainService here
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    mainService = TestBed.inject(MainService); // Inject MainService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleTable', () => {
    it('should toggle showBikes when table is bikes', () => {
      component.toggleTable('bikes');
      expect(component.showBikes).toBe(true);
    });
 
    it('should toggle showBooks when table is books', () => {
      component.toggleTable('books');
      expect(component.showBooks).toBe(true);
    });
 
    it('should toggle showDVDs when table is dvds', () => {
      component.toggleTable('dvds');
      expect(component.showDVDs).toBe(true);
    });
 
    it('should toggle showFood when table is food', () => {
      component.toggleTable('food');
      expect(component.showFood).toBe(true);
    });
 
    it('should toggle showLaptops when table is laptops', () => {
      component.toggleTable('laptops');
      expect(component.showLaptops).toBe(true);
    });
 
    it('should toggle showToys when table is toys', () => {
      component.toggleTable('toys');
      expect(component.showToys).toBe(true);
    });
 
    it('should not change any flags if an invalid table is provided', () => {
      component.showBikes = true;
      component.toggleTable('invalid');
      expect(component.showBikes).toBe(true);
    });
  });

});
