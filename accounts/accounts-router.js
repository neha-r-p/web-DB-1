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

// router.get('/:id', (req, res) => {
//     // select * from posts where id = 2
//     const { id } = req.params;

//     db('posts')
//         .where({ id }) // always returns an array
//         .first() // picks the first element of the resulting array
//         .then(posts => {
//             res.status(200).json(posts);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

router.get('/:id', ())

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

module.exports = router;
