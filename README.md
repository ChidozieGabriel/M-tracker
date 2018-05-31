[![Build Status](https://travis-ci.org/veeqtor/M-tracker.svg?branch=develop)](https://travis-ci.org/veeqtor/M-tracker) [![Coverage Status](https://coveralls.io/repos/github/veeqtor/M-tracker/badge.svg?branch=develop)](https://coveralls.io/github/veeqtor/M-tracker?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/ecbcabd190ca98ce3b31/maintainability)](https://codeclimate.com/github/veeqtor/M-tracker/maintainability) 

# M-tracker
Maintenance Tracker App is an application that provides users with the ability to reach out to operations or repairs department regarding repair or maintenance requests and monitor the status of their request.


## Getting Started

Clone the repository to your local machine with the git clone command `git clone` and navigate to the folder
````
$ git clone <repository URL>
$ cd M-tracker

````

### Prerequisites

Install Nodejs and PostgresSQL on your local machine, on the `M-tracker` folder run the following commands

```
$ node -v
$ npm -v

$ npm install
```

### Installing

Set up your database: 

Create tables `users` and `requests` with the following queries in your postgresSQL database


```
CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(40) NOT NULL, name VARCHAR(40) NOT NULL, password VARCHAR(80), admin BOOLEAN NOT NULL)

CREATE TABLE IF NOT EXISTS requests(id SERIAL PRIMARY KEY NOT NULL, user_id INTEGER, requester_name VARCHAR(40) NOT NULL, requester_email VARCHAR(40), date timestamp without time zone, status VARCHAR(20) NOT NULL, request VARCHAR(255) NOT NULL, dept VARCHAR(255))
```

create a .env file in the root directory filling the datebase URl and the JWT_KEY
````
JWT_KEY= Your JWT key 

DATABASE_URL= An online Database url connection string for runing testing

LOCAL_DB= Local database connection string 
````

And then run to start up the application

```
$ npm start

```

Go to the browser and load localhost on port `5000` 

```
http://localhost:5000
```



## Running the tests

Explain how to run the automated tests for this system


### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests


Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [NodeJS](http://www.dropwizard.io/1.0.2/docs/) - The Environment used
* [PostgreSQL](https://maven.apache.org/) - Database Used
* [ExpressJS](https://rometools.github.io/rome/) - Library used

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Nwokeocha victor** - *Initial work*


## License

This project is licensed under the ISC License.

## Acknowledgments

* Andela bootcamp LFAs
* Andela bootcamp colleagues
* Stackoverflow
* scotch.io
* etc.

