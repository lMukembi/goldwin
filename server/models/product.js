const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },

  productID: {
    type: String,
  },

  imageName: {
    type: String,
    required: true,
  },

  expireAt: {
    type: Date,
    default: Date.now() + 24 * 60 * 60 * 1000,
  },
});

productSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
