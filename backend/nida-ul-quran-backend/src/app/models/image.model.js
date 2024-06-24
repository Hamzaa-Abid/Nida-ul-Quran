const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ROLE = ['admin', 'student', 'tutor'];

const imageSchema = new Schema({

    profileImage: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userRole: {
        type: String,
        enum: ROLE,
        required: [true, 'why no role ?']
    }

}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('profileimage', imageSchema);
