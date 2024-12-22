const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/assets/images/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage });

const {
  whatsappEarnings,
  getUserWhatsappRecords,
  getWhatsappProduct,
  updateWhatsappProduct,
} = require("../controllers/whatsapp");
const Product = require("../models/product");

router.route("/:id/whatsapp-earnings").post(whatsappEarnings);
router.route("/:id/whatsapp-records").get(getUserWhatsappRecords);
router.route("/:productID/whatsapp-product").get(getWhatsappProduct);
router.route("/:id/update-product").patch(updateWhatsappProduct);

router.post(
  "/:id/whatsapp-product",
  upload.single("imageName"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const whatsappProduct = await Product.create({
        userID: id,
        imageName: req.file.filename,
      });

      await whatsappProduct.save();

      return res.status(200).json({ success: true, data: whatsappProduct });
    } catch (error) {
      console.log(error.message);
    }
  }
);

module.exports = router;
