const pool = require("../config/db");

const createNote = async (userId, title, content) => {
  const result = await pool.query(
    "INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
    [userId, title, content]
  );
  return result.rows[0];
};

module.exports = { createNote };
