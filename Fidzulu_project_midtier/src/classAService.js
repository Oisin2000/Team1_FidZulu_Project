const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
const PORT = 3021; // Mid-tier service port for classA

// The valid service names for classA
const validServiceNamesClassA = ['bikes', 'food', 'toys'];

// Map service names to their corresponding backend ports
const servicePortMap = {
    bikes: 3031,
    food: 3032,
    toys: 3033
};

app.use(cors());

// Endpoint to retrieve data from a service at a specific location
app.get('/classA/:serviceName/all/:location', async (req, res) => {
    const { serviceName, location } = req.params;

    // Check if the provided service name is valid for classA
    if (!validServiceNamesClassA.includes(serviceName)) {
        return res.status(400).json({ error: 'Invalid service name for classA' });
    }

    // Proceed with processing the request
    const backendPort = servicePortMap[serviceName];

    try {
        const response = await axios.get(`http://localhost:${backendPort}/${serviceName}/all/${location}`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching data from ${serviceName} backend service:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`classA mid-tier service is running on port ${PORT}`);
});

module.exports = app;
