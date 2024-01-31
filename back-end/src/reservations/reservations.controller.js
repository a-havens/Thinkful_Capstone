const service = require("./reservations.server");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const sharedUtils = require('../shared/hasRequiredProperties')

const RESERVATION_PROPERTIES = [
  "reservation_id",
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "created_at",
  "updated_at",
];

function hasValidReservationProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidProperties = Object.keys(data).filter(
      (field) => !RESERVATION_PROPERTIES.includes(field)
  );

  if (invalidProperties.length > 0)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

function hasProperties(...properties) {
  return function (res, req, next) {
    const { data = {} } = res.body;

    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const hasRequiredProperties = hasProperties(
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people"
);

function isValidDate(req, res, next) {
  const { reservation_date } = req.body.data;
  const isDate = Date.parse(reservation_date);

  if (!Number.isNaN(isDate)) {
    res.locals.reservation_date = reservation_date;
    return next();
  }

  next({
    status: 400,
    message: `reservation_date is not a valid date.`,
  });
}

function isValidTime(req, res, next) {
  const { reservation_time } = req.body.data;
  const isTimeFormat = reservation_time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
  if (isTimeFormat) {
    res.locals.reservation_time = reservation_time;
    return next();
  } else {
    next({
      status: 400,
      message: `reservation_time is not a valid time.`,
    });
  }
}


function isPeopleNumber(req, res, next) {
  const { people } = req.body.data;

  if (typeof people !== "number" || people < 0) {
    next({
      status: 400,
      message: `people must be a number and greater than zero.`,
    });
  } else {
    res.locals.people = people;
    return next();
  }
}

function isNotInPast(req, res, next) {
  const { reservation_date, reservation_time } = res.locals;
  const currentDate = Date.now();
  const reservationDate = Date.parse(`${reservation_date} ${reservation_time} EST`);
  if (reservationDate > currentDate) {
    return next();
  } else {
    return next({
      status: 400,
      message: "Reservations must be made in the future.",
    });
  }
}

function isNotTuesday(req, res, next) {
  const { reservation_date, reservation_time } = res.locals;
  const day = new Date(`${reservation_date} ${reservation_time}`);
  if (day.getDay() !== 2) {
    next();
  } else {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesdays, please select another day.",
    });
  }
}

function isReservationDuringOpenHours(req, res, next) {
  const { reservation_time } = res.locals;
  if (reservation_time < "10:30:00" || reservation_time > "21:30:00") {
    return next({
      status: 400,
      message: "Reservations can only be made between 10:30 am and 9:30 pm.",
    });
  } else {
    return next();
  }
}

async function hasReservationId(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation id ${reservationId} cannot be found.`,
  });
}

function isNotBooked(req, res, next) {
  const { status } = req.body.data;
  if (status) {
    if (status !== "booked") {
      return next({
        status: 400,
        message: `Cannot seat a reservation with a status of ${status}.`,
      });
    } else if (status === "booked") {
      return next();
    }
  }
  next();
}

function isNotFinished(req, res, next) {
  const { status } = res.locals.reservation;
  if (status !== "finished") {
    return next();
  }
  next({
    status: 400,
    message: `Status cannot be updated if it is finished.`,
  });
}

function hasValidStatus(req, res, next) {
  const { status } = req.body.data;
  if (
    status === "booked" ||
    status === "seated" ||
    status === "finished" ||
    status === "cancelled"
  ) {
    return next();
  }
  next({
    status: 400,
    message: `${status} is not a valid status.`,
  });
}

//CRUD-APP Functions
async function list(req, res) {
  const { date, mobile_number } = req.query;
  let reservationList;
  if (date) {
    reservationList = await service.listByDate(date);
  } else if (mobile_number) {
    reservationList = await service.search(mobile_number);
  } else {
    reservationList = await service.list();
  }

  res.status(200).json({ reservationList });
}

async function create(req, res) {
  const data = await service.create({ ...req.body.data });

  res.status(201).json({ data });
}


async function read(req, res) {
  const { reservation } = res.locals;

  res.json({ reservation });
}

async function update(req, res) {
  const updatedReservation = await service.update({
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  });

  res.status(200).json({ updatedReservation });
}

async function updateReservationStatus(req, res) {
  const { reservation_id } = res.locals.reservation;
  const { status } = req.body.data;
  const updatedReservationStatus = await service.updateStatus(reservation_id, status);
  res.json({ updatedReservationStatus });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasValidReservationProperties,
    hasRequiredProperties,
    isValidDate,
    isValidTime,
    isPeopleNumber,
    isNotTuesday,
    isNotInPast,
    isReservationDuringOpenHours,
    isNotBooked,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(hasReservationId), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(hasReservationId),
    hasValidReservationProperties,
    hasRequiredProperties,
    isValidDate,
    isValidTime,
    isPeopleNumber,
    isNotTuesday,
    isNotInPast,
    isReservationDuringOpenHours,
    isNotBooked,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(hasReservationId),
    isNotFinished,
    hasValidStatus,
    asyncErrorBoundary(updateReservationStatus),
  ],
};
