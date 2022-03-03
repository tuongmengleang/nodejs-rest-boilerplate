// make bluebird default Promise
Promise = require('bluebird');
const { port, env } = require('./config/vars');
const app = require('./app');
const logger = require('./config/logger');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect()

// listen to requests
app.listen(port, () => logger.info(`Server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;
