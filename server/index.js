const express = require("express");
const cors = require("cors");
const path = require("path");
const connectionDB = require("./connection.js");

require("dotenv").config();
const app = express();
const port = 8000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["ip"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api/admin", require("./routes/admin"));
app.use("/api/user", require("./routes/user"));
app.use("/api/mpesa", require("./routes/mpesa"));
app.use("/api/sasaPay", require("./routes/sasaPay"));
app.use("/api/withdraw", require("./routes/withdraw"));
app.use("/api/whatsapp", require("./routes/whatsapp"));
app.use("/api/transfer", require("./routes/transfer"));
app.use("/api/receiver", require("./routes/receiver.js"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/public/index.html"));
});

const DBConnection = async () => {
  try {
    await connectionDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`server is running on port, ${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

DBConnection();