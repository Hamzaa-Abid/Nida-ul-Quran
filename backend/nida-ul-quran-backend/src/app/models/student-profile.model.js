const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentProfileSchema = new Schema({

    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    dob: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    cellNumber: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    province: {
        type: String,
        default: ''
    },
    languages: [
        {
            type: String
        }
    ],
    timeZone: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    subjects: [
        {
            type: String
        }
    ],
    about: {
        type: String,
        default: ''
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: true
    }

}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('studentprofile', studentProfileSchema);

studentProfileSchema.virtual('profileImage', {
    ref: 'profileimage', // The model to use
    localField: 'userId', // Find people where `localField`
    foreignField: 'userId', // is equal to `foreignField`
  });