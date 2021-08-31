const user = require("../../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

Mutation = {
  async login(_, { email, password }) {
    const userindb = await user.findOne({ email });
    console.log(userindb);
    if (!userindb) {
      throw new UserInputError("This email id is not registered", {
        errors: { email: "This email is not registered" },
      });
    }

    const match = bcrypt.compare(password, userindb.password);

    if (!match) {
      throw new UserInputError("invalid password", {
        errors: { password: "invalid password" },
      });
    }

    const token = jwt.sign(
      { id: userindb._id, username: userindb.username },
      "mysecret",
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    return {
      id: userindb._id,
      username: userindb.username,
      token: token,
      email: userindb.email,
    };
  },
  async register(_, { registerinput }) {
    var { username, password, email, confirmpassword } = registerinput;
    const userindb = await user.find({ username });
    console.log(userindb);
    if (userindb.length > 0) {
      throw new UserInputError("This username is taken", {
        errors: { username: "This username is taken" },
      });
    }
    password = await bcrypt.hash(password, 12);
    const user_doc = new user({
      username,
      password,
      email,
      createdAt: new Date().toISOString(),
    });
    const inserted_doc = await user_doc.save();
    const token = jwt.sign(
      { id: inserted_doc._id, username: inserted_doc.username },
      "mysecret",
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    console.log(inserted_doc);
    return {
      id: inserted_doc._id,
      username: inserted_doc.username,
      token: token,
      email: inserted_doc.email,
    };
  },
};
module.exports.Mutation = Mutation;
