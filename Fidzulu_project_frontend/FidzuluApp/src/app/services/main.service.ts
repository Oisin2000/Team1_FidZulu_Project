import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class MainService {
 
 
  private classA_url = 'http://localhost:3021/classA';
  private classB_url = 'http://localhost:3022/classB';
 
  constructor(private http: HttpClient) { }
 
  getBikes(region : string): Observable<any> {
    return this.http.get(`${this.classA_url}/bikes/all/${region}`);
  }
 
  getBooks(region : string): Observable<any> {
    return this.http.get(`${this.classB_url}/books/all/${region}`);
  }
 
  getDVDs(region : string): Observable<any> {
    return this.http.get(`${this.classB_url}/dvds/all/${region}`);
  }
 
  getFood(region : string): Observable<any> {
    return this.http.get(`${this.classA_url}/food/all/${region}`);
  }
 
  getLaptops(region : string): Observable<any> {
    return this.http.get(`${this.classB_url}/laptops/all/${region}`);
  }
 
  getToys(region : string): Observable<any> {
    return this.http.get(`${this.classA_url}/toys/all/${region}`);
  }
 
 
}
