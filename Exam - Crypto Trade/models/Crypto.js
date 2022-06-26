const { Schema, model, Types: { ObjectId } } = require("mongoose");

const image_pattern = /^http?:\/\/(.+)/;

const cryptoSchema = new Schema({
  name: { type: String, required: true, minlength: [2, 'Name must be at least 2 characters long'] },
  image: { type: String, validate: {
    validator(value) {
      return image_pattern.test(value);
    },
    message: "Image must be a valid URL",
  },},
  price: { type: Number, required: true, min: 1},
  description: { type: String, required: true, minlength: [10, 'Description must be at least 10 characters long'] },
  paymentMethod: { type: String, required: true },
  buyCrypto: { type: [ObjectId], ref: "User", default: [] },
  owner: { type: ObjectId, ref: "User", required: true },
});

const Crypto = model("Crypto", cryptoSchema);

module.exports = Crypto;
