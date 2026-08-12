require('dotenv').config();
const {StatusCodes} = require('http-status-codes');

const movieGenreMap = {
  action: 28, comedy: 35, drama: 18, horror: 27,
  'sci-fi': 878, romance: 10749, animation: 16, thriller: 53,
};

const tvGenreMap = {
  action: 10759, comedy: 35, drama: 18, horror: 9648,
  'sci-fi': 10765, romance: 10766, animation: 16, thriller: 9648,
};

const getTrending = async (req, res) => {
  const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  
  res.status(StatusCodes.OK).json(data);
};

const getPopular = async (req, res) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  
  res.status(StatusCodes.OK).json(data);
};

const getTopRated = async (req, res) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  
  res.status(StatusCodes.OK).json(data);
};

const getUpcoming = async (req, res) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  
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
  const {query} = req.query;

  const response = await fetch(`https://api.themoviedb.org/3/search/multi?&api_key=${process.env.TMDB_API_KEY}&query=${query}`);
  const data = await response.json();
  
  res.status(StatusCodes.OK).json(data);
};

const getAction = async (req, res) => {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  
  res.status(StatusCodes.OK).json(data);
};

const getAnimation = async (req, res) => {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=${process.env.TMDB_API_KEY}`);
  const data = await response.json();
  
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
  getAnimation
};