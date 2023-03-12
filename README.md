# Getting started

After cloning the repository to your machine, run either of the following commands in your terminal to install the dependencies:

```
yarn

```

or

```
npm install
```

## Next commands

- Rename `.env_` to `.env`.

- Run `yarn start` to start the server

- Run `yarn test` to start test the application


## Endpoints

### User

`POST /users/signup`: Creates a new user with the provided username and password as payload.

`POST /users/login`: Grants a user access with the provided username and password as payload.

`POST /users/logout`: Logs out a user.


### Notes
`GET /notes`: Returns an array of all notes.

`GET /notes/:id`: Returns the note with the specified ID.

`POST /notes`: Creates a new note with the provided title and content as payload.

`PUT /notes/:id`: Updates the note with the specified ID with the provided title and content as payload.

`DELETE /notes/:id`: Deletes the note with the specified ID.


## Design decision


- Set up a Node.js server using a framework like Express.js. Make sure the server listens on port 3000.
- Create a JSON file on the server to store notes. Each note should have an id, title, content, and user_id field.
- Implement the GET /notes endpoint. This should read the notes from the JSON file and return an array of all notes.
- Implement the GET /notes/:id endpoint. This should read the notes from the JSON file and return the note with the specified ID.
- Implement the POST /notes endpoint. This should create a new note with the provided title and content, generate a unique ID for the note, and add it to the JSON file.
- Implement the PUT /notes/:id endpoint. This should update the note with the specified ID with the provided title and content, and save the updated note to the JSON file.
- Implement the DELETE /notes/:id endpoint. This should delete the note with the specified ID from the JSON file.
- Implement user authentication using JSON Web Tokens (JWT). Use jsonwebtoken to generate and verify tokens. Users should be able to sign up, sign in, and sign out.
- Implement error handling for all endpoints. If an error occurs, the API should return an appropriate HTTP status code and a descriptive error message.
