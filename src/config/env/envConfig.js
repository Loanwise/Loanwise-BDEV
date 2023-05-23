const config = {
    // Default configuration values
    port: 4000,
    databaseUrl: 'mongodb://localhost/mydatabase',
    apiKey: 'your-api-key',
  };
  
  if (process.env.NODE_ENV === 'production') {
    // Override default values for production environment
    config.port = process.env.PORT || 4000;
    config.databaseUrl = process.env.DATABASE_URL;
    config.apiKey = process.env.API_KEY;
  }
  
module.exports = config;
