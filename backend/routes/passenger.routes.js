const express = require("express");
const { passengerModel } = require("../models/passenger.model");
const multer = require("multer");
const passengerRouter = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

passengerRouter.post(
  "/add",
  upload.fields([
    { name: "photo", maxCount: 10 },
    { name: "idCard", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      let passengers = JSON.parse(req.body.passengers);
      passengers = passengers.map((passenger, index) => ({
        name: passenger.name,
        age: passenger.age,
        gender: passenger.gender,
        contact: passenger.contact,
        email: passenger.email,
        photo: req.files?.photo?.[index]?.filename || null,
        idCard: req.files?.idCard?.[index]?.filename || null,
      }));
      console.log("Passengers received:", passengers);
      const createdPassengers = await passengerModel.insertMany(passengers);

      res.status(200).json({ msg: "passenger added", createdPassengers });
    } catch (error) {
      res.status(500).json({ msg: "error while adding data" });
    }
  }
);

passengerRouter.get("/", async (req, res) => {
  try {
    const passengers = await passengerModel.find();
    res.status(200).json({ passengers });
  } catch (error) {
    res.status(500).json({ msg: "failed to fetch data", error });
  }
});

module.exports = {
  passengerRouter,
};
