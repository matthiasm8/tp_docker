require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_DATABSE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// 📌 Route pour récupérer tous les forums et leurs commentaires
app.get("/api/forums", async (req, res) => {
  try {
    const forums = await pool.query(
      `SELECT f.id, f.title, f.created_at, 
            COALESCE(json_agg(c) FILTER (WHERE c.id IS NOT NULL), '[]') AS comments
            FROM forums f
            LEFT JOIN comments c ON f.id = c.forum_id
            GROUP BY f.id ORDER BY f.created_at DESC`
    );
    res.json(forums.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Route pour créer un sujet
app.post("/api/forums", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Le titre est requis" });

    const newForum = await pool.query(
      "INSERT INTO forums (title) VALUES ($1) RETURNING *",
      [title]
    );
    res.json(newForum.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Route pour poster un commentaire
app.post("/api/forums/:id/comments", async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    if (!content)
      return res.status(400).json({ error: "Le commentaire est requis" });

    const newComment = await pool.query(
      "INSERT INTO comments (forum_id, content) VALUES ($1, $2) RETURNING *",
      [id, content]
    );
    res.json(newComment.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
