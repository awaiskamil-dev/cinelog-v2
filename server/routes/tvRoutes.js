const express = require('express');
const router = express.Router();
const {
  getPopular,
  getTopRated
} = require('../controllers/tvController');

router.route('/popular').get(getPopular);
router.route('/top-rated').get(getTopRated);

module.exports = router;