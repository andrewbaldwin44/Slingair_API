const { flights } = require('./data/flights');
const { newFlight } = require('./data/newFlight');
const { users } = require('./data/users');
const { v4: uuidv4 } = require('uuid');

const validFlightID = /^[A-Z]{2}\d{3}$/;
const missingData = "Your request is missing some data or the request is invalid"

function findFlight(flightNumber) {
  return flights[flightNumber];
}

function findUser(identifier) {
  lookUp = identifier.includes('@') ? 'email' : 'id';

  return users.find(user => user[lookUp] == identifier);
}

function lookupFlightSeat(flightNumber, seat) {
  return users.find(user => user.flight === flightNumber && user.seat === seat);
}

function isValidData(...data) {
  return data.every(info => info !== undefined);
}

function isValidFlightID(id) {
  return validFlightID.test(id) && flights[id] === undefined;
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

function lookupUserBySeat(req, res) {
  const { flightNumber, seat } = req.params;

  const user = lookupFlightSeat(flightNumber, seat);

  if (user) {
    res.status(200).json({ status: 200, user });
  } else res.status(401).json({ status: 401, message: "User not found!" });
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
  const { identifier } = req.params;

  const user = findUser(identifier);

  if (user) {
    res.status(200).json({ status: 200, user });
  } else res.status(401).json({ status: 401, message: "User not found!" });
}

function createNewUser(req, res) {
  const { email, flight, firstName, lastName, seat } = req.body;

  if (isValidData(email, flight, firstName, lastName, seat)) {
    const newUser = {
      id: uuidv4(),
      email: email,
      flight: flight,
      firstName: firstName,
      lastName: lastName,
      seat: seat
    }

    users.push(newUser);

    res.status(201).json({ status: 201, data: newUser });
  }
  else {
    res.status(401).json({ status: 401, message: missingData });
  }
}

function createNewFlight(req, res) {
  const { flightID } = req.body;

  if (flightID === undefined) {
    res.status(401).json({ status: 401, message: missingData });
  }

  if (isValidFlightID(flightID)) {
    flights[flightID] = newFlight;

    res.status(201).json({ status: 201, flightID: newFlight });
  }
  else {
    res.status(401).json({ status: 401, message: "Flight ID is invalid!" });
  }
}

function handleFourOhFour(req, res) {
  res.status(404).json({ status: 404, message: "Page not found!" });
}

module.exports = {
  handleAllFlights,
  handleFlight,
  lookupUserBySeat,
  handleAllUsers,
  handleUser,
  createNewUser,
  createNewFlight,
  handleFourOhFour
};
