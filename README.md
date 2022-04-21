# G2i Node Challenge

Take home test for Node.js developers.

### Steps taken for the challenge solution

1. Setup Server connection and connect the server over secure endpoint
2. Setting up of environment variable both for dev and test environment.
3. evn.local.example added to the application as a guide for setting up env variables.
4. Database Migration setup using DB-Migrate.
   - The essence of database migration is to allow easy database setup
   - Create database schema etc.
   - Allow to Alter database schema, fields etc if needed.
5. Prisma Setup
   - Prisma is consider as Next-generation Node.js and Typescript ORM
   - It helps to communcate with database using json data format
   - it also provide datatype typings
6. Redis setup and integration for managing application cache
7. Acronym Routes Setup
8. Acronym Service Setup
9. Auth Routes Setup
10. Auth service setup
11. Unit testing and Integration testing for acronym route endpoints queries
12. Setup Docker for running the application
13. Update README.md files

### Application setup

```
- Run yarn install (to install all the application packages).
```

### Env setup

```
- Setup .env.local file in the root directory for running the application
- Setup .env.test.local file the root directory for running test
- Use env.local.sample file as a guide for setting up both the .env.local and env.test.local file
```

### Database Migration Setup

```
- Navigate into database package directory using (cd packages/database).
- Run yarn prepdb (to setup the database migration and seed sample data into database)
```

### Starts the application locally, Run the following commands

```
- yarn start (to start the application)
- yarn prepdb (to setup the database migration)
- yarn seed-data (to populate the provided acronym data into database)

The application is connected over port 5000 for localhost
```

### Run test(Unit and Integration testing)

```
- yarn test
```

### Run the application on docker

```
- yarn docker-start (docker-compose up)
- yarn docker:db:migrate-up (setup database migration on docker)
- yarn docker:seed-data (Populate data into database on docker)

Docker is connected on over port 6000
```

### Application Routes

1. Acronym Routes

```
GET Request
1. https://localhost:5000/acronym/get-acronyms
   - req.body data
   {
      "pagination": {
         "from": 0,
         "limit": 10,
         "search": "love"
      }
   }

POST Request
2. https://localhost:5000/acronym/create-acronym
req.body data
{
    "acronym": "LYLC",
    "meaning": "Love you like crazy"
}

PUT/UPDATE Request
3. https://localhost:5000/acronym/create-acronym


DELETE Request
4. https://localhost:5000/acronym/delete-acronym/:id
```

2. Auth Routes

```
POST Request
1. https://localhost:5000/auth/login
   - req.body data --- default login details
  {
    "email": "admin@g2i.com",
    "password": "password"
  }

POST Request
2. https://localhost:5000/auth/logout
```
