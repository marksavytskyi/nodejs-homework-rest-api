const errorMessageList = {
  200: "OK",
  204: "No Content",
  400: "Bad Request",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const HttpError = (status, message = errorMessageList[status]) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = HttpError;
