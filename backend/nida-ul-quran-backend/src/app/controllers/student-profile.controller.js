const StudentProfile = require('../models/student-profile.model');
const User = require('../models/student.model');
const ImageSchema = require('../models/image.model');
const { success, notFound, getSuccess } = require('../../utils/response.utils');
const { count } = require('../models/student-profile.model');
const logger = require('../../config/logger')

const addStudentProfile = async (req, res, next) => {
    try {
        const newStudentProfile = new StudentProfile(req.body);
        const data = await newStudentProfile.save();
        const userData = await User.findOne({ _id: data.userId });
        const imgData = await ImageSchema.findOne({ userId: data.userId });
        const obj = {
            user: userData,
            profile: data,
            image: imgData || {}
        };
        success(res, obj);
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}

const getStudentProfile = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const studentProfileData = await StudentProfile.findOne({ userId: userId });
        if (studentProfileData) {
            const studentData = await User.findOne({ _id: userId });
            const userImage = await ImageSchema.findOne({ userId: userId });
            if (studentData && userImage) {
                const obj = {
                    user: studentData,
                    profile: studentProfileData,
                    image: userImage
                }
                success(res, obj);
            }
            else if (studentData) {
                const obj = {
                    user: studentData,
                    profile: studentProfileData,
                    image: {}
                }
                success(res, obj);

            } else if (userImage) {
                const obj = {
                    user: {},
                    profile: studentProfileData,
                    image: userImage
                }
                success(res, obj);
            } else {
                const obj = {
                    user: {},
                    profile: studentProfileData,
                    image: {}
                }
                success(res, obj);
            }

        } else {
            throw Error('no record found');
        }
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}

const updateStudentProfile = async (req, res, next) => {
    try {
        const userId = req.params.id;
        await StudentProfile.updateOne({ userId: userId }, { $set: req.body }, { runValidators: true });
        const studentProfileData = await StudentProfile.findOne({ userId: userId });
        const userData = await User.findOne({ _id: userId });
        const imageData = await ImageSchema.findOne({ userId: userId })
        const obj = {
            user: userData,
            profile: studentProfileData,
            image: imageData || {}

        };
        success(res, obj);
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}

const filterStudentProfile = async (req, res, next) => {
    try {
        const { gender, languages, country, timeZone, subjects } = req.body;
        let arr = []
        for (const [key, row] of Object.entries(req.body)) {
            if(row.length != 0 &&( key == "gender" || key == "languages" || key == "subjects")){
                let obj = {};
                obj[key] = { $all: row }
                arr.push(obj)
            }
            else if(row.length != 0 && (key == "timeZone" || key == "country")){
                console.log(key);
                let obj = {};
                obj[key] = row
                arr.push(obj)
            }
          }
          console.log(arr)
        const filterRecords = await StudentProfile.find({
             $and: arr
            //  [
            //     {
            //         gender: { $in: gender }
            //     },
            //     {
            //         languages: { $in: languages }
            //     },
            //     {
            //         country: country
            //     },
            //     {
            //         subjects: { $in: subjects }
            //     },
            //     {
            //         timeZone: timeZone
            //     }
            // ]
        }).lean();
        if (filterRecords.length > 0) {
            getSuccess(res, filterRecords);
        } else {
            notFound(res);
        }
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}

module.exports = {
    addStudentProfile,
    getStudentProfile,
    updateStudentProfile,
    filterStudentProfile
}