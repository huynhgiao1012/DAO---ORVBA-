const mongoose = require("mongoose");
const { PAYTYPE } = require("../constant");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    PayStatus: {
      type: Boolean,
      default: false,
      required: [true, "Payment status is required"],
    },
    PayType: {
      type: String,
      enum: PAYTYPE,
      required: [true, "Payment type is required"],
    },
    FormID: {
      type: mongoose.Types.ObjectId,
      ref: "orderForm",
    },
    AccountantId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
  },
  {
    collection: "payments",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Payment", PaymentSchema);
