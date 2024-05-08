const express = require("express");
const { listInstitution } = require("@yayawallet/node-sdk");

const app = express();

app.post("/financial-institution/list", async (req, res) => {
  try {
    const { country } = req.body;

    const institutionList = await listInstitution(country);

    res.send(institutionList);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = app;
