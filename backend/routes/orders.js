const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { game_id, key_id, price } = req.body;

  db.run(
    "INSERT INTO orders (game_id, key_id, price) VALUES (?, ?, ?)",
    [game_id, key_id, price],
    function () {
      res.json({ success: true, order_id: this.lastID });
    }
  );
});

module.exports = router;
