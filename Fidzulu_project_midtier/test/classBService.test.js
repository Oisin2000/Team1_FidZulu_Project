const axios = require('axios');
const axiosMockAdapter = require('axios-mock-adapter');
const supertest = require('supertest');
const express = require('express');

const app = require('../src/classBService');

const mockData = {
    dvds: [
        { id: 1, title: "Avengers - Infinity War", mpaa_rating: "PG-13", studio: "MARVEL", time: 149, price: 28.06 },
        { id: 2, title: "Spider-Man Homecoming", mpaa_rating: "14 and over", studio: "Sony Pictures Home Entertainment", time: 133, price: 10.94 },
        { id: 3, title: "Ant-Man", mpaa_rating: "PG-13", studio: "Walt Disney Video", time: 117, price: 30.23 },
        { id: 4, title: "Captain America", mpaa_rating: "PG", studio: "Walt Disney Video", time: 123, price: 37.64 }
    ]
};


const mock = new axiosMockAdapter(axios);
mock.onGet('http://localhost:3035/dvds/all/IE').reply(200, mockData.dvds);

// Test suite for the Express middleware
describe('ClassA Mid-tier Service Integration Tests', () => {
    it('should return data from backend service', async () => {
        const location = 'IE';
        const serviceName = 'dvds';

        // Making a request to the endpoint
        const response = await supertest(app).get(`/classB/${serviceName}/all/${location}`);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData.dvds);
    });

    it('should handle invalid service name', async () => {
        const location = 'fake-location';
        const serviceName = 'invalidService';

        // Making a request to the endpoint with invalid service name
        const response = await supertest(app).get(`/classB/${serviceName}/all/${location}`);

        // Asserting the response
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid service name for classB' });
    });

    it('should handle internal server error', async () => {
        const location = 'IE';
        const serviceName = 'dvds';

        // Mocking the Axios request to simulate internal server error
        mock.onGet('http://localhost:3035/dvds/all/IE').reply(500, { error: 'Internal Server Error' });


        const response = await supertest(app).get(`/classB/${serviceName}/all/${location}`);

        // Asserting the response
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
});