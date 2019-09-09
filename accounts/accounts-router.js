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
      res.status(500).json({ error: 'Error retrieving accounts.' });
    });
});

router.post("/", (req, res) => {
    const accountData = req.body;

    db('accounts')
        .insert(accountData, 'id')
        .then(({ id }) => {
            db('accounts')
            .where({ id })
            .then(account => {
                res.status(200).json(account)
            })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router;
