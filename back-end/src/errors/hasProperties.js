// const VALID_PROPERTIES_PUT = [
  // "reservation_id"
// ]
function hasProperties(...properties) {
  // Return 400 if data is missing
  if (properties.length === 0) {
    return function (req, res, next) {
      req.send(400)
    }
  }

}


module.exports = hasProperties;