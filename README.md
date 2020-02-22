# survey-engine

This project is under construction with MongoDB, Express, Node.js, and React.

# Setup instructions:

- `git clone` the repository.
- `npm i` – install all dependencies.
- Generate a `.env` file with the following things:
  - `MONGO_CONNECT_URL`

# Usage

- The simplest thing to do is use `npm run dev`, which deploys the schema, builds, starts the server, and will launch the app on `http://localhost:3000`, or whatever `PORT` is set in a your `.env` file.

## Manual Development

- From the root, if setting up the first time, run `npm run deploy`. Follow the in-terminal instructions to resolve setting up Prisma.
- Afterwards and for all future runs, run `npm run server` in one terminal, and then `npm run build`, then `npm run start`.

# Notes
