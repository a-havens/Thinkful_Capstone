const knex = require("../db/connection");

// list all tables - sorted by table_name
function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

// post a new table
function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((createdRecords) => createdRecords[0])
        .catch((error) => {
            throw error; // Handle or log the error as needed
        });
}

// read a table by table_id - exists for validation purposes only
function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id: table_id })
        .then((readTables) => readTables[0])
        .catch((error) => {
            throw error; // Handle or log the error as needed
        });
}

// seat a reservation at a table
function seat(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, "*")
        .then((updatedTables) => updatedTables[0])
        .catch((error) => {
            throw error; // Handle or log the error as needed
        });
}

// finish a table
function finish(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable, "*")
        .then((updatedTables) => updatedTables[0])
        .catch((error) => {
            throw error; // Handle or log the error as needed
        });
}

module.exports = {
    list,
    create,
    read,
    seat,
    finish,
};
