const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const CustomerSchema = new Schema(
  {
    AccountId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "account",
    },
    Point: {
      type: Number,
      required: true,
      default: 0,
    },
    IsVIP: {
      type: Boolean,
      default: false,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Customer",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Customer", CustomerSchema);