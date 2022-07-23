- Prepare DB
  1. `docker compose up -d`
  2. Locally
      1. Run `docker/initdb.sql` in your DB
      2. Export the following env variables for the DB to work:
          - DB_USER
          - DB_HOST
          - DB_DATABASE
          - DB_PASSWORD

- `npm i`
- `npm run dev`
- Visit http://127.0.0.1:5173/
