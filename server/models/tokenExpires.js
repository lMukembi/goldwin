const mongoose = require("mongoose");

const tokenExpiresSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },

  secret: {
    type: Number,
    required: true,
  },

  expireAt: {
    type: Date,
    default: Date.now() + 24 * 60 * 60 * 1000,
  },
});

tokenExpiresSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const TokenExpires = mongoose.model("TokenExpires", tokenExpiresSchema);

module.exports = TokenExpires;
