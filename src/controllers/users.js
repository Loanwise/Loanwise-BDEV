const config = require('../config/env/envConfig');

function getUsers(req, res) {
  // Access the configuration value
  const port = config.port;

  // ...your code...
}

module.exports = getUsers;
