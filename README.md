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
