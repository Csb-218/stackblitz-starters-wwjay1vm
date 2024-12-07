const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

const app = express();
app.use(cors());
const port = 3010;

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  app.get('/', async (req, res) => {
    try {
      const query = 'SELECT * FROM peoplestats';
      const resp = await db.all(query, []);
      res.status(200).json(resp);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error retrieving data', error: error.message });
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
