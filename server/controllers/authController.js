const User = require('../models/User');
const Token = require('../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const crypto = require('crypto');
const {
  attachCookiesToResponse, createTokenUser,
  sendVerificationEmail, sendResetPassswordEmail,
  createHash
} = require('../utils');

const verifyEmail = async (req, res) => {
  const {verificationToken, email} = req.body;
  const user = await User.findOne({email});
  
  if(!user){
    throw new CustomError.UnauthenticatedError('Verification failed');
  };

  if(user.verificationToken !== verificationToken){
    throw new CustomError.UnauthenticatedError('Verification failed');
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = '';
  await user.save();

  res.status(StatusCodes.OK).json({msg: 'Email verified'});
};

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const verificationToken = crypto.randomBytes(40).toString('hex');

  const user = await User.create({ name, email, password, role, verificationToken });

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken
  });
  
  res.status(StatusCodes.OK).json({
    mgs: 'Sucess, please check your email to verify account',
    verificationToken
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  if(!user.isVerified){
    throw new CustomError.UnauthenticatedError('Email is not verified');
  }
  
  const tokenUser = createTokenUser(user);
  let refreshToken = '';
  const existingToken = await Token.findOne({user: user._id});

  if(existingToken){
    const {isValid} = existingToken;
    if(!isValid){
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({res, user: tokenUser, refreshToken});
    return res.status(StatusCodes.OK).json({user: tokenUser});
  }  

  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = {refreshToken, ip, userAgent, user: user._id, isValid: true};

  await Token.create(userToken);
  attachCookiesToResponse({res, user: tokenUser, refreshToken});
  res.status(StatusCodes.OK).json({user: tokenUser});
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({user: req.user.userId});

  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const forgotPassword = async (req, res) => {
  const {email} = req.body;
  if(!email){
    throw new CustomError.BadRequestError('Please provide a valid email');  
  }

  const user = await User.findOne({email});
  if(user){
    const passwordToken = crypto.randomBytes(70).toString('hex');
    
    await sendResetPassswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();

    res.status(StatusCodes.OK).json({msg: 'Please check your email, for password reset link'});
  }
};

const resetPassword = async (req, res) => {
  const {token, email, password} = req.body;
  
  if(!token || !email || !password){
    throw new CustomError.BadRequestError('Please provide all values');
  }

  const user = await User.findOne({email});
  if(user){
    const currentDate = new Date();

    if(
      user.passwordTokenExpirationDate > currentDate &&
      user.passwordToken === createHash(token)
    ){
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  res.status(StatusCodes.OK).json({msg: 'Your password has been reset. You can now log in with your new password.'});
};

const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({user: req.user});
}

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getCurrentUser
};
