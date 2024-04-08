const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Sample data
const teamData = {
    team: "Team One",
    membersNames: ["Eve", "Sean", "Oisin" , "Liam" , "Robert"]
};

app.use(cors());

// Endpoint to display team data
app.get('/fidzulu/team', (req, res) => {
    res.json(teamData);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
