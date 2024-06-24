module.exports = app => {
    const { contactUs } = require('../controllers/contact-us.controller');

    app.post('/contactus', contactUs);
};