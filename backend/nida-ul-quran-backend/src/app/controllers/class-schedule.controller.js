const appointments = require('../models/appointment.model.js');
const moment = require('moment');
const utils = require('../../utils/schedule.utils.js')
const Teacher = require('../models/teacher.model');
const leaves = require('../models/leaves.model');
const { success } = require('../../utils/response.utils.js');
const logger = require('../../config/logger')
const mongoose = require('mongoose');
const { sendEmail } = require('../../utils/send-email.utils');


const createTeacherSchedule = async (req, res, next) => {
    try {
        let availableSlots = [];
        req.body.map((row) => {
            let slotObj = utils.makeScheduleObj(row.startDate, row.endDate);
            slotObj.calID = row.calID;
            availableSlots.push(slotObj);
        })

        await Teacher.findOne({ _id: req.user.userId }, function (err, user) {
            if (err) {
                next(err);
            }
            else {
                user.schedule = req.body
                user.save();
                success(res, user.schedule);
            }
        });
    } catch (err) {
        next(err);
    }
}

const getTeacherSchedule = async (req, res, next) => {
    let id = req.query.teacherId ? req.query.teacherId : req.user.userId
    const teacherScheduleData = await Teacher.findOne({ _id: id });
    success(res, teacherScheduleData ? teacherScheduleData.schedule : teacherScheduleData);
}

const deleteTacherSchedule = async (req, res, next) => {
    await Teacher.update(
        { _id: req.user.userId },
        {
            $pull: {
                schedule: { calID: req.body.calID, weekday: req.body.weekday }
            }
        },
        function (err, docs) {
            if (err) {
                next(err);
            }
            else {
                success(res, docs);
            }
        }
    )
}

const createAppointments = async (req, res, next) => {

    const { teacherID, contactID } = req.body[0];

    req.body.map((row) => {
        let slotObj = utils.makeScheduleObj(row.startDate, row.endDate);
        slotObj.calID = row.calID;
        row.studentID = req.user.userId,
            row.schedule = slotObj
    })

    try {
        let teacherschedule = await appointments.insertMany(req.body)

        const teacherData = await Teacher.findOne({ _id: teacherID });
        const emailObj = {
            email: teacherData.email,
            firedFrom: 'reqClass',
            text: `Appointment Request`,
            html: `<p><b>Hello</b> ${teacherData.username},</p>
                      <p> ${req.user.username} has booked appointments with you.
                                <p>Click on the button to accept the request </p> 
                                </br>
                                 <a href="${process.env.CLIENT_BASE_URL}tutor?contactID=${contactID}"><button>Accept Appointments</button></a>
                                <br/>
                                `,
        };

        await sendEmail(emailObj)
        success(res, teacherschedule);

    } catch (err) {
        next(err);
    }
}

const getAppointmentByID = async (req, res, next) => {
    let param = Object.keys(req.query)[0]
    let id = req.query[param]
    let pouplateFrom = param == 'studentID' ? 'teacher' : 'student'
    let obj = {}
    obj[param] = id
    req.query.weekDate ? obj["startDate"] = {
        '$gte': moment(req.query.weekDate).startOf('isoWeek').toISOString(),
        '$lte': moment(req.query.weekDate).endOf('isoWeek').toISOString()
    }
        :
        obj["startDate"] = {
            '$gte': moment().startOf('isoWeek').toISOString(),
            '$lte': moment().endOf('isoWeek').toISOString()
        }
    appointments.find(obj).populate(pouplateFrom).exec(function (err, docs) {
        if (err) {
            next(err);
        }
        else {
            success(res, docs);
        }
    });
}

const deleteAppointment = async (req, res, next) => {
    try {
        db.orders.deleteOne({ "_id": ObjectId(req.query.id) });
    } catch (err) {
        next(err);
    }
}

const approveAppointments = async (req, res, next) => {
    try {
        console.log(req.body.contactID)
        const appointment = await appointments.update(
            { contactID: mongoose.Types.ObjectId(req.body.contactID) },
            { $set: { "isBooked": true } },
            {
                multi: true,
                rawResult: true
            },
        )
        const student = await appointments.findOne({ 'contactID': req.body.contactID }).populate('studentID').populate('teacherID').exec()

        const emailObj = {
            email: student.studentID.email,
            firedFrom: 'reqClass',
            text: `Appointment Approval Alert`,
            html: `<p><b>Hello</b> ${student.studentID.username},</p>
                  <p> ${req.user.username} has approved your request for appointments.
                            <p>Click on the link to view scheduled appointments</p> 
                            </br>
                             ${`${process.env.CLIENT_BASE_URL}student/availability`}
                            <br/>
                            `,
        };

        await sendEmail(emailObj)
        success(res, emailObj);
    }
    catch (err) {
        next(err)
    }
}


const createleaves = async (req, res, next) => {
    req.body.map((row) => {
        let slotObj = utils.makeScheduleObj(row.startDate, row.endDate);
        slotObj.calID = row.calID;
        row.schedule = slotObj
    })

    try {
        let teacherschedule = await leaves.insertMany(req.body)
        await success(res, teacherschedule);
    } catch (err) {
        next(err);
    }
}

const getleavesByID = async (req, res, next) => {
    let params = { 'teacherID': req.query.teacherID }
    req.query.weekDate ? params["startDate"] = {
        '$gte': moment(req.query.weekDate).startOf('isoWeek').toISOString(),
        '$lte': moment(req.query.weekDate).endOf('isoWeek').toISOString()
    }
        :
        params["startDate"] = {
            '$gte': moment().startOf('isoWeek').toISOString(),
            '$lte': moment().endOf('isoWeek').toISOString()
        }


    leaves.find(params).exec(function (err, docs) {
        if (err) {
            next(err);
        }
        else {
            success(res, docs);
        }
    });
}

const deleteLeaves = async (req, res, next) => {
    try {
        leaves.deleteMany({ _id: { $in: req.body} }).then(function (err,docs) {
            success(res, docs); // Success 
            logger.log('info', 'appointments deleted')
        }).catch(function (error) {
            next(error)
        });
    }
    catch (err) {
        console.log('in catch')
        next(err)
    }
}


module.exports = {
    createTeacherSchedule, getTeacherSchedule, createAppointments, getAppointmentByID, getleavesByID,
    deleteTacherSchedule, deleteAppointment, approveAppointments, createleaves, deleteLeaves
}