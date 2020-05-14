const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_, response) => {
  response.json({ detail: 'X Solar Tech API' });
});

app.listen(process.env.PORT || 3000);
