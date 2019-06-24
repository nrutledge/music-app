module.exports = (err, req, res, next) => {
  console.error(err.message);

  if (!err.statusCode) err.statusCode = 500;

  // Return error message to client while hiding details of any internal
  // server errors
  res.status(err.statusCode).send({
    error: {
      status: err.statusCode,
      message: err.statusCode === 500 ? 'There was a server error.' : err.message
    }
  });
}