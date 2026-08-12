const express = require('express');
const router = express.Router();
const {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getDiscover,
  getSearch,
  getAction,
  getAnimation
} = require('../controllers/movieController');

router.route('/trending').get(getTrending);
router.route('/popular').get(getPopular);
router.route('/top-rated').get(getTopRated);
router.route('/upcoming').get(getUpcoming);
router.route('/discover').get(getDiscover);
router.route('/search').get(getSearch);
router.route('/action').get(getAction);
router.route('/animation').get(getAnimation);

module.exports = router;