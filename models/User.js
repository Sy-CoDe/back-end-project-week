const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;

    return next(); // goes on to save to the db
  });
});

userSchema.methods.isPasswordValid = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model("User", userSchema, "users");
