const express = require("express");
const router = express.Router();

const {
  deposit,
  callback,
  verify,
  getTransactionMessages,
  withdraw,
} = require("../controllers/sasaPay");
const { authToken } = require("../middleware/authenticate");

router.route("/deposit").post(authToken, deposit);
router.route("/results").post(authToken, callback, verify);
router.route("/:id/transaction-messages").get(getTransactionMessages);
router.route("/withdraw").post(authToken, withdraw);

module.exports = router;
