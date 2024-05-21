const express = require("express");
const {
  getTransferList,
  getTransferFee,
  externalAccountLookup,
  transferAsUser,
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

app.post("/transfer/send", async (req, res) => {
  try {
    const {
      institution_code,
      account_number,
      amount,
      ref_code,
      sender_note,
      phone,
    } = req.body;

    const transfer = await transferAsUser(
      institution_code,
      account_number,
      amount,
      ref_code,
      sender_note,
      phone
    );

    res.status(200).send(transfer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = app;
