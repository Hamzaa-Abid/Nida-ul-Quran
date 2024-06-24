const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leavesSchema = new Schema({
    teacherID: {
        type: String,
        required: [true, 'why no teacherID ?']
    },
    startDate: {
        type: String,
        required: [true, 'why no startDate ?']
    },
    endDate: {
        type: String,
        required: [true, 'why no endDate ?']
    },
    schedule: {}
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('leaves', leavesSchema);