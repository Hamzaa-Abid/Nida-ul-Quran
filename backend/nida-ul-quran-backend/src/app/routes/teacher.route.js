module.exports = app => {
    const {
        teacherLogin,
        teacherSignup,
        getAllTeachers,
        changePassword,
        updateConfirmation,
        forgotpassword,
        resetPasswordByLink
    } = require('../controllers/teacher.controller');

    app.post('/tutor/signup', teacherSignup);
    app.post('/tutor/login', teacherLogin);
    app.get('/tutor/:userrole', getAllTeachers);
    app.put('/tutor/changepassword/:id', changePassword);
    app.post('/tutor/resetpassword', resetPasswordByLink);
    app.post('/tutor/forgotpassword', forgotpassword);
    app.get('/verifyemail/tutor', updateConfirmation);
}