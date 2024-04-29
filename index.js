const express = require("express");
const cors = require("cors");
const {
  getProfile,
  searchUser,
  createTransaction,
  searchTransaction,
  generateQrUrl,
  getTransactionListByUser,
  getTransactionById,
  getTransferList,
  externalAccountLookup,
  listInstitution,
  getTransferFee,
  buyAirtime,
  buyPackage,
  listPackages,
  listRecharges,
} = require("@yayawallet/node-sdk");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ product: "Yayawallet Dashboard" });
});

app.get("/user/profile", async (req, res) => {
  try {
    const profile = await getProfile();
    res.send(profile);
  } catch (error) {
    res.status(403).send(error.message);
  }
});

app.post("/user/search", async (req, res) => {
  try {
    const query = req.body.query;

    const usersList = await searchUser(query);

    res.send(usersList);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/transaction/create", async (req, res) => {
  try {
    const { receiver, amount, cause } = req.body;
    const transactionId = await createTransaction(receiver, amount, cause, []);

    res.send(transactionId);
  } catch (error) {
    res.status(403).send(error.message);
  }
});

app.post("/transaction/qr-generate", async (req, res) => {
  try {
    const { amount, cause } = req.body;
    const QRCode = await generateQrUrl(amount, cause);

    res.send(QRCode);
  } catch (error) {
    res.status(403).send(error.message);
  }
});

app.post("/transaction/find-by-user", async (req, res) => {
  try {
    const page = req.body.page;

    const transactionList = await getTransactionListByUser({ p: page });

    res.send(transactionList);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/transaction/search", async (req, res) => {
  try {
    const query = req.body.query;

    const result = await searchTransaction(query);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

app.post("/transaction/find", async (req, res) => {
  try {
    const transactionID = req.body.transactionID;

    const transaction = await getTransactionById(transactionID);

    res.send(transaction);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/transfer/list", async (req, res) => {
  try {
    const list = await getTransferList();

    res.send(list);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/transfer/lookup-external", async (req, res) => {
  try {
    const { institution_code, account_number } = req.body;

    const account = await externalAccountLookup(
      institution_code,
      account_number
    );

    res.send(account);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/financial-institution/list", async (req, res) => {
  try {
    const { country } = req.body;

    const institutionList = await listInstitution(country);

    res.send(institutionList);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/transfer/fee", async (req, res) => {
  try {
    const { institution_code, amount } = req.body;

    const transferFee = await getTransferFee(institution_code, amount);

    res.send(transferFee);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/airtime/buy", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    const buy = await buyAirtime(phone, amount);

    res.status(200).send(buy);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/package/buy", async (req, res) => {
  try {
    const { phone, package } = req.body;

    const buy = await buyPackage(phone, package);

    res.status(200).send(buy);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/airtime/packages", async (req, res) => {
  try {
    const { phone } = req.body;
    const packages = await listPackages(phone);

    res.status(200).send(packages);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/airtime/list", async (req, res) => {
  try {
    const recharges = await listRecharges();

    res.status(200).send(recharges);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = process.env.PORT || 4040;

app.listen(4040, () => {
  console.log("App running on port " + port);
});
