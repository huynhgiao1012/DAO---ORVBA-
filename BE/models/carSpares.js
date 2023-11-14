const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CarSparesSchema = new Schema(
  {
    GarageId: {
      type: Schema.Types.ObjectId,
      ref: "garage",
    },
    AccountantId: {
      type: Schema.Types.ObjectId,
      ref: "accountant",
    },
    Name: {
      type: String,
      required: [true, "Name is required"],
    },
    Price: {
      type: Number,
      required: [true, "Price is required"],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "CarSpares",
    timestamps: true,
  }
);

module.exports = mongoose.model("CarSpares", CarSparesSchema);
