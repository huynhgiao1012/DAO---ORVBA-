const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const GarageSchema = new Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must have at least 3 characters"],
    },
    Email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    Phone: {
      type: String,
      unique: true,
      require: [true, "Phone number is required"],
      unique: true,
    },
    Longitude: {
      type: Number,
      required: [true, "Longtitude is required"],
    },
    Latitude: {
      type: Number,
      required: [true, "Latitude is required"],
    },
    Address: {
      type: String,
      required: [true, "Address is required"],
    },
    Description: {
      type: String,
      required: [true, "Description is required"],
    },
    OpenTime: {
      type: String,
      required: [true, "Open time is required"],
    },
    CloseTime: {
      type: String,
      required: [true, "close time is required"],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Garage",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Garage", GarageSchema);