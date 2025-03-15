const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "others"] },
  contact: { type: Number },
  email: { type: String },
  photo: { type: String, required: true },
  idCard: { type: String, required: true },
});

const passengerModel = mongoose.model("Passenger", passengerSchema);

module.exports = {
  passengerModel,
};
