const notification = require('../../src/scripts/notification')

var socket;
var CronJob = require('cron').CronJob;
var job = new CronJob('0 10 * * * *', function() {
  console.log('You will see this message every second');
  notification.init(io);
}, null, true, 'Asia/Karachi');


module.exports = io=>{
    socket= io;
    job.start();
}

