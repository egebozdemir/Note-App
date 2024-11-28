const pool = require("../config/db");

const getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

module.exports = { getUserByEmail };
