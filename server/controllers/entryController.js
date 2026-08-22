const Entry = require('../models/Entry');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const getRecommendation = (rating) => {
  if(rating >= 7) return 'recommended';
  if(rating >= 5) return 'mixed';
  return 'not-recommended'; 
}

const getMyEntries = async (req, res) => {
  const {status} = req.query; //filter: ?status=watched
  
  const queryObject = {user: req.user.userId};
  if(status){
    queryObject.status = status;
  }

  const entries = await Entry.find(queryObject).sort('-updatedAt');
  res.status(StatusCodes.OK).json({entries, count: entries.length});
};

const getMovieEntries = async (req, res) => {
  const {id: tmdbId} = req.params;

  const entries = await Entry.find({
    tmdbId: Number(tmdbId),
    status: 'watched'
  }).populate('user', 'name');

  res.status(StatusCodes.OK).json({entries, count: entries.length});
};

const createOrUpdateEntry = async (req, res) => {
  const {tmdbId, title, posterPath, releaseDate, mediaType, rating, review, status, isFavorite, dateWatched} = req.body;

  if(!tmdbId || !title){
    throw new CustomError.BadRequestError('Please provide both tmdbId and title');
  }

  const recommendation = rating ? getRecommendation(rating) : undefined;

  const entry = await Entry.findOneAndUpdate(
    {user: req.user.userId, tmdbId},
    {tmdbId, title, posterPath, releaseDate, mediaType, rating, review, recommendation, status, isFavorite, dateWatched},
    {new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true}
  );

  res.status(StatusCodes.OK).json({entry});
};

const deleteEntry = async (req, res) => {
  const {id: tmdbId} = req.params;

  const entry = await Entry.findOneAndDelete({user: req.user.userId, tmdbId});
  
  if(!entry){
    throw new CustomError.NotFoundError(`No entry exists with id ${tmdbId}`);
  }

  res.status(StatusCodes.OK).json({msg: 'Entry sucessfully deleted'});
};

module.exports = {
  getMyEntries,
  getMovieEntries,
  createOrUpdateEntry,
  deleteEntry
};