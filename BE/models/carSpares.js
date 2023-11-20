const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CarSparesSchema = new Schema(
  {
    garageId: {
      type: Schema.Types.ObjectId,
      ref: "Garage",
    },
    accountantId: {
      type: Schema.Types.ObjectId,
      ref: "Accountant",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
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
