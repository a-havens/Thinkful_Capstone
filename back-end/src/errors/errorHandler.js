/**
 * Express API error handler.
 */
function errorHandler(error, response) {
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
}

module.exports = errorHandler;
