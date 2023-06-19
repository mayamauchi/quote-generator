const { Client } = require("pg");

const client = new Client({
  connectionString:
    process.env.DATABASE_URL || "postgres://sdikefiyptbllv:1baf9e5de4c2a3c6d2746df83589450be8670ed23face91a3e0db4313966b056@ec2-52-0-187-246.compute-1.amazonaws.com:5432/daejmd4nvrp4rt",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,


});

module.exports = {
  client,
};
