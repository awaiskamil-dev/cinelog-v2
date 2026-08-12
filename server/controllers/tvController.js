require('dotenv').config();
const {StatusCodes} = require('http-status-codes');

const getPopular = async (req, res) => {
  const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  
  res.status(StatusCodes.OK).json(data);
};

const getTopRated = async (req, res) => {
  const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  
  res.status(StatusCodes.OK).json(data);
};

module.exports = {
  getPopular,
  getTopRated
};