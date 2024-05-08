const express = require("express");
const {
  buyAirtime,
  buyPackage,
  listPackages,
  listRecharges,
} = require("@yayawallet/node-sdk");

const app = express();

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

module.exports = app;
