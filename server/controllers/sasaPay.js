const SasaPay = require("../models/sasaPay");
const axios = require("axios");
const User = require("../models/user");

exports.deposit = async (req, res, next) => {
  const phone = req.body.phone;
  const amount = req.body.amount;

  const accessToken = req.accessToken;

  const depositUrl = "https://sasapay.app/api/v1/payments/request-payment/";

  const date = new Date();

  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  const data = {
    MerchantCode: "600980",
    NetworkCode: "63902",
    "Transaction Fee": "0",
    Currency: "KES",
    Amount: `${amount}`,
    CallBackURL: "https://api.goldwinadverts.com/sasaPay/results",
    PhoneNumber: `${phone}`,
    TransactionDesc: "Request Payment",
    AccountReference: timestamp,
  };

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    await axios.post(depositUrl, data, { headers: headers });

    res.status(200).json({
      status: true,
      message: "Message sent!",
    });

    next();
  } catch (err) {
    res.status(401).json(err.message);
  }
};

exports.callback = async (req, res, next) => {
  /* DEPOSIT RESULTS */

  req.Paid = req.body.Paid;

  req.CustomerMobile = req.body.CustomerMobile;

  req.TransactionCode = req.body.TransactionCode;

  req.accessToken = req.accessToken;

  req.ThirdPartyTransID = req.body.ThirdPartyTransID;

  next();
};

exports.withdraw = async (req, res) => {
  const phone = req.body.phone;
  const amount = req.body.amount;

  const accessToken = req.accessToken;

  const withdrawUrl = "https://sasapay.app/api/v1/payments/b2c/";

  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  const data = {
    MerchantCode: "600980",
    MerchantTransactionReference: timestamp,
    Amount: `${amount}`,
    Currency: "KES",
    ReceiverNumber: `${phone}`,
    Channel: "63902",
    Reason: "Salary payment",
    CallBackURL: "https://api.goldwinadverts.com/sasaPay/results",
  };

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    await axios.post(withdrawUrl, data, { headers: headers });

    res.status(200).json({
      status: true,
      message: "Message sent!",
    });

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json(err.message);
  }
};

exports.verify = async (req, res) => {
  const transactionCode = req.body.TransactionCode;
  const senderPhone = req.CustomerMobile;
  const accessToken = req.accessToken;
  const mpesaTransID = req.ThirdPartyTransID;
  const paidStatus = req.Paid;

  const verifyUrl = "https://sasapay.app/api/v1/transactions/verify/";

  const data = {
    MerchantCode: "600980",
    TransactionCode: `${transactionCode}`,
  };

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const resData = await axios.post(verifyUrl, data, { headers: headers });

    if (resData.data.status === true) {
      const user = await User.findOne({ phone: senderPhone });

      if (user) {
        user.balance += resData.data.data.TransAmount;
        await user.save();
      }

      const transaction = new SasaPay({
        userID: user._id,
        amount: resData.data.data.TransAmount,
        mpesaTransactionID: mpesaTransID,
        sasaPayTransactionID: resData.data.data.TransID,
        paid: paidStatus,
      });

      await transaction.save();
    }

    return res.status(200).json({ status: "success", data: resData.data.data });
  } catch (error) {
    console.error(error.message);
    if (error) {
      return res.status(401).json({ message: "Unauthorised" });
    }
  }
};

exports.getTransactionMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const transactionMessages = await SasaPay.find({ userID: id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(transactionMessages);
  } catch (error) {
    res.status(404).json({ message: "No data!" });
  }
};
