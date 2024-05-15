const express = require("express");
const {
  listAllContracts,
  createContract,
  requestPayment,
  getSubscriptions,
  getListOfPaymentRequests,
  approvePaymentRequest,
  rejectPaymentRequest,
  activateSubscription,
  deactivateSubscription,
} = require("@yayawallet/node-sdk");

const app = express();

app.get("/recurring-contract/list", async (req, res) => {
  try {
    const list = await listAllContracts();

    res.status(200).send(list);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/recurring-contract/create", async (req, res) => {
  try {
    const { contract_number, service_type, customer_account_name, meta_data } =
      req.body;

    const contract = await createContract(
      contract_number,
      service_type,
      customer_account_name,
      meta_data
    );

    res.status(201).send(contract);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/recurring-contract/request-payment", async (req, res) => {
  try {
    const {
      contract_number,
      amount,
      currency,
      cause,
      notification_url,
      meta_data,
    } = req.body;

    const payment = await requestPayment(
      contract_number,
      amount,
      currency,
      cause,
      notification_url,
      meta_data
    );

    res.status(200).send(payment);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/recurring-contract/subscriptions", async (req, res) => {
  try {
    const subscriptions = await getSubscriptions();

    res.status(200).send(subscriptions);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/recurring-contract/payment-requests", async (req, res) => {
  try {
    const list = await getListOfPaymentRequests();

    res.status(200).send(list);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/recurring-contract/approve-payment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const approvePayment = await approvePaymentRequest(id);

    res.status(200).send(approvePayment);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/recurring-contract/reject-payment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const rejectPayment = await rejectPaymentRequest(id);

    res.status(200).send(rejectPayment);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/recurring-contract/activate/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const activate = await activateSubscription(id);

    res.status(200).send(activate);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/recurring-contract/deactivate/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deactivate = await deactivateSubscription(id);

    res.status(200).send(deactivate);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = app;
