const TeacherProfile = require('../models/teacher-profile.model');
const Teacher = require('../models/teacher.model');
const ImageSchema = require('../models/image.model');
const logger = require('../../config/logger')

const { success } = require('../../utils/response.utils');

const addTeacherProfile = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const newTeacherProfile = new TeacherProfile(req.body);
        const data = await newTeacherProfile.save();
        const userData = await Teacher.findOne({ _id: userId });
        const imgData = await ImageSchema.findOne({ userId: userId });
        const obj = {
            user: userData,
            profile: data,
            image: imgData || {}
        };
        success(res, obj);
    } catch (error) {
        next(error);
    }
}

const updateTeacherProfle = async (req, res, next) => {
    try {
        const userId = req.params.id;
        await TeacherProfile.updateOne({ userId: userId }, { $set: req.body }, { runValidators: true });
        const teacherProfileData = await TeacherProfile.findOne({ userId: userId });
        const userData = await Teacher.findOne({ _id: userId });
        const imageData = await ImageSchema.findOne({ userId: userId })
        const obj = {
            user: userData,
            profile: teacherProfileData,
            image: imageData || {}

        };
        success(res, obj);
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}

const getTeacherProfile = async (req, res, next) => {
    const userId = req.params.id;
    const teacherProfileData = await TeacherProfile.findOne({ userId: userId });
    if (teacherProfileData) {
        const teacherData = await Teacher.findOne({ _id: userId });
        const userImage = await ImageSchema.findOne({ userId: userId });
        if (teacherData && userImage) {
            const obj = {
                user: teacherData,
                profile: teacherProfileData,
                image: userImage
            }
            success(res, obj);
        }
        else if (teacherData) {
            const obj = {
                user: teacherData,
                profile: teacherProfileData,
                image: {}
            }
            success(res, obj);

        } else if (userImage) {
            const obj = {
                user: {},
                profile: teacherProfileData,
                image: userImage
            }
            success(res, obj);
        } else {
            const obj = {
                user: {},
                profile: teacherProfileData,
                image: {}
            }
            success(res, obj);
        }
    } else {
        logger.log('error',error)
        throw Error('record not found');
    }
}


const findAllTeacherRecords = async (req, res, next) => {
    try {
        const teachers = await TeacherProfile.find().populate('userId').populate('profileImage');
        if (teachers.length > 0) {
            success(res, teachers);
        } else {
            throw Error('record not found');
        }
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}


const filterTeacherProfile = async (req, res, next) => {
    try {
        const { status, hourlyRate, gender, languages, country, timeZone, subjects } = req.body;
        const { min, max } = hourlyRate;
        
        let arr = []
        for (const [key, row] of Object.entries(req.body)) {
            if(row.length != 0 &&( key == "subjects" || key == "languages" || key == "gender"  ||  key == "status")){
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
            else if(key == "hourlyRate"){
                arr.push( {
                    $and: [
                        {
                            hourlyRate: { $gte: min }
                        },
                        {
                            hourlyRate: { $lte: max }
                        }
                    ]
                })
            }
          }
        
        const filterRecords = await TeacherProfile.find({
            $and: arr
            // [
                // {
                //     $and: [
                //         {
                //             hourlyRate: { $gte: min }
                //         },
                //         {
                //             hourlyRate: { $lte: max }
                //         }
                //     ]
                // },
                // {
                //     status: { $in: status }
                // },
                // {
                //     gender: { $in: gender }
                // },
                // {
                //     languages: { $in: languages }
                // },
                // {
                //     country: country
                // },
                // {
                //     subjects: { $in: subjects }
                // },
                // {
                //     timeZone: timeZone
                // }
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
    addTeacherProfile, 
    updateTeacherProfle, 
    getTeacherProfile, 
    findAllTeacherRecords,
    filterTeacherProfile
}
