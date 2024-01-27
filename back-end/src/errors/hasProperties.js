// const VALID_PROPERTIES_PUT = [
// "reservation_id"
// ]
function hasProperties(...expectedProperties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    const actualProperties = Object.keys(data);

    // If data is missing
    if (actualProperties.length === 0) {
      return next({
        status: 400,
        message: 'Data is missing',
      });
    }

    const invalidFields = actualProperties.filter(
      (field) => !expectedProperties.includes(field)
    );

    // If invalid fields present
    if (invalidFields.length > 0) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }

    next();
  };
}

module.exports = hasProperties;
