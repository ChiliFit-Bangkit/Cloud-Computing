const express = require('express');
require('dotenv').config();
const predictionRoutes = require('./routes/predictionRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const port = process.env.PORT || 8080;

// Middleware for parsing JSON bodies
app.use(express.json());

// Basic route for health check
app.get('/', (req, res) => {
  res.send('ChiliFit API is running');
});

// Routes
app.use('/api', predictionRoutes);
app.use('/api', articleRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`DB_HOST: ${process.env.DB_HOST}`);
  console.log(`DB_USER: ${process.env.DB_USER}`);
  console.log(`DB_NAME: ${process.env.DB_NAME}`);
});

module.exports = app;
