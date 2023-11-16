const mongoose = require("mongoose");
const { NOTI_STATUS } = require("../constant");
const Schema = mongoose.Schema;
const NotificationSchema = new Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
    garageId: {
      type: mongoose.Types.ObjectId,
      ref: "garage",
    },
    text: {
      type: String,
      required: "true",
    },
    status: {
      type: String,
      enum: NOTI_STATUS,
      default: NOTI_STATUS.UNREAD,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Notification",
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
