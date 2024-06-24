const Teacher = require('../models/teacher.model');
const Student = require('../models/student.model');
const TeacherProfile = require('../models/teacher-profile.model');
const ImageSchema = require('../models/image.model');
const bcrypt = require('bcryptjs');
const { success,error } = require('../../utils/response.utils');
const { sendEmail } = require('../../utils/send-email.utils');
const jwt = require('jsonwebtoken');
const logger = require('../../config/logger');


const teacherLogin = async (req, res, next) => {
    try {
        /*
        *
        *   Find Teacher against email
        *
        *
         */
        const email = req.body.email;
        const password = req.body.password;
        const data = await Teacher.findOne({ email: email });


        /*
        *
        *   Check if Teacher exists
        *
        *
        */
        if (data) {
            if (data.isConfirm) {
                data.comparePassword(password, async (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        const teacherId = data._id;
                        const TeacherProfileData = await TeacherProfile.findOne({ userId: teacherId });
                        const userImage = await ImageSchema.findOne({ userId: teacherId });

                        const token = jwt.sign(
                            {
                              createdAt: new Date().getTime(),
                              email: email,
                              userId: teacherId,
                              username : data.username
                            },
                            require('../../constants/constants').constants.jwtPrivateKey,
                          );

                            const obj = {
                                token, token,
                                user: data,
                                profile: TeacherProfileData ? TeacherProfileData : {},
                                image: userImage ? userImage : {}
                            }

                            //   return res.status(200).json({
                            //     message: 'Auth successful.',obj,
                            //     token
                            //   });
                        
                        success(res, obj);

                        // if (TeacherProfileData && userImage) {
                        //     const obj = {
                        //         user: data,
                        //         profile: TeacherProfileData,
                        //         image: userImage
                        //     }
                        //     success(res, obj);
                        // }
                        // else if (TeacherProfileData) {
                        //     const obj = {
                        //         user: data,
                        //         profile: TeacherProfileData,
                        //         image: {}
                        //     }
                        //     success(res, obj);

                        // } else if (userImage) {
                        //     const obj = {
                        //         user: data,
                        //         profile: {},
                        //         image: userImage
                        //     }
                        //     success(res, obj);
                        // } else {
                        //     const obj = {
                        //         user: data,
                        //         profile: {},
                        //         image: {}
                        //     }
                        //     success(res, obj);
                        // }
                    } else {
                        next(new Error('password is incorrect'));
                    }
                })
            } else {
                throw Error('Please verify email!');
            }
        } else {
            throw Error('record not found');
        }
    } catch (err) {
        logger.log('error',error)
        next(err);
    }
}

const teacherSignup = async (req, res, next) => {
    try {
        const checkStudentDoc = await Student.findOne({ email: req.body.email });
        if(!checkStudentDoc) {

        const newTeacher = new Teacher({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            country: req.body.country,
            timezone: req.body.timezone,
            city: req.body.city,
            skills: req.body.skills,
            userRole: req.body.userRole,
            subjects: req.body.subjects
        });
        const data = await newTeacher.save();
        const { _id, email, country, timezone, city, subjects } = data;

        const newTeacherProfile = new TeacherProfile({
            email: email,
            country, country,
            timeZone: timezone,
            city: city,
            userId: _id,
            subjects: subjects
        });

        const teacherProfileData = await newTeacherProfile.save();
        const obj = {
            user: data,
            profile: teacherProfileData
        }

        const link = `${process.env.CLIENT_BASE_URL}home/verifyemail/tutor/${_id}`;

        // send email
        const emailObj = {
            username: req.body.username,
            email: req.body.email,
            link: link
        };
        await sendEmail(emailObj);
        success(res, obj);
    }
    else{
        logger.log('error',"email already exists" )
        error(res,409,"email already exists")
        // res.status(401).json({error: "email already exists"})
    }
    } catch (err) {
        logger.log('error',error)
        next(err);
    }
}


const getAllTeachers = async (req, res, next) => {
    try {
        const userIds = [];
        const userRole = req.params.userrole;
        const profileImages = await ImageSchema.find({ userRole: userRole });

        profileImages.forEach(element => {
            userIds.push(element.userId);
        });



        const data = await Teacher.find({ _id: { '$in': userIds } });

        const responseArr = [];
        data.forEach((teacher, index) => {
            if (teacher._id.equals(profileImages[index].userId)) {
                responseArr.push({
                    profileImage: profileImages[index].profileImage,
                    username: teacher.username,
                    email: teacher.email,
                    userId: profileImages[index].userId,
                    userRole: 'tutor'
                });
            }
        })

        success(res, responseArr);
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}

const changePassword = async (req, res, next) => {
    try {
        const id = req.params.id;
        const password = req.body.password;
        const newPassword = req.body.newPassword;
        const data = await Teacher.findOne({ _id: id });
        if (data) {
            data.comparePassword(password, async (err, isMatch) => {
                try {
                    if (err) throw err;
                    if (isMatch) {
                        const saltRounds = 10;
                        // update it with hash
                        bcrypt.genSalt(saltRounds, (err, salt) => {
                            if (err) return next(err);
                            if (newPassword === "") throw Error('password is empty');
                            bcrypt.hash(newPassword, salt, async (err, hash) => {
                                try {
                                    if (err) return next(err);
                                    await Teacher.updateOne({ _id: id }, {
                                        $set: {
                                            password: hash
                                        }
                                    }, { runValidators: true });
                                    const data = await Teacher.find({ _id: id });
                                    getSuccess(res, data);
                                } catch (error) {
                                    next(error);
                                }
                            });
                        });


                    } else {
                        next(new Error('password is incorrect'));
                    }
                } catch (error) {
                    throw Error(error);
                }
            });
        } else {
            throw Error('record not found');
        }
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}

const updateConfirmation = async (req, res, next) => {
    try {
        const { id } = req.query;
        console.log('i am here ...');
        await Teacher.update({ _id: id }, {
            $set: {
                isConfirm: true
            }
        });

        const data = await Teacher.findOne({ _id: id }).lean();

        success(res, data);
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}

const forgotpassword = async (req, res, next) => {

    try {
      const userData = await Teacher.findOne({ email: req.body.email });
  
      if (userData) {
  
        let token = Math.random().toString().replace(".", "").toString()
        const user = await Teacher.update(
          { email: req.body.email },
          {
            $set: {
              resetToken: token,
            },
          }
        );
        
        const emailObj = {
          username: userData.username,
          email: req.body.email,
          firedFrom: 'forgotPassword',
          others: {
            user: userData,
            url: `${process.env.CLIENT_BASE_URL}reset-password/?user=tutor&token=${token}`,
          }
        };
  
        // global function to send email
        await sendEmail(emailObj);
        success(res, { result: "email sent" });
      }
      else {
        throw Error("record not found")
      }
  
    } catch (error) {
      logger.log("error", error);
      next(error);
    }
}

const resetPasswordByLink = async (req, res, next) => {
    try {
        const newPassword = req.body.newPassword;
        const data = await Teacher.findOne({ resetToken: req.body.resetToken });
        if (data) {
                try {
                        const id = data._id
                        const saltRounds = 10;
                        // update it with hash
                        bcrypt.genSalt(saltRounds, (err, salt) => {
                            if (err) return next(err);
                            if (newPassword === "") throw Error('password is empty');
                            bcrypt.hash(newPassword, salt, async (err, hash) => {
                                try {
                                    if (err) return next(err);
                                    await Teacher.updateOne({ _id: id }, {
                                        $set: {
                                            password: hash
                                        }
                                    }, { runValidators: true });
                                    const data = await Teacher.find({ _id: id });
                                    getSuccess(res, data);
                                } catch (error) {
                                    next(error);
                                }
                            });
                        });



                } catch (error) {
                    throw Error(error);
                }
            
        } else {
            throw Error('reset token is not correct');
        }
    } catch (error) {
        logger.log('error',error)
        next(error);
    }
}

module.exports = {
    teacherLogin,
    teacherSignup,
    getAllTeachers,
    changePassword,
    updateConfirmation,
    forgotpassword,
    resetPasswordByLink
}