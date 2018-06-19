[![Build Status](https://travis-ci.org/veeqtor/M-tracker.svg?branch=develop)](https://travis-ci.org/veeqtor/M-tracker) 
[![Coverage Status](https://coveralls.io/repos/github/veeqtor/M-tracker/badge.svg?branch=develop)](https://coveralls.io/github/veeqtor/M-tracker?branch=develop) 
[![Maintainability](https://api.codeclimate.com/v1/badges/ecbcabd190ca98ce3b31/maintainability)](https://codeclimate.com/github/veeqtor/M-tracker/maintainability) 


# M-tracker
Maintenance Tracker App (M-tracker) is an application that provides users with the ability to reach out to operations or repairs department regarding repair or maintenance requests and monitor the status of their request.

API Documentation [Here](https://m-traqa-front.herokuapp.com/api/v1/docs)<br>
Test API [Here](https://m-traqa-front.herokuapp.com/api/v1/)<br>
M-tracker on Heroku [Here](https://m-traqa-front.herokuapp.com/)


# Table of Contents
- [Getting Started](#getting-started)
- [Technologies](#technologies)
  * [Dependencies](#dependencies)
- [Installation and Usage](#installation)
- [Testing](#testing)
- [Features](#features)
- [Models](#models)
- [API Documentation](#api-documentation)
- [Express Routes](#express-routes)
- [License](#license)

## Getting Started
This is a javascript application built with [**Express**](https://expressjs.com/) framework on the [**NodeJS**](https://nodejs.org/) platform. Authentication of users is done via [**JSON Web Tokens**](https://jwt.io/).


## Technologies
*UI & Templates*: HTML & CSS 

*Server Side*: NodeJS, Express and PostgreSQL

*Client Side*: Fetch API

### Dependencies
* [**PostgreSQL**](https://www.postgresql.org/) 
* [**Node JS**](https://nodejs.org/en/)


## Installation

1. Install [**Node JS**](https://nodejs.org/en/).
2. Install [**Postgres**](https://www.postgresql.org/) .
3. Clone the [**repository here**](https://github.com/veeqtor/M-tracker.git)
4. [**cd**] into the root of the **project directory**.
5. Run `npm install` on the terminal to install Dependencies

7. Create a `.env` file in the root directory of the application. Use a different database for your testing and development. Example of the content of a `.env` file is shown in the `.env.sample`

8. Start the application:
```
npm start
```

## Usage
- Run database migration with `npm run migration`
- Start app development with `npm run start` or `npm start`

## Limitations
The limitations with this current version of maintainance tracker includes:
- Request Pagination not available
- Password recovery not available

## Testing

- Run `npm test` on the terminal while within the **project root directory**.

Server side testing is achieved through use of `chai-http`, `mocha` and `chai` packages. `chai-http` is used to make requests to the api and `mocha` is the testing framework and `chai` is the exception library. They will both be installed when you run `npm install` and the tests will run when you run `npm test`.



## Features
M-tracker consists of the following features:

### Authentication

- It uses JSON Web Token (JWT) for authentication.
- Token is generated on user login and new user sign up
- Token is perpetually verified to check the state of the user if logged in or not.
- Admin User will be pre-seeded into the application with administrative privileges


### Authenticated Users
- New Users can register
- Existing Users can log in
- Authenticated Users can view all request made by them
- Authenticated Users can create a request
- Authenticated Users can delete a request
- Authenticated Users can edit a request

### Admin Users
- Admins can view all requests available
- Admins can approve a request
- Admins can disapprove a request
- Admins can resolve a request


## API Documentation
You can view the API Documentation [here](https://m-traqa-front.herokuapp.com/api/v1/docs)

## Express Routes

Api endpoints were created using `express` router. The routes are defined under `server/routes`.  

### Support or Contribution
For any suggestions or contributions  please do not hesistate to contact me

Contributions to this project are welcomed by all, If you need to contribute to this project, follow the steps below
* **Fork** the repository
* Follow [Installation and Setup](#installation-and-setup) as explained earlier
* Create a branch off **development** for the feature you wish to add
* Make necessary changes, commit and raise a pull request against develop, conventions can be found on the wiki page
**Note** when making contributions, please endeavour to follow the [Airbnb](https://github.com/airbnb/javascript) javascript style guide. check out the [wiki page](https://github.com/benfluleck/HelloBooks/wiki)

## License
This project is authored by **Nwokeocha victor** and is licensed for your use, modification and distribution under the **ISC** license.
