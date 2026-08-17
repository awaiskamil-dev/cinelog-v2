const CustomError = require('../errors');
const { isTokenValid, attachCookiesToResponse } = require('../utils');
const Token = require('../models/Token');
const crypto = require('crypto');

const authenticateUser = async (req, res, next) => {
  const {refreshToken, accessToken} = req.signedCookies;

  try{
    if(accessToken){
      const payload = isTokenValid({token: accessToken});
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid({token: refreshToken});

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken
    });

    if(!existingToken || !existingToken.isValid){
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    const newRefreshToken = crypto.randomBytes(40).toString('hex');
    existingToken.refreshToken = newRefreshToken;
    await existingToken.save();

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: newRefreshToken,
    });

    req.user = payload.user;
    next();
  }catch(error){
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
