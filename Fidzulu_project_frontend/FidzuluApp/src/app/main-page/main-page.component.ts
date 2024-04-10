import { Component } from '@angular/core';
import { Bike } from '../models/bike';
import { Book } from '../models/book';
import { Dvd } from '../models/dvd';
import { Food } from '../models/food';
import { Laptop } from '../models/laptop';
import { Toy } from '../models/toy';
import { MainService } from '../services/main.service';
 
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
 
  bikes: Bike[] = [];
  books: Book[] = [];
  dvds: Dvd[] = [];
  food: Food[] = [];
  laptops: Laptop[] = [];
  toys: Toy[] = [];

  regionMap: { [key: string]: string } = {
    'ireland': 'ie',
    'india': 'in',
    'us': 'us-nc'
  };

 
    errorMessage: string = "";
 
    constructor(private mainService : MainService) { }
 
    ngOnInit() {
        const defaultRegion = 'ie';
        this.getItems(defaultRegion);
      }
    
    onRegionSelect(event: any) {
        const region = event.target.value;
        const regionAbbreviation = this.regionMap[region];
        console.log('Selected region:', region, 'Abbreviation:', regionAbbreviation);
        this.getItems(regionAbbreviation);
    }

  showBikes: boolean = false;
  showBooks: boolean = false;
  showDVDs: boolean = false;
  showFood: boolean = false;
  showLaptops: boolean = false;
  showToys: boolean = false;

  toggleTable(table: string): void {
    switch (table) {
      case 'bikes':
        this.showBikes = !this.showBikes;
        break;
      case 'books':
        this.showBooks = !this.showBooks;
        break;
      case 'dvds':
        this.showDVDs = !this.showDVDs;
        break;
      case 'food':
        this.showFood = !this.showFood;
        break;
      case 'laptops':
        this.showLaptops = !this.showLaptops;
        break;
      case 'toys':
        this.showToys = !this.showToys;
        break;
      default:
        break;
    }
  }

  getItems(region: string) {
    this.mainService.getBikes(region)
        .subscribe({
            next: data => {
                console.log('Received bike data:', data);
                this.bikes = data;
                this.errorMessage = '';
            },
            error: e => {
                console.error('Error fetching bike data:', e);
                this.errorMessage = e;
            }
        });
 
      this.mainService.getBooks(region)
            .subscribe({
                next: data => {
                    console.log('Received book data:', data);
                    this.books = data;
                    this.errorMessage = '';
				}, 
                error: e => this.errorMessage = e 
			});
 
      this.mainService.getDVDs(region)
            .subscribe({
                next: data => {
                    this.dvds = data;
                    this.errorMessage = '';
				}, 
                error: e => this.errorMessage = e 
			});
 
      this.mainService.getFood(region)
                .subscribe({
                    next: data => {
                        console.log('Received food data:', data);
                        this.food = data;
                        this.errorMessage = '';
                    },
                    error: e => {
                        console.error('Error fetching food data:', e);
                        this.errorMessage = e;
                    }
                });
 
      this.mainService.getLaptops(region)
            .subscribe({
                next: data => {
                    console.log('Received laptop data:', data);
                    this.laptops = data;
                    this.errorMessage = '';
				}, 
                error: e => this.errorMessage = e 
			});
 
      this.mainService.getToys(region)
      .subscribe({
          next: data => {
              console.log('Received toy data:', data);
              this.toys = data;
              this.errorMessage = '';
          },
          error: e => {
              console.error('Error fetching toys data:', e);
              this.errorMessage = e;
          }
      });
    }
  }
