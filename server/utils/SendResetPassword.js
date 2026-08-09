require('dotenv').config();
const sendEmail = require('./sendEmail');

const sendResetPassswordEmail = async ({name, email, token}) => {
  const resetURL = `${process.env.ORIGIN}/user/reset-password?token=${token}&email=${email}`;
  const html = `
    <h4>Hello ${name}</h4>
    <p>Please reset password by clicking on the following link: <a href="${resetURL}">Reset Password</a>
  `;

  return sendEmail({
    to: email,
    subject: 'Reset Password',
    html
  })
};

module.exports = sendResetPassswordEmail;