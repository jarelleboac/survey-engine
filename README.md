# survey-engine

This project is under construction with MongoDB, Express, Node.js, and React.

## Quick Tour [under construction]
- The server is in `/server`, and the source files are in `/src`. 
  - Uses Mongoose to manage models to be stored.
- The client is bootstrapped from create-react-app, and is located in `/client`. 

## Getting Started
- From root, repeat:
### Client
`cd client`
`npm start`

### Server

- Generate an `.env` file in `./server` following the `.env.example` file.
- Start a `mongo` instance on your local machine, or use MongoDB Atlas and use the connection string from there.

`cd server`

- Transpile the values in common
`npm run transpile-common` 

- Transpile the values in server
`npm run transpile`

- Start the server
`npm run watch:dev`

## Credits
The basic frame for the project and hooking up the Express server was inspired by https://github.com/CodingGarden/travel-log. 