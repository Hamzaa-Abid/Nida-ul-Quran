const User = require("../models/student.model");
const Teacher = require("../models/teacher.model");
const StudentProfile = require("../models/student-profile.model");
const imageSchema = require("../models/image.model");
const bcrypt = require("bcryptjs");
const { success, getSuccess, error } = require("../../utils/response.utils");
const { sendEmail } = require("../../utils/send-email.utils");
const logger = require("../../config/logger");
const jwt = require("jsonwebtoken");

const studentSignup = async (req, res, next) => {
  try {
    const checkTeacherDoc = await Teacher.findOne({ email: req.body.email });
    if (!checkTeacherDoc) {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userRole: req.body.userRole,
      });
      const data = await newUser.save();

      const { _id, email } = data;

      const newStudentProfile = new StudentProfile({
        email: email,
        userId: _id,
      });

      const studentProfileData = await newStudentProfile.save();
      const link = `${process.env.CLIENT_BASE_URL}home/verifyemail/student/${_id}`;
      // send email
      const emailObj = {
        username: req.body.username,
        email: req.body.email,
        link: link,
      };
      await sendEmail(emailObj);

      const obj = {
        user: data,
        profile: studentProfileData,
      };
      success(res, obj);
    } else {
      logger.log("error", "email already exists");
      error(res, 409, "email already exists");
    }
  } catch (err) {
    logger.log("error", err);
    next(err);
  }
};

const studentLogin = async (req, res, next) => {
  try {
    /*
     *
     *   Find User against email
     *
     *
     */
    const email = req.body.email;
    const password = req.body.password;
    const data = await User.findOne({ email: email });

    /*
     *
     *   Check if user exists
     *
     *
     */
    if (data) {
      if (data.isConfirm) {
        data.comparePassword(password, async (err, isMatch) => {
          try {
            if (err) throw err;
            if (isMatch) {
              // success(res, data);
              const studentId = data._id;
              const studentProfileData = await StudentProfile.findOne({
                userId: studentId,
              });
              const userImage = await imageSchema.findOne({
                userId: studentId,
              });
              console.log(studentProfileData);
              const token = jwt.sign(
                {
                  createdAt: new Date().getTime(),
                  userId: studentId,
                  username : data.username,
                  email:data.email
                },
                require("../../constants/constants").constants.jwtPrivateKey
              );
              if (studentProfileData && userImage) {
                const obj = {
                  user: data,
                  profile: studentProfileData,
                  image: userImage,
                  token: token,
                };
                success(res, obj);
              } else if (studentProfileData) {
                const obj = {
                  user: data,
                  profile: studentProfileData,
                  image: {},
                  token: token,
                };
                success(res, obj);
              } else if (userImage) {
                const obj = {
                  user: data,
                  profile: {},
                  image: userImage,
                  token: token,
                };
                success(res, obj);
              } else {
                const obj = {
                  user: data,
                  profile: {},
                  image: {},
                  token: token,
                };
                success(res, obj);
              }
            } else {
              next(new Error("password is incorrect"));
            }
          } catch (error) {
            next(error);
          }
        });
      } else {
        throw Error("Please verify email!");
      }
    } else {
      throw Error("record not found");
    }
  } catch (err) {
    logger.log("error", err);
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const id = req.params.id;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const data = await User.findOne({ _id: id });
    if (data) {
      data.comparePassword(password, async (err, isMatch) => {
        try {
          if (err) throw err;
          if (isMatch) {
            const saltRounds = 10;
            // update it with hash
            bcrypt.genSalt(saltRounds, (err, salt) => {
              if (err) return next(err);
              if (newPassword === "") throw Error("password is empty");
              bcrypt.hash(newPassword, salt, async (err, hash) => {
                try {
                  if (err) return next(err);
                  await User.updateOne(
                    { _id: id },
                    {
                      $set: {
                        password: hash,
                      },
                    },
                    { runValidators: true }
                  );
                  const data = await User.find({ _id: id });
                  getSuccess(res, data);
                } catch (error) {
                  next(error);
                }
              });
            });
          } else {
            next(new Error("password is incorrect"));
          }
        } catch (error) {
          throw Error(error);
        }
      });
    } else {
      throw Error("record not found");
    }
  } catch (error) {
    logger.log("error", error);
    next(error);
  }
};

const getAllStudents = async (req, res, next) => {
  try {
    const userIds = [];
    const userRole = req.params.userrole;
    const profileImages = await imageSchema.find({ userRole: userRole });

    profileImages.forEach((element) => {
      userIds.push(element.userId);
    });

    const data = await User.find({ _id: { $in: userIds } });

    const responseArr = [];
    data.forEach((user, index) => {
      if (user._id.equals(profileImages[index].userId)) {
        responseArr.push({
          profileImage: profileImages[index].profileImage,
          username: user.username,
          email: user.email,
          userId: profileImages[index].userId,
          userRole: "student",
        });
      }
    });

    success(res, responseArr);
  } catch (error) {
    logger.log("error", error);
    next(error);
  }
};

const findAllStudents = async (req, res, next) => {
  try {
    const students = await StudentProfile.find().populate("userId").populate('profileImage');
    if (students.length > 0) {
      success(res, students);
    } else {
      throw Error("record not found");
    }
  } catch (error) {
    logger.log("error", error);
    next(error);
  }
};

const getStudentList = async (req, res, next) => {
  try {
    const data = await User.find();
    if (data.length > 0) {
      success(res, data);
    } else {
      throw Error("no record found");
    }
  } catch (error) {
    logger.log("error", error);
    next(error);
  }
};

const sendEmailToStudent = async (req, res, next) => {
  try {
    const { email } = req.body;
    const sent = await sendEmail(email);
    console.log(sent);
  } catch (error) {
    logger.log("error", error);
    next(error);
  }
};

const updateConfirmation = async (req, res, next) => {
  try {
    const { id } = req.query;
    await User.update(
      { _id: id },
      {
        $set: {
          isConfirm: true,
        },
      }
    );

    const data = await User.findOne({ _id: id }).lean();
    success(res, data);
  } catch (error) {
    logger.log("error", error);
    next(error);
  }
};

const forgotpassword = async (req, res, next) => {
  try {
    const userData = await User.findOne({ email: req.body.email });

    if (userData) {
      let token = Math.random()
        .toString()
        .replace(".", "")
        .toString();
      const user = await User.update(
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
        firedFrom: "forgotPassword",
        others: {
          user: userData,
          url: `${process.env.CLIENT_BASE_URL}reset-password/?user=student&token=${token}`,
        },
      };

      // global function to send email
      await sendEmail(emailObj);
      success(res, { result: "email sent" });
    } else {
      throw Error("record not found");
    }
  } catch (error) {
    logger.log("error", error);
    next(error);
  }
};

const resetPasswordByLink = async (req, res, next) => {
  try {
    const newPassword = req.body.newPassword;
    const data = await User.findOne({ resetToken: req.body.resetToken });
    if (data) {
      try {
        const id = data._id;
        const saltRounds = 10;
        // update it with hash
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) return next(err);
          if (newPassword === "") throw Error("password is empty");
          bcrypt.hash(newPassword, salt, async (err, hash) => {
            try {
              if (err) return next(err);
              await User.updateOne(
                { _id: id },
                {
                  $set: {
                    password: hash,
                  },
                },
                { runValidators: true }
              );
              const data = await User.find({ _id: id });
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
      throw Error("record not found");
    }
  } catch (error) {
    logger.log("error", error);
    next(error);
  }
};

module.exports = {
  studentLogin,
  studentSignup,
  changePassword,
  getAllStudents,
  getStudentList,
  findAllStudents,
  sendEmailToStudent,
  updateConfirmation,
  forgotpassword,
  resetPasswordByLink,
};
