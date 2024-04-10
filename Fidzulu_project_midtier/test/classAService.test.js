const axios = require('axios');
const axiosMockAdapter = require('axios-mock-adapter');
const supertest = require('supertest');
const express = require('express');

const app = require('../src/classAService');

const mockData = {
    bikes: [
        { id: 1, name: "Mamba Sport 12\" Balance Bike", brand: "Mamba Bikes", color: "black", price: 114.8 },
        { id: 2, name: "DJ Fat Bike 500W", brand: "DJ Bikes", color: "grey", price: 2420.43 },
        { id: 3, name: "Kobe Aluminum Balance", brand: "Kobe", color: "blue", price: 133.98 },
        { id: 4, name: "Pomona Men's Cruiser Bike", brand: "Northwoods", color: "silver", price: 334.9 }
    ]
};

const mock = new axiosMockAdapter(axios);
mock.onGet('http://localhost:3031/bikes/all/IE').reply(200, mockData.bikes);

// Test suite for the Express middleware
describe('ClassA Mid-tier Service Integration Tests', () => {
    it('should return data from backend service', async () => {
        const location = 'IE';
        const serviceName = 'bikes';

        // Making a request to the endpoint
        const response = await supertest(app).get(`/classA/${serviceName}/all/${location}`);

        // Asserting the response
        expect(response.status).toBe(200);
        // Comparing the data returned with the bikes array created above
        expect(response.body).toEqual(mockData.bikes);
    });

    it('should handle invalid service name', async () => {
        const location = 'fake-location';
        const serviceName = 'invalidService';

        // Making a request to the endpoint with invalid service name
        const response = await supertest(app).get(`/classA/${serviceName}/all/${location}`);

        // Asserting the response
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid service name for classA' });
    });

    it('should handle internal server error', async () => {
        const location = 'IE';
        const serviceName = 'bikes';

        // Mocking the Axios request to simulate internal server error
        mock.onGet('http://localhost:3031/bikes/all/IE').reply(500, { error: 'Internal Server Error' });


        const response = await supertest(app).get(`/classA/${serviceName}/all/${location}`);

        // Asserting the response
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});

