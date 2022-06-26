const { Schema, model, Types: { ObjectId } } = require("mongoose");

const image_pattern = /^http?:\/\/(.+)/;

//TODO add validation
const tripSchema = new Schema({
  startPath: { type: String, required: true, minlength: [4, 'Starting point must be at least 4 characters long'] },
  endPath: { type: String, required: true, minlength: [4, 'End point must be at least 4 characters long'] },
  date: { type: String, required: true },
  time: { type: String, required: true },
  carImg: {type: String, validate: {
      validator(value) {
        return image_pattern.test(value);
      },
      message: "Image must be a valid URL",
    },
  },
  carBrand: { type: String, required: true, minlength: [4, 'Car brand must be at least 4 characters long'] },
  seats: { type: Number, required: true , min: 0, max: 4},
  price: { type: Number, required: true, min: 1, max: 50 },
  description: { type: String, required: true, minlength: [10, 'Description must be at least 10 characters long'] },
  owner: { type: ObjectId, ref: "User", required: true },
  buddies: { type: [ObjectId], ref: "User", default: [] },
});

const Trip = model("Trip", tripSchema);

module.exports = Trip;
