require('dotenv').config();
const {StatusCodes} = require('http-status-codes');
const {movieGenreMap, tvGenreMap, filterResults, getCached, setCached, appendMediaType} = require('../utils');

const getTrending = async (req, res) => {
  const cached = getCached('trending-movies');
  if(cached){
    return res.status(StatusCodes.OK).json(cached);
  }

  const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  setCached('trending-movies', data);

  res.status(StatusCodes.OK).json(data);
};

const getPopular = async (req, res) => {
  const cached = getCached('popular-movies');
  if(cached){
    return res.status(StatusCodes.OK).json(cached);
  }

  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  appendMediaType({results: data.results}, 'movie');
  setCached('popular-movies', data);

  res.status(StatusCodes.OK).json(data);
};

const getTopRated = async (req, res) => {
  const cached = getCached('top-rated-movies');
  if(cached){
    return res.status(StatusCodes.OK).json(cached);
  }

  const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  appendMediaType({results: data.results}, 'movie');
  setCached('top-rated-movies', data);
  
  res.status(StatusCodes.OK).json(data);
};

const getUpcoming = async (req, res) => {
  const todaysDate = new Date(Date.now());
  const cached = getCached('upcoming-movies');
  if(cached){
    return res.status(StatusCodes.OK).json(cached);
  }

  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&region=US&sort_by=popularity.desc&primary_release_date.gte=${todaysDate}`);
  const data = await response.json();
  appendMediaType({results: data.results}, 'movie');
  setCached('upcoming-movies', data);
  
  res.status(StatusCodes.OK).json(data);
};

const getDiscover = async (req, res) => {
  const {genre, year, format, page = 1} = req.query;

  const movieGenreParam = genre ? `&with_genres=${movieGenreMap[genre]}` : '';
  const tvGenreParam = genre ? `&with_genres=${tvGenreMap[genre]}` : '';
  const movieYearParam = year ? `&primary_release_year=${year}` : '';
  const tvYearParam = year ? `&first_air_date_year=${year}` : '';

  const fetches = [];

  if (format !== 'tv') {
    fetches.push(
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&page=${page}${movieGenreParam}${movieYearParam}`)
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((m) => (m.media_type = "movie"));
        return data.results;
      })
    );
  }
  if (format !== 'movie') {
    fetches.push(
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&page=${page}${tvGenreParam}${tvYearParam}`)
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((t) => (t.media_type = "tv"));
        return data.results;
      })
    );
  }

  const resultsArrays = await Promise.all(fetches);
  const combinedResults = resultsArrays.flat();

  res.status(StatusCodes.OK).json({results: combinedResults});
};

const getSearch = async (req, res) => {
  const {query, genre, year, format} = req.query;
  const pageCount = 3;
  
  const fetches = [];
  for(let p = 1; p <= pageCount; p++){
    fetches.push(
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}&page=${p}`)
      .then((response) => response.json())
      .then((data) => data.results)
    );
  };

  const pages = await Promise.all(fetches);
  const combinedResults = pages.flat();
  const filteredResults = filterResults(combinedResults, {genre, year, format});
  
  res.status(StatusCodes.OK).json({results: filteredResults});
};

const getAction = async (req, res) => {
  const cached = getCached('action-movies');
  if(cached){
    return res.status(StatusCodes.OK).json(cached);
  }

  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  appendMediaType({results: data.results}, 'movie');
  setCached('action-movies', data);
  
  res.status(StatusCodes.OK).json(data);
};

const getAnimation = async (req, res) => {
  const cached = getCached('animation-movies');
  if(cached){
    return res.status(StatusCodes.OK).json(cached);
  }

  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  appendMediaType({results: data.results}, 'movie');
  setCached('animation-movies', data);
  
  res.status(StatusCodes.OK).json(data);
};

const getMovieDetails = async (req, res) => {
  const {id} = req.params;

  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits,reviews`)
  const data = await response.json();
  data.media_type = 'movie'; 

  res.status(StatusCodes.OK).json(data);
};

module.exports = {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getDiscover,
  getSearch,
  getAction,
  getAnimation,
  getMovieDetails
};