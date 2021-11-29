if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
// catchAsync calls next() if async route fails
const catchAsync = require('./utils/catchAsync');
const cors = require('cors');
const bcrypt = require('bcrypt');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const { User } = require('./models/User');

// Express configuration
const PORT = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.resolve(__dirname, './client/public')));
app.use(cors());

// Checking db connection and creating a test user. May be better in separate file.
const tryDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection has been established successfully. Creating test user..'
    );

    // Setting up a user.
    const firstUser = await User.create({
      email: process.env.ROOT_EMAIL,
      password: await bcrypt.hash(process.env.ROOT_PASSWORD, 10),
    });

    firstUser
      ? console.log('Test user created.')
      : console.log('Test user failed.');
  } catch (error) {
    console.error(
      'Unable to connect to the database or save test user:',
      error
    );
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
      const isAuthed = await bcrypt.compare(password, foundUser.password);
      if (foundUser && isAuthed) {
        const sessionUUID = uuidv4();
        foundUser.uuid = sessionUUID;
        try {
          await foundUser.save();
          res.status(200).send({ uuid: sessionUUID });
        } catch (error) {
          res.send(error);
        }
      } else {
        res.status(403).send({ error: 'Login failed. Please try again.' });
      }
    } catch (error) {
      res.status(403).send({ error: 'Login failed. Please try again.' });
    }
  })
);

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, '/users.json'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
