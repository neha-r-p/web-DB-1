const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error retrieving accounts." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .then(account => {
      if (account.length) {
        res.status(200).json(account);
      } else {
        res
          .status(404)
          .json({ error: "Account with specified ID doesn not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Account could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  const accountData = req.body;

  db("accounts")
    .insert(accountData, "id")
    .then(([id]) => {
      db("accounts")
        .where({ id })
        .first()
        .then(account => {
          res.status(200).json(account);
        });
    })
    .catch(err => {
      console.log("error: ", err);
      res.status(500).json({ error: "Error creating account" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `Deleted ${count} account(s).` });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Account could not be deleted." });
    });
});

module.exports = router;
