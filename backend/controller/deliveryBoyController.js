const bcrypt = require('bcrypt');
const Token = require('../module/TokenModel');
const sendEmail = require('../utils/sendEmail');
const Order = require('../module/OrderModel');
const DeliveryBoy=require('../module/DeliveryBoyModel');
 

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
        console.log('hey');
       console.log(req.body);
        const { email, password } = req.body;
        const user = await DeliveryBoy.findOne({ email });
        console.log(user);
        if (!user) return res.status(400).json({ message: 'user not exist' });
        console.log(user);

        // if (!user.isVerified) return res.status(401).json({ message: 'please verify your account' })
        console.log(user.email);
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
        const {id} = req.query;
        console.log(id);
        const courierBoy = await DeliveryBoy.findById(id).populate([{
            path:'order',
            module:"Order"
        },{
            path:'order',
            populate:{
                path:'customer',
                module:'User'
            }
        }]);
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


const fetchAllAccepted = async (req, res) => {
    try {
        const response = await DeliveryBoy.find({ isApproved: 'approved' });
        res.status(200).json({ message: 'fetch all accepted', response });
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

const fetchAllRejected = async (req, res) => {
    try {
        const response = await DeliveryBoy.find({ isApproved: 'rejected' });
        res.status(200).json({ message: 'fetch all rejected', response });
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });

    }
} 


const fetchPending = async (req, res) => {
    try {
        const respnose = await DeliveryBoy.find({ isApproved: 'pending' });
        res.status(200).json({ message: 'delivery booy fetched', respnose });
    } catch (e) {
        res.status(500).json({ message: 'somethign went wrong' });
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

const receiveFoodFromResturant = async (req, res, next) => {
    try {
        const { id,otp } = req.body;
        const order = await Order.findOne({ _id: id, courierBoyotpNumber: otp });

        if (!order) {
           return res.status(209).json({ message: 'please check ones otp' })
        } else {
            order.status = 'on the way';
            await order.save()
            return res.status(200).json({ message: 'order on the way', order });
        }
    } catch (e) {   
        res.status(500).json({ message: 'somethin went wrong' });
    }
}

const deliverFoodForCustomer = async (req, res, next) => {
    try {
        const { id, otp } = req.body;

        const order = await Order.findOne({ _id: id, customerOtpNumber: otp });
        if (!order) {
            return res.status(209).json({ message: 'please check ones otp' })
         } else {
             order.status = 'delivered';
             await order.save()
             return res.status(200).json({ message: 'order delivered', order });
         }
    } catch (e) {
        res.status(500).json({ message: 'something went wronng' });
    }
}

const allOrder = async (req, res, next) => {
    try {
        const { id } = req.query;

        const response = await DeliveryBoy.findById(id).populate('order');
        res.status(200).json({ message: 'all order fetcehd',response });
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

const addReview = async (req, res, next) => {
    try {
        const { deliveryboyId, user, description, star } = req.body;

        const response = await DeliveryBoy.findByIdAndUpdate(deliveryboyId, {
            $push: {
                review: {
                    user: user,
                    description,
                    star
                }
            }
        })

        res.status(200).json({ message: 'review added' ,response});

    } catch (e) {
        res.status(400).json({ message: 'something went wrong' });
    }
}

module.exports = {
    register,
    login,
    verify,
    accept,
    reject,
    fetchAll,
    receiveFoodFromResturant,
    deliverFoodForCustomer,
    allOrder,
    fetchPending,
    fetchAllRejected,
    fetchAllAccepted,
    addReview
}