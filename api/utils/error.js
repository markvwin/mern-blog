// responsible for handling all error messages associated with the APIs.

// the errorHandler function will set the custom error codes and messages.
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
