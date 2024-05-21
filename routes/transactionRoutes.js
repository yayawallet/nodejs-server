const express = require("express");
const {
  createTransaction,
  searchTransaction,
  generateQrUrl,
  getTransactionListByUser,
  getTransactionById,
} = require("@yayawallet/node-sdk");

const app = express();

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

app.get("/transaction/find-by-user/:p", async (req, res) => {
  try {
    const p = req.params.p;

    const transactionList = await getTransactionListByUser({ p });

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
    res.status(404).send(error.message);
  }
});

app.get("/transaction/find/:id", async (req, res) => {
  try {
    const transactionID = req.params.id;

    const transaction = await getTransactionById(transactionID);

    res.send(transaction);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = app;
