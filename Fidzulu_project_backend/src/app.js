const express = require('express');
const bodyParser = require('body-parser');
const oracle = require('oracledb');
const cors = require('cors');

const app = express();

// Oracle DB connection configuration
const dbConfig = {
    user: 'scott',
    password: 'TIGER',
    connectString: 'localhost:1521/XEPDB1' // Host:Port/ServiceName
};

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Service by location (US-NC, IE, IN)
app.get('/:service/all/:location', async (req, res) => {
  const service = req.params.service.toLowerCase();
  const location = req.params.location.toUpperCase();

  try {
    const connection = await oracle.getConnection(dbConfig);

    let query = '';
    // Converting from USD
    let conversionRate = 1;
    // Assuming that no sales tax is initially applied in the DB
    let salesTaxRate = 0;

    switch (location) {
      case 'US-NC':
        salesTaxRate = 0.08;
        break;
      case 'IE':
        conversionRate = 1.23; // Convert USD to EUR
        salesTaxRate = 0.23;
        break;
      case 'IN':
        conversionRate = 83.19; // Convert USD to INR
        salesTaxRate = 0.18;
        break;
      default:
        return res.status(400).json({ error: 'Invalid location' });
    }

    switch (service) {
      case 'bikes':
        query = 'SELECT * FROM BIKES';
        break;
      case 'books':
        query = 'SELECT * FROM BOOKS';
        break;
      case 'dvds':
        query = 'SELECT * FROM DVDS';
        break;
      case 'food':
        query = 'SELECT * FROM FOOD';
        break;
      case 'laptops':
        query = 'SELECT * FROM LAPTOPS';
        break;
      case 'toys':
        query = 'SELECT * FROM TOYS';
        break;
      default:
        return res.status(400).json({ error: 'Invalid service' });
    }

    const result = await connection.execute(query);

    const items = result.rows.map(row => {
      const item = {};
      for (let i = 0; i < result.metaData.length; i++) {
        item[result.metaData[i].name.toLowerCase()] = row[i];
      }
      item.price *= conversionRate; // Apply currency conversion
      item.price *= (1 + salesTaxRate); // Apply sales tax
      item.price = parseFloat(item.price.toFixed(2));
      return item;
    });

    connection.close();

    res.json(items);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Assign service with corresponding port value to ports object
const ports = {
    bikes: 3031,
    food: 3032,
    toys: 3033,
    books: 3034,
    dvds: 3035,
    laptops: 3036
};

// Each service running on a unique port
Object.keys(ports).forEach(service => {
    app.listen(ports[service], () => {
      console.log(`${service} service is running on port ${ports[service]}`);
    });
});
