const {
    createLogger,
    transports,
    format
} = require('winston');
require('winston-mongodb')
require('dotenv').config()

const logger = createLogger({
    transports: [
        new transports.Console({
            level: 'error',
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.MongoDB({
            level: 'error',
            db: process.env.DB_URL,
            options: {
              useUnifiedTopology: true
            },
            collection: 'logs',
            format: format.combine(format.timestamp(),format.json()),
          }),
    ]
})

module.exports = logger;