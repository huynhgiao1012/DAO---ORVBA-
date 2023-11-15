const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const OTPSchema = new Schema(
  {
    AbortControllerccountId: {
      type: Schema.Types.ObjectId,
      ref: "account",
    },
    Otp: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
      expires: 10800, // 3min
    },
  },
  {
    collection: "Otps",
    timestamps: true,
  }
);
OTPSchema.pre("save", function (next) {
  if (!this.isModified("Otp")) return next();
  const salt = bcrypt.genSaltSync(); //round : độ phức tạp , thời gian cần 2^10
  const hashedOTP = bcrypt.hashSync(this.Otp, salt);
  this.Otp = hashedOTP;
  next();
});
module.exports = mongoose.model("OTP", OTPSchema);
