const casual = require('casual');
const fs = require('fs');

const AMOUNT = 100;
const users = [];

for (let i = 0; i < AMOUNT; i++) {
  users.push({
    id: casual.uuid,
    email: casual.email,
    firstName: casual.first_name,
    lastName: casual.last_name,
    username: casual.username,
    phone: casual.phone,
    description: casual.description,
    position: {
      lat: casual.latitude,
      lon: casual.longitude,
    },
    address: casual.address,
    createdAt: `${casual.date('YYYY-MM-DD')} ${casual.time('HH:mm:ss')}`,
    updatedAt: `${casual.date('YYYY-MM-DD')} ${casual.time('HH:mm:ss')}`,
  });
}

fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(users), (err) => {
  if (err) {
    console.log(err);
  }

  console.log('file was saved');
});
