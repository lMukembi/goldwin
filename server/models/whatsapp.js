const mongoose = require("mongoose");

const whatsappSchema = new mongoose.Schema(
  {
    views: {
      type: Number,
      required: true,
    },

    whatsappBalance: {
      type: Number,
      required: true,
    },

    imageName: {
      type: String,
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

const Whatsapp = mongoose.model("Whatsapp", whatsappSchema);

module.exports = Whatsapp;
