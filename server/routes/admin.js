const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  getAdmin,
  uniqueUsername,
  updateAdminBalance,
} = require("../controllers/admin");

router.route("/369/login").post(login);
router.route("/369/signup").post(signup);
router.route("/:id/admin-data").get(getAdmin);
router.route("/username").post(uniqueUsername);
router.route("/:adminUsername/new-balance").patch(updateAdminBalance);

module.exports = router;
