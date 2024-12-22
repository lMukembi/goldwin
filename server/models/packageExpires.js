const mongoose = require("mongoose");

const packageExpiresSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },

  expireAt: {
    type: Date,
    default: Date.now() + 30 * 24 * 60 * 60 * 1000,
  },
});

packageExpiresSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const PackageExpires = mongoose.model("PackageExpires", packageExpiresSchema);

module.exports = PackageExpires;
