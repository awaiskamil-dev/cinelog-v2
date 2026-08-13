const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const sendVerificationEmail = require('./sendVerificationEmail');
const sendResetPassswordEmail = require('./sendResetPasswordEmail');
const createHash = require('./createHash');
const filterResults = require('./filterResults');
const {movieGenreMap, tvGenreMap} = require('./genreMaps');

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPassswordEmail,
  createHash,
  filterResults,
  movieGenreMap,
  tvGenreMap
};
