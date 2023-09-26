## Project Requirements

Node.js v16.13.0

Npm v8.1.0

### Configuration

Create and fill in `.env` file

### Dependencies

Run `npm install` to install all required dependencies.

### Database

Use `npm run db:migrate` and `npm run db:migrate:undo` to cope with migrations. Note: schema should be created manually and have UTF-8 collation.

### Build

Use `npm run build` to run the server.

### Running

Use `npm start` to run the server.

### Deploy

1. Create `.env`
2. Run `npm install` to install all required dependencies.
3. Use `npx sequelize-cli db:migrate` and `npx sequelize-cli db:migrate:undo` to cope with migrations
