const mongoose = require("mongoose");
const { NOTI_STATUS } = require("../constant");
const Schema = mongoose.Schema;
const NotificationSchema = new Schema(
  {
    CustomerId: {
      type: mongoose.Types.ObjectId,
      ref: "account",
    },
    GarageId: {
      type: mongoose.Types.ObjectId,
      ref: "garage",
    },
    Text: {
      type: String,
      required: "true",
    },
    Status: {
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
