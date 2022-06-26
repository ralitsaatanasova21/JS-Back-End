const { Schema, model} = require("mongoose");

const name_pattern = /^[a-zA-Z-]+$/;
const email_pattern = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
  username: { type: String, required: true, validate: {
    validator(value) {
      return name_pattern.test(value);
    },
    message: "Username must be valid and may contain only english letters",
  },
  minlength: [5, 'Username must be at least 5 characters long'] },
  email: {type: String, required: true, validate: {
      validator(value) {
        return email_pattern.test(value);
      },
      message: "Email must be valid and may contain only english letters",
    },
    minlength: [10, 'Email must be at least 10 characters long']
  },
  hashedPassword: { type: String, required: true},
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
