const mongoose = require("mongoose");
const { FORM_STATUS } = require("../constant");
const Schema = mongoose.Schema;
const OrderFormSchema = new Schema(
  {
    CustomerId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
    ManagerId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
    MechanicId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
    GarageId: {
      type: mongoose.Types.ObjectId,
      ref: "garage",
    },
    Service: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    Time: {
      type: String,
      required: true,
    },
    Automaker: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: FORM_STATUS,
      default: FORM_STATUS.AWAIT,
    },
    IsFeedback: {
      type: Boolean,
      default: false,
    },
    Price: {
      type: Number,
      required: true,
    },
    Note: {
      type: String,
    },
    IsPaid: {
      type: Boolean,
      default: false,
    },
    ImgAf: {
      type: String,
      required: true,
    },
    ImgBf: {
      type: String,
      required: true,
    },
    creatAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "OrderForm",
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderForm", OrderFormSchema);
