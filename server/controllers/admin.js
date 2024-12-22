const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { welcomeEmail } = require("../middleware/successEmails");

exports.signup = async (req, res) => {
  const { email, username, password, secretCode } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const createdAdmin = await Admin.create({
    email,
    username,
    password: hash,
    secretCode,
  });

  await createdAdmin.save();

  await welcomeEmail(createdAdmin.email, createdAdmin.username);

  const adminID = { id: createdAdmin.id };
  const tokenID = jwt.sign(adminID, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({
    isAdmin: true,
    adminData: createdAdmin,
    tokenID: tokenID,
    message: "Admin created successfully.",
  });
};

exports.login = async (req, res) => {
  const { email, password, secretCode } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin.secretCode !== secretCode) {
    return res.status(401).json({
      message: "You're unauthorised!",
    });
  }

  if (!admin) {
    return res.status(400).json({
      message: "The email is not registered.",
    });
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    return res.status(404).json({ message: "The password does not match." });
  }

  const adminID = { id: admin.id };
  const tokenID = jwt.sign(adminID, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return res
    .status(200)
    .json({ isAdmin: true, adminData: admin, tokenID: tokenID });
};

exports.getAdmin = async (req, res) => {
  try {
    const adminData = await Admin.findOne({ _id: req.params.id });

    res.status(200).json(adminData);
  } catch (error) {
    res.status(404).json({ message: "No admin data!" });
  }
};

exports.updateAdminBalance = async (req, res, next) => {
  const { adminUsername } = req.params;

  let { adminBalance } = req.body;

  const admin = await Admin.findOne({ username: adminUsername });

  if (!admin) return res.status(401).send("Unauthorised!");

  const newAdminBalance = {
    adminBalance,
    _id: admin._id,
  };

  await Admin.findOneAndUpdate({ _id: admin._id }, newAdminBalance, {
    new: true,
  });

  res.status(200).json({
    status: true,
    result: newAdminBalance,
    message: "Updated successfully.",
  });
};

exports.uniqueUsername = async (req, res) => {
  const { username } = req.body;

  const admin = await Admin.findOne({ username });

  if (admin) {
    res.status(200).json({
      status: true,
      adminData: admin,
    });
  } else {
    res.status(204).json({
      status: false,
      message: "Username is available.",
    });
  }
};
