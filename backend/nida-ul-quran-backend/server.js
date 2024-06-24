
const express = require('express');
const compression = require('compression');
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const socket = require('socket.io');
const app = express();
const server = require('http').createServer(app)
const io = socket.listen(server);
global.io = io;
// const winston = require('./src/config/winston-stream.config');
const cool = require('cool-ascii-faces');
require('./src/utils/create-dir.utils');
require('./src/config/socket.config')(io);
require('dotenv').config();

app.use((req, res, next) => {
    req.headers['if-none-match'] = 'no-match-for-this';
    next();
});


// providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(cors());
app.use(compression());

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help! 
// DOC: https://helmetjs.github.io/
app.use(helmet());

// HTTP request logger middleware
app.use(morgan('dev'));
// app.use(morgan('combined', { stream: winston.stream }));

// default api route
app.get("/", (req, res, next) => {
    return res.status(200).json({ status: true, message: "Welcome to qtutor api", cheers: cool() });
});

const publicDir = require('path').join(__dirname, './public');
// console.log(publicDir);
app.use(express.static(publicDir));

// import all routes at once
require('./src/config/routes.config')(app);

// Handling non-existing routes
require('./src/utils/error-handler.utils')(app);

// db config
require('./src/config/db.config');

//cron config
require('./src/config/cron.config')(io)

const port = process.env.PORT || 5500;
server.listen(port, () => console.info(`%s 🚀 Server is listening on port ${port}`, chalk.green('✓')));
