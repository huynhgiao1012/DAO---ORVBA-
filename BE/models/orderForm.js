const mongoose = require("mongoose");
const { FORM_STATUS } = require("../constant");
const Schema = mongoose.Schema;
const OrderFormSchema = new Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
    managerId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
    mechanicId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
    garageId: {
      type: mongoose.Types.ObjectId,
      ref: "garage",
    },
    service: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    automaker: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: FORM_STATUS,
      default: FORM_STATUS.AWAIT,
    },
    isFeedback: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    imgAf: {
      type: String,
      required: true,
    },
    imgBf: {
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
