const validateToken=require('../../verification/tokenVerify')

module.exports = app => {
    const {
        createTeacherSchedule,
        getTeacherSchedule,
        deleteTacherSchedule,
        createAppointments,
        deleteAppointment,
        getAppointmentByID,
        approveAppointments,
        createleaves,
        getleavesByID,
        deleteLeaves
    } = require('../controllers/class-schedule.controller');

    app.post('/tutor/create-schedule',validateToken, createTeacherSchedule);
    // app.post('/tutor/updateSchedule/:id', updateTeacherSchedule);
    app.get('/tutor/get-schedule',validateToken, getTeacherSchedule);
    app.post('/tutor/delete-schedule',validateToken, deleteTacherSchedule);

    app.post('/tutor/create-appointment',validateToken, createAppointments);
    app.get('/get-appointment-by-id',validateToken, getAppointmentByID);
    app.get('/delete-appointment',validateToken, deleteAppointment);

    app.post('/approve-appointments',validateToken, approveAppointments)
    app.post('/create-leaves',validateToken, createleaves)
    app.get('/get-leaves-by-id',validateToken, getleavesByID)
    app.post('/delete-tutor-leaves',validateToken, deleteLeaves)
}