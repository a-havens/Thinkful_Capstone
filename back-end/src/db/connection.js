const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);

afterAll(async () => {
    await knex.destroy();
  });
  
module.exports = knex;
