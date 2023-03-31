const Resturant = require("../module/ResturantModel");
const Product = require("../module/ProductModel");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const Order = require("../module/OrderModel");
const DeliveryBoy = require("../module/DeliveryBoyModel");
const bcrypt = require("bcrypt");
const Token = require("../module/TokenModel");
const sendEmail = require("../utils/sendEmail");
const User = require("../module/UserModel");
const { sendNotification } = require("../utils/PushNotification");


const createResturnat = async (req, res, next) => {
  let {
    address,
    name,
    ownerName,
    number,
    panCard,
    outLetType,
    bankDetails,
    id,
    category,
  } = req.body;
  console.log(req.body);
  // console.log(typeof(outLetType));
  address = JSON.parse(address);
  panCard = JSON.parse(panCard);
  bankDetails = JSON.parse(bankDetails);

  console.log(typeof panCard);

  let bankImage = req.files.bank;
  let panImage = req.files.pancard;
  let { bg1, bg2, bg3 } = req.files;
  console.log(req.files.bank);
  try {
    const result = await cloudinary.uploader.upload(bankImage.tempFilePath, {
      folder: "ownerDetails",
      crop: "fill",
      width: 250,
      height: 250,
    });
    panUrl = await cloudinary.uploader.upload(panImage.tempFilePath, {
      folder: "ownerDetails",
      crop: "fill",
      width: 250,
      height: 250,
    });

    const bgimageUrl = [];
    let { url } = await cloudinary.uploader.upload(bg1.tempFilePath, {
      folder: "Resturant",
      crop: "fill",
      width: 250,
      height: 250,
    });

    bgimageUrl.push(url);
    const { url: url2 } = await cloudinary.uploader.upload(bg2.tempFilePath, {
      folder: "Resturant",
      crop: "fill",
      width: 250,
      height: 250,
    });
    bgimageUrl.push(url2);

    let { url: url3 } = await cloudinary.uploader.upload(bg3.tempFilePath, {
      folder: "Resturant",
      crop: "fill",
      width: 250,
      height: 250,
    });
    bgimageUrl.push(url3);

    console.log("this is ");
    console.log(bgimageUrl);

    console.log(outLetType);
    const response = await Resturant.findByIdAndUpdate(
      id,
      {
        name,
        ownerName,
        address,
        panCard,
        bankDetails,
        number,
        outLetType,
        pancardURL: panUrl.url,
        bankURL: result.url,
        bgImageUrl: bgimageUrl,
        panCard,
        isApproved: "pending",
        category,
      },
      {
        new: true,
      }
    );

    console.log(response);
    console.log(response);

    return res.status(200).json({ message: "resturant created", response });
  } catch (e) {
    console.log(e);
  }

  res.status(200).json({ message: "uploader" });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, number, fcmToken } = req.body;

    const emailExist = await Resturant.find({ email });

    console.log(emailExist);
    if (emailExist.length !== 0)
      return res.status(400).json({ messag: "email already exist" });
    const saltGen = await bcrypt.genSalt(10);
    const encryptedPass = await bcrypt.hash(password, saltGen);

    const restuarnt = await new Resturant({
      name,
      email,
      number,
      password: encryptedPass,
      fcmToken,
    }).save();

    const otpNumber = Math.floor(100000 + Math.random() * 900000);
    const token = await new Token({
      userID: restuarnt._id,
      token: otpNumber,
    }).save();

    await sendEmail(restuarnt.email, "Verify Email", String(otpNumber));
    res.status(200).json({ messag: "otp sent", restuarnt });
  } catch (e) {
    console.log(e);
    res.status(400).json({ messag: "something went wrng" });
  }
};

const verfiyResturant = async (req, res, next) => {
  try {
    let rest = await Resturant.findOne({ _id: req.body.id });

    if (!rest) return res.status(404).json({ message: "user not found" });

    const token = await Token.findOne({
      userID: req.body.id,
      token: req.body.otp,
    });

    if (!token) return res.status(401).json({ message: "wrong otp" });

    await Resturant.updateOne({ _id: rest._id }, { registerVerfied: true });
    await token.remove();
    res.status(200).json({ messag: "resturant verfied", rest });
  } catch (e) {
    console.log(e);
    res.status(404).json({ messag: "something went wrog" });
  }
};

const loginResturant = async (req, res, next) => {
  try {
    console.log("hey===", req.body);
    const { email, password, fcmToken } = req.body;
    const rest = await Resturant.findOneAndUpdate(
      { email },
      { fcmToken },
      { new: true }
    );

    if (!rest)
      return res.status(400).json({ messag: "resturant not registered" });

    if (!rest.registerVerfied)
      return res
        .status(401)
        .json({ messag: "please verify your user account" });

    const pass = await bcrypt.compareSync(password, rest.password);

    if (pass) {
      return res.status(200).json({ message: "restuarnt founded", rest });
    } else {
      return res
        .status(402)
        .json({ message: "please check your email and password" });
    }
  } catch (e) {
    res.status(404).json({ messag: "something wnet wrong" });
  }
};

const fetchResturant = async (req, res, next) => {
  const { id } = req.params;
  const response = await Resturant.findById(id);

  if (!response)
    return res.status(400).json({ message: "resturant not founded" });

  return res.status(200).json({ message: "resturant founded", response });
};

const approveResturant = async (req, res, next) => {
  const { id } = req.params;
  const response = await Resturant.findByIdAndUpdate(
    id,
    { isApproved: "Accepted" },
    { new: true }
  );

  return res.status(200).json({ message: "resturant is active", response });
};
const rejectResturant = async (req, res, next) => {
  const { id } = req.params;
  const response = await Resturant.findByIdAndUpdate(
    id,
    { isApproved: "Rejected" },
    {
      new: true,
    }
  );

  return res.status(200).json({ message: "resturant is rejected", response });
};
const fetchAllResturants = async (req, res, next) => {
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
    const totalCount = await Resturant.countDocuments();
    // calculate the number of pages

    const totalPages = Math.ceil(totalCount / pageSize);

    // retrieve the blog posts based on the page number and page size
    const blogPosts = await Resturant.find({ isApproved: "Accepted" })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    // return the  results

    res.status(200).json({
      page: pageNumber,
      totalPages: totalPages,
      pageSize: pageSize,
      totalCount: totalCount,
      results: blogPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllResturant = async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const totalCount = await Resturant.countDocuments();
    // calculate the number of pages

    const totalPages = Math.ceil(totalCount / pageSize);

    // retrieve the blog posts based on the page number and page size
    const response = await Resturant.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    console.log(response);
    res.status(200).json({
      messag: "resturnat fetched",
      results: response,
      page: pageNumber,
      totalPages: totalPages,
      pageSize: pageSize,
      totalCount: totalCount,
    });
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};

const resturantStatus = async (req, res, next) => {
  try {
    const { id } = req.query;

    const result = await Resturant.findById(id);
    console.log(result);
    if (result.isApproved === "isApproved")
      return res.status(200).json({ messag: "resturant approved", result });
    else
      return res.status(201).json({ messag: "restuant not approved", result });
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};

const fetchResturantAllProduct = async (req, res, next) => {
  const { id } = req.query;
  const ObjectID = require("mongodb").ObjectID;
  let categories = req.query.categories || [];

  const resturant = await Resturant.findById(id);

  if (!resturant)
    return res.status(404).json({ message: "resturant not exist" });

  let product;
  if (categories.length === 0) {
    product = await Product.find({ resturnat: id ,isActive:{$ne:false}}).populate('category');
  } else {
    categories = categories
      .split(",")
      .map((id) => mongoose.Types.ObjectId(id.trim()));

    product = await Product.find({
      resturnat: id,
      category: { $in: categories },
      isActive:{$ne:false}
    }).populate('category');
  }
  res.status(200).json({ message: "product finded", product, resturant });
};

const fetchAllApprovedResturant = async (req, res, next) => {
  try {
    const data = await Resturant.find({ isApproved: "Accepted" });
    console.log(data);
    res.status(200).json({ message: "fetched all active resturant", data });
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};

const fetchAllResturantOrder = async (req, res, next) => {
  try {
    const { id } = req.query;
    // const order = await Resturant.findById(id, { order: 1 }).populate('order');

    const order = await Order.find({ resturant: id }).populate([
      {
        path: "products.product",
        model: "Product",
      },
      {
        path: "customer",
        module: "User",
      },
      {
        path: "resturant",
        module: "Resturant",
      },
    ]);

    if (!order)
      return res.status(400).json({ messag: "order not found", order });
    console.log(order);
    res.status(200).json({ messag: "order fetched", order });
  } catch (e) {
    console.log(e);
    res.status(404).json({ messag: "something went wrong" });
  }
};

const acceptOrder = async (req, res, next) => {
  try {
    const { id, orderId } = req.query;

    const response = await Order.findByIdAndUpdate(
      orderId,
      { status: "accept" },
      {
        new: true,
      }
    );

    res.status(200).json({ messag: "order accepted", response });
  } catch (e) {
    res.status(400).json({ messag: "something went wrong" });
  }
};

const fetchAllProduct = async (req, res, next) => {
  try {
    const { id } = req.query;
    // const result = await Resturant.findById(id).populate([
    //   {
    //     path: "product",
    //     module: "Product",
    //     matchAll:{isActive:{$ne:false}}
    //   },
    //   {
    //     path: "product",
    //     populate: {
    //       path: "category",
    //       module: "Category"
       
    //     },
    //   },
    // ]).exec();
    const result = await Product.find({resturnat:id,isActive:{$ne:false}}).populate('category')
    console.log('checkt his');
    console.log(result);
    return res.status(200).json({ message: "product founded", result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ messag: "something went wrong" });
  }
};

const rejectedResturant = async (req, res) => {
  try {
    const result = await Resturant.find({ isApproved: "Rejected" });
    res.status(200).json({ messag: "finded", result });
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};
const getDashboardCount = async (req, res) => {
  try {
    const resCount = await Resturant.countDocuments();
    const DeliveryCount = await DeliveryBoy.countDocuments();
    const userCount = await User.countDocuments();
    const order = await Order.find({ status: "delivered" });
    let totalSales = 0;
    for (let index = 0; index < order.length; index++) {
      const element = order[index];
      totalSales += element?.total;
    }
    res.status(200).json({
      message: "finded counts",
      resCount,
      DeliveryCount,
      userCount,
      totalSales,
    });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const forgotPasswordForSentEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const rest = await Resturant.findOne({ email });

    console.log(rest);

    if (rest === null) {
      return res.status(205).json({ message: "resturant not exist" });
    } else {
      const otpNumber = Math.floor(100000 + Math.random() * 900000);

      const token = await new Token({
        userID: rest._id,
        token: otpNumber,
      }).save();

      await sendEmail(rest.email, "verify email", String(otpNumber));

      res.status(200).json({ messag: "otop sent", rest });
    }
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const forgotPasswordForSetNewPassword = async (req, res, next) => {
  try {
    const { id, newPassword } = req.body;
    let user = await Resturant.findById(id);

    if (!user)
      return res.status(404).send({
        messag: "user not found",
      });

    const token = await Token.findOne({
      userID: req.body.id,
      token: req.body.otp,
    });

    console.log(token);

    if (!token) {
      return res.status(205).json({ messag: "wrong otp" });
    } else {
      await token.remove();
      const saltGen = await bcrypt.genSalt(10);
      const encryptedPass = await bcrypt.hash(newPassword, saltGen);
      await Resturant.findByIdAndUpdate(id, {
        password: encryptedPass,
      });

      res.status(200).json({ messag: "password changes" });
    }
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};

const getAllReview = async (req, res) => {
  try {
    const { id } = req.query;
    const review = await Resturant.findById(id, { review: 1 }).populate(
      "review"
    );
    console.log(review);
    return res.status(200).json({ message: "fetched all review", review });
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};
const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log("====id",id);
    const data = await Resturant.findByIdAndDelete(id);

    if (!data) return res.status(400).json({ message: "Resturant not founded" });

    res.status(200).json({ message: "Resturant deleted" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};


const searchProduct = async (req, res, next) => {
  const searchQuery = req.query.q;
  const regex = new RegExp(searchQuery, 'i');

  const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    console.log(req.query)
  
    try {
        const totalCount = await Product.find({name: regex,resturnat:req.query.id }).countDocuments();
    
        const totalPages = Math.ceil(totalCount / pageSize);        
  
        const response = await Product.find({ name: regex,resturnat:req.query.id  }).skip((pageNumber - 1) * pageSize).limit(pageSize);
            console.log(response)
        return res.status(200).json({ message: 'product founded', response ,  totalPages: totalPages,
        pageSize: pageSize,
        totalCount: totalCount});    
    } catch (e) {
        res.status(400).json({ message: 'something went wrong' });
    }
}


const updateProfile = async (req,res,next) => {
  try {
    const {id,name,number,email} = req.body;
    let user = await Resturant.findById(id);
    console.log(user);
    if (user.email === email) {
      user = await Resturant.findByIdAndUpdate(id,{
        ownerName:name,
        number
      },{
        new:true
      })

      return res.status(200).json({message:"updated",user})
    } else {
      const emailExist = await Resturant.find({email});
      if (emailExist.length != 0) {
        return res.status(409).json({messag:'email id already exist'})
      }else {
        const otpNumber = Math.floor(100000 + Math.random() * 900000);
        const token = await new Token({
          userID: id, 
          token: otpNumber,
        }).save();
       
        const url = otpNumber;
        console.log("this is url", url);
        res.status(201).json({
          message: "otp sent",
          user,
          newDetails: { name, number, email },
        });
      }
    }
  } catch (e) {
    res.status(500).json({message:"something went wrong"});
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
  getAllResturant,
  rejectedResturant,
  getDashboardCount,
  forgotPasswordForSetNewPassword,
  forgotPasswordForSentEmail,
  getAllReview,
  deleteRestaurant,
  searchProduct,
  updateProfile
};
