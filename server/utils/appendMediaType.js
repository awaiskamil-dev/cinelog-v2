const appendMediaType = ({results}, format) => {
  if(format !== 'movie' && format !== 'tv') return;
  results.forEach((item) => item.media_type = format);
};

module.exports = appendMediaType;