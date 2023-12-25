const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Mechanic = require("../models/mechanic");
const Accountant = require("../models/accountant");
const Manager = require("../models/manager");
const ApiError = require("../utils/ApiError");
var generator = require("generate-password");
const EmailService = require("../utils/EmailService");
const { ROLES, FORM_STATUS } = require("../constant");
const OrderForm = require("../models/orderForm");
const Service = require("../models/service");
const SubService = require("../models/subService");
const Garage = require("../models/garage");
const Payment = require("../models/payment");
const CarSpares = require("../models/carSpares");
const SubCarSpares = require("../models/subCarSpares");
exports.pickForm = catchAsync(async (req, res) => {
  const mechanicId = req.user;
  const id = req.params;
  const orderForm = await OrderForm.findByIdAndUpdate(
    id.id,
    {
      mechanicId: mechanicId.id,
      status: FORM_STATUS.PROCESS,
    },
    { new: true }
  );
  await Mechanic.findOneAndUpdate(
    { accountId: mechanicId.id },
    { isAvailable: false },
    { new: true }
  );
  if (orderForm) {
    res.status(200).json({
      success: true,
      message: "Successfully",
      orderForm,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
exports.updateBefore = catchAsync(async (req, res) => {
  const id = req.params;
  const { automaker, imgBf, address } = req.body;
  const orderForm = await OrderForm.findByIdAndUpdate(
    id.id,
    {
      automaker: automaker,
      imgBf: imgBf,
      address: address,
    },
    { new: true }
  );
  if (orderForm) {
    res.status(200).json({
      success: true,
      message: "Successfully",
      orderForm,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
exports.updateFinish = catchAsync(async (req, res) => {
  const id = req.params;
  const { imgAf, payType, carSpares, price } = req.body;
  const orderForm = await OrderForm.findByIdAndUpdate(
    id.id,
    {
      imgAf: imgAf,
      payType: payType,
      status: FORM_STATUS.HOLDING,
      carSpares: carSpares,
      price: price,
    },
    { new: true }
  );
  if (orderForm) {
    res.status(200).json({
      success: true,
      message: "Successfully",
      orderForm,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
exports.getForms = catchAsync(async (req, res) => {
  const accountId = req.user;
  const mechanic = await Mechanic.findOne({ accountId: accountId.id });
  if (mechanic.group === "emergency") {
    const orderForm = await OrderForm.find({
      type: mechanic.group,
      status: FORM_STATUS.AWAIT,
    });
    if (orderForm) {
      res.status(200).json({
        success: true,
        message: "Successfull",
        orderForm: orderForm,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed",
      });
    }
  } else if (mechanic.group === "maintenance") {
    const orderForm = await OrderForm.find({
      type: mechanic.group,
      status: FORM_STATUS.AWAIT,
    });
    if (orderForm) {
      res.status(200).json({
        success: true,
        message: "Successfull",
        orderForm: orderForm,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed",
      });
    }
  }
});
exports.getPickedForms = catchAsync(async (req, res) => {
  const accountId = req.user;
  const orderForm = await OrderForm.find({
    mechanicId: accountId.id,
    status: FORM_STATUS.PROCESS,
  });
  if (orderForm) {
    res.status(200).json({
      success: true,
      message: "Successfull",
      orderForm: orderForm,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
exports.getMePoint = catchAsync(async (req, res) => {
  const accountId = req.user;
  const mechanic = await Mechanic.findOne({ accountId: accountId.id }).populate(
    "garageId",
    "name _id"
  );
  if (mechanic) {
    res.status(200).json({
      success: true,
      message: "Successfull",
      data: mechanic,
    });
  }
});
exports.getAllCarSpares = catchAsync(async (req, res) => {
  const accountId = req.user;
  const accountant = await Mechanic.findOne({ accountId: accountId.id });
  const carSpares = await CarSpares.find({
    garageId: accountant.garageId,
  });
  if (carSpares) {
    res.status(200).json({
      success: true,
      message: "Successfull",
      carSpares: carSpares,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
exports.getSubCarSpare = catchAsync(async (req, res) => {
  const id = req.params;
  const subCarSpares = await SubCarSpares.find({
    carSpareId: id.id,
  });
  if (subCarSpares) {
    res.status(200).json({
      success: true,
      message: "Successfull",
      carSpares: subCarSpares,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
      carSpares: [],
    });
  }
});
