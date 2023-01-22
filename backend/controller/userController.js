const User = require('../module/UserModel');
const Token = require('../module/TokenModel');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('dotenv').config()


const createUser = async (req, res, next) => {
    const { name, email, number,password } = req.body;
    
    
    // const userExist = await User.findOne({ email });

    // if (userExist) return res.status(409).json({ message: 'email id already exist' });
    // const saltGen = await bcrypt.genSalt(10);
    // console.log(saltGen);
    // res.send(saltGen)
    // const encryptedPass = await bcrypt.hash(pass,salt)
    const encryptedPass = await bcrypt.hash(password, 10);
    console.log('this is encrypted');
    console.log(encryptedPass);
    const user = await new User({ name, email, number, password: encryptedPass }).save();
    const otpNumber = Math.floor(100000 + Math.random() * 900000)
    const token = await new Token({
        userID: user._id,
        token: otpNumber,
    }).save();

    const url = otpNumber;
    console.log('this is url', url);
    await sendEmail(user.email,"Verify Email",String(url))

    res.status(200).json({ message: "otp sent" ,user});


    // const cryptedPass = await bcrypt.hash(pass, 10, async (err, hash) => {
    //     if (err) {
    //         console.log('this is error');
    //         console.log(err);

    //         res.send(err)
    //     }
    //     console.log(hash);
    // const user =  new User({ name, email, number, password:pass });
    // const response = await user.save();
    // console.log(response);

   

    
    // });
   



   

}


const verifyUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.body.id });
        if (!user) return res.status(404).send({ message: 'user not found' });

        const token = await Token.findOne({
            userID: req.body.id,
            token:req.body.otp
        })
        
        if (!token) return res.status(401).json({ message: "wrong otp" });

        await User.updateOne({ _id: user._id },{ verified: true });
        await token.remove();

        res.status(200).json({ message: "user verifed",user });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message:"internal server error"
        })
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // user not exist

    if (!user) return res.status(400).json({ message: 'user not exist' });
    console.log(password);
    console.log(user.password);


    //userr not verified
        if (!user.verified) return res.status(401).json({ message: 'please verify you user account' });

    const pass = await bcrypt.compareSync(password, user.password);

    if (pass) {
        return res.status(200).json({ message: "user founded", user });
    } else {
        return res.status(402).json({ message: 'please check your email and password' });
    }



}


module.exports = {
    createUser,
    verifyUser,
    loginUser
}