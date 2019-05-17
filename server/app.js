import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import entryRoutes from './routes/entries';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/entries', entryRoutes);

app.get('/', (req, res) => {
  res.status(200).json('Welcome to tia_diary app');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('server has started');
});

module.exports = app;
