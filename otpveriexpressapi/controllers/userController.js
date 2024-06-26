import dotenv from 'dotenv'
import twilio from "twilio";
dotenv.config()

const accountSid = 'AC9de6acea217042c80611734ba56c2e9f';
const authToken = 'a47c96bf31d4e2c256fe046a609446e3'; 

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
  let newPhoneNumber;

class UserController {
  // Send OTP to User
  
  static userLogin = async (req, res) => {
    const { phonenumber } = req.body
     newPhoneNumber = "+91" + phonenumber
  
    

    randomchar =generateString();
    otp = generateOTP();

    console.log(`Your OTP code is: ${randomchar} - ${otp}`);    
    
    client.messages
  
    .create({
        from: '+14058296306',
        to: `${newPhoneNumber}`,
        body:`Your OTP code is: ${randomchar} - ${otp} for txn of INR 100.00 on Apna Bank Card.`,     
       })
       .then(message=>{console.log(message.body)
        if(true)
          res.status(200).send({ "status": "success", "message": "OTP Send Successfully", "id": 201 ,"identity":`${randomchar}`});
                      })
       .catch(error => {console.log("Error Code Twillio:-  "+error.code)
       if(error.code){
       console.log("Error Detected :"+error);
       res.status(200).send({ "status": "failed", "message": "OTP Send Failed ", "id": 201 });
                    }
       
  });
      
}
  static userResend = async (req, res) => {
    otp = generateOTP();
    randomchar = generateString();
    
    client.messages
    .create({
        from: '+14058296306',
        to: `${newPhoneNumber}`,
        body: `Your OTP code is: ${randomchar} - ${otp} for txn of INR 100.00 on Apna Bank Card.`, 
            
    })
      .then(message => console.log(message.body));

        

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
    
  }

}

export default UserController