
const mysql = require('mysql');

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'HalaMadrid@1',
  database: 'ebay',
  port: '3306'
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = db;
