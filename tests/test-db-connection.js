const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '34.101.153.57',
  user: 'root',
  password: 'chiliFitdbPS186',
  database: 'chilifit_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
  connection.end();
});
