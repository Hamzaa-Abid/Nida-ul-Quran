const Contact = require("../models/contact.model");
const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");
const StudentProfile = require("../models/student-profile.model");
const TeacherProfile = require("../models/teacher-profile.model");
const Image = require("../models/image.model");
const { success, getSuccess, notFound } = require("../../utils/response.utils");
const logger = require('../../config/logger')
const mongoose = require('mongoose');
const Notification = require('../models/notifications.model');

const addContactList = async (req, res, next) => {
    try {
        const { role, invitedTo, invitedBy } = req.body;
        const newContact = new Contact({
            invitedBy: invitedBy,
            invitedTo: invitedTo,
            isInvited: true,
            role: role,
        });
        const data = await newContact.save();
        let socketId = await getSocketID(role, invitedTo);

    let body = {
      type: 2,
      message: `You have a connection request from ${req.body.username}`,
      userID: mongoose.Types.ObjectId(invitedTo),
      isRead: false,
      url: `${process.env.CLIENT_BASE_URL}/${role}`,
    };

        //save notification in db
        const newNotification = new Notification(body);
        let notification = await newNotification.save();
        console.log(notification);
        // send to specific user
        io.to(socketId).emit("notification", notification);
        success(res, notification);
    } catch (error) {
        logger.log("error", error);
        next(error);
    }
};

const getSocketID = async (role, notificationTo) => {
    console.log("getSocketID", notificationTo);
    let socketId;
    try {
        if (role === "student") {
            console.log(" i am student ");

            const teachers = await Teacher.findOne({
                _id: notificationTo,
            }).lean();

            socketId = teachers.socketId;
        } else {
            console.log(" i am teacher ");

            const students = await Student.findOne({
                _id: notificationTo,
            }).lean();

            socketId = students.socketId;
        }
        return socketId;
    } catch (error) {
        logger.log('error', error)
        next(error);
    }
};

const updateInvitationsStatus = async (req, res, next) => {
    try {
        console.log(req.body);
        const { role, invitedBy, invitedTo, isAccepted } = req.body;

        if (isAccepted) {
            // update accepted invite...
            await Contact.updateOne(
                { invitedTo: invitedTo, invitedBy: invitedBy },
                { $set: { isAccepted: isAccepted } }
            );
            const findUpdatedContact = await Contact.find({
                invitedTo: invitedTo,
                invitedBy: invitedBy,
            }).lean();

            let body = {
                type: 3,
                message: `${req.body.username} accepted your connection request`,
                userID: mongoose.Types.ObjectId(invitedBy),
                isRead: false,
                url: `${process.env.CLIENT_BASE_URL}/${role}`,
            };

            //save notification in db
            const newNotification = new Notification(body);
            let notification = await newNotification.save();

            let socketId = await getSocketID(role, invitedBy);

            // send to specific user
            io.to(socketId).emit("notification", notification);
            getSuccess(res, findUpdatedContact);
        } else {
            // delete record if rejected...
            const deleteRejectedRecord = await Contact.findOneAndDelete({
                invitedTo: invitedTo,
                invitedBy: invitedBy,
            });

            let body = {
                type: 3,
                message: `${req.body.username} rejected your connection request`,
                userID: mongoose.Types.ObjectId(invitedBy),
                isRead: false,
                url: `${process.env.CLIENT_BASE_URL}/${role}`,
            };

            //save notification in db
            const newNotification = new Notification(body);
            let notification = await newNotification.save();

            let socketId = await getSocketID(role, invitedBy);
            io.to(socketId).emit("notification", notification);
            success(res, deleteRejectedRecord);
        }
    } catch (error) {
        logger.log('error', error)
        next(error);
    }
};

const pendingInvitation = async (req, res, next) => {
    try {
        const { loginId, role } = req.query;
        const pendingInvites = await Contact.find({
            invitedTo: loginId,
            isInvited: true,
            isAccepted: false,
        }).lean();

        if (pendingInvites.length > 0) {
            if (role === 'tutor') {
                const anArr = [];
                pendingInvites.forEach(e => {
                    anArr.push(e.invitedBy);
                });
                const studentReacord = await StudentProfile.find({ userId: { $in: anArr } }).populate('profileImage');
                getSuccess(res, studentReacord);
            } else {
                const anArr = [];
                pendingInvites.forEach(e => {
                    anArr.push(e.invitedBy);
                });
                const teacherReacord = await TeacherProfile.find({ userId: { $in: anArr } }).populate('profileImage');
                getSuccess(res, teacherReacord);
            }
        } else {
            notFound(res);
        }

    } catch (error) {
        logger.log('error',error)
        next(error);
    }
};

const recommendations = async (req, res, next) => {
    try {
        const { loginId, role } = req.query;
        const findRecommendations = await Contact.find({
            $or: [{
                invitedBy: loginId
            }, {
                invitedTo: loginId
            }]
        }).lean();
        if (findRecommendations.length > 0) {
            if (role === 'tutor') {
                const anArr = [];
                findRecommendations.forEach(e => {
                    anArr.push(e.invitedBy);
                    anArr.push(e.invitedTo);
                });
                const students = await StudentProfile.find({ userId: { $nin: anArr } }).populate('profileImage')
                getSuccess(res, students);
            } else {

                const anArr = [];
                findRecommendations.forEach(e => {
                    anArr.push(e.invitedBy);
                    anArr.push(e.invitedTo);
                });
                const teachers = await TeacherProfile.find({ userId: { $nin: anArr } }).populate('profileImage')
                getSuccess(res, teachers);

            }
        } else {
            if (role === 'tutor') {
                const students = await StudentProfile.find().populate('profileImage')
                getSuccess(res, students);
            } else {
                const teachers = await TeacherProfile.find().populate('profileImage')
                getSuccess(res, teachers);
            }
        }
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
};

const getInvitations = async (req, res, next) => {
    try {
        const { loginId, role } = req.query;
        const findInvitations = await Contact.find({ invitedBy: loginId, isInvited: true, isAccepted: false }).lean();
        if (findInvitations.length > 0) {
            if (role === 'tutor') {
                const anArr = [];
                findInvitations.forEach(e => {
                    anArr.push(e.invitedTo);
                });
                const studentReacord = await StudentProfile.find({ userId: { $in: anArr } }).populate('profileImage');
                getSuccess(res, studentReacord);
            } else {
                const anArr = [];
                findInvitations.forEach(e => {
                    anArr.push(e.invitedTo);
                });
                const teacherReacord = await TeacherProfile.find({ userId: { $in: anArr } }).populate('profileImage');
                getSuccess(res, teacherReacord);
            }
        } else {
            notFound(res);
        }
    } catch (error) {
        next(error);
    }
};

const getContacts = async (req, res, next) => {
    try {
        const { role, loginId } = req.query;
        const getContacts = await Contact.find({
            $and: [{
                $or: [
                    {
                        invitedTo: loginId
                    }, {
                        invitedBy: loginId
                    }
                ]
            },
            {
                isAccepted: true
            },
            {
                isInvited: true
            }]
        }).lean();
        let profiles;
        if (getContacts.length > 0) {
            if (role === 'tutor') {
                const anArr = [];
                getContacts.forEach(e => {
                    anArr.push(e.invitedBy);
                    anArr.push(e.invitedTo);
                });
                profiles = await StudentProfile.find({ userId: { $in: anArr } }).populate('profileImage')
                
            } else {
                const anArr = [];
                getContacts.forEach(e => {
                    anArr.push(e.invitedBy);
                    anArr.push(e.invitedTo);
                });
                profiles = await TeacherProfile.find({ userId: { $in: anArr } }).populate('profileImage')
                
            }
            let aggregateData = []
            for (const contact of getContacts) {
                for (let profile of profiles) {
                    if((contact.invitedBy.toString()  == profile.userId.toString()) || (contact.invitedTo.toString() == profile.userId.toString())){
                        let obj = {}
                        Object.assign(obj, profile._doc)
                        obj["contactID"] = contact._id;
                        aggregateData.push(obj)
                    }
                }
            }

            getSuccess(res, aggregateData);
        } else {
            notFound(res);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addContactList,
    updateInvitationsStatus,
    pendingInvitation,
    recommendations,
    getInvitations,
    getContacts,
};