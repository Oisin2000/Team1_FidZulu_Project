const express = require('express');
const oracledb = require('oracledb');
const app = express();
const PORT = 3000;

// Oracle DB connection configuration
const dbConfig = {
    user: 'scott',
    password: 'TIGER',
    connectString: 'localhost:1521/XEPDB1' // Host:Port/ServiceName
  };

// Endpoint
app.get('/fidzulu/bikes', async (req, res) => {
    try {
        // Create a connection pool
        const connection = await oracledb.getConnection(dbConfig);
    
        // Execute the query to fetch data from the BIKES table
        const result = await connection.execute('SELECT * FROM BIKES');
    
        // Release the connection
        await connection.close();
    
        // Send the fetched data as the response
        res.json(result.rows);
      } catch (error) {
        console.error('Error fetching data from BIKES table:', error);
        res.status(500).send('Internal Server Error');
      }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
