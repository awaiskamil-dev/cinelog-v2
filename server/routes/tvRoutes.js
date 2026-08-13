const express = require('express');
const router = express.Router();
const {
  getPopular,
  getTopRated,
  getTvDetails
} = require('../controllers/tvController');

router.route('/popular').get(getPopular);
router.route('/top-rated').get(getTopRated);
router.route('/:id').get(getTvDetails);

module.exports = router;