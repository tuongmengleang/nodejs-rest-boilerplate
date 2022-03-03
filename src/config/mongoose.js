const mongoose = require('mongoose');
const logger = require('./logger');
const { mongo, env } = require('./vars');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

class Database {
    connection = mongoose.connection;
    constructor() {
        try {
                this.connection
                    .on('error', (err) => {
                        logger.error(`MongoDB connection error: ${err}`);
                        process.exit(-1);
                    });
        } catch (error) {
            console.error(error);
        }
    }
    async connect() {
        try {
            await mongoose.connect(mongo.uri,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            ).then(() => {
                logger.info('MongoDB connected...👏👏')
            })
        } catch (error) {
            console.error(error);
        }
    }

    async close() {
        try {
            await this.connection.close();
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new Database();
