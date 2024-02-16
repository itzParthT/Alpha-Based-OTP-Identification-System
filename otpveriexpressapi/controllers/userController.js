import dotenv from 'dotenv'
import twilio from "twilio";
dotenv.config()

const accountSid = 'ACbf7bbe865946aaf8fd9ea7b1f680c47d';
const authToken = 'fa696fc3ca2017786e03e53cda7d1874'; 

//import twillio serices in client varaible
const client = twilio(accountSid, authToken);


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

  // const randomchar =generateString();
  // const otp = generateOTP();
let otp;
let  randomchar;

class UserController {
  // Send OTP to User
  static userLogin = async (req, res) => {
    const { phonenumber } = req.body
    const newPhoneNumber = "+91" + phonenumber
    var params = {
            timeout: 300
    };

    randomchar =generateString();
    otp = generateOTP();

            
       
          console.log(`Your OTP code is: ${randomchar} - ${otp}`);    

    // client.messages
    // .create({
    //     from: '+12568500060',
    //     to: `${newPhoneNumber}`,
    //     body: `Your OTP code is: ${ generateString()} - ${generateOTP()}`,     
    // })
    //   .then(message => console.log(message.body));

    res.status(200).send({ "status": "success", "message": "OTP Send Successfully", "id": 201 ,"identity":`${randomchar}`})
  }

  static userResend = async (req, res) => {
    otp = generateOTP();
    randomchar = generateString();
    console.log(`Your OTP code is: ${randomchar} - ${otp}`);    
    res.status(200).send({"status": "success","message": "OTP Re-Send Successfully", "otp":`${otp}`, "identity":`${randomchar}`});
  }

  // Verify OTP is correct or Not
  static verifyOTP = async (req, res) => {
    const { id, otpcode } = req.body
      
    if(otpcode==otp){
      res.status(200).send({ "status": "success", "message": "Login Success" })
    }
    else{
      res.status(200).send({ "status": "failed", "message": "Invalid OTP" })
    }
    
    // const { id, otpcode } = req.body
    // messagebird.verify.verify(id, otpcode,
    //   (err, response) => {
    //     if (err) {
    //       // Incorrect OTP
    //       console.log("OTP Verification Error:", err)
    //       res.status(200).send({ "status": "failed", "message": "Invalid OTP" })
    //     } else {
    //       // Login Success
    //       console.log("OTP Verification Response:", response)
    //       res.status(200).send({ "status": "success", "message": "Login Success" })
    //     }
    //   });
  }

}

export default UserController