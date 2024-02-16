/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */ //a //b //c

require("dotenv").config();
const path = require("path");

const {
  DATABASE_URL="postgres://sihjwhka:qj-tTZyBuhhoSlsuRlD4E47edV-qMdcK@jelani.db.elephantsql.com/sihjwhka",
  DATABASE_URL_DEVELOPMENT = "postgres://znlztkta:8x0UF27vESehmtm8BWGiTqTZbfhyVN-0@jelani.db.elephantsql.com/znlztkta",
  DATABASE_URL_TEST = "postgres://rfnerokd:09e3AQrZeeAp97VaodOniutxk-PTtoUa@lallah.db.elephantsql.com/rfnerokd",
  DATABASE_URL_PREVIEW = "postgres://rjdtylyk:ydu8G-nrCHOIOXXAKPJZlWzlXqdqZb65@lallah.db.elephantsql.com/rjdtylyk",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};