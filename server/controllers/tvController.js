require('dotenv').config();
const {StatusCodes} = require('http-status-codes');
const {getCached, setCached, appendMediaType} = require('../utils');

const getPopular = async (req, res) => {
  const cached = getCached('popular-tv');
  if(cached){
    return res.status(StatusCodes.OK).json(cached);
  }

  const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  appendMediaType({results: data.results}, 'tv');
  setCached('popular-tv', data);
  
  res.status(StatusCodes.OK).json(data);
};

const getTopRated = async (req, res) => {
  const cached = getCached('top-rated-tv');
  if(cached){
    return res.status(StatusCodes.OK).json(cached);
  }

  const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  appendMediaType({results: data.results}, 'tv');
  setCached('top-rated-tv', data);
  
  res.status(StatusCodes.OK).json(data);
};

const getTvDetails = async (req, res) => {
  const {id} = req.params;

  const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`)
  const data = await response.json();
  
  res.status(StatusCodes.OK).json(data);
};

module.exports = {
  getPopular,
  getTopRated,
  getTvDetails
};