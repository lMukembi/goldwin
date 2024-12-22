const express = require("express");
const router = express.Router();

const {
  newWithdrawal,
  getWithdrawals,
  adminWithdrawals,
  updateWithdrawal,
} = require("../controllers/withdraw");

router.route("/:id/new-withdrawal").post(newWithdrawal);
router.route("/:id/withdraw-records").get(getWithdrawals);
router.route("/update-status").put(updateWithdrawal);
router.route("/:id/admin-withdrawals").post(adminWithdrawals);

module.exports = router;
