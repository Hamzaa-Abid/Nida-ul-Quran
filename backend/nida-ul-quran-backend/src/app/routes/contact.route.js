const validateToken = require("../../verification/tokenVerify");

module.exports = (app) => {
  const {
    addContactList,
    updateInvitationsStatus,
    pendingInvitation,
    recommendations,
    getInvitations,
    getContacts,
  } = require("../controllers/contact.controller");

  app.post("/contact", validateToken, addContactList);
  app.put("/contact", validateToken, updateInvitationsStatus);
  app.get("/contact/pendinginvites", validateToken, pendingInvitation);
  app.get("/contact/recommendation", validateToken, recommendations);
  app.get("/contact/invitations", validateToken, getInvitations);
  app.get("/contact/allcontacts", validateToken, getContacts);
};
