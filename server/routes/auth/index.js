const express = require('express');
const { body } = require('express-validator');

const postSignup = require('./postSignup');
const handleValidationErrors = require('../../middlewares/handleValidationErrors');

const router = express.Router();

router.post(
  '/signup', 
  [
    body('name')
      .isLength({ min: 1, max: 256 })
      .withMessage('must be at least 1 character'),
    body('email')
      .isEmail()
      .withMessage('must be a valid email address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8, max: 256 })
      .withMessage('must be at least 8 characters')
      .matches(/\d/)
      .withMessage('must contain at least 1 number')
      .matches(/[A-Z]/)
      .withMessage('must contain at least 1 uppercase character')
      .matches(/[a-z]/)
      .withMessage('must contain at least 1 lowercase character')
  ], 
  handleValidationErrors,
  postSignup
);

module.exports = router;