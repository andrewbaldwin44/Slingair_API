const { flights } = require('./data/flights');
const { users } = require('./data/users');

function handleAllFlights(req, res) {
  res.status(200).json({ status: 200, flights });
}

function handleAllUsers(req, res) {
  res.status(200).json({ status: 200, users });
}

function handleFourOhFour(req, res) {
  res.status(404).json({ status: 404, message: "Page not found!" });
}

module.exports = {
  handleAllFlights,
  handleAllUsers,
  handleFourOhFour
};
