const nodemailer = require('nodemailer');

// Create a transporter object using your email service's SMTP configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '21512051.dypit@dypvp.edu.in ',
        pass: 'Parth765@'
  }

});

// Generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateString() {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 3; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const randomchar =generateString();

const otp = generateOTP();
// Email data
const mailOptions = {
    from: 'OTP_SYSTEM@DYPVP.com',
    to: 'parthtagdpallewar@gmail.com',
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${randomchar} - ${otp}`
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});


