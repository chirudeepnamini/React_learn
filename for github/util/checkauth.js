const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
const usermodel = require("../Models/user");
const checkauth = (context) => {
  var decoded;
  //   console.log("in checkauth", context);
  const authorization = context.authorization;
  if (!authorization) {
    throw new Error("Authentication header must be provided");
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    throw new Error("Authentication token must be provided");
  }
  try {
    decoded = jwt.verify(token, "mysecret");
    return decoded;
  } catch (err) {
    throw new AuthenticationError("invalid/expired token");
  }
};
module.exports = checkauth;
