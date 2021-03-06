const express = require("express");

const AccountsRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountsRouter);

server.get("/", (req, res) => {
  res.send("<h3>Accounts</h3>");
});

module.exports = server;
