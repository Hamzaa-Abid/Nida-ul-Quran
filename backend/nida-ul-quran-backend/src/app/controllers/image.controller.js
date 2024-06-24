const ImageSchema = require('../models/image.model');
const { success } = require('../../utils/response.utils');
const logger = require('../../config/logger')

const baseUrl = 'http://localhost:5500//profileimage/';

const addStudentImage = async (req, res, next) => {
    try {

        if (req.file) {
            const profileImagePath = baseUrl + req.file.filename;
            const addNewImage = new ImageSchema({
                profileImage: profileImagePath,
                userId: req.body.userId,
                userProfileId: req.body.userProfileId,
                userRole: req.body.userRole
            });
            const data = await addNewImage.save();
            success(res, data);
        } else {
            throw Error('image is required');
        }

    } catch (error) {
        next(error);
    }
}

const updateStudentImage = async (req, res, next) => {
    try {
        if (req.file) {
            const userId = req.params.id;
            const profileImagePath = baseUrl + req.file.filename;
            await ImageSchema.update({ userId: userId }, {
                $set: {
                    profileImage: profileImagePath
                }
            }, { runValidators: true });
            const data = await ImageSchema.find({ userId: userId });
            success(res, data);

        } else {
            throw Error('image is required');
        }
    } catch (error) {
        next(error);
    }
}

const updateStudentId = async (req, res, next) => {
    try {
        const id = req.params.id;
        await ImageSchema.update({ _id: id }, { $set: req.body });
        const data = await ImageSchema.find({ _id: id });
        success(res, data);
    } catch (error) {
        next(error);
    }
}

const getProfileImage = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const data = await ImageSchema.find({ userId: userId });
        if(data.length > 0) {
            success(res, data);
        } else {
            throw Error('no record found')
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addStudentImage, 
    updateStudentImage, 
    updateStudentId, 
    getProfileImage
}