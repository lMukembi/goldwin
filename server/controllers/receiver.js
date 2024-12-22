const Receive = require("../models/receiver");

exports.receiver = async (req, res) => {
  const { id } = req.params;

  const { receivedAmount } = req.body;

  try {
    const receiveNew = await Receive.create({
      receivedAmount,
      userID: id,
    });

    await receiveNew.save();

    return res.status(200).json({ success: true, data: receiveNew });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

exports.getReceivedMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const receivedMessages = await Receive.find({ userID: id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(receivedMessages);
  } catch (error) {
    res.status(404).json({ message: "No data!" });
  }
};
