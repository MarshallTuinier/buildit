const jwt = require("jsonwebtoken");
require("dotenv").config();

// Checks the users credentials to ensure they are logged in and returns the userID

const getUserId = context => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer: ", "");
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    return id;
  }
  throw new Error("Not authenticated");
};

module.exports = {
  getUserId
};
