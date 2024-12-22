const Transfer = require("../models/transfer");

exports.transfer = async (req, res) => {
  const { transferedAmount } = req.body;

  try {
    const newTransfer = await Transfer.create({
      transferedAmount,
      userID: req.userExists.id,
    });

    await newTransfer.save();

    return res.status(200).json({ success: true, data: newTransfer });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

exports.getTransferMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const transferMessages = await Transfer.find({ userID: id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(transferMessages);
  } catch (error) {
    res.status(404).json({ message: "No data!" });
  }
};
