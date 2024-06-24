const validateToken = require("../../verification/tokenVerify");

module.exports = (app) => {
  const { postCalls } = require("../controllers/call.controller");

  app.post("/call", validateToken, postCalls);
};
