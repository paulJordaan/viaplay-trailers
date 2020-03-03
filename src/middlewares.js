function notFound(request, response, next) {
  response.status(404);
  const error = new Error(`Not Found - ${request.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(error, request, response, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = response.statusCode !== 200 ? response.statusCode : 500;
  response.status(statusCode);
  response.json({
    message: error.message,
    stack: error.stack
  });
}

module.exports = {
  notFound,
  errorHandler
};
