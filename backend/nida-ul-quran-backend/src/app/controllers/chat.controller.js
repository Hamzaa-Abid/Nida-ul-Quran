const ChatSchema = require('../models/chat.model');
const { success } = require('../../utils/response.utils');

const loadMessages = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const chatWithId = req.query.chatWithId;

        const data = await ChatSchema.find({
            $and: [
                {
                    $or: [
                        {
                            receiverId: userId
                        },
                        {
                            senderId: userId
                        }
                    ],
                },
                {
                    $or: [
                        {
                            receiverId: chatWithId
                        },
                        {
                            senderId: chatWithId
                        }
                    ]
                }
            ]
        })
            .lean()


        success(res, data);
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}


const postMessages = async (req, res, next) => {
    try {
        const newMessage = new ChatSchema(req.body);
        const data = await newMessage.save();
        success(res, data);
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}






module.exports = {
    postMessages,
    loadMessages
}