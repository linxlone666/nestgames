const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.all("SELECT * FROM games", [], (err, rows) => {
    res.json(rows);
  });
});

router.get("/:slug", (req, res) => {
  db.get(
    "SELECT * FROM games WHERE slug = ?",
    [req.params.slug],
    (err, row) => {
      res.json(row);
    }
  );
});

router.post("/", (req, res) => {
  const { slug, name, price, description, image } = req.body;

  db.run(
    "INSERT INTO games (slug, name, price, description, image) VALUES (?, ?, ?, ?, ?)",
    [slug, name, price, description, image],
    function () {
      res.json({ success: true, id: this.lastID });
    }
  );
});

module.exports = router;
