if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
// catchAsync simply calls next() if async route fails
const catchAsync = require('./utils/catchAsync');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const { User } = require('./models/User');
const e = require('express');

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

// Load our users.json into memory for use in the /users route and count it here
// so it doesn't get reloaded or recounted at every request. If we wanted users.json
// to be dynamic, we would do this much differently.
let users = {};
let usersCount;

try {
  users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  usersCount = users.length;
} catch (error) {
  console.log('WARNING: users.json cannot be found.');
}

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
        res.status(401).send({ error: 'Login failed. Please try again.' });
      }
    } catch (error) {
      res.status(401).send({ error: 'Login failed. Please try again.' });
    }
  })
);

app.get('/users', (req, res) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  res.status(200).send({
    data: {
      pages: Math.ceil(usersCount / limit),
      users: users.slice(limit * page - limit, limit * page),
    },
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
