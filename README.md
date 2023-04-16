# Backend JS dev test

## 📖 Description

Here is a simple API backend to handle container lending between customers and restaurants. I used a boilerplate that already had the most of the following features pre configured:

## 🚀 Features

- 📱 **NestJS** — latest version
- 🎉 **TypeScript** - Type checking
- ⚙️ **Dotenv** - Supports environment variables
- 🗝 **Authentication** - JWT, RSA256
- 🏬 **Authorization** - RBAC, CBAC
- 🏪 **TypeORM** - Database ORM
- 🏪 **PostgreSQL** - Open-Source Relational Database
- 🧠 **Configuration** - Single config for all
- 📃 **Swagger** - API Documentation
- 🐳 **Docker Compose** - Container Orchestration
- 🔐 **Helmet** - secure HTTP headers
- 📪 **Postman** - Postman config for endpoints
- 📏 **ESLint** — Pluggable JavaScript linter
- 💖 **Prettier** - Opinionated Code Formatter
- ✨ **Commitlint** - Lint your conventional commits
- 🕵️‍♂️ **Code Scanning** - Code scanning with CodeQL

By doing so, I saved time setting things up. You can track how many changes I implement myself by chekcing the commits.

## Database

Use the `db.sql` file at the root of the project to create the Postgres Database. Note that users have a password field, the value of all of them are `test123` encrypted using bcryptjs library. I used the same password so it was easier to test the log in endpoint.

## Installation (Development)

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints

1. Install the postman app
2. Import the `Boomerang.postman_collection.json` file
4. There you can check the main endpoints requested in the description and some others where you can check authorization (GetAllUsers)
3. Enjoy

