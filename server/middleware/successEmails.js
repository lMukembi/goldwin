const {
  welcomeEmail,
  whatsappEmail,
  withdrawEmail,
  clientEmail,
  tokenEmail,
  packageEmail,
  agentTokenEmail,
  agentPackageEmail,
  agentCashbackEmail,
} = require("./emailTemplates");
const { transporter } = require("./emailTransporter");

exports.welcomeEmail = async (email, username) => {
  try {
    return await transporter.sendMail({
      from: '"Goldwin Adverts" <mukembileviticus@gmail.com>',
      to: email,
      subject: "Welcome email",
      text: "Welcome email",
      html: welcomeEmail.replace("{name}", username),
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.tokenEmail = async (email, username, serviceToken, secret) => {
  try {
    return await transporter.sendMail({
      from: '"Goldwin Adverts" <mukembileviticus@gmail.com>',
      to: email,
      subject: "Premium code received",
      text: "Premium code received",
      html: tokenEmail
        .replace("{name}", username)
        .replace("{code}", serviceToken)
        .replace("{secret}", secret),
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.agentTokenEmail = async (email, username, withdrawableBalance) => {
  try {
    return await transporter.sendMail({
      from: '"Goldwin Adverts" <mukembileviticus@gmail.com>',
      to: email,
      subject: "You received 75% premium code profit",
      text: "You received 75% premium code profit",
      html: agentTokenEmail
        .replace("{name}", username)
        .replace("{commission}", withdrawableBalance),
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.packageEmail = async (email, username, servicePackage) => {
  try {
    return await transporter.sendMail({
      from: '"Goldwin Adverts" <mukembileviticus@gmail.com>',
      to: email,
      subject: "Package received",
      text: "Package received",
      html: packageEmail
        .replace("{name}", username)
        .replace("{package}", servicePackage),
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.agentPackageEmail = async (email, username, withdrawableBalance) => {
  try {
    return await transporter.sendMail({
      from: '"Goldwin Adverts" <mukembileviticus@gmail.com>',
      to: email,
      subject: "You received 85% package profit",
      text: "You received 85% package profit",
      html: agentPackageEmail
        .replace("{name}", username)
        .replace("{commission}", withdrawableBalance),
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.agentCashbackEmail = async (email, username, withdrawableBalance) => {
  try {
    return await transporter.sendMail({
      from: '"Goldwin Adverts" <mukembileviticus@gmail.com>',
      to: email,
      subject: "You received 66% Cashback profit",
      text: "You received 66% Cashback profit",
      html: agentCashbackEmail
        .replace("{name}", username)
        .replace("{commission}", withdrawableBalance),
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.whatsappEmail = async (email, username) => {
  try {
    return await transporter.sendMail({
      from: '"Goldwin Adverts" <mukembileviticus@gmail.com>',
      to: email,
      subject: "Submit success",
      text: "Submit successful",
      html: whatsappEmail.replace("{name}", username),
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.withdrawEmail = async (email, username) => {
  try {
    return await transporter.sendMail({
      from: '"Goldwin Adverts" <mukembileviticus@gmail.com>',
      to: email,
      subject: "Withdrwal success",
      text: "Withdrwal successful",
      html: withdrawEmail.replace("{name}", username),
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.clientEmail = async (email, username, message) => {
  try {
    return await transporter.sendMail({
      from: '"Goldwin Adverts" <mukembileviticus@gmail.com>',
      to: email,
      subject: "Client support",
      text: "Client support",
      html: clientEmail
        .replace("{message}", message)
        .replace("{name}", username),
    });
  } catch (error) {
    console.log(error.message);
  }
};
