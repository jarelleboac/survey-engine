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
- For development, use:

```
npm run dev
```