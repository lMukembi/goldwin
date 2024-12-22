const mongoose = require("mongoose");

const mpesaSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },

    amount: {
      type: String,
      required: true,
    },

    paybillNo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Mpesa = mongoose.model("Mpesa", mpesaSchema);

module.exports = Mpesa;
