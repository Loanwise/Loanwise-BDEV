function errorHandler(err, req, res, next) {
    
    // Set the default status code to 500 (Internal Server Error)
    let statusCode = 500;
    let message = 'Internal Server Error';
  
    // Check the type of the error
    if (err instanceof CustomError) {
      // If it's a custom error, extract the status code and message
      statusCode = err.statusCode;
      message = err.message;
    }
  
    // Log the error
    console.error(err);
  
    // Send the error response
    res.status(statusCode).json({ error: message });
  }
  
module.exports = errorHandler;
  