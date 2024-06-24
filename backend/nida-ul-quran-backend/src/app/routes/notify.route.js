const validateToken=require('../../verification/tokenVerify')

module.exports = app => {
    const { getNotifications , markNotification } = require('../controllers/notify.controller');

    app.get('/get-notifications',validateToken, getNotifications);
    app.post('/mark-notification',validateToken, markNotification);
};
