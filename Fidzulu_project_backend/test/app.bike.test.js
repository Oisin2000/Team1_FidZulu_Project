const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const supertest =  require('supertest');

const app = require('../src/app');

// Mock data for testing
const mockData = {
  india: [{
    id: 1,
    name: "Mamba Sport 12\" Balance Bike",
    brand: "Mamba Bikes",
    color: "black",
    price: 7448.7
  },
  {
    id: 2,
    name: "DJ Fat Bike 500W",
    brand: "DJ Bikes",
    color: "grey",
    price: 157048.98
  },
  {
    id: 3,
    name: "Kobe Aluminum Balance",
    brand: "Kobe",
    color: "blue",
    price: 8693.42
  },
  {
    id: 4,
    name: "Pomona Men's Cruiser Bike",
    brand: "Northwoods",
    color: "silver",
    price: 21729.63
  }],
  
  ireland: [{
    id: 1,
    name: "Mamba Sport 12\" Balance Bike",
    brand: "Mamba Bikes",
    color: "black",
    price: 114.8
  },
  {
    id: 2,
    name: "DJ Fat Bike 500W",
    brand: "DJ Bikes",
    color: "grey",
    price: 2420.43
  },
  {
    id: 3,
    name: "Kobe Aluminum Balance",
    brand: "Kobe",
    color: "blue",
    price: 133.98
  },
  {
    id: 4,
    name: "Pomona Men's Cruiser Bike",
    brand: "Northwoods",
    color: "silver",
    price: 334.9
  }],

  us: [{
    id: 1,
    name: "Mamba Sport 12\" Balance Bike",
    brand: "Mamba Bikes",
    color: "black",
    price: 81.95
  },
  {
    id: 2,
    name: "DJ Fat Bike 500W",
    brand: "DJ Bikes",
    color: "grey",
    price: 1727.85
  },
  {
    id: 3,
    name: "Kobe Aluminum Balance",
    brand: "Kobe",
    color: "blue",
    price: 95.64
  },
  {
    id: 4,
    name: "Pomona Men's Cruiser Bike",
    brand: "Northwoods",
    color: "silver",
    price: 239.07
  }]
}


// Create a new instance of axios mock adapter
const mock = new MockAdapter(axios);

mock.onGet('http://localhost:3031/bikes/all/in').reply(200, mockData.india);
mock.onGet('http://localhost:3031/bikes/all/ie').reply(200, mockData.ireland);
mock.onGet('http://localhost:3031/bikes/all/us-nc').reply(200, mockData.us);

describe('Testing bikes/all/location endpoint', () => {
  it('should return the expected data for india', async () => {
    const response = await supertest(app).get('/bikes/all/in');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData.india);
    console.log(response.data);
  });

  it('should return the expected data for ireland', async () => {
    const response = await supertest(app).get('/bikes/all/ie');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData.ireland);
  });

  it('should return the expected data for north carolina', async () => {
    const response = await supertest(app).get('/bikes/all/us-nc');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData.us);
  });

  it('should return a timeout error if the server is not running', async () => {
    try {
      // Assume the server is not running at this point
      const response = await supertest(app).get('/bikes/all/in').timeout(5000);
    } catch (error) {
      // Expecting a timeout error
      expect(error.code).toBe('ECONNABORTED');
    }
  });

});