const express = require("express");
const { Client } = require("pg");

const app = express();
const port = 3000;

// Database connection
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect()
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("DB connection error", err));

app.get("/", async (req, res) => {
  const result = await client.query("SELECT NOW()");
  res.json({
    message: "App is running",
    dbTime: result.rows[0],
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
