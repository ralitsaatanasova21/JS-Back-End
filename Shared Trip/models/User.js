const { Schema, model, Types: { ObjectId} } = require("mongoose");

const name_pattern = /^[a-zA-Z-]+$/;
const email_pattern = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

//TODO change user model according to exam description
//TODO add validation
const userSchema = new Schema({
  email: {type: String, required: true, validate: {
      validator(value) {
        return email_pattern.test(value);
      },
      message: "Email must be valid and may contain only english letters",
    },
  },
  hashedPassword: { type: String, required: true },
  gender: { type: String, required: true, enum: [ 'male', 'female'] },
  trips: { type: [ObjectId], ref: 'Trip', default: [] },
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
