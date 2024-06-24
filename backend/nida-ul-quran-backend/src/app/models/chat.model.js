const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const chatSchema = new Schema({

    senderId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    }

}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('chat', chatSchema);
