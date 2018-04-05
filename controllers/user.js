const models = require('../db/models');
const Promise = require('bluebird'); // bluebird comes with Sequelize


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
