const validateToken = require("../../verification/tokenVerify");
module.exports = (app) => {
  const {
    addStudentProfile,
    getStudentProfile,
    updateStudentProfile,
    filterStudentProfile,
  } = require("../controllers/student-profile.controller");

  app.post("/student/profile", validateToken, addStudentProfile);
  app.get("/student/profile/:id", validateToken, getStudentProfile);
  app.put("/student/profile/:id", validateToken, updateStudentProfile);
  app.post("/student/filter", validateToken, filterStudentProfile);
};
