const { client } = require("./client");
const { quoteData } = require("./quotedata");
const {createQuote} = require("./index");



async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS quotes;
    `);
    console.log("Finished dropping tables");
  } catch (error) {
    console.log("Error dropping tables");
    throw error;
  }
}

async function createTables(){
  try {
    console.log("Starting to build tables...");
    await client.query(`

    CREATE TABLE quotes (
      id SERIAL PRIMARY KEY,
      author name,
      description VARCHAR(500)
  );

    `);
    console.log("Finished building tables");
  } catch (error) {
    console.error("Error building tables");
    throw error;
  }
}

async function createInitialQuotes() {
  try {

    console.log("Starting to create quotes...");
    await Promise.all(quoteData.map(createQuote))
    console.log("Finished creating quotes!");

  } catch (error) {
    console.error("Error creating quotes!");
    throw error;
  }
}

async function buildingDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialQuotes();
  } catch (error) {
    console.log("error during building");
    throw error;
  }
}
async function testDB(){
  console.log("Starting to test database");

  console.log("all quotes");
  // const allPlanets= await getAllPlanets()
  // console.log(allPlanets, "All the planets")
}

buildingDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
