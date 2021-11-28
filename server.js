const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const catchAsync = require('./utils/catchAsync');
const cors = require('cors');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const { User } = require('./models/User');

// Express configuration
const PORT = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.resolve(__dirname, './client/public')));
app.use(cors());

// Checking db connection and creating a test user
const tryDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection has been established successfully. Creating test user..'
    );

    // Setting up a user.
    const test = await User.create({
      email: 'test@gmail.com',
      password: 'tester',
    });
    console.log('Test user created.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

tryDB();

// Routes
app.post(
  '/login',
  catchAsync(async (req, res) => {
    const { email, password } = req.body;

    try {
      const foundUser = await User.findOne({ where: { email } });
      if (foundUser && password === foundUser.password) {
        const sessionUUID = uuidv4();
        foundUser.uuid = sessionUUID;
        try {
          await foundUser.save();
          res.send(JSON.stringify(sessionUUID));
        } catch (error) {
          res.send(error);
        }
      } else {
        res.send('There was a problem with login. Please try again.');
      }
    } catch (error) {
      res.send(error);
    }
  })
);

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, '/users.json'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
