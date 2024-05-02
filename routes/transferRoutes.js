const express = require("express");
const {
  getTransferList,
  getTransferFee,
  externalAccountLookup,
} = require("@yayawallet/node-sdk");

const app = express();

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

app.post("/transfer/fee", async (req, res) => {
  try {
    const { institution_code, amount } = req.body;

    const transferFee = await getTransferFee(institution_code, amount);

    res.send(transferFee);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = app;
