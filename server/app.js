import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import entryRoutes from './routes/entries';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.send('Welcome to tia_diary app');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('server has started');
});
