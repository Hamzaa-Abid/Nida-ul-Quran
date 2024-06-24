const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const saltRounds = 10;
const SKILLS = ['recitation', 'arabic', 'hifz', 'tajweed'];
const ROLE = ['admin', 'student', 'tutor'];


const teacherSchema = new Schema({

    username: {
        type: String,
        required: [true, 'why no username ?']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'why no email ?'],
    },
    password: {
        type: String,
        required: [true, 'why no password ?']
    },
    country: {
        type: String,
        required: [true, 'why no country ?']
    },
    timezone: {
        type: String,
        required: [true, 'why no timezone ?']
    },
    city: {
        type: String,
        required: [true, 'why no city ?']
    },
    skills: [
        {
            type: String,
            enum: SKILLS,
            required: [true, 'why non skills ?']
        }
    ],
    subjects: [
        {
            type: String
        }
    ],
    userRole: {
        type: String,
        enum: ROLE,
        required: [true, 'why no role ?']
    },
    socketId: {
        type: String
    },

    isOnline: {
        type: Boolean,
        default: false
    },
    isConfirm: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: String
    },
    schedule: []
}, {
    versionKey: false,
    timestamps: true,
});

teacherSchema.pre("save", function (next) {
    let teacher = this;

    // only hash the password if it has been modified (or is new)
    if (!teacher.isModified('password')) return next();

    // for new password
    if (teacher.password) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(teacher.password, salt, (err, hash) => {
                if (err) return next(err);
                teacher.password = hash;
                next();
            });
        });
    }
});


teacherSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

teacherSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('This email address is already taken!'));
    } else {
        next();
    }
});


module.exports = mongoose.model('teacher', teacherSchema);
