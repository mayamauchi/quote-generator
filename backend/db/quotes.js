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

async function createQuote({
    author,
    description
  }) {
    try {
      const {
        rows: [quote],
      } = await client.query(
        `INSERT into quotes(author, description)
          VALUES ($1, $2)
          RETURNING *;
          `,
        [
          author, 
          description
        ]
      );
  
      return quote;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    getAllQuotes,
    createQuote
  };
  