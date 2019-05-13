import express from 'express';

require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to diary app');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('server has started');
});
