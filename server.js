const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const {
  handleAllFlights,
  handleFlight,
  handleAllUsers,
  handleUser,
  createNewUser,
  createNewFlight,
  handleFourOhFour
} = require('./handlers');

const PORT = process.env.PORT || 8000;

app
.use(bodyParser.json())
.get('/slingair/flights', handleAllFlights)
.get('/slingair/flights/:flightNumber', handleFlight)
.get('/slingair/users', handleAllUsers)
.get('/slingair/users/:identifier', handleUser)
.post('/slingair/users', createNewUser)
.post('/slingair/flights', createNewFlight)
.get('*', handleFourOhFour)
.listen(PORT, () => console.log(`Listening on port ${PORT}`));
