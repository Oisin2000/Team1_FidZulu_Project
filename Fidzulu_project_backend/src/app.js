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

// Function to fetch data from a specific table in the Oracle DB
const fetchDataFromTable = async (tableName) => {
    try {
        // Create a connection pool
        const connection = await oracledb.getConnection(dbConfig);

        // Execute the query to fetch data from the specified table
        const result = await connection.execute(`SELECT * FROM ${tableName}`);

        // Release the connection
        await connection.close();

        return result.rows;
    } catch (error) {
        console.error(`Error fetching data from ${tableName.toUpperCase} table:`, error);
        throw error;
    }
};

// Function to update price with tax
const updatePrice = (price) => {
    const taxRate = 0.23; // 23%
    return price * (1 + taxRate);
};

// Endpoint to fetch data from a specific table
app.get('/:tableName', async (req, res) => {
    const tableName = req.params.tableName.toLowerCase();

    // Check if the requested table exists
    if (['bikes', 'books', 'dvds', 'food', 'laptops', 'toys'].includes(tableName)) {
        try {
            // Fetch data from the specified table
            let data = await fetchDataFromTable(tableName);

             // Update prices with tax
             for (let i = 0; i < data.length; i++) {
                data[i].PRICE = updatePrice(data[i].PRICE);
            }

            // Send the fetched data as the response
            res.json(data);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(404).send('Table not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
