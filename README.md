# The Slingair API

The base url of the API is `https://slingairflights.herokuapp.com/`

## Features

- The API provides data for over 200 flights and over 5000 unique customers.
- Customer's seats are unique. A seat given to a customer will become unavailable for that flight.
- Provides validation for creating new users and new seats. View [Creating a New User](#creating-a-new-user) and [Creating a New Flight](#creating-a-new-flight) for more.

## Usage

Use the [request-promise](https://www.npmjs.com/package/request-promise) module to
make requests to this API. Take some time to read their documentation.
(_Note that this module, and the `request` module are deprecated but still very much
relevant and in-use. You can read about it [here](https://github.com/request/request/issues/3142)._)

This API follows the REST principles.

### Note

Keep in mind, that this API is on a free Heroku instance, and as such the first call of the day will fail as it
triggers the service to spin up.

### Persistence

There is data persistence for this API. Changes you make will remain. In fact, the changes of all other users
will be visible to you. At some point, the server may do a _data reset_, in which case all of the data you
submitted will be deleted.

## List of Endpoints

| Method | Endpoint                          | Description                                                                                                                             |
| ------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/flights`               | Returns an array of flight numbers.                                                                                                     |
| `GET`  | `/flights/:flight`       | Returns info on a specific flight.                                                                                                       |
| `GET`  | `/flights/:flight/:seat` | Returns info on a user given a specific flight number and seat.                                                                          |
| `GET`  | `/users`                 | Returns an array of all users. Accepts query params of `limit` and `page` for pagination. If values are not provided, it will return the first 10 users. The response will include the amount of registered users as well.   |
| `GET`  | `/users/:userId`         | Returns the user object based on an indentifier (either the user's email or the user's ID).                                                                    |
| `POST` | `/users`                 | Creates a new user. View [Creating a New User](#creating-a-new-user) for more.                                                                                                                    |
| `POST` | `/flights`               | Creates a new flight. View [Creating a New Flight](#creating-a-new-flight) for more.

### API Response

The API will always provide a response. :P

### Creating a New User

Three things must happen in order for a user to be created:
- The user's email must be unique.
- The chosen seat must be available on the specified flight.
- All fields need to be filled.

_Example:_
```
{
    "email": "userr@mail.com",
    "firstName": "User",
    "lastName": "Example"
    "seat": "1E",
    "flight": "SA231",    
}
```

### Creating a New Flight

For a flight ID to be vaild it must:
- Be unique.
- Be comprised of two upper case letters, followed by three digits

_Example:_
```
{
    "flightID": "AA747"
}
```
