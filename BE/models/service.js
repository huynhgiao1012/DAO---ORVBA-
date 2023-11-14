const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServiceSchema = new Schema(
  {
    GarageId: {
      type: Schema.Types.ObjectId,
      ref: "garage",
    },
    ServiceName: {
      type: String,
      required: [true, "Service's name is required"],
    },
    EstimatedPrice: {
      type: Number,
      required: [true, "Estimated price is required"],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Service",
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
