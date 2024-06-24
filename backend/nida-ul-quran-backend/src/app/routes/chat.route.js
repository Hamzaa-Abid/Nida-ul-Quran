const validateToken = require("../../verification/tokenVerify");

module.exports = (app) => {
  const {
    postMessages,
    loadMessages,
  } = require("../controllers/chat.controller");

  app.get("/messages", validateToken, loadMessages);
  app.post("/message", validateToken, postMessages);
};
