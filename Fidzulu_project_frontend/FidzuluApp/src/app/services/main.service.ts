import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class MainService {
 
 
  private baseUrl = 'http://localhost:3000'; // Replace with your backend URL
 
  constructor(private http: HttpClient) { }
 
  getBikes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bikes`);
  }
 
  getBooks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/books`);
  }
 
  getDVDs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dvds`);
  }
 
  getFood(): Observable<any> {
    return this.http.get(`${this.baseUrl}/food`);
  }
 
  getLaptops(): Observable<any> {
    return this.http.get(`${this.baseUrl}/laptops`);
  }
 
  getToys(): Observable<any> {
    return this.http.get(`${this.baseUrl}/toys`);
  }
 
 
}
