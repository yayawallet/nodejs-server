const express = require("express");
const {
  createEqub,
  updateEqub,
  createNewRoundOfEqub,
  listOfEqubs,
  findEqubsByUser,
  findEqubByID,
  findEqubByName,
  findMembersOfEqub,
  removeMembersOfEqub,
  joinEqub,
  leaveEqub,
} = require("@yayawallet/node-sdk");

const app = express();

app.post("/equb/create", async (req, res) => {
  try {
    const {
      equb_account,
      title,
      description,
      location,
      latitude,
      longitude,
      period,
      amount,
      private,
    } = req.body;

    const equb = await createEqub(
      equb_account,
      title,
      description,
      location,
      latitude,
      longitude,
      period,
      amount,
      private
    );

    res.status(201).send(equb);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/equb/update", async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      location,
      latitude,
      longitude,
      period,
      amount,
      private,
    } = req.body;

    const equb = await updateEqub(
      id,
      title,
      description,
      location,
      latitude,
      longitude,
      period,
      amount,
      private
    );

    res.status(204).send(equb);
  } catch (error) {
    res.status(304).send(error.message);
  }
});

app.post("/equb/create-new-round", async (req, res) => {
  try {
    const id = req.body.id;

    const round = createNewRoundOfEqub(id);

    res.status(201).send(round);
  } catch (error) {
    res.status(204).send(error.message);
  }
});

app.get("/equb/public", async (req, res) => {
  try {
    const equbList = await listOfEqubs();

    res.status(200).send(equbList);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/equb/find-by-user", async (req, res) => {
  try {
    const equbs = findEqubsByUser();

    res.status(200).send(equbs);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/equb/find", async (req, res) => {
  try {
    const id = req.body.id;

    const equb = findEqubByID(id);

    res.status(200).send(equb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/equb/find-by-name", async (req, res) => {
  try {
    const name = req.body.name;

    const equb = findEqubByName(name);

    res.status(200).send(equb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/equb/members", async (req, res) => {
  try {
    const id = req.body.id;

    const members = findMembersOfEqub(id);

    res.status(200).send(members);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/equb/remove-member", async (req, res) => {
  try {
    const id = req.body.id;

    const member = removeMembersOfEqub(id);

    res.status(200).send(member);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/equb/join", async (req, res) => {
  try {
    const id = req.body.id;

    const equb = joinEqub(id);

    res.status(200).send(equb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/equb/leave", async (req, res) => {
  try {
    const id = req.body.id;

    const equb = leaveEqub(id);

    res.status(200).send(equb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = app;
