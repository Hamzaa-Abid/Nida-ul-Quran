const contactUsSchema = require('../models/contact-us.model');
const { success } = require('../../utils/response.utils');
const { sendEmail } = require('../../utils/send-email.utils');

const contactUs = async (req, res, next) => {
    try {
        const { email, subject, message, name, phone } = req.body;
        const addNew = new contactUsSchema({
            name: name,
            email: email,
            subject: subject,
            message: message,
            phone: phone
        });

        const data = await addNew.save();
        const emailObj = {
            name: name,
            email: req.body.email
        }
        await sendEmail(emailObj);
        const adminEmailObj = {
            name: name,
            phone: phone,
            subject: subject,
            message: message,
            clientEmail: email
        }
        await sendEmail(adminEmailObj);
        success(res, data);

    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}

module.exports = {
    contactUs
}