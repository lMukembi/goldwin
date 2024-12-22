const mongoose = require("mongoose");

const whatsappExpiresSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },

  expireAt: {
    type: Date,
    default: Date.now() + 24 * 60 * 60 * 1000,
  },
});

whatsappExpiresSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const WhatsappExpires = mongoose.model(
  "WhatsappExpires",
  whatsappExpiresSchema
);

module.exports = WhatsappExpires;
