const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();

router.get('/', (req, res) => {
  UserController.getAllUsers()
    .then((data) => {
      res.json({
        meta: {
          status: 200,
          error: false,
          time: Date.now(),
        },
        data,
      });
    })
    .catch((err) => {
      res.json({
        meta: {
          status: err.statusCode,
          error: true,
          time: Date.now(),
        },
        err,
      });
    });
});

module.exports = router;
