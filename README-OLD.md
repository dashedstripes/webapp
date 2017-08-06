# WebApp

A minimal framework for building a modern fullstack single page app.

**Client**
- [ReactJS](https://facebook.github.io/react/)
- [React Router](https://github.com/ReactTraining/react-router)
- [Redux](https://github.com/reactjs/redux)

**Server**
- [ExpressJS](https://expressjs.com/)
- [SequelizeJS](http://docs.sequelizejs.com/)
- [PostgreSQL](https://www.postgresql.org/)

**Testing**
- [MochaJS](https://mochajs.org/)
- [ChaiJS](http://chaijs.com/)

## Getting Started

Install all dependencies.

```
$ yarn install
```

Run the development server with hot reloading.

```
$ yarn dev
```

Build the project for production

```
$ yarn build
```

Run the production server

```
$ yarn start
```

The app will then be running on http://localhost:3000

`yarn dev` uses a library called [nodemon](https://github.com/remy/nodemon) to run the server for development. This enables the server to automaticaly restart after each change.

This project contains a simple todo list app in order to provide a basic boilerplate with which to base your project.

## Docker Development Environment

Start the dev environment.

```
$ docker-compose up
```

In a separate shell, enter a psql instance on the database

```
$ docker-compose exec db psql -U postgres
```

Then, inside that, create the development database as defined in `server/db/config/config.json`.

```
$ create database webapp_dev; \q;
```

Once your database is setup, run the following commands to migrate and seed the database.

```
$ docker-compose exec web sequelize db:migrate
$ docker-compose exec web sequelize db:seed:all
```

## Working with a database

This project uses [sequelizejs](http://docs.sequelizejs.com/) to connect to postgres. In order to use the ORM to create models, migrations and seeds, you will need to install the [sequelize-cli](https://github.com/sequelize/cli) library globally to your development machine. You can find all the commands to work with the library on the `sequelize-cli` repo [https://github.com/sequelize/cli](https://github.com/sequelize/cli)

To configure sequelize for your own database, modify the config.json file located at `server/db/config/config.json`.

## Adding a new API route

To create a new api resource, first create a model using `sequelize-cli`, then copy the `todos` folder in `server/api/v1/todos` and rename it to whatever the plural for your model is called. For example, if you created a `User` model, then copy the `todos` folder to `server/api/v1/users` and update the `index.js` file.

If eventually, you'd like to create a `v2` API, all you need to do is copy `server/api/v1` to the same folder, rename it to `v2`, then update `server/api/index.js` to include `v2` rather than `v1`.

## Creating routes

For the client side react app, I've used [react-router](https://reacttraining.com/react-router/) v4. This has some fairly major changes over previous version so it's highly recommended to look over the changes if you are used to previous versions.

## Testing

`$ yarn test` runs the test suite from `server/test`.

You can define unit tests inside `server/test/models` then require them in `server/test/index.js`.

## Building for production (Docker)

To run the app in production using docker, install docker on your web server and run:

```
$ docker-compose up -d
```

In a separate shell, create your production database.

```
$ docker-compose exec db psql -U postgres

// Inside psql shell...
$ postgres=# create database YOUR_DATABASE_NAME;
$ \q // to exit out of psql
```

Next run the following commands to migrate and seed the database.

```
$ docker-compose exec web sequelize db:migrate
$ docker-compose exec web sequelize db:seed:all
```

The app should now be running at http://localhost:3000

## Building for production (Manual)

To get the app ready for production, you will need to run `yarn build` which creates a `bundle.js` file. Then you need to migrate the database for production specifying the `NODE_ENV`.

```
$ NODE_ENV=production sequelize db:migrate
$ NODE_ENV=production sequelize db:seed:all
```

Once the database is migrated and seeded, run `yarn start` to start the production server.

## Developing

I'd like to keep this project fairly minimal to allow it to be flexible enough for any single page application project. However I'm sure optimisations and better ways of doing things will be found. If you'd like to help develop the project please feel free to submit a pull request with your changes.

The main two components of the app are the `client` and `server`.

The `client` is a basic ReactJS app with Redux bindings for state management. The `server` is a minimal REST API with sequelize as the ORM.