const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const saltRounds = 10;

// this is enum 
const ROLE = ['admin', 'student', 'tutor'];


const studentSchema = new Schema({

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
    }

}, {
    versionKey: false,
    timestamps: true,
});

studentSchema.pre("save", function (next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // for new password
    if (user.password) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    }
});


studentSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


studentSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('This email address is already taken!'));
    } else {
        next();
    }
});


module.exports = mongoose.model('student', studentSchema);
