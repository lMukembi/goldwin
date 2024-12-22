const express = require("express");
const router = express.Router();

const { transfer, getTransferMessages } = require("../controllers/transfer");
const { protect } = require("../middleware/authenticate");

router.route("/:id/transfer").post(protect, transfer);
router.route("/:id/transfer-messages").get(getTransferMessages);

module.exports = router;
