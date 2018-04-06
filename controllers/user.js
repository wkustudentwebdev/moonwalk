const models = require('../db/models');
const Promise = require('bluebird'); // bluebird comes with Sequelize
const bcrypt = require('bcryptjs');


/*
 * Gets all current users
 * TODO: Limit data that is returned (omit password hashes)
 */
module.exports.getAllUsers = () => new Promise(async (accept, deny) => {
  try {
    const res = await models.User.findAll();
    accept(res);
  } catch (err) {
    deny(err);
  }
});

/*
 * Gets one user by their id
 * TODO: Limit data that is returned (omit password hashes)
 */
module.exports.getUserById = id => new Promise(async (accept, deny) => {
  try {
    const res = await models.User.findById(id);
    accept(res);
  } catch (err) {
    deny(err);
  }
});

/*
 * Gets one user by their email
 * TODO: Limit data that is returned (omit password hashes)
 */
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

/*
 * Adds a user to the database
 *
 * Object coming in should look like:
 * {
 *  name: String, (REQUIRED)
 *  email: String, (REQUIRED)
 *  password: HashString, (REQUIRED)
 *  county: String, (REQUIRED)
 *  birthDate: Date || DateString, (REQUIRED)
 *  gender: Enum('M', 'F', 'O') (REQUIRED)
 *  preferredMeasure: Enum('KM', 'MI')
 * }
 */
module.exports.addUser = user => new Promise(async (accept, deny) => {
  try {
    const u = user;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(u.password, salt);
    u.password = hash;
    const data = await models.User.create(u);
    accept(data);
  } catch (err) {
    deny(err);
  }
});

/*
 * Updates a user if they exist in the database
 *
 * Object must contain at least one element from above
 * User's ID must be passed through
 */
module.exports.updateUser = (user, id) => new Promise(async (accept, deny) => {
  try {
    const data = await models.User.update(user, {
      where: { id: id },
      limit: 1,
    });
    accept(data);
  } catch (err) {
    deny(err);
  }
});

module.exports.deleteUser = id => new Promise(async (accept, deny) => {
  try {
    const rowsDeleted = await models.User.destroy({
      where: { id: id },
      limit: 1,
    });
    accept(rowsDeleted);
  } catch (err) {
    deny(err);
  }
});
