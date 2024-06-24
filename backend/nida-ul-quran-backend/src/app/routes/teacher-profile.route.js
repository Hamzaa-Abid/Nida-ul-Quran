const validateToken = require("../../verification/tokenVerify");

module.exports = (app) => {
  const {
    addTeacherProfile,
    updateTeacherProfle,
    getTeacherProfile,
    findAllTeacherRecords,
    filterTeacherProfile,
  } = require("../controllers/teacher-profile.controller");

  app.post("/tutor/profile", validateToken, addTeacherProfile);
  app.put("/tutor/profile/:id", validateToken, updateTeacherProfle);
  app.get("/tutor/profile/:id", validateToken, getTeacherProfile);
  app.get("/tutor/alltutors", findAllTeacherRecords);
  app.post("/tutor/filter", validateToken, filterTeacherProfile);
};
