const { flights } = require('./data/flights');
const { users } = require('./data/users');
const request = require('request-promise');

function findFlight(flightNumber) {
  return flights[flightNumber];
}

function handleAllFlights(req, res) {
  res.status(200).json({ status: 200, flights: Object.keys(flights) });
}

function handleFlight(req, res) {
  const { flightNumber } = req.params;

  const flight = findFlight(flightNumber);

  if (flight) {
    res.status(200).json({ status: 200, flight });
  } else res.status(401).json({ status: 401, message: "Flight not found!" });
}

function handleAllUsers(req, res) {
  const page = req.query.page !== undefined ? Number(req.query.page) : 1;
  const limit = req.query.limit !== undefined ? Number(req.query.limit) : 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  paginatedUsers = users.slice(startIndex, endIndex);

  res.status(200).json({ status: 200, users: paginatedUsers, usersRegistered: users.length });
}

function handleUser(req, res) {

}

function createNewUser(req, res) {

}

function createNewFlight(req, res) {

}

function handleFourOhFour(req, res) {
  res.status(404).json({ status: 404, message: "Page not found!" });
}

module.exports = {
  handleAllFlights,
  handleFlight,
  handleAllUsers,
  handleUser,
  createNewUser,
  createNewFlight,
  handleFourOhFour
};
