require('dotenv').config();
const sendEmail = require('./sendEmail');

const sendResetPassswordEmail = async ({name, email, token}) => {
  const resetURL = `${process.env.ORIGIN}/user/reset-password?token=${token}&email=${email}`;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset your password</title>
    </head>
    <body style="margin:0; padding:0; background-color:#0A0A0A; font-family: Arial, Helvetica, sans-serif;">

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A; padding: 40px 0;">
        <tr>
          <td align="center">

            <table role="presentation" width="420" cellpadding="0" cellspacing="0" style="max-width: 420px; width: 100%; background-color:#141414; border:1px solid #262626; border-radius:8px;">

              <!-- Logo / Brand -->
              <tr>
                <td align="center" style="padding: 36px 32px 8px;">
                  <span style="font-family: Arial, Helvetica; font-size: 24px; font-weight: 800; letter-spacing: 1px; color:#F5A623;">
                    CINELOG
                  </span>
                </td>
              </tr>

              <!-- Heading -->
              <tr>
                <td align="center" style="padding: 8px 32px 0;">
                  <span style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; font-weight: 700; color:#F2F2F2;">
                    Reset your password
                  </span>
                </td>
              </tr>

              <!-- Body text -->
              <tr>
                <td align="center" style="padding: 16px 32px 28px;">
                  <p style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; color:#C9B99A;">
                    We received a request to reset the password for your Cinelog account. Click the button below to choose a new password.
                  </p>
                </td>
              </tr>

              <!-- Button -->
              <tr>
                <td align="center" style="padding: 0 32px 32px;">
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="border-radius: 5px; background-color:#F5A623;">
                        <!-- Replace href with your actual reset link -->
                        <a href="${resetURL}"
                          target="_blank"
                          style="display:inline-block; padding: 12px 28px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; color:#0A0A0A; text-decoration:none; border-radius:5px;">
                          Reset Password
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Fallback link -->
              <tr>
                <td align="center" style="padding: 0 32px 32px;">
                  <p style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.6; color:#6b6b6b;">
                    Button not working? Copy and paste this link into your browser:<br/>
                    <a href="${resetURL}" style="color:#C9B99A; word-break: break-all;">${resetURL}</a>
                  </p>
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td style="padding: 0 32px;">
                  <div style="border-top: 1px solid #262626;"></div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 20px 32px 32px;">
                  <p style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 1.6; color:#5a5a5a;">
                    If you didn't request a password reset, you can safely ignore this email — your password will remain unchanged.
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'Reset Password',
    html
  })
};

module.exports = sendResetPassswordEmail;