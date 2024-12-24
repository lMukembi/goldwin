const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      minLength: 4,
    },

    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    userType: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
    },

    referralID: {
      type: String,
    },

    depositBalance: {
      type: Number,
      default: 0,
    },

    withdrawableBalance: {
      type: Number,
      default: 0,
    },

    whatsappWithdrawnBalance: {
      type: Number,
      default: 0,
    },

    cashbackBalance: {
      type: Number,
      default: 0,
    },

    investmentsBalance: {
      type: Number,
      default: 0,
    },

    agentWithdrawnBalance: {
      type: Number,
      default: 0,
    },

    clientWithdrawnBalance: {
      type: Number,
      default: 0,
    },

    academicBalance: {
      type: Number,
      default: 0,
    },

    whatsappBalance: {
      type: Number,
      default: 0,
    },

    spinningBalance: {
      type: Number,
      default: 0,
    },

    loansBalance: {
      type: Number,
      default: 0,
    },

    servicePackage: {
      type: String,
    },

    serviceToken: {
      type: String,
    },

    token: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
