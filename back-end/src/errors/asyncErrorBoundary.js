// Ensure errors in async code are properly handled
// For use in controllers

function asyncErrorBoundary(delegate, defaultStatus) {
    return (request, response, next) => 
      Promise.resolve()
        .then(() => delegate(request, response, next))
        .catch((error = {}) => {
          const {status = defaultStatus, message = error } = error;
          next({
            status,
            message,
          });
        });
  }
  
  module.exports = asyncErrorBoundary;