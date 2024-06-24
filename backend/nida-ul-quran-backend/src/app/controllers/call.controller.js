const callSchema = require('../models/call.model');
const { success } = require('../../utils/response.utils');


const postCalls = async (req, res, next) => {
    try {
        const { teacherId, studentId, isCallInitiate } = req.body;
        const newCallData = new callSchema({
            teacherId: teacherId,
            studentId: studentId,
            isCallInitiate: isCallInitiate
        });
        const data = await newCallData.save();
        success(res, data);
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}

const getCall = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}


module.exports = {
    postCalls
}