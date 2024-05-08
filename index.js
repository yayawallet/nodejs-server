const express = require("express");
const cors = require("cors");
const user = require("./routes/userRoutes.js");
const equb = require("./routes/equbRoutes.js");
const airtime = require("./routes/airtimeRoutes.js");
const transaction = require("./routes/transactionRoutes.js");
const transfer = require("./routes/transferRoutes.js");
const institution = require("./routes/institutionRoutes.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", user);
app.use("/", equb);
app.use("/", airtime);
app.use("/", transaction);
app.use("/", transfer);
app.use("/", institution);

app.get("/", (req, res) => {
  res.json({ product: "Yayawallet SDK" });
});

const port = process.env.PORT || 4040;

app.listen(4040, () => {
  console.log("App running on port " + port);
});
