const TokenExpires = require("../models/tokenExpires");
const Withdraw = require("../models/withdraw");

exports.newWithdrawal = async (req, res) => {
  const { id } = req.params;

  const { amount, phone } = req.body;

  try {
    const newWithdraw = await Withdraw.create({
      amount,
      phone,
      userID: id,
    });

    await newWithdraw.save();

    return res.status(200).json({ success: true, data: newWithdraw });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getWithdrawals = async (req, res) => {
  const { id } = req.params;

  try {
    const WithdrawRecords = await Withdraw.find({ userID: id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(WithdrawRecords);
  } catch (error) {
    console.log(error.message);
  }
};

exports.adminWithdrawals = async (req, res) => {
  const { withdrawID } = req.body;

  const withdrawals = await Withdraw.find({ withdrawID }).sort({
    createdAt: -1,
  });

  return res.status(200).json({ success: true, data: withdrawals });
};

exports.updateWithdrawal = async (req, res) => {
  let { status, statusID } = req.body;

  const withdrawal = await Withdraw.findOne({ _id: statusID });

  if (!withdrawal) return res.status(401).send("Invalid!");

  try {
    const updateWithdraw = {
      status,
    };

    await Withdraw.findOneAndUpdate({ _id: withdrawal._id }, updateWithdraw, {
      new: true,
    });

    res.status(200).json({
      status: true,
      result: updateWithdraw,
      message: "Updated successfully.",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.tokenExpireAt = async (req, res) => {
  const { userID } = req.body;

  try {
    const tokenExpiresAt = await TokenExpires.create({
      secret: req.secret,
      userID,
    });

    await tokenExpiresAt.save();

    return res.status(200).json({ success: true, data: tokenExpiresAt });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getTokenExpireAt = async (req, res) => {
  const { id } = req.params;

  try {
    const tokenExpireAt = await TokenExpires.findOne({ userID: id });

    return res.status(200).json(tokenExpireAt);
  } catch (error) {
    console.log(error.message);
  }
};
