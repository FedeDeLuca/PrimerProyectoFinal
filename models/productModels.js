const pool = require("../db");

const getProducts = async () => {
  try {
    const query = "SELECT * FROM products";
    const rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getProducts };