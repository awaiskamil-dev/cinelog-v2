const {movieGenreMap, tvGenreMap} = require('./genreMaps');

const filterResults = (results, {genre, year, format}) => {
  return results
  .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
  .filter((item) => {
    const itemYear = item.media_type === 'movie'
    ? item.release_date?.slice(0, 4)
    : item.first_air_date?.slice(0, 4);
    
    const itemGenre = item.media_type === 'movie'
    ? item.genre_ids?.includes(movieGenreMap[genre])
    : item.genre_ids?.includes(tvGenreMap[genre]);

    const genreMatches = !genre || itemGenre;
    const yearMatches = !year || itemYear === year;
    const formatMatches = !format || item.media_type === format;

    return genreMatches && yearMatches && formatMatches;
  });
};

module.exports = filterResults;