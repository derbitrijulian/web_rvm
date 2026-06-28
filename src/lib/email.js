import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendPasswordResetEmail(email, resetLink) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset Password - RVM',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #4F46E5;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #4F46E5;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reset Password</h1>
            </div>
            <div class="content">
              <p>Halo,</p>
              <p>Anda menerima email ini karena ada permintaan untuk reset password akun Anda.</p>
              <p>Klik tombol di bawah ini untuk reset password Anda:</p>
              <p style="text-align: center;">
                <a href="${resetLink}" class="button">Reset Password</a>
              </p>
              <p>Atau copy dan paste link berikut ke browser Anda:</p>
              <p style="word-break: break-all; background-color: #fff; padding: 10px; border-radius: 3px;">
                ${resetLink}
              </p>
              <p><strong>Link ini akan kadaluarsa dalam 1 jam.</strong></p>
              <p>Jika Anda tidak meminta reset password, abaikan email ini dan password Anda tidak akan berubah.</p>
              <div class="footer">
                <p>Email ini dikirim secara otomatis, mohon tidak membalas email ini.</p>
                <p>&copy; 2026 RVM. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Reset Password - RVM
      
      Halo,
      
      Anda menerima email ini karena ada permintaan untuk reset password akun Anda.
      
      Klik link berikut untuk reset password Anda:
      ${resetLink}
      
      Link ini akan kadaluarsa dalam 1 jam.
      
      Jika Anda tidak meminta reset password, abaikan email ini dan password Anda tidak akan berubah.
      
      Email ini dikirim secara otomatis, mohon tidak membalas email ini.
      
      © 2026 RVM. All rights reserved.
    `,
  };

  await transporter.sendMail(mailOptions);
}
