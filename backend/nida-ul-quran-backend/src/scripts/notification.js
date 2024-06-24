const appointments = require('../app/models/appointment.model.js');
const Teacher = require('../app/models/teacher.model');
const Student = require('../app/models/student.model');
const mongoose = require('mongoose');
const { sendEmail } = require('../utils/send-email.utils.js');
const Notification = require('../app/models/notifications.model.js');
const { sendEmailToStudent } = require('../app/controllers/student.controller.js');
require('dotenv').config();
const logger = require('../config/logger')
// require('../config/db.config');

exports.init = async (io) => {
    console.log('init')
    const link = `${process.env.CLIENT_BASE_URL}home/verifyemail/tutor/`;
    console.log('link ', link)
    let lte = new Date();
    lte.setMinutes(lte.getMinutes() + 10);
    try {
        let obj = {
            startDate: {
                '$gte': new Date().toISOString(),
                '$lte': lte.toISOString()
            },
            isBooked: true,
            notify: true
        }
        console.log(obj)
        var appointment = await appointments.find(obj)
        for (const row of appointment) {
            let { teacherID, studentID } = row;
            notifyUser(teacherID, Teacher, 'tutor', row)
            notifyUser(studentID, Student, 'student', row)
            
            await appointments.updateOne({ teacherID: teacherID, studentID: studentID, startDate: row.startDate},
                { $set: { notify: false } });
        }
    }
    catch (err) {
        console.log(err)
    }

}

notifyUser = async (id, userModel, role, row) => {
    console.log('send');
    try {
        const data = await userModel.findOne({ _id: mongoose.Types.ObjectId(id) });
        console.log('data',data)

        const emailObj = {
            username: data.username,
            email: data.email,
            // email: "dev.noorulain@gmail.com",
            firedFrom: 'notification',
            others: {
                time: row.startDate,
                url: `${process.env.CLIENT_BASE_URL}/${role}/${id}`
            }
        };

        // global function to send email
        sendEmail(emailObj);

        let obj = {
            type: 1,
            message: `Reminder for class at ${new Date(row.startDate).toGMTString()}`,
            userID: mongoose.Types.ObjectId(id),
            isRead: false,
            url: `${process.env.CLIENT_BASE_URL}/${role}/${id}`
        }

        //save notification in db
        const newNotification = new Notification(obj);
        await newNotification.save();

        console.log('socketId',data.socketId);
        io.emit('notification', obj)
        console.log('finish')
        return;
    }
    catch (err) {
        logger.log('error', `Error in notification cron: ${err}`)
    }
}

