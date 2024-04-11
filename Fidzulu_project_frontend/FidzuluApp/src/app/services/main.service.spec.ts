import { TestBed } from '@angular/core/testing';

import { MainService } from './main.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MainService', () => {
  let service: MainService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MainService]
    });
    service = TestBed.inject(MainService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch bikes from the API via GET', () => {
    const region = 'testRegion';
    const mockResponse = [{ id: 1, name: 'Bike 1' }, { id: 2, name: 'Bike 2' }];

    service.getBikes(region).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${service['classA_url']}/bikes/all/${region}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch books from the API via GET', () => {
    const region = 'testRegion';
    const mockResponse = [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }];
  
    service.getBooks(region).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpTestingController.expectOne(`${service['classB_url']}/books/all/${region}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
  it('should fetch DVDs from the API via GET', () => {
    const region = 'testRegion';
    const mockResponse = [{ id: 1, title: 'DVD 1' }, { id: 2, title: 'DVD 2' }];
  
    service.getDVDs(region).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpTestingController.expectOne(`${service['classB_url']}/dvds/all/${region}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
  it('should fetch laptops from the API via GET', () => {
    const region = 'testRegion';
    const mockResponse = [{ id: 1, brand: 'Laptop 1' }, { id: 2, brand: 'Laptop 2' }];
  
    service.getLaptops(region).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpTestingController.expectOne(`${service['classB_url']}/laptops/all/${region}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch toys from the API via GET', () => {
    const region = 'testRegion';
    const mockResponse = [{ id: 1, name: 'Toy 1' }, { id: 2, name: 'Toy 2' }];
  
    service.getToys(region).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpTestingController.expectOne(`${service['classA_url']}/toys/all/${region}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
  
});

