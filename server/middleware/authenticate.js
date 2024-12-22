const jwt = require("jsonwebtoken");
const User = require("../models/user");
const axios = require("axios");

exports.authToken = async (req, res, next) => {
  const clientId = "n2SP51WOnNtZPb9ScD4oHFVjObMkDxs7VPnpZfm3";
  const clientSecret =
    "9cGIIS3LQcegcpkHvT6sDFLVSjfDoZcxeUoufn3oVAOLycuoqliJpPKqERyi18VRWQacByagcdzb0Sn1zNkFbQjOqf7MoGv3O2KbBNJcNskQg1Tj4scIETXo9A3qWs2Z";
  const tokenUrl =
    "https://sandbox.sasapay.app/api/v1/auth/token/?grant_type=client_credentials";

  const credentials = new Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const headers = {
    Authorization: `Basic ${credentials}`,
  };

  try {
    const accessToken = await axios.get(tokenUrl, { headers: headers });

    if (!accessToken) {
      return res.status(404).json({ message: "No token!" });
    }

    req.accessToken = accessToken.data.access_token;

    next();
  } catch (error) {
    console.log(error.message);
  }
};

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split("Bearer ")[1];
  }

  try {
    if (token === undefined) {
      return res.status(403).json({ message: "Unauthorised!" });
    }

    let decoded = "";

    decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userExists = await User.findById(decoded.id);

    if (!userExists) {
      return res.status(404).json({ message: "No user!" });
    }

    req.userExists = userExists;

    next();
  } catch (error) {
    console.log(error.message);
  }
};

exports.secretToken = async (req, res, next) => {
  try {
    const secret = Math.floor(100000 + Math.random() * 900000).toString();

    if (!secret) {
      return res.status(204).json({ message: "No secret!" });
    }
    req.secret = secret;

    next();
  } catch (error) {
    console.log(error.message);
  }
};
