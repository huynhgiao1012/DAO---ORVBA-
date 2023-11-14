const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubServiceSchema = new Schema(
  {
    ServiceId: {
      type: Schema.Types.ObjectId,
      ref: "service",
    },
    SubName: {
      type: String,
      required: [true, "Service's name is required"],
    },
    SubPrice: {
      type: Number,
      required: [true, "Subservice price is required"],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "SubService",
    timestamps: true,
  }
);

module.exports = mongoose.model("SubService", SubServiceSchema);
