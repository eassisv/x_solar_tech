const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_, response) => {
  response.json({ detail: 'X Solar Tech API' });
});

module.exports = app;
