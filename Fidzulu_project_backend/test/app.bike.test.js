const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Create a new instance of axios mock adapter
const mock = new MockAdapter(axios);

// Mock the HTTP GET request to http://localhost:3031/bikes/all/in
mock.onGet('http://localhost:3031/bikes/all/in').reply(200, [
  {
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
  }
]);

// Mock the HTTP GET request to http://localhost:3031/bikes/all/ie
mock.onGet('http://localhost:3031/bikes/all/ie').reply(200, [
  {
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
  }
]);

// Mock the HTTP GET request to http://localhost:3031/bikes/all/us-nc
mock.onGet('http://localhost:3031/bikes/all/us-nc').reply(200, [
  {
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
  }
]);

describe('Testing bikes/all/location endpoint', () => {
  it('should return the expected data for india', async () => {
    const response = await axios.get('http://localhost:3031/bikes/all/in');
    expect(response.status).toBe(200);
    expect(response.data).toEqual([
      {
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
      }
    ]);
  });

  it('should return the expected data for ireland', async () => {
    const response = await axios.get('http://localhost:3031/bikes/all/ie');
    expect(response.status).toBe(200);
    expect(response.data).toEqual([
      {
        "id": 1,
        "name": "Mamba Sport 12\" Balance Bike",
        "brand": "Mamba Bikes",
        "color": "black",
        "price": 114.8
      },
      {
        "id": 2,
        "name": "DJ Fat Bike 500W",
        "brand": "DJ Bikes",
        "color": "grey",
        "price": 2420.43
      },
      {
        "id": 3,
        "name": "Kobe Aluminum Balance",
        "brand": "Kobe",
        "color": "blue",
        "price": 133.98
      },
      {
        "id": 4,
        "name": "Pomona Men's Cruiser Bike",
        "brand": "Northwoods",
        "color": "silver",
        "price": 334.9
      }
    ]);
  });

  it('should return the expected data for north carolina', async () => {
    const response = await axios.get('http://localhost:3031/bikes/all/us-nc');
    expect(response.status).toBe(200);
    expect(response.data).toEqual([
      {
        "id": 1,
        "name": "Mamba Sport 12\" Balance Bike",
        "brand": "Mamba Bikes",
        "color": "black",
        "price": 81.95
      },
      {
        "id": 2,
        "name": "DJ Fat Bike 500W",
        "brand": "DJ Bikes",
        "color": "grey",
        "price": 1727.85
      },
      {
        "id": 3,
        "name": "Kobe Aluminum Balance",
        "brand": "Kobe",
        "color": "blue",
        "price": 95.64
      },
      {
        "id": 4,
        "name": "Pomona Men's Cruiser Bike",
        "brand": "Northwoods",
        "color": "silver",
        "price": 239.07
      }
    ]);
  });
});
