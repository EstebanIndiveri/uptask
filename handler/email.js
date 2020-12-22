const nodemailer=require('nodemailer');
const pug=require('pug');
const juice=require('juice');
const htmlToText=require('html-to-text');
const util=require('util');
const emailConfig=require('../config/email');

async function main(opciones={}) {
  try{
let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user, // generated ethereal user
      pass: emailConfig.pass, // generated ethereal password
    },
  });
  const generarHtml=(archivo,opciones={})=>{
      const html=pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`,opciones)
      return juice(html);
  }
  // if(!opciones.archivo)return;
  const html=generarHtml(opciones.archivo,opciones);
  const text=htmlToText.fromString(html);
  let info = await transport.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: opciones.usuario.email, // list of receivers
    subject: opciones.subject, // Subject line
    text,  // plain text body
    html // html body
  });
  console.log("Message sent: %s", info.messageId);
//   transport.sendMail(mailOptions);
  }catch(error){
    console.log(error);
  }
}
// main().catch(console.error);
module.exports = main;