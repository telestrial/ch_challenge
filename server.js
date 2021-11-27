const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Express configuration
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

// Importing user table model
const { User } = require('./models/User');

// Checking db connection and creating a test user
const tryDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Setting up a user.
    const test = await User.create({
      email: 'test@gmail.com',
      password: 'tester',
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

tryDB();

// Routes
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ where: { email } });
    console.log(foundUser);

    if (foundUser) {
      const sessionUUID = uuidv4();
    } else {
    }
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
