const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const {
  clientEmail,
  welcomeEmail,
  tokenEmail,
  packageEmail,
  agentPackageEmail,
} = require("../middleware/successEmails");
const { resetEmail } = require("../middleware/emailTemplates");
const PackageExpires = require("../models/packageExpires");
const Admin = require("../models/admin");

exports.processSignup = async (req, res) => {
  const { email, userName, password, phone, referralID } = req.body;

  const JWT_SECRET =
    "S3bwFeWy4VRrFDQ3r0vDircfvsAH3k7AIwg4DVCm8VhTfI/w8YHF3M0ZG+gCkbWwS1xYj1bVl8liAuETKkElGg==";

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = await User.create({
    email,
    username: userName,
    phone,
    password: hash,
    referralID,
  });

  await newUser.save();

  await welcomeEmail(newUser.email, newUser.username);

  const newUserID = { id: newUser.id };
  const tokenID = jwt.sign(newUserID, JWT_SECRET, {
    expiresIn: "24h",
  });

  return res.status(200).json({
    isAdmin: false,
    result: newUser,
    tokenID: tokenID,
    message: "User created successfully.",
  });
};

exports.uniqueUsernameCheck = async (req, res) => {
  const { userName } = req.body;

  const user = await User.findOne({ username: userName });

  if (user) {
    return res.status(200).json({
      status: true,
      data: user,
      message: "Username is taken.",
    });
  } else {
    res.status(204).json({
      status: false,
      message: "Username is available.",
    });
  }
};

exports.uniquePasswordCheck = async (req, res) => {
  const { email, password } = req.body;

  const currentPasswordCheck = await User.findOne({ email });

  if (!currentPasswordCheck) {
    return res.status(400).json({
      message: "The email is not registered.",
    });
  }

  const passwordMatch = await bcrypt.compare(
    password,
    currentPasswordCheck.password
  );

  if (passwordMatch) {
    res.status(200).json({
      status: true,
      message: "Password check success.",
    });
  } else {
    res.status(204).json({ status: false, message: "Password check failed." });
  }
};

exports.uniqueEmailCheck = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(200).json({
      status: true,
      data: user,
      message: "Email is taken.",
    });
  } else {
    res.status(204).json({
      status: false,
      message: "Email is available.",
    });
  }
};

exports.uniquePhoneCheck = async (req, res) => {
  const { phone } = req.body;
  const user = await User.findOne({ phone });

  if (user) {
    return res.status(200).json({
      status: true,
      data: user,
      message: "Phone number is taken.",
    });
  } else {
    res.status(204).json({
      status: false,
      message: "Phone number available.",
    });
  }
};

exports.checkUsername = async (req, res) => {
  const { userName } = req.body;
  const user = await User.findOne({ username: userName });

  if (user) {
    return res.status(200).json({
      status: true,
      message: "Username is available.",
    });
  } else {
    res.status(204).json({
      status: false,
      message: "Username does not exist.",
    });
  }
};

exports.processLogin = async (req, res) => {
  const { email, password } = req.body;

  const userLogin = await User.findOne({ email });

  if (!userLogin) {
    return res.status(400).json({
      message: "The email is not registered.",
    });
  }

  const passwordMatch = await bcrypt.compare(password, userLogin.password);

  if (!passwordMatch) {
    return res.status(404).json({ message: "The password does not match." });
  }

  const newUserID = { id: userLogin.id };
  const tokenID = jwt.sign(newUserID, JWT_SECRET, {
    expiresIn: "24h",
  });

  return res
    .status(200)
    .json({ isAdmin: false, result: userLogin, tokenID: tokenID });
};

exports.clientSupport = async (req, res) => {
  const { email, message } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid email!" });
    }

    await clientEmail(user.email, user.username, message);

    return res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email is not registered!" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "goldwinadverts@gmail.com",
        pass: "utez ilft sujd zdap",
      },
    });

    const resetUrl = `https://goldwinadverts.com/reset-password/${token}`;

    const mailOptions = {
      from: '"Goldwin Adverts" <goldwinadverts@gmail.com>',
      to: email,
      subject: "Reset password",
      text: "Reset password",
      html: resetEmail
        .replace("{reset url}", resetUrl)
        .replace("{name}", user.username),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error.message);
      } else {
        return res
          .status(200)
          .json({ status: true, message: "Email sent:" + info.response });
      }
    });
  } catch {
    console.log(error.message);
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;

  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const id = decoded.id;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newPassword = {
      password: hash,
      _id: id,
    };

    await User.findByIdAndUpdate(id, newPassword, { new: true });

    return res.status(200).json({
      status: true,
      result: newPassword,
      message: "Password reset success!",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.id });

    res.status(200).json(userData);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAgent = async (req, res) => {
  const { username } = req.params;

  try {
    const userData = await User.findOne({ username });

    res.status(200).json(userData);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getReceiver = async (req, res) => {
  const { username } = req.params;

  try {
    const receiverData = await User.findOne({ username });

    res.status(200).json(receiverData);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getUpline = async (req, res) => {
  const { username } = req.params;

  try {
    const uplineData = await User.findOne({ username });
    return res.status(200).json(uplineData);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAdmin = async (req, res) => {
  const { username } = req.params;

  try {
    const uplineData = await Admin.findOne({ username });
    return res.status(200).json(uplineData);
  } catch (error) {
    console.log(error.message);
  }
};

exports.settings = async (req, res) => {
  const { id } = req.params;

  let { email, phone, username, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const tokenID = jwt.sign({ id: id }, JWT_SECRET, {
    expiresIn: "24h",
  });

  const token = tokenID;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  const updatedUser = {
    email,
    username,
    phone,
    password: hash,
    _id: id,
    token: tokenID,
  };

  await User.findByIdAndUpdate(
    id,
    updatedUser,
    { token: token },
    { new: true }
  );

  res.status(200).json({
    status: true,
    result: updatedUser,
    token: tokenID,
    message: "User updated successfully.",
  });
};

exports.upgrade = async (req, res) => {
  const { id } = req.params;

  let { depositBalance, servicePackage } = req.body;

  const user = await User.findOne({ _id: id });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  const newUpgrade = {
    depositBalance,
    servicePackage,
    _id: id,
  };

  await User.findByIdAndUpdate(id, newUpgrade, { new: true });

  await packageEmail(user.email, user.username, user.servicePackage);

  res.status(200).json({
    status: true,
    result: newUpgrade,
    message: "Upgraded successfully.",
  });
};

exports.packageExpireAt = async (req, res) => {
  const { id } = req.params;

  try {
    const packageExpiresAt = await PackageExpires.create({
      userID: id,
    });

    await packageExpiresAt.save();

    return res.status(200).json({ success: true, data: packageExpiresAt });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getPackageExpireAt = async (req, res) => {
  const { id } = req.params;

  try {
    const packageExpireAt = await PackageExpires.findOne({ userID: id });

    return res.status(200).json(packageExpireAt);
  } catch (error) {
    console.log(error.message);
  }
};

exports.token = async (req, res) => {
  let { depositBalance, serviceToken, userID } = req.body;

  const id = userID;

  const secret = req.secret;

  const user = await User.findOne({ _id: id });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  const newToken = {
    depositBalance,
    serviceToken,
    _id: id,
  };

  await User.findByIdAndUpdate(id, newToken, { new: true });

  await tokenEmail(user.email, user.username, user.serviceToken, secret);

  res.status(200).json({
    status: true,
    result: newToken,
    message: "Token updated successfully.",
  });
};

exports.receive = async (req, res) => {
  const { id } = req.params;
  let { depositBalance } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  try {
    const newBalance = {
      depositBalance,
      _id: id,
    };

    await User.findByIdAndUpdate(id, newBalance, {
      new: true,
    });

    res.status(200).json({
      status: true,
      result: newBalance,
      message: "Received successfully.",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.investments = async (req, res) => {
  const { id } = req.params;

  let { investmentsBalance } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  const updatedInvestmentsBalance = {
    investmentsBalance,
    _id: id,
  };

  await User.findOneAndUpdate(
    { _id: req.params.id },
    updatedInvestmentsBalance,
    {
      new: true,
    }
  );

  res.status(200).json({
    status: true,
    result: updatedInvestmentsBalance,
    message: "Updated successfully.",
  });
};

exports.updateDepositBalance = async (req, res) => {
  const { id } = req.params;

  let { depositBalance } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  const newDepositBalance = {
    depositBalance,
    _id: id,
  };

  await User.findOneAndUpdate({ _id: req.params.id }, newDepositBalance, {
    new: true,
  });

  res.status(200).json({
    status: true,
    result: newDepositBalance,
    message: "Updated successfully.",
  });
};

exports.withdrawableBalance = async (req, res) => {
  const { id } = req.params;

  let { withdrawableBalance } = req.body;

  const user = await User.findOne({ _id: id });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  const newWithdrawableBalance = {
    withdrawableBalance,
    _id: id,
  };

  await User.findOneAndUpdate({ _id: req.params.id }, newWithdrawableBalance, {
    new: true,
  });

  if (user) {
    await agentPackageEmail(user.email, user.username, withdrawableBalance);
  }

  return res.status(200).json({
    status: true,
    result: newWithdrawableBalance,
    message: "Updated successfully.",
  });
};

exports.whatsappWithdrawnBalance = async (req, res) => {
  const { id } = req.params;

  let { whatsappWithdrawnBalance } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  const newWhatsappWithdrawableBalance = {
    whatsappWithdrawnBalance,
    _id: id,
  };

  await User.findOneAndUpdate(
    { _id: req.params.id },
    newWhatsappWithdrawableBalance,
    {
      new: true,
    }
  );

  res.status(200).json({
    status: true,
    result: newWhatsappWithdrawableBalance,
    message: "Updated successfully.",
  });
};

exports.agentWithdrawableBalance = async (req, res) => {
  const { id } = req.params;

  let { agentWithdrawnBalance } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  const newAgentWithdrawableBalance = {
    agentWithdrawnBalance,
    _id: id,
  };

  await User.findOneAndUpdate(
    { _id: req.params.id },
    newAgentWithdrawableBalance,
    {
      new: true,
    }
  );

  res.status(200).json({
    status: true,
    result: newAgentWithdrawableBalance,
    message: "Updated successfully.",
  });
};

exports.cashbackBalance = async (req, res) => {
  const { id } = req.params;

  let { cashbackBalance } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  const cashback = {
    cashbackBalance,
    _id: id,
  };

  await User.findOneAndUpdate({ _id: req.params.id }, cashback, {
    new: true,
  });

  res.status(200).json({
    status: true,
    result: cashback,
    message: "Updated successfully.",
  });
};

exports.claimCashback = async (req, res) => {
  const { id } = req.params;

  let { accountBalance } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  const newBalance = {
    accountBalance,
    _id: id,
  };

  await User.findOneAndUpdate({ _id: req.params.id }, newBalance, {
    new: true,
  });

  res.status(200).json({
    status: true,
    result: newBalance,
    message: "Updated successfully.",
  });
};

exports.getTeam = async (req, res) => {
  const { username } = req.params;

  try {
    const team = await User.find({ referralID: username }).sort({
      createdAt: -1,
    });

    return res.status(200).json(team);
  } catch (error) {
    console.log(error.message);
  }
};

exports.upgradeMember = async (req, res) => {
  const { id } = req.params;

  let { referralID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid team member.");

  try {
    const upgradedMember = {
      referralID,
      _id: id,
    };

    await User.findByIdAndUpdate(id, upgradedMember, {
      new: true,
    });

    res.status(200).json({
      status: true,
      result: upgradedMember,
      message: "Upgraded successfully.",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.loginMember = async (req, res) => {
  const member = await User.findOne({ _id: req.params.id });

  if (!member) {
    return res.status(400).json({
      message: "Invalid team member.",
    });
  }

  const memberData = { id: member.id };
  const memberID = jwt.sign(memberData, JWT_SECRET, {
    expiresIn: "24h",
  });

  res.status(200).json({ status: true, result: member, tokenID: memberID });
};

exports.deleteMember = async (req, res) => {
  const member = await User.findOne({ _id: req.params.id });

  if (!member) {
    return res.status(400).json({
      message: "Invalid team member.",
    });
  }

  try {
    const deleteMember = await User.findByIdAndDelete(req.params.id);
    if (deleteMember) {
      return res
        .status(200)
        .json({ success: true, message: "Member deleted successfully." });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Member not found!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.claimAgent = async (req, res) => {
  const { id } = req.params;

  let { referralID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  try {
    const updatedUser = {
      referralID,
      _id: id,
    };

    await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });

    res.status(200).json({
      status: true,
      result: updatedUser,
      message: "Claimed successfully.",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.newUserWhatsappDetails = async (req, res) => {
  const { id } = req.params;

  const { whatsappBalance } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid user.");

  const newWhatsappUpdate = {
    whatsappBalance,
    _id: id,
  };

  await User.findByIdAndUpdate(id, newWhatsappUpdate, {
    new: true,
  });

  res.status(200).json({
    status: true,
    result: newWhatsappUpdate,
    message: "Updated successfully.",
  });
};

exports.getUserWhatsappDetails = async (req, res) => {
  try {
    const userWhatsappBalance = await User.findOne({ _id: req.params.id });

    res.status(200).json(userWhatsappBalance);
  } catch (error) {
    console.log(error.message);
  }
};
