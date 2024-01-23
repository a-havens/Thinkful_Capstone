const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

function isValidTime(timeString) {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return regex.test(timeString);
}

async function list(req, res) {
  console.log("Inside List");
  if (req.query) {
    console.log("Query: ", req.query);
    if (req.query.date) {
      const reservations = await service.list(req.query.date);
      const sortedReservations = sortByTime(reservations);
      console.log(reservations);
      console.log(sortedReservations);
      res.json({ data: sortedReservations });
    }
  } else {
    console.log("No Query");
    const reservations = await service.listAll();
    const sortedReservations = sortByTime(reservations);
    res.json({ data: sortedReservations });
  }
}

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "body must have data property" });
}

function hasProperty(property) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[property]) {
      return next();
    }
    next({ status: 400, message: `${property} invalid!` });
  };
}

function hasPeople(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (people > 0) {
    return next();
  }
  next({ status: 400, message: `Number of people in the party must be more than 0!` });
}

const errorResponses = {
  day: "The store is closed on Tuesdays.",
  past: "Reservations must be made in the future!",
  both: "Reservations must be made on a future working date.",
  time: "Reservations need to be within business hours."
};

function validTimeframe(req, res, next) {
  const { data: { reservation_date, reservation_time } } = req.body;
  const day = new Date(reservation_date.toString());
  const today = new Date();
  const date = reservation_date;
  const time = reservation_time.split(":").join("");
  let result = null;

  day.getDay() === 1 && day < today ? (result = "both") :
    day.getDay() === 1 ? (result = "day") :
      day < today ? (result = "past") :
        time > 2130 || time < 1030 ? (result = "time") :
          result = null;

  if (result !== null) {
    return next({
      status: 400, message: errorResponses[result]
    });
  } else {
    return next();
  }
}

async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404, message: 'Cannot be found: 99'
  });
}

async function create(req, res, next) {
  const { data } = req.body;

  // Additional validation for date, time, and people
  if (!isValidDate(data.reservation_date)) {
    return next({ status: 400, message: "Invalid reservation_date format" });
  }

  if (!isValidTime(data.reservation_time)) {
    return next({ status: 400, message: "Invalid reservation_time format" });
  }

  if (typeof data.people !== 'number' || data.people <= 0) {
    return next({ status: 400, message: "Invalid value for people" });
  }

  const newReservation = await service.create(req.body.data);
  res.status(201).json({
    data: newReservation
  });
}

async function destroy(req, res, next) {
  await service.delete(res.locals.reservation.reservation_id);
  res.sendStatus(204);
}

// Sorting reservations by time
function sortByTime(reservations) {
  return reservations.sort((a, b) => {
    const timeA = Number(a.reservation_time.replaceAll(":", ""));
    const timeB = Number(b.reservation_time.replaceAll(":", ""));
    return timeA - timeB;
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasData, hasProperty('first_name'), hasProperty('last_name'), hasProperty('reservation_date'),
    hasProperty('reservation_time'), hasProperty('mobile_number'), hasPeople, validTimeframe, asyncErrorBoundary(create)],
  delete: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
};
