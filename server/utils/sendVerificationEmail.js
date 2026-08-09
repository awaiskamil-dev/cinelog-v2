require('dotenv').config();
const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken
}) => {
  const verifyURL = `${process.env.ORIGIN}/user/verify-email?token=${verificationToken}&email=${email}`;

  const html = `
    <h2>Hello ${name}</h2>

    <p>Please verify your email.</p>

    <a href="${verifyURL}">Verify Email</a>
  `;

  await sendEmail({
    to: email,
    subject: 'Verify your email',
    html
  })
};

module.exports = sendVerificationEmail;