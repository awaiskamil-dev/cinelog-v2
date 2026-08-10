const express = require('express');
const router = express.Router();
const {
  getMyEntries,
  getMovieEntries,
  createOrUpdateEntry,
  deleteEntry
} = require('../controllers/entryController');
const {authenticateUser} = require('../middleware/authentication');

router.route('/me').get(authenticateUser, getMyEntries);
router.route('/movies/:id').get(getMovieEntries);
router.route('/').post(authenticateUser, createOrUpdateEntry);
router.route('/:id').delete(authenticateUser, deleteEntry);

module.exports = router;