const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherProfileSchema = new Schema({

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
    hourlyRate: {
        type: Number,
        default: 0
    },
    fiqh: {
        type: String,
        default: ''
    },
    sect: {
        type: String,
        default: ''
    },
    certification: {
        certificationAward: {
            type: String
        },
        certificationFrom: {

        },
        certificationYear: {
            type: String
        }
    },
    employment: {
        employmentName: {
            type: String
        },
        employmentFrom: {
            type: String
        },
        employmentTo: {
            type: String
        }
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    }

}, {
    versionKey: false,
    timestamps: true,
});



module.exports = mongoose.model('teacherprofile', teacherProfileSchema);

teacherProfileSchema.virtual('profileImage', {
    ref: 'profileimage', // The model to use
    localField: 'userId', // Find people where `localField`
    foreignField: 'userId', // is equal to `foreignField`
  });