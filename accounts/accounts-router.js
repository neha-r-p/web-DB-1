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

router.get("/:id", validateAccountId, (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Account could not be retrieved" });
    });
});

router.post("/", validateAccount, (req, res) => {
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

router.delete("/:id", validateAccountId, (req, res) => {
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

router.put("/:id", validateAccountId, validateAccount, (req, res) => {
  const { id } = req.params;
  const updatedAcc = req.body;

  db("accounts")
    .where({ id })
    .update(updatedAcc)
    .then(account => res.status(200).json(account))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error updating account" });
    });
});

//middleware

function validateAccountId(req, res, next) {
  const { id } = req.params;

  db("accounts")
    .where({ id })
    .then(account => {
      if (account.length) {
        req.account = account;
        next();
      } else {
        res
          .status(404)
          .json({ error: "Account with specified ID doesn not exist." });
      }
    });
}

function validateAccount(req, res, next) {
  const { name, budget } = req.body;

  if (name && budget) {
    next();
  } else if (name === "" || !budget) {
    res.status(400).json({ error: "Both name and budget required" });
  } else {
    res.status(400).json({ error: "Missing project data" });
  }
}

module.exports = router;


