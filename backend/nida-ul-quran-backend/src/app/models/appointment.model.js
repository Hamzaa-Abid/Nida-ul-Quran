const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
    teacherID: {
        type: Schema.Types.ObjectId,
        required: [true, 'why no teacherID ?'],
        ref : 'teacher'
    },
    startDate: {
        type: String,
        required: [true, 'why no startDate ?']
    },
    endDate: {
        type: String,
        required: [true, 'why no endDate ?']
    },
    isBooked: {
        type: Boolean,
        required: [true, 'why not booked ?']
    },
    notify: {
        type: Boolean,
        required: [false]
    },
    studentID: {
        type: Schema.Types.ObjectId,
        required: [true, 'why no studentID ?'],
        ref : 'student'
    },
    subject: {
        type: String,
        required: [true, 'why no subject ?']
    },
    // appointmentID: {
    // type: Number,
    // required: [true, 'why no appointmentID ?']
    // }
    // ,
    contactID: {
        type: Schema.Types.ObjectId,
        required: [true, 'why no contactID ?']  
    },
    schedule: {}
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('appointments', appointmentsSchema);


appointmentsSchema.virtual('student', {
    ref: 'studentprofile', // The model to use
    localField: 'studentID', // Find people where `localField`
    foreignField: 'userId', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    // justOne: false,
    // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
  });

  appointmentsSchema.virtual('teacher', {
    ref: 'teacherprofile', // The model to use
    localField: 'teacherID', // Find people where `localField`
    foreignField: 'userId', // is equal to `foreignField`
  });