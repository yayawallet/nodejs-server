const express = require("express");
const { getProfile, searchUser } = require("@yayawallet/node-sdk");

const app = express();

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

module.exports = app;
