const mongoose = require("mongoose");

const receiveSchema = new mongoose.Schema(
  {
    transferedAmount: {
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

const Receive = mongoose.model("Receive", receiveSchema);

module.exports = Receive;
