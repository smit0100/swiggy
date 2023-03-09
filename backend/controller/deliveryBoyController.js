const DeliveryBoy = require('../module/DeliveryBoyModel');
const bcrypt = require('bcrypt');
const Token = require('../module/TokenModel');
const sendEmail = require('../utils/sendEmail');

const register = async (req, res, next) => {
    try {
        const { name, email, number, password } = req.body;
        
        const isExist = await DeliveryBoy.findOne({ email });

        if (isExist) return res.status(402).json({ message: 'this eamil id already exist' });

        const saltGen = await bcrypt.genSalt(10);
        const encryptedPass = await bcrypt.hash(password, saltGen)
        
        const user = await new DeliveryBoy({
            name,email,number,password:encryptedPass
        }).save()
        const otpNumber = Math.floor(100000 + Math.random() * 900000);

        const token = await new Token({
            userID: user._id,
            token: otpNumber
        }).save();

        await sendEmail(user.email, "Vefiy Email", String(otpNumber));
        res.status(200).json({ message: 'otp sent', user });



    } catch (e) {
        console.log(e);
        res.status(500).json({message:"something went wrong"})
    }
}

const verify = async (req, res, next) => {
    try {
        const { id, otp } = req.body;
        const user = await DeliveryBoy.findOne({ _id: req.body.id });

        if (!user) return res.status(404).json({ message: 'user not found' });
        const token = await Token.findOne({
            userID: id,
            token:otp
        })

        if (!token) return res.status(401).json({ message: 'otp wrong' });

        user.isVerified = true
        await user.save();
        await token.remove();

        res.status(200).json({ message: "user veruified", user });
        
    } catch (e) {
        res.status(500).json({ message: 'somehting went wrong' });
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await DeliveryBoy.findOne({ email });

        if (!user) return res.status(400).json({ message: 'user not exist' });

        if (!user.isVerified) return res.status(401).json({ message: 'please verify your account' })

        const pass = await bcrypt.compareSync(password, user.password);
        console.log(pass);
        if (pass) {
            return res.status(200).json({message:'user founded',user})
        } else {
            return res.status(402).json({ message: 'please check your email and password' });



        }
    } catch (e) {
        res.status(500).json({ message: "something went wrong" });
    }
}

const fetchAll = async (req, res, next) => {
    try {
        const courierBoy = await DeliveryBoy.find({ isVerified: true });
        res.status(200).json({ message: 'courier boy founded', courierBoy });
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

const accept = async (req, res, next) => {
    try {
        const { id } = req.query;
        const courierBoy = await DeliveryBoy.findByIdAndUpdate(id, { isApproved: 'approved' });
        res.status(200).json({ message: 'courier boy approved', courierBoy });

    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }
} 

const reject = async (req, res, next) => {
    try {
        const { id } = req.query;
        const courierBoy = await DeliveryBoy.findByIdAndUpdate(id, { isApproved: 'rejected' });
        res.status(200).json({ message: 'courier boy reject', courierBoy });
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

module.exports = {
    register,
    login,
    verify,
    accept,
    reject,
    fetchAll
}