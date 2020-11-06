# auth-server

An Express/Node.js based server using a custom “authentication” module that is designed to handle user registration and sign in using Basic, Bearer, or OAuth along with a custom “authorization” module that will grant/deny users access to the server based on their role or permissions level.

## Business Requirements
We have a real need to manage a list of users of many types, and control their access to our data accordingly. The system to be built will have the following core features:

1. Users can create an account, associated with a “role”
1. User Roles will be pre-defined and will each have a list of allowed capabilities
    - admin can read, create, update, delete
    - editor can read, create, update
    - writer can read, create
    - user can read

1. Users can then login with a valid username and password
1. Alternatively, users can login using an OAuth provider such as Google or GitHub
    - In this case, users should be automatically assigned the role of user
1. Once logged in, Users can then access any route on the server, so long as they are permitted by the capabilities that match their role.
    - For example, a route that deletes records should only work if your user role is “admin”


## Setup

- Clone down this repo locally
- Run `npm i` in root directory
- Add `.env` file
- In one terminal turn on server using `node .` or `node index.js`
- Use Postman or HTTPie in another terminal to perform CRUD operations on data models

### .env file setup:

- `PORT=`
- `SECRET=`
- `GITHUB_CLIENT_ID=`
- `GITHUB_CLIENT_SECRET=`
- `TOKEN_EXPIRE=`
- `SINGLE_USE_TOKENS=true`
- `MONGODB_URI=`

## Data Model

- username: { type: String, required: true, unique: true },
- password: { type: String, required: true },
- fullname: { type: String },
- email: { type: String },
- role: { type: String, required: true, default: 'user', enum: ['admin', 'editor', 'writer', 'user'] },
- capabilities: { type: Array, required: true, default: [] },


## Technical Requirements

- Node.js
- ES6 Classes
- ExpressJS Web Server, built modularly
  - “Auth” routes for handling the login and authentication system
    - POST /signup to create an account
    - POST /signin to login with Basic Auth
    - GET /oauth

- Middleware for handling each type of authentication
  - Basic (username + password) to be used on the /signin route only
      - i.e. app.post('/signin', basicAuthentication, (req, res) => { ... })
  - OAuth (3rd Party) to be used on the /oauth route only
    - i.e. app.get('/oauth', OAuth, (req, res) => { ... })
    - Handles the handshake process from a 3rd party OAuth system
  - Bearer (token) to be used on any other route in the server that requires a logged in user
    - i.e. app.get('/secretstuff', tokenAuthentication, (req, res) => { ... })

- User Persistence using a Mongo Database (NoSQL)
  - Mongoose Schemas (data models) to define and model data

- User Persistence using a Mongo Database (NoSQL)
Mongoose Schemas (data models) to define and model data

