const WhatsappExpires = require("../models/whatsappExpires");
const Whatsapp = require("../models/whatsapp");
const Product = require("../models/product");
const mongoose = require("mongoose");

exports.whatsappEarnings = async (req, res) => {
  const { id } = req.params;
  const { views, whatsappBalance, imageName } = req.body;

  try {
    const newWhatsappEarnings = await Whatsapp.create({
      views,
      whatsappBalance,
      imageName: imageName.statusFile,
      userID: id,
    });

    await newWhatsappEarnings.save();

    return res.status(200).json({ success: true, data: newWhatsappEarnings });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getUserWhatsappRecords = async (req, res) => {
  const { id } = req.params;

  try {
    const whatsappRecords = await Whatsapp.find({ userID: id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(whatsappRecords);
  } catch (error) {
    console.log(error.message);
  }
};

exports.whatsappExpireAt = async (req, res) => {
  const { id } = req.params;

  try {
    const whatsappExpiresAt = await WhatsappExpires.create({
      userID: id,
    });

    await whatsappExpiresAt.save();

    return res.status(200).json({ success: true, data: whatsappExpiresAt });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getWhatsappExpireAt = async (req, res) => {
  const { id } = req.params;

  try {
    const whatsappExpireAt = await WhatsappExpires.findOne({ userID: id });

    return res.status(200).json(whatsappExpireAt);
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateWhatsappProduct = async (req, res) => {
  const { id } = req.params;

  let { productID, expireAt } = req.body;

  const product = await Product.findOne({ userID: id });

  if (!product) return res.status(401).send("Invalid!");

  const newProductID = {
    productID,
    expireAt,
  };

  await Product.findOneAndUpdate({ _id: product._id }, newProductID, {
    new: true,
  });

  res.status(200).json({
    status: true,
    data: newProductID,
    message: "Updated successfully.",
  });
};

exports.getWhatsappProduct = async (req, res) => {
  const { productID } = req.params;

  try {
    const whatsappProduct = await Product.find({ productID }).sort({
      createdAt: -1,
    });

    return res.status(200).json(whatsappProduct);
  } catch (error) {
    console.log(error.message);
  }
};
