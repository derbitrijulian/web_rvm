import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const getEmailTemplate = (resetLink) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Password - RVM</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Reset Password RVM</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 20px;">Halo!</h2>
                  <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                    Anda menerima email ini karena ada permintaan untuk mereset password akun RVM Anda.
                  </p>
                  <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                    Klik tombol di bawah ini untuk mereset password Anda:
                  </p>
                  
                  <!-- Button -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center">
                        <a href="${resetLink}" 
                           style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                          Reset Password
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 30px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                    Atau copy dan paste link berikut ke browser Anda:
                  </p>
                  <p style="margin: 10px 0 0 0; padding: 15px; background-color: #f8f9fa; border-radius: 4px; word-break: break-all;">
                    <a href="${resetLink}" style="color: #667eea; text-decoration: none; font-size: 14px;">${resetLink}</a>
                  </p>
                  
                  <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0;">
                    <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px; line-height: 1.6;">
                      <strong>Link ini akan kadaluarsa dalam 1 jam.</strong>
                    </p>
                    <p style="margin: 0; color: #999999; font-size: 14px; line-height: 1.6;">
                      Jika Anda tidak meminta reset password, abaikan email ini. Password Anda tidak akan berubah.
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                  <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px;">
                    Email ini dikirim otomatis oleh sistem RVM
                  </p>
                  <p style="margin: 0; color: #999999; font-size: 12px;">
                    © ${new Date().getFullYear()} RVM - Reverse Vending Machine. All rights reserved.
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
};

const getTextTemplate = (resetLink) => {
  return `
Reset Password RVM

Halo!

Anda menerima email ini karena ada permintaan untuk mereset password akun RVM Anda.

Klik link berikut untuk mereset password Anda:
${resetLink}

Link ini akan kadaluarsa dalam 1 jam.

Jika Anda tidak meminta reset password, abaikan email ini. Password Anda tidak akan berubah.

---
Email ini dikirim otomatis oleh sistem RVM
© ${new Date().getFullYear()} RVM - Reverse Vending Machine. All rights reserved.
  `;
};

export async function sendPasswordResetEmail(email, resetLink) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"RVM Support" <noreply@rvm.com>',
      to: email,
      subject: 'Reset Password - RVM',
      text: getTextTemplate(resetLink),
      html: getEmailTemplate(resetLink),
    });

    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Failed to send reset password email');
  }
}

export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error);
    return false;
  }
}
