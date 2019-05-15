import express from 'express';
import { User } from './models';
import { Entries } from './models';

require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to tia_diary app');
});

/*

  Setup your env file using the appropriate environment variables from config/config.json
  After running your migrations using 'npm run migrate'
  uncomment the code block below and then run 'npm start'
  to confirm that your migrations were successful
  Two(2) Insert queries and their results should be logged on your console

*/


User.create({
  firstName: 'Software',
  lastName: 'Developer',
  email: 'softwaredev@gmail.com',
  password: 'softwaredev'
})
  .then(({ dataValues }) => {
    console.log(dataValues);

    Entries.create({
      title: 'Create a diary application',
      description: 'Build a diary application with node, express and sequelize',
      userId: dataValues.id
    }).then(({ dataValues }) => console.log(dataValues))
  })
  .catch(e => console.log(e));

  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('server has started');
});
