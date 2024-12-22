const mongoose = require("mongoose");

const sasaPaySchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    mpesaTransactionID: {
      type: String,
      required: true,
    },

    sasaPayTransactionID: {
      type: String,
      required: true,
    },

    paid: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SasaPay = mongoose.model("SasaPay", sasaPaySchema);

module.exports = SasaPay;
