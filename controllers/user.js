const models = require('../db/models');
const Promise = require('bluebird'); // bluebird comes with Sequelize
const bcrypt = require('bcryptjs');


// functions
module.exports.getAllUsers = () => new Promise(async (accept, deny) => {
  try {
    const res = await models.User.findAll();
    accept(res);
  } catch (err) {
    deny(err);
  }
});

module.exports.getUserById = id => new Promise(async (accept, deny) => {
  try {
    const res = await models.User.findById(id);
    accept(res);
  } catch (err) {
    deny(err);
  }
});

module.exports.getUserByEmail = email => new Promise(async (accept, deny) => {
  try {
    const res = await models.User.findOne({
      where: { email: email },
    });
    accept(res);
  } catch (err) {
    deny(err);
  }
});

module.exports.addUser = newUser => new Promise(async (accept, deny) => {
  try {
    const pass = newUser.password;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pass, salt);
    const res = await models.User.create({
      name: newUser.name,
      username: newUser.username,
      password: hash,
      email: newUser.email,
    });
    accept(res);
  } catch (err) {
    deny(err);
  }
});
