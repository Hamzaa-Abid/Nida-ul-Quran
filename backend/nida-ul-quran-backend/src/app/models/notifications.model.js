const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
    type: {
        type: Number,
        required: [true, 'why no notification type ?']
    },
    userID: {
        type: Schema.Types.ObjectId,
        required: [true, 'why no userID ?']
    },
    isRead: {
        type: Boolean,
        required: [true, 'why not read  flag?']
    },
    message: {
        type: String,
        required: [true,'why no message']
    },
    url: {
        type: String,
        required: [true,'why no url to redirect']
    }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('notifications', notificationsSchema);