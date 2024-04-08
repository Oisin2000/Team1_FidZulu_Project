import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { Bike } from '../models/bike';
import { Book } from '../models/book';
import { Dvd } from '../models/dvd';
import { Food } from '../models/food';
import { Laptop } from '../models/laptop';
import { Toy } from '../models/toy';
 
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
 
    constructor(private mainService: MainService) { }
 
    ngOnInit() {
        this.getItems();
    }
 
    getItems() {
        this.mainService.getBikes()
            .subscribe({
                next: data => {
                    this.bikes = data;
                    this.errorMessage = '';
				}, 
                error: e => this.errorMessage = e 
			});
 
      this.mainService.getBooks()
            .subscribe({
                next: data => {
                    this.bikes = data;
                    this.errorMessage = '';
				}, 
                error: e => this.errorMessage = e 
			});
 
      this.mainService.getDVDs()
            .subscribe({
                next: data => {
                    this.bikes = data;
                    this.errorMessage = '';
				}, 
                error: e => this.errorMessage = e 
			});
 
      this.mainService.getFood()
            .subscribe({
                next: data => {
                    this.bikes = data;
                    this.errorMessage = '';
				}, 
                error: e => this.errorMessage = e 
			});
 
      this.mainService.getLaptops()
            .subscribe({
                next: data => {
                    this.bikes = data;
                    this.errorMessage = '';
				}, 
                error: e => this.errorMessage = e 
			});
 
      this.mainService.getToys()
            .subscribe({
                next: data => {
                    this.bikes = data;
                    this.errorMessage = '';
				}, 
                error: e => this.errorMessage = e 
			});
    }
  }
