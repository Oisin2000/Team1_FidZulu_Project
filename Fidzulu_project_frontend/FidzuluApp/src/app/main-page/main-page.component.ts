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

 
    errorMessage: string = "";
 
    constructor(private mainService : MainService) { }
 
    ngOnInit() {
        this.getItems();
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

    getItems() {
        this.mainService.getBikes()
            .subscribe({
                next: data => {
                    console.log('Received bike data:', data); // Log the data
                    this.bikes = data;
                    this.errorMessage = '';
                },
                error: e => {
                    console.error('Error fetching bike data:', e); // Log any errors
                    this.errorMessage = e;
                }
            });
 
    //   this.mainService.getBooks()
    //         .subscribe({
    //             next: data => {
    //                 this.bikes = data;
    //                 this.errorMessage = '';
	// 			}, 
    //             error: e => this.errorMessage = e 
	// 		});
 
    //   this.mainService.getDVDs()
    //         .subscribe({
    //             next: data => {
    //                 this.bikes = data;
    //                 this.errorMessage = '';
	// 			}, 
    //             error: e => this.errorMessage = e 
	// 		});
 
      this.mainService.getFood()
                .subscribe({
                    next: data => {
                        console.log('Received food data:', data); // Log the data
                        this.food = data;
                        this.errorMessage = '';
                    },
                    error: e => {
                        console.error('Error fetching bike data:', e); // Log any errors
                        this.errorMessage = e;
                    }
                });
 
    //   this.mainService.getLaptops()
    //         .subscribe({
    //             next: data => {
    //                 this.bikes = data;
    //                 this.errorMessage = '';
	// 			}, 
    //             error: e => this.errorMessage = e 
	// 		});
 
      this.mainService.getToys()
            .subscribe({
                next: data => {
                    this.toys = data;
                    this.errorMessage = '';
				}, 
                error: e => this.errorMessage = e 
			});
    }
  }
