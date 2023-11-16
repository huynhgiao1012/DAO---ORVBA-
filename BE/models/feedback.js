const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FeedbackSchema = new Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
    garageId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
    formID: {
      type: mongoose.Types.ObjectId,
      ref: "orderForm",
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Feedback",
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
