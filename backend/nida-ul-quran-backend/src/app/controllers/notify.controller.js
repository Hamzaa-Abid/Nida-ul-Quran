
const { success } = require('../../utils/response.utils.js');
const logger = require('../../config/logger')
const notifications = require('../models/notifications.model')
const mongoose = require('mongoose')

const getNotifications = async (req,res,next) => {
    var notify = await notifications.find({userID:mongoose.Types.ObjectId(req.user.userId)}).sort({createdAt: 'desc'}).limit(10)
    success(res,notify)
}

const markNotification = async (req,res,next) => {
    console.log("req.body.isRead",req.body.isRead)
    let updateSchedule  = await notifications.updateOne(
        { _id: mongoose.Types.ObjectId(req.body.id)},
        { $set: {"isRead" : req.body.isRead}}
     )
     success(res, updateSchedule);
}

module.exports = {
    getNotifications,
    markNotification
}