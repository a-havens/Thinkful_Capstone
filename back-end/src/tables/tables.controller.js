const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const reservationService = require("../reservations/reservations.service");


const VALID_PROPERTIES_POST = [
    "table_name",
    "capacity",
]

const VALID_PROPERTIES_PUT = [
    "reservation_id"
]

// validation middleware: checks that table_name is at least 2 characters
function tableNameLength(req, res, next) {
    const { table_name } = req.body.data;
    if (!table_name) {
        return next({
            status: 400,
            message: "table_name is missing."
        });
    }
    if (table_name.length >= 2) {
        return next();
    } else {
        return next({
            status: 400,
            message: "table_name must be at least 2 characters in length."
        });
    }
}

// validation middleware: checks that capacity is a number
function capacityIsNumber(req, res, next) {
    const { capacity } = req.body.data;
    if (!capacity || isNaN(capacity)) {
        return next({
            status: 400,
            message: "capacity field is missing or formatted incorrectly. Needs to be a number."
        });
    }
    return next();
}

// validation middleware: checks that table_name exists
async function tableExists(req, res, next) {
    const { table_id } = req.params;
    const data = await service.read(table_id);
    if (data) {
        res.locals.table = data;
        return next();
    } else {
        return next({
            status: 400,
            message: `table_id: ${table_id} does not exist.`
        });
    }
}

// validation middleware: checks that reservation exists
async function reservationExists(req, res, next) {
    const { reservation_id } = req.body.data;

    if (!reservation_id) {
        return next({
            status: 400,
            message: "reservation_id is missing."
        });
    }

    const data = await reservationService.read(reservation_id);
    if (data && data.status !== "seated") {
        res.locals.reservation = data;
        return next();
    } else if (data && data.status === "seated") {
        return next({
            status: 400,
            message: `reservation_id: ${reservation_id} is already seated.`,
        });
    } else {
        return next({
            status: 404,
            message: `reservation_id: ${reservation_id} does not exist.`,
        });
    }
}

// validation middleware: checks that table had sufficient capacity
function tableCapacity(req, res, next) {
    const { capacity } = res.locals.table;
    const { people } = res.locals.reservation;
    if (capacity >= people) {
        return next();
    } else {
        return next({
            status: 400,
            message: "Table does not have sufficient capacity."
        });
    }
}

// validation middleware: checks if table status is free
function tableStatusFree(req, res, next) {
    const { status } = res.locals.table;
    if (status === "Free") {
        return next();
    } else {
        return next({
            status: 200,
            message: "occupied"
        });
    }
}


// validation middleware: checks if table status is free
function tableStatusOccupied(req, res, next) {
    const { status } = res.locals.table;
    if (status === "Occupied") {
        return next();
    } else {
        return next({
            status: 400,
            message: "not occupied"
        });
    }
}

// list all tables - sorted by table_name
async function list(req, res) {
    res.json({ data: await service.list() });
}

// create a new table
async function create(req, res, next) {
    try {
        const table = await service.create(req.body.data);
        res.status(201).json({ data: table });
    } catch (error) {
        next({
            status: 400,
            message: error.message || "Error creating the table.",
            error: "Bad Request",
        });
    }
}


// seat a reservation at a table
async function seat(req, res) {
    const { table } = res.locals;
    const { reservation_id } = res.locals.reservation;
    const { table_id } = req.params;
    const updatedTableData = {
        ...table,
        table_id: table_id,
        reservation_id: reservation_id,
        status: "Occupied",
    }
    const updatedTable = await service.seat(updatedTableData);
    // set reservation status to "seated" using reservation id
    const updatedReservation = {
        status: "seated",
        reservation_id: reservation_id,
    }
    await reservationService.update(updatedReservation);
    res.json({ data: updatedTable });
}

// finish an occupied table
async function finish(req, res, next) {
    try {
        const { table_id } = req.params;
        const { table } = res.locals;

        if (table.status !== "Occupied") {
            return next({
                status: 400,
                message: "Table is not currently occupied.",
            });
        }

        const updatedTableData = {
            ...table,
            status: "Free",
        };

        const updatedTable = await service.finish(updatedTableData);

        // set reservation status to "finished" using reservation id
        const updatedReservation = {
            status: "finished",
            reservation_id: table.reservation_id,
        };

        await reservationService.update(updatedReservation);

        res.json({ data: updatedTable });
    } catch (error) {
        next({
            status: 500,
            message: "Error finishing the table.",
        });
    }
}

async function update(req, res, next) {
    // Get the found table and reservation from the `res.locals` object
    const { foundTable } = res.locals;
    const { thisReservation } = res.locals;
    // Update the details of the table
    const updatedTable = {
        reservation_id: thisReservation.reservation_id,
        table_id: res.locals.foundTable.table_id,
    };
    // Update the table in the `service`
    const updated = await service.update(updatedTable);
    // If the status of the reservation is `seated`, return an error
    if(foundTable.reservation_id){
        next({ status: 400, message: `Table is occupied` }) 
    }
    if (thisReservation.status == 'seated') {
        next({ status: 400, message: `Reservation is ${thisReservation.status}.` });
    }
    // Update the status of the reservation to `seated`
    await updateRes({
        ...thisReservation,
        status: 'seated'
    });
    // Return the updated details of the table as a JSON response
    res.status(200).json({ data: updated });
}

module.exports = {
    list: [
        asyncErrorBoundary(list),
        capacityIsNumber,
    ] ,
    create: [
        hasProperties(...VALID_PROPERTIES_POST),
        // Check if reservation_id param is needed. Add to hasProperties method if so
        // hasOnlyValidProperties(...VALID_PROPERTIES_POST, "reservation_id"),
        tableNameLength,
        capacityIsNumber,
        asyncErrorBoundary(create)],
    seat: [
        hasProperties(...VALID_PROPERTIES_PUT),
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(reservationExists),
        tableCapacity,
        tableStatusFree,
        capacityIsNumber,
        asyncErrorBoundary(seat),
    ],
    update: [
        asyncErrorBoundary(tableExists), 
        asyncErrorBoundary(update)
    ],
    finish: [
        asyncErrorBoundary(tableExists),
        tableStatusOccupied,
        asyncErrorBoundary(finish),
    ], 
};
