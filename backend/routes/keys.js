const express = require("express");
const router = express.Router();
const db = require("../db");

// add new keys for a game
router.post("/", (req, res) => {
  const { game_id, key } = req.body;

  db.run(
    "INSERT INTO keys (game_id, key) VALUES (?, ?)",
    [game_id, key],
    function () {
      res.json({ success: true });
    }
  );
});

// get 1 unused key for a game
router.get("/unused/:game_id", (req, res) => {
  db.get(
    "SELECT * FROM keys WHERE game_id = ? AND is_used = 0 LIMIT 1",
    [req.params.game_id],
    (err, row) => res.json(row)
  );
});

// mark key as used
router.post("/use/:id", (req, res) => {
  db.run(
    "UPDATE keys SET is_used = 1, used_at = CURRENT_TIMESTAMP WHERE id = ?",
    [req.params.id],
    () => res.json({ success: true })
  );
});

module.exports = router;
