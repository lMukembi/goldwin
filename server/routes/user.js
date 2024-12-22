const express = require("express");
const router = express.Router();

const {
  processSignup,
  processLogin,
  uniqueEmailCheck,
  uniquePhoneCheck,
  uniquePasswordCheck,
  uniqueUsernameCheck,
  checkUsername,
  settings,
  upgrade,
  token,
  getUser,
  investments,
  updateDepositBalance,
  getTeam,
  upgradeMember,
  loginMember,
  deleteMember,
  claimAgent,
  getAgent,
  forgotPassword,
  resetPassword,
  receive,
  getReceiver,
  getUpline,
  withdrawableBalance,
  whatsappWithdrawnBalance,
  cashbackBalance,
  claimCashback,
  clientSupport,
  newUserWhatsappDetails,
  getUserWhatsappDetails,
  agentWithdrawableBalance,
  getPackageExpireAt,
  packageExpireAt,
  getAdmin,
} = require("../controllers/user");
const { secretToken } = require("../middleware/authenticate");
const {
  whatsappExpireAt,
  getWhatsappExpireAt,
} = require("../controllers/whatsapp");
const { tokenExpireAt, getTokenExpireAt } = require("../controllers/withdraw");

router.route("/signup").post(processSignup);
router.route("/login").post(processLogin);
router.route("/reset-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassword);
router.route("/client-support").post(clientSupport);
router.route("/:id/user-data").get(getUser);
router.route("/check-email").post(uniqueEmailCheck);
router.route("/check-password/:id").post(uniquePasswordCheck);
router.route("/check-phone").post(uniquePhoneCheck);
router.route("/check-username").post(uniqueUsernameCheck);
router.route("/username").post(checkUsername);
router.route("/:id/settings").put(settings);
router.route("/:id/upgrade").put(upgrade);
router.route("/:id/token").put(secretToken, token);
router.route("/:id/receive").patch(receive);
router.route("/:id/investments").patch(investments);
router.route("/:id/new-balance").patch(updateDepositBalance);
router.route("/:username/team").get(getTeam);
router.route("/login/:id").post(loginMember);
router.route("/delete-member/:id").delete(deleteMember);
router.route("/upgrade-member/:id").put(upgradeMember);
router.route("/:id/claim").put(claimAgent);
router.route("/:username/agent").get(getAgent);
router.route("/:username/receiver").get(getReceiver);
router.route("/:id/whatsapp-details").patch(newUserWhatsappDetails);
router.route("/:id/whatsapp-details").get(getUserWhatsappDetails);
router.route("/:id/whatsapp-expires").post(whatsappExpireAt);
router.route("/:id/whatsapp-expires").get(getWhatsappExpireAt);
router.route("/:id/package-expires").post(packageExpireAt);
router.route("/:id/package-expires").get(getPackageExpireAt);
router.route("/:id/token-expires").post(secretToken, tokenExpireAt);
router.route("/:id/token-expires").get(getTokenExpireAt);
router.route("/:username/upline").get(getUpline);
router.route("/:username/admin").get(getAdmin);
router.route("/:id/commission").patch(withdrawableBalance);
router.route("/:id/balance").patch(withdrawableBalance);
router.route("/:id/wa-balance").patch(whatsappWithdrawnBalance);
router.route("/:id/agent-balance").patch(agentWithdrawableBalance);
router.route("/:id/cashback-balance").patch(cashbackBalance);
router.route("/:id/claim-cashback").patch(claimCashback);

module.exports = router;
