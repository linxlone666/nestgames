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
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "Game not found" });
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

router.delete("/:slug", (req, res) => {
  const slug = req.params.slug;

  db.run("DELETE FROM games WHERE slug = ?", [slug], function (err) {
    if (err) {
      return res.json({ success: false, message: err.message });
    }

    if (this.changes === 0) {
      return res.json({ success: false, message: "Game not found" });
    }

    res.json({ success: true });
  });
});

module.exports = router;
