const { Twilio } = require('twilio');

//Twilio SMS service account ID

const accountSid = 'ACbf7bbe865946aaf8fd9ea7b1f680c47d';
const authToken = 'fa696fc3ca2017786e03e53cda7d1874'; 

//import twillio serices in client varaible
const client = require('twilio')(accountSid, authToken);

//Generate 6 digit otp and return the same to function call
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  //Generate 3 digit alphabet from this string value only
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  //Generate 3 Random alphabet for Identification and return the same
  function generateString() {
      let result = ' ';
      const charactersLength = characters.length;
      for ( let i = 0; i < 3; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
  
      return result;
  }

  //function call and store value in respective varaible

  const randomchar =generateString();
  const otp = generateOTP();


//Twillio API request to send data
    client.messages
        .create({
            from: '+12568500060',
            to: '+918983735953',
            body: `Your OTP code is: ${randomchar} - ${otp}`,     
        })
          .then(message => console.log(message.body));
    