// const VALID_PROPERTIES_PUT = [
// "reservation_id"
// ]
function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    const properties = Object.keys(data);

    // If data is missing
    if (properties.length === 0) {
      return next({
        status: 400,
        message: 'Data is missing',
      });
    }

    const invalidFields = properties.filter(
      (field) => !properties.includes(field)
    );

    // If invalid fields presnt 
    if (invalidFields) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }

    next();
  }
}


module.exports = hasProperties;