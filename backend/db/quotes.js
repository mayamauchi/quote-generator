const { client } = require("./client");

async function getAllQuotes() {
  try {
    const { rows } = await client.query(
      `SELECT *
        FROM quotes;
      `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}


async function createQuote({ author, description }) {
  try {
    const {
      rows: [quote],
    } = await client.query(
      `INSERT into quotes(author, description)
          VALUES ($1, $2)
          RETURNING *;
          `,
      [author, description]
    );

    return quote;
  } catch (error) {
    throw error;
  }
}



async function getQuoteById(id) {
  try {
    const {
      rows: [quote],
    } = await client.query(
      `SELECT *
        FROM quotes
        WHERE id = $1;
      `,
      [id]
    );

    return quote;
  } catch (error) {
    throw error;
  }
}

async function getQuoteCount() {
  try {
    const result = await client.query(
      `SELECT COUNT(*) AS total_rows FROM quotes;`
    );

    // Extract the total row count from the result
    const rowCount = parseInt(result.rows[0].total_rows);

    if (isNaN(rowCount)) {
      throw new Error("Invalid row count");
    }

    return rowCount;
  } catch (error) {
    throw new Error(`Failed to get the maximum ID: ${error.message}`);
  }
}



module.exports = {
  createQuote,
  getAllQuotes,
  getQuoteById,
  getQuoteCount,
};
