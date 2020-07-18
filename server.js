const express = require('express');
const app = express();

const {
  handleAllFlights,
  handleAllUsers,
  handleFourOhFour
} = require('./handlers');

const PORT = process.env.PORT || 8000;

app
.get('/slingair/flights', handleAllFlights)
.get('/slingair/users', handleAllUsers)
.get('*', handleFourOhFour)
.listen(PORT, () => console.log(`Listening on port ${PORT}`));
