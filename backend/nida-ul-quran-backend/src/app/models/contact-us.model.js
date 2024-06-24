const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const contactUsSchema = new Schema({

    name: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'why no email ?']
    },
    message: String,
    subject: String,
    phone: Number

}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('contactus', contactUsSchema);
