const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
    host: process.env.NODEMAIL_HOST,
    port: process.env.NODEMAIL_PORT,
    auth: {
      user: process.env.NODEMAIL_USER,
      pass: process.env.NODEMAIL_PASS
    }
  }, {
      from:`${process.env.NODEMAIL_NAME} <${process.env.NODEMAIL_EMAIL}>`
  });

  exports.send = async (options)=>{
    await transport.sendMail(options);
  };