const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FeedbackSchema = new Schema(
  {
    CustomerId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
    GarageId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
    FormID: {
      type: mongoose.Types.ObjectId,
      ref: "orderForm",
    },
    Rating: {
      type: Number,
      required: true,
    },
    Review: {
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
