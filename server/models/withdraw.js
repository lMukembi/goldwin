const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    userID: {
      type: String,
      required: true,
    },

    withdrawID: {
      type: String,
      default: "ceo",
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Withdraw = mongoose.model("Withdraw", withdrawSchema);

module.exports = Withdraw;
