const express = require("express");
const router = express.Router();

const { receiver, getReceivedMessages } = require("../controllers/receiver");

router.route("/:id/receiver").post(receiver);
router.route("/:id/receiver-messages").get(getReceivedMessages);

module.exports = router;
