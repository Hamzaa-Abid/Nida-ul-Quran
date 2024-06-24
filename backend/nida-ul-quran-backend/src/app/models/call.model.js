const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const callSchema = new Schema({

    teacherId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isCallInitiate: {
        type: Boolean,
        default: false
    }

}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('call', callSchema);
