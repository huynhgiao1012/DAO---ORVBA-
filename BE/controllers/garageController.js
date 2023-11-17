const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Company = require("../models/company");
const ApiError = require("../utils/ApiError");
var generator = require("generate-password");
const EmailService = require("../utils/EmailService");
const { ROLES } = require("../constant");
// _id.valueOf() --> lấy id từ object id

// admin adds garage's information to system
exports.createGarage = catchAsync(async (req, res) => {
  const {
    name,
    email,
    phone,
    logitude,
    latitude,
    address,
    description,
    openTime,
    closeTime,
  } = req.body;
  var password = generator.generateMultiple(1, {
    length: 10,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
    strict: true,
  })[0];
  const account = await Account.create({
    name,
    email,
    phone,
    password,
    role: ROLES.MANAGER,
  });
  const company = await Company.create({
    accountId: account.id,
    openTime,
    closeTime,
    long,
    lat,
    address,
  });
  await EmailService.sendMail(
    process.env.EMAIL,
    `${email}`,
    "REGISTER COMPANY SUCCESS",
    `Your passwors: ${password}`
  );
  res.status(200).json({
    success: true,
    message: "Successfull",
    account,
    company,
  });
});
// exports.deleteCompany = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const account = await Account.findById(id);
//   const company = await Company.findOne({ accountId: id });
//   if (!account || !company) {
//     throw new ApiError(400, "This company is not available");
//   }
//   await account.remove();
//   await company.remove();
//   res.status(200).json({
//     success: true,
//     data: account,
//   });
// });
// exports.updateCompany = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const { name, phone, openTime, closeTime, long, lat, address } = req.body;
//   const account = await Account.findByIdAndUpdate(
//     id,
//     { name, phone },
//     { new: true }
//   );
//   const company = await Company.findOneAndUpdate(
//     { accountId: id },
//     { openTime, closeTime, long, lat, address },
//     { new: true }
//   );
//   if (!account || !company) {
//     throw new ApiError(400, "This company is not available");
//   }
//   res.status(200).json({
//     success: true,
//     message: "Update successfully",
//     accountInfo: account,
//     companyInfo: company,
//   });
// });
// exports.getAllCompany = catchAsync(async (req, res) => {
//   const data = await Account.find({ role: ROLES.COMPANY });
//   if (!data) {
//     throw new ApiError(400, "This company is not available");
//   }
//   res.status(200).json({
//     success: true,
//     data,
//   });
// });
// exports.getCorCompany = catchAsync(async (req, res) => {
//   const data = await Company.find({});
//   if (!data) {
//     throw new ApiError(400, "This company is not available");
//   }
//   res.status(200).json({
//     success: true,
//     data,
//   });
// });
// exports.getSpecificCorCompany = catchAsync(async (req, res) => {
//   const id = req.user.id;
//   const data = await Company.findOne({ accountId: id });
//   if (!data) {
//     throw new ApiError(400, "This company is not available");
//   }
//   res.status(200).json({
//     success: true,
//     data,
//   });
// });
// exports.getCompany = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const data = await Account.findById(id);
//   const companyDetail = await Company.findOne({ accountId: id });
//   if (!data || !companyDetail) {
//     throw new ApiError(400, "This company is not available");
//   }
//   res.status(200).json({
//     success: true,
//     data,
//     companyDetail,
//   });
// });
