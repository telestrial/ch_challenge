// This is the seeder file to users.json. It creates a number of random users,
// which can be set with the userCount variable below. WARNING: Running this file
// will rewrite users.json!

const fs = require('fs');
const faker = require('faker');

const userCount = 100;

const users = [];

for (let i = 0; i < userCount; i++) {
  let newUser = {
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  users.push(newUser);
}

fs.writeFile('users.json', JSON.stringify(users), (err) => {
  if (err) throw err;
  console.log('Saved!');
});
