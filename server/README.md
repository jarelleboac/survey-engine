# survey-engine backend

## Running

### With Docker
- Copy the `.env.example` and replace with desired values.
- On the first run, use: 

```
docker build -t <username>/survey-engine
```

```
docker run -p 49160:8080 -d <username>/survey-engine
```

### No Docker
- For development, use the following to have nodemon watch for changes:

```
npm run watch:dev
```

## Credits
- Huge thanks to https://www.robinwieruch.de/minimal-node-js-babel-setup/ for the initial Babel setup after using `require` syntax failed while importing from `../common`.