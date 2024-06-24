module.exports = app => {
    const { studentLogin, 
            studentSignup, 
            changePassword, 
            getAllStudents, 
            getStudentList, 
            findAllStudents, 
            sendEmailToStudent,
            updateConfirmation,
            forgotpassword,
            resetPasswordByLink
        } = require('../controllers/student.controller');

    app.post('/student/login', studentLogin);
    app.post('/student/signup', studentSignup);
    app.post('/student/forgotpassword', forgotpassword);
    app.post('/student/resetpassword', resetPasswordByLink);
    app.put('/student/changepassword/:id', changePassword);
    app.get('/students/:userrole', getAllStudents);
    app.get('/students', getStudentList);
    app.get('/student/allstudents', findAllStudents);
    app.post('/email', sendEmailToStudent);
    app.get('/verifyemail/student', updateConfirmation);

};