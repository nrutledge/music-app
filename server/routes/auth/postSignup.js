const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../../models/User');

// TODO: Validate inputs

module.exports = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        const err = new Error(`A user with the email ${email} already exists.`);
        err.statusCode = 409;

        return next(err);
      }

      bcrypt.hash(password, 12, (err, hash) => {
        if (err) next(err);
        const user = new User({ username, hash, name, email });

        user.save()
          .then(() => res.sendStatus(200))
      });
    })
    .catch(err => next(err));
}