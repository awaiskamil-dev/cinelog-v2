const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tmdbId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Number,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['plan-to-watch', 'watching', 'watched', 'dropped', 'paused'],
    default: 'plan-to-watch',
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: {
    type: String,
    maxLength: 2000,
  },
  recommendation: {
    type: String,
    enum: ['recommended', 'mixed', 'not-recommended'],
  },
  dateWatched: {
    type: Date,
  },
}, {timestamps: true});

module.exports = mongoose.model('Entry', EntrySchema);