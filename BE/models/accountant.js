const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { GROUP } = require("../constant");

const AccountantSchema = new Schema(
  {
    AccountId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "account",
    },
    GarageId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "garage",
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Accountant",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Accountant", AccountantSchema);
