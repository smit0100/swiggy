const nodemailer = require('nodemailer');

require('dotenv').config()
  

module.exports = async (email, subject, text) => {
    

let transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    // host:'smtp.mailgun.org',
    port: 2525,
    // port:587,
    secure: false, // true for 465, false for other ports
    auth: {
        // user: ' postmaster@sandbox326aea48fc664e578fa22f2071af4265.mailgun.org',
        // pass:'0a4b3f2cf7c5e980a0f7b026f7a43620-f7d687c0-1eb0b1fb'
      user: 'smitdankhra01@gmail.com', // generated ethereal user
      pass: '06C6C6BBC38B155A2A2FA942C65D0838BDF7', // generated ethereal 
    },
});
    
    let info = await transporter.sendMail({
        from: 'smitdankhra01@gmail.com', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        // html: "<b>smit</b>", // html body
    });
    
    console.log('this is info');
    console.log(JSON.stringify(info));

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// const Sib = require('sib-api-v3-sdk')
// require('dotenv').config()
// module.exports = async (email, subject, text) => {
//     const client = Sib.ApiClient.instance
//     const apiKey = client.authentications['api-key']
//     apiKey.apiKey ='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'

//     const tranEmailApi = new Sib.TransactionalEmailsApi()
//     const sender = {
//         email: 'smitdankhra01@gmail.com',
//         name: 'smit',
//     }
//     const receivers = [
//         {
//             email: email,
//         },
//     ]

//     tranEmailApi
//     .sendTransacEmail({
//         sender,
//         to: receivers,
//         subject: subject,
//         textContent: text
//     })
//     .then(console.log)
//     .catch(console.log)
// }
