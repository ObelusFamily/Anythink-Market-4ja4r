# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## First setup

This app runs on Docker. To start the app:

1. Install Docker. You can find the instructions [here](https://docs.docker.com/get-docker/).
2. Verify that Docker is running by running `docker -v` and `docker-compose -v` in your terminal.
3. Clone the repo.
4. Run `docker-compose up` in the root folder.
5. The app should be running on `localhost:3000`.
