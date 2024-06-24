const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const contactSchema = new Schema({

    invitedBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    invitedTo: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isInvited: {
        type: Boolean,
        default: false
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['tutor', 'student']
    }

}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('contact', contactSchema);
