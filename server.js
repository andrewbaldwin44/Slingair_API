const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const {
  handleAllFlights,
  handleFlight,
  lookupUserBySeat,
  handleAllUsers,
  handleUser,
  createNewUser,
  createNewFlight,
  handleFourOhFour,
} = require("./handlers");

const PORT = process.env.PORT || 8000;

app
  .use(bodyParser.json())
  .get("/flights", handleAllFlights)
  .get("/flights/:flightNumber", handleFlight)
  .get("/flights/:flightNumber/:seat", lookupUserBySeat)
  .get("/users", handleAllUsers)
  .get("/users/:identifier", handleUser)
  .post("/users", createNewUser)
  .post("/flights", createNewFlight)
  .get("*", handleFourOhFour)
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
