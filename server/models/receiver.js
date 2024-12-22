const mongoose = require("mongoose");

const receiverSchema = new mongoose.Schema(
  {
    receivedAmount: {
      type: String,
      required: true,
    },

    userID: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Receiver = mongoose.model("Receiver", receiverSchema);

module.exports = Receiver;
