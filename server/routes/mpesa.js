const express = require("express");
const router = express.Router();

const {
  deposit,
  callback,
  registerurl,
  b2curlrequest,
} = require("../controllers/mpesa");

router.route("/deposit").post(deposit);
router.route("/callback").post(callback);
router.route("/registerurl").post(registerurl);
router.route("/b2curlrequest").post(b2curlrequest);

module.exports = router;
