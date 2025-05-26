// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

/* Dependencies */
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

const server = app.listen(port, () => console.log(`server running on localhost: ${port}`));

// Respond with JS object when a GET request is made to the homepage
app.get('/get', (req, res) => res.send(projectData));

// Request JS object when a POST request is made in the homepage
app.post('/post', add);
function add (req,res) {
	newDataEntry = {
    date: req.body.date,
    temperature: req.body.temperature,
    userResponse: req.body.userResponse
  }

  projectData = {...newDataEntry};
}
