const validateToken = require("../../verification/tokenVerify");

module.exports = (app) => {
  const {
    addStudentImage,
    updateStudentImage,
    updateStudentId,
    getProfileImage,
  } = require("../controllers/image.controller");
  const uploadProfileImage = require("../../utils/multer.utils");

  app.post(
    "/user/profile/image",
    validateToken,
    uploadProfileImage,
    addStudentImage
  );
  app.put(
    "/user/profile/image/:id",
    validateToken,
    uploadProfileImage,
    updateStudentImage
  );
  app.put("/user/profile/image/profileid/:id", validateToken, updateStudentId);
  app.get("/user/profile/image/:id", validateToken, getProfileImage);
};
