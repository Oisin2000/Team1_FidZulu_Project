const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3022; // Mid-tier service port for classB

// The valid service names for classB
const validServiceNamesClassB = ['books', 'dvds', 'laptops'];

// Map service names to their corresponding backend ports
const servicePortMap = {
    books: 3034,
    dvds: 3035,
    laptops: 3036
};

const teamData = {
    team: "Team One",
    membersNames: ["Eve", "Sean", "Oisin", "Liam", "Robert"]
};

app.use(cors());

// Endpoint to retrieve data from a service at a specific location
app.get('/classB/:serviceName/all/:location', async (req, res) => {
    const { serviceName, location } = req.params;

    // Check if the provided service name is valid for classB
    if (!validServiceNamesClassB.includes(serviceName)) {
        return res.status(400).json({ error: 'Invalid service name for classB' });
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

app.get('/classB/team', (req, res) => {
    res.json(teamData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`classB mid-tier service is running on port ${PORT}`);
});
