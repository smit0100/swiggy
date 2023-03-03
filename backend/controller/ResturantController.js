const Resturant = require('../module/ResturantModel');
const Product = require('../module/ProductModel')
const cloudinary = require("cloudinary").v2;
const mongoose = require('mongoose')
const Order = require('../module/OrderModel');
const bcrypt = require('bcrypt');
const Token = require('../module/TokenModel');
const sendEmail = require('../utils/sendEmail');
const User = require('../module/UserModel')

const createResturnat = async (req, res, next) => {
   
    let { address, email, name, ownerName, number, panCard,outLetType, bankDetails,id,category } = req.body;
    console.log(req.body);
    // console.log(typeof(outLetType));
   address = JSON.parse(address);
    panCard = JSON.parse(panCard);
    bankDetails = JSON.parse(bankDetails)
    
    console.log( typeof(panCard));

    let bankImage = req.files.bank;
    let panImage = req.files.pancard;
    let {bg1,bg2,bg3} = req.files
    console.log(req.files.bank);
    try {
       const result = await cloudinary.uploader.upload(bankImage.tempFilePath, {
           folder: 'ownerDetails',
           crop: 'fill',
            width: 250,
            height:250
        })    
        panUrl = await cloudinary.uploader.upload(panImage.tempFilePath,{
            folder: "ownerDetails",
            crop: 'fill',
            width: 250,
            height:250
        })
        
        
        const bgimageUrl = [];
        let {url} = await cloudinary.uploader.upload(bg1.tempFilePath, {
            folder: "Resturant",
            crop: 'fill',
            width: 250,
            height:250
        
        })

        bgimageUrl.push(url);
        const {url:url2} = await cloudinary.uploader.upload(bg2.tempFilePath, {
            folder: "Resturant",
            crop: 'fill',
            width: 250,
            height:250
        
         })
        bgimageUrl.push(url2);

        let {url:url3} = await cloudinary.uploader.upload(bg3.tempFilePath, {
            folder: "Resturant",
            crop: 'fill',
            width: 250,
            height:250
        
        })
        bgimageUrl.push(url3);

        console.log("this is ");
        console.log(bgimageUrl);
        
        console.log(outLetType);
        const response = await Resturant.findByIdAndUpdate(id,{ name,ownerName,address,panCard,bankDetails, email, number, outLetType,pancardURL: panUrl.url, bankURL: result.url,bgImageUrl:bgimageUrl,panCard,isApproved:'pending' ,category},{
            new:true
        });

        console.log(response);
        console.log(response);

        return res.status(200).json({ message: 'resturant created',response});

    } catch (e) {
        console.log(e);
    }
    

    

    res.status(200).json({ message: "uploader" });
}



const register = async (req, res, next) => {
    try {
        const { name, email, password, number } = req.body;

        const emailExist = await Resturant.find({ email });
        
        console.log(emailExist);
        if (emailExist.length !== 0) return res.status(400).json({ messag: 'email already exist' });
        const saltGen = await bcrypt.genSalt(10);
        const encryptedPass = await bcrypt.hash(password,saltGen)

        
        const restuarnt = await new Resturant({
            name,
            email,
            number,
            password: encryptedPass
        }).save();

        const otpNumber = Math.floor(100000 + Math.random() * 900000)
        const token = await new Token({
            userID: restuarnt._id,
            token: otpNumber,
        }).save();

        await sendEmail(restuarnt.email, "Verify Email", String(otpNumber))
        res.status(200).json({ messag: 'otp sent', restuarnt });
    } catch (e) {
        console.log(e);
        res.status(400).json({ messag: 'something went wrng' });
    }
}

const verfiyResturant = async (req, res, next) => {
    try {
        let rest = await Resturant.findOne({ _id: req.body.id });

        if (!rest) return res.status(404).send({ message: 'user not found' });
        
        const token = await Token.findOne({
            userID: req.body.id,
            token: req.body.otp
        })
    
        if (!token) return res.status(401).json({ message: "wrong otp" });
    
        await Resturant.updateOne({ _id: rest._id }, { registerVerfied: true });
        await token.remove();
    
        res.status(200).json({messag:'resturant verfied',rest})
    } catch (e) {
        console.log(e);
        res.status(404).json({ messag: "something went wrog" });
    }
   

}

const loginResturant = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const rest = await Resturant.findOne({ email });
    
        if (!rest) return res.status(400).json({ messag: 'resturant not registered' })
        
        if (!rest.registerVerfied) return res.status(401).json({ messag: 'please verify you user account' })
        
        const pass = await bcrypt.compareSync(password, rest.password)
        
        if (pass) {
            return res.status(200).json({ message: "restuarnt founded", rest });
        } else {
            return res.status(402).json({ message: 'please check your email and password' });
        }
    } catch (e) {
        res.status(404).json({ messag: "something wnet wrong" });
    }
   

}

const fetchResturant = async (req, res, next) => {
    const { id } = req.params;
    const response = await Resturant.findById(id);

    if (!response) return res.status(400).json({ message: 'resturant not founded' });

    return res.status(200).json({message:"resturant founded",response})
}

const approveResturant = async (req, res, next) => {
    const { id } = req.params;
    const response = await Resturant.findByIdAndUpdate(id, { isApproved: "Accepted" },{new:true});

    return res.status(200).json({ message: 'resturant is active',response });
}
const rejectResturant = async (req, res, next) => {
    const { id } = req.params;
    const response = await Resturant.findByIdAndUpdate(id, { isApproved: "Rejected" }, {
        new:true    
    });

    return res.status(200).json({ message: 'resturant is rejected' ,response});
}
const fetchAllResturants = async (req, res, next) => {

    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10 ;


    try {
        
        const totalCount = await Resturant.countDocuments();
        // calculate the number of pages
        
        const totalPages = Math.ceil(totalCount / pageSize);
    
        // retrieve the blog posts based on the page number and page size
        const blogPosts = await Resturant.find({isApproved: 'Accepted'} )
          .skip((pageNumber - 1) * pageSize)
          .limit(pageSize);
        
        // return the  results
        console.log(blogPosts);
        res.status(200).json({
          page: pageNumber,
          totalPages: totalPages,
          pageSize: pageSize,
          totalCount: totalCount,
          results: blogPosts
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }

    
}


const getAllResturant = async (req,res) => {
try{
        const response = await Resturant.find({ isApproved: 'pending'});
        console.log(response);
        res.status(200).json({messag:'resturnat fetched',results:response});
    } catch (e) {
        res.status(500).json({messag:'something went wrong'});
    }
}

const resturantStatus = async (req, res, next) => {
    try {
        const { id } = req.query;
        
        const result = await Resturant.findById(id);
        console.log(result);
        if (result.isApproved === "isApproved") return res.status(200).json({ messag: 'resturant approved', result })
        else return res.status(201).json({ messag: 'restuant not approved', result });    
    } catch (e) {
        res.status(500).json({ messag: 'something went wrong' });
    }
    
}

const fetchResturantAllProduct = async (req, res, next) => {
    const { id } = req.query;
    const ObjectID = require('mongodb').ObjectID;
    let categories = req.query.categories || [];
     
     
 
    
    const resturant = await Resturant.findById(id);

    if (!resturant) return res.status(404).json({ message: "resturant not exist" });
    
    let product
    if (categories.length === 0) {
        product = await Product.find({ resturnat: id })
    } else {
        
         categories = categories.split(',').map(id => mongoose.Types.ObjectId(id.trim()));

        product = await Product.find({resturnat:id,category:{$in:categories}})
    }
 res.status(200).json({message:'product finded',product,resturant})
   
}

const fetchAllApprovedResturant = async (req, res, next) => {
    try {
        const data = await Resturant.find({ isApproved: "Accepted" });
        console.log(data);
        res.status(200).json({ message: "fetched all active resturant", data });
    } catch (e) {
        res.status(500).json({ messag: "something went wrong" });
    }
}


const fetchAllResturantOrder = async (req, res, next) => {
    try {
        const { id } = req.query;
        // const order = await Resturant.findById(id, { order: 1 }).populate('order');
         
        const order = await Order.find({resturant:id}).populate([
           { 
                 path: 'products.product',
                model: 'Product'
            }, {
                path: "customer",
                module:"User"
            }, {
                path: 'resturant',
                module:"Resturant"
            }
        ]);

     
        
     


        if (!order) return res.status(400).json({ messag: "order not found", order })
        console.log(order);
        res.status(200).json({messag:"order fetched",order})
    } catch (e) {
        console.log(e);
        res.status(404).json({ messag: "something went wrong" });
    }
}

const acceptOrder = async (req, res, next) => {
    try {
        const { id, orderId } = req.query;

        const response = await Order.findByIdAndUpdate(orderId, { status: 'accept' }, {
            new:true
        });

        

        res.status(200).json({messag:"order accepted",response})
    } catch (e) {
        res.status(400).json({ messag: 'something went wrong' });
    }
}

const fetchAllProduct = async (req, res, next) => {
    try {
        const { id } = req.query;
        const result = await Resturant.findById(id).populate('product');
        console.log(result);
        return res.status(200).json({ message: 'product founded', result });
    } catch (e) {
        res.status(500).json({ messag: "something went wrong" });
    }
}
 

module.exports = {
    createResturnat,
    fetchResturant,
    approveResturant,
    rejectResturant,
    fetchAllResturants,
    fetchResturantAllProduct,
    fetchAllApprovedResturant,
    resturantStatus,
    acceptOrder,
    loginResturant,
    verfiyResturant,
    register,
    fetchAllProduct,
    fetchAllResturantOrder,
    getAllResturant
}


