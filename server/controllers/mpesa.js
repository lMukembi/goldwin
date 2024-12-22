const fs = require("fs");

exports.createToken = async (req, res, next) => {
  const secret =
    "H6p12dZ1GgwAh3Fj4IhtMyrAWzCiy4eipThRUfsKYk3kWr0O5GOUOi6JYQxpgwYi";
  const key = "0eyT1FGOARISqdy3eqTdHBGP8G4IZqRjwfY7t5RXCUEUhOz2";
  const auth = new Buffer.from(`${key}:${secret}`).toString("base64");
  await axios
    .get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    )
    .then((data) => {
      token = data.data.access_token;
      console.log(data.data);
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};

exports.deposit = async (req, res, next) => {
  const shortCode = 174379;
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;
  const passkey =
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  const password = new Buffer.from(shortCode + passkey + timestamp).toString(
    "base64"
  );
  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: `254${phone}`,
    PartyB: 174379,
    PhoneNumber: `254${phone}`,
    CallBackURL: "https://mydomain.com/path",
    AccountReference: "Mpesa PayBill",
    TransactionDesc: "stk push",
  };

  await axios
    .post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      console.log(data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};

exports.callback = async (req, res, next) => {
  const merchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
  const checkoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
  const resultCode = req.body.Body.stkCallback.ResultCode;
  const resultDesc = req.body.Body.stkCallback.ResultDesc;
  const callbackMetadata = req.body.Body.stkCallback.CallbackMetadata;
  const amount = callbackMetadata.Item[0].Value;
  const mpesaReceiptNumber = callbackMetadata.Item[1].Value;
  const transactionDate = callbackMetadata.Item[3].Value;
  const phoneNumber = callbackMetadata.Item[4].Value;

  console.log("MerchantRequestID:", merchantRequestID);
  console.log("CheckoutRequestID:", checkoutRequestID);
  console.log("ResultCode:", resultCode);
  console.log("ResultDesc:", resultDesc);

  console.log("Amount:", amount);
  console.log("MpesaReceiptNumber:", mpesaReceiptNumber);
  console.log("TransactionDate:", transactionDate);
  console.log("PhoneNumber:", phoneNumber);

  let json = JSON.stringify(req.body);
  fs.writeFile("stkcallback.json", json, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    console.log("STK PUSH CALLBACK STORED SUCCESSFULLY");
  });
};

exports.registerurl = async (req, res) => {
  const BusinessShortCode = "174379";

  const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";

  const data = {
    ShortCode: BusinessShortCode,
    ResponseType: "Complete",
    ConfirmationURL: "http://example.com/confirmation",
    ValidationURL: "http://example.com/validation",
  };
  await axios
    .post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      console.log(data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};

exports.confirmation = async (req, res) => {
  console.log("All transaction will be sent to this URL");
  console.log(req.body);
};

exports.validation = async (req, res) => {
  console.log("Validating payment");
  console.log(req.body);
};

exports.b2curlrequest = async (req, res) => {
  const shortCode = 600977;
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;

  const securityCredential =
    "N3Lx/hisedzPLxhDMDx80IcioaSO7eaFuMC52Uts4ixvQ/Fhg5LFVWJ3FhamKur/bmbFDHiUJ2KwqVeOlSClDK4nCbRIfrqJ+jQZsWqrXcMd0o3B2ehRIBxExNL9rqouKUKuYyKtTEEKggWPgg81oPhxQ8qTSDMROLoDhiVCKR6y77lnHZ0NU83KRU4xNPy0hRcGsITxzRWPz3Ag+qu/j7SVQ0s3FM5KqHdN2UnqJjX7c0rHhGZGsNuqqQFnoHrshp34ac/u/bWmrApUwL3sdP7rOrb0nWasP7wRSCP6mAmWAJ43qWeeocqrz68TlPDIlkPYAT5d9QlHJbHHKsa1NA==bXg3pUwXoX+sRjNgyWlKNB+EFmLixkuZ/1VD6vp+CsmqmSXWDQedKLdgyW5/IpdQWa818vdB0cczIbXLLNoIBGTuh15DPZ90tyDRVZaARwYRvMH4wdZ8OS+nobFICsCXQD5F81XoUfVgo1bdk3XGEXdQtDeFBQjK3zdCT0tfD6laqcSAWAS3s4PFLyXpzA0lU9CDSIYY/4jrKzOprnuduTUrYs/cIYL/XG9TcTmM4venJayHXaMCXyawZVRmtdCLNg6kihqmXu9J/ocWydzRlgqoiPJDCxn0Z0yll6MaK267rdXAaFpRaMolXBmQfRbDvYcvyR/fcLkobUAaxhbKhw==";
  const url = "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest";

  const data = {
    InitiatorName: "testapi",
    SecurityCredential: securityCredential,
    CommandID: "BusinessPayment",
    Amount: amount,
    PartyA: shortCode,
    PartyB: `254${phone}`,
    Remarks: "Withdrawal",
    QueueTimeOutURL: "https://mydomain.com/b2c/queue",
    ResultURL: "https://mydomain.com/b2c/result",
    Occasion: "Withdrawal",
  };

  await axios
    .post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      console.log(data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};
