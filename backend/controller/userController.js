const User = require('../module/UserModel');
const Token = require('../module/TokenModel');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { log } = require('console');
require('dotenv').config()


const createUser = async (req, res, next) => {
    const { name, email, number, password } = req.body;


    const userExist = await User.findOne({ email });

    if (userExist) return res.status(409).json({ message: 'email id already exist' });
    const saltGen = await bcrypt.genSalt(10);
    console.log(saltGen);
    // res.send(saltGen)
    const encryptedPass = await bcrypt.hash(password,saltGen)
    // const encryptedPass = await bcrypt.hash(password, 10);
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
    await sendEmail(user.email, "Verify Email", String(url))

    res.status(200).json({ message: "otp sent", user });


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
        let user = await User.findOne({ _id: req.body.id });
        if (!user) return res.status(404).send({ message: 'user not found' });

        const token = await Token.findOne({
            userID: req.body.id,
            token: req.body.otp
        })

        if (!token) return res.status(401).json({ message: "wrong otp" });

        await User.updateOne({ _id: user._id }, { verified: true });
        console.log('hello hello');
        console.log(req.body);
        if (req.body.newAddress) {
          
            const { name, email, number } = req.body.newAddress;
            console.log(name, email, number);
            user = await User.findByIdAndUpdate(user._id, { name, email, number }, {
                 new:true
            })
            console.log(user);
            
        }
        await token.remove();

        res.status(200).json({ message: "user verifed", user });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "internal server error"
        })
    }
}

const fetchAllUser = async (req, res, next) => {
    try {
        const data = await User.find();
        res.status(200).json({messag:"user fectehd",data})
    } catch (e) {
        res.status(500).json({ message: "something went wrong" });
    }
}

const updateUserType = async (req, res, next) => {
    try {
        const { userId, userType } = req.body;
        const data = await User.findByIdAndUpdate(userId, {
            type:userType
        }, {
            new:true
        })
    } catch (e) {
        res.status(500).json({ messag: "something went wrong" });
    }
}

const fetchOnlyOneUser = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const data = await User.findById(userId, {
            password: -1,
            name: 1,
            email: 1,
            number: 1,
            order: 1,
            type: 1
        });
        if (!data) return res.status(400).json({ messag: "user not founded" });

        res.status(200).json({messag:"user founded",data})
    } catch (e) {
        res.status(500).json({ messag: 'something went wrong' });
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

const addAdddress = async (req, res, next) => {
    try {
        const { userId, area, city, state, pincode } = req.body;

        const response = await User.findByIdAndUpdate(userId, { $push: { address: { area, city, state, pincode } } }, {
            new: true
        });
        console.log(response);
        res.status(200).json({ message: "address added", response })
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }

}

const fetchAllAddress = async (req, res, next) => {
    try {
        const { id } = req.params;

        const response = await User.findById(id, { address: 1, password: -1 })
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' })
    }

}

const deleteUserAddress = async (req, res, next) => {
    try {
        const { userId, itemId } = req.query;
        const response = await User.findByIdAndUpdate(userId, { $pull: { address: { _id: itemId } } }, {
            new: true
        })

        if (response) {
            return res.status(200).json({
                message: "deleted",
                response
            })
        } else {
            return res.status(400).json({
                message: 'messing details    '
            })
        }


    } catch (e) {
        res.status(500).json({
            message: 'something went wrong'
        })
    }

}

const updateAddress = async (req, res, next) => {
    const { userId, name, number, email } = req.body;

    let user = await User.findById(userId);
    if (user.email === email) {
        user = await User.findByIdAndUpdate(userId, { name, number }, {
            new:true
       })
        
        return res.status(200).json({message:'updated',user})
    } else {
        const emailExist = await User.find({ email });
        console.log(emailExist);
        if (emailExist.length != 0) return res.status(409).json({ message: 'email id already exist' });

        else {
            const otpNumber = Math.floor(100000 + Math.random() * 900000)
            const token = await new Token({
                userID:userId,
                token: otpNumber,
            }).save();

            const url = otpNumber;
            console.log('this is url', url);
            await sendEmail(email, "Verify Email", String(url))

            res.status(201).json({ message: "otp sent", user,newDetails:{name,number,email} });

        }
    }
}

const changePassword = async (req, res, next) => {
    const { userId, oldPass, newPass } = req.body;
    console.log(userId);
    let user = await User.findById(userId);
    console.log(user);
    console.log(oldPass);
    const pass = await bcrypt.compareSync(oldPass,user.password);
    console.log(pass);
    if (!pass) {
        return res.status(401).json({
            message:"your password in incorrect"
        })
    }

    else {
        const encryptedPass = await bcrypt.hash(newPass, 10);
         await user.updateOne({ password: encryptedPass });
        return res.status(200).json({messag:"user password updated"})
    }

}

const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const data = await User.findByIdAndDelete(userId)

        if (!data) return res.status(400).json({ messag: "user not founded" });

        res.status(200).json({messag:'user deleted'})
    } catch (e) {
        res.status(500).json({ messag: "something went wrong" });
    }
}

module.exports = {
    createUser,
    verifyUser,
    loginUser,
    addAdddress,
    fetchAllAddress,
    deleteUserAddress,
    updateAddress,
    changePassword,
    fetchAllUser,
    updateUserType,
    fetchOnlyOneUser,
    deleteUser
}