const express = require("express");
const {
  createScheduledPayment,
  listOfScheduledPayments,
  archiveScheduledPayment,
} = require("@yayawallet/node-sdk");

const app = express();

app.post("/scheduled-payment/create", async (req, res) => {
  try {
    const { account_number, amount, reason, recurring, start_at, meta_data } =
      req.body;

    const scheduledPayment = await createScheduledPayment(
      account_number,
      amount,
      reason,
      recurring,
      start_at,
      meta_data
    );

    res.status(201).send(scheduledPayment);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/scheduled-payment/list", async (req, res) => {
  try {
    const list = await listOfScheduledPayments();
    res.status(200).send(list);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/scheduled-payment/archive/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const scheduledPayment = await archiveScheduledPayment(id);

    res.status(204).send(scheduledPayment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;
