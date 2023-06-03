const express = require("express");
const crypto = require('crypto');


const { getAllQuotes } = require("../db/quotes");
const quoteRouter = express.Router();

quoteRouter.use((req, res, next) => {
  console.log("A request is being made to quotes");
  next();
});

quoteRouter.get("/", async (req, res, next) => {
  try {
    const quotes = await getAllQuotes();

    res.send(quotes);
  } catch ({ name, message, error }) {
    next({
      name: "NoQuotes",
      message: "Couldn't get quotes",
      error: "NoQuotes",
    });
  }
});

// quoteRouter.get('/random', async (req, res, next) => {
//   try {
//     const quotes = await getAllQuotes();
    
//     // Randomly select a quote from the quotes array
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     const randomQuote = quotes[randomIndex];

//     // Return the random quote as the API response
//     res.json(randomQuote);
//   } catch (error) {
//     next({
//       name: "NoQuotes",
//       message: "Couldn't get quotes",
//       error: "NoQuotes",
//     });
//   }
// });
quoteRouter.get('/random', async (req, res, next) => {
  try {
    const quotes = await getAllQuotes();

    // Shuffle the quotes array
    const shuffledQuotes = shuffleArray(quotes);

    // Generate a random index using a better random number generator
    const randomIndex = crypto.randomInt(0, shuffledQuotes.length);
    const randomQuote = shuffledQuotes[randomIndex];

    // Return the random quote as the API response
    res.json(randomQuote);
  } catch (error) {
    next({
      name: "NoQuotes",
      message: "Couldn't get quotes",
      error: "NoQuotes",
    });
  }
});

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = crypto.randomInt(0, i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


module.exports = quoteRouter;
