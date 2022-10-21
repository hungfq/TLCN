const { MailtrapClient } = require('mailtrap');
const nodemailer = require('nodemailer');

const sendEmail = (email, content) => {
// For this example to work, you need to set up a sending domain,
// and obtain a token that is authorized to send from the domain
  const TOKEN = 'fe6436cc557ae6e25a7ac222b199917f';
  const SENDER_EMAIL = 'lequocbao29072001@student.hcmute.edu.vn';
  const RECIPIENT_EMAIL = 'lequocbao29072001@gmail.com';

  const client = new MailtrapClient({ token: TOKEN });
  const sender = { name: 'Mailtrap Test', email: SENDER_EMAIL };
  client
    .send({
      category: 'Send OTP',
      from: sender,
      to: [{ email: RECIPIENT_EMAIL }],
      subject: 'DANG KI DE TAI',
      html: `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      </head>
      <body style="font-family: sans-serif;">
        <div style="display: block; margin: auto; max-width: 600px;" class="main">
          <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Congrats for sending test email with Mailtrap!</h1>
          <p>Inspect it using the tabs you see above and learn how this email can be improved.</p>
          <img alt="Inspect with Tabs" src="cid:welcome.png" style="width: 100%;">
          <p>${content}</p>
          <p>Good luck! Hope it works.</p>
        </div>
        <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
        <style>
          .main { background-color: white; }
          a:hover { border-left-width: 1em; min-height: 2em; }
        </style>
      </body>
    </html>
  `,
    })
    .then(console.log, console.error);

  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '0f21a921bc9471',
      pass: '63d33ec35527fe',
    },
  });
  const mailOptions = {
    from: SENDER_EMAIL,
    to: RECIPIENT_EMAIL,
    subject: 'Send OTP',
    text: content,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
  console.log(`Email sent OTP: ${content}`);
};

module.exports = {
  sendEmail,
};
