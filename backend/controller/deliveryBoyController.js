const bcrypt = require("bcrypt");
const Token = require("../module/TokenModel");
const sendEmail = require("../utils/sendEmail");
const Order = require("../module/OrderModel");
const DeliveryBoy = require("../module/DeliveryBoyModel");
const User = require("../module/UserModel");
const Courier = require("../module/DeliveryBoyModel");
const { sendNotification } = require("../utils/PushNotification");
const TokenModel = require("../module/TokenModel");
const Review = require('../module/ReviewModel');

const register = async (req, res, next) => {
  try {
    const { name, email, number, password, fcmToken } = req.body;

    const isExist = await DeliveryBoy.findOne({ email });

    if (isExist)
      return res.status(402).json({ message: "this eamil id already exist" });

    const saltGen = await bcrypt.genSalt(10);
    const encryptedPass = await bcrypt.hash(password, saltGen);

    const user = await new DeliveryBoy({
      name,
      email,
      number,
      password: encryptedPass,
      fcmToken,
    }).save();
    const otpNumber = Math.floor(100000 + Math.random() * 900000);

    const token = await new Token({
      userID: user._id,
      token: otpNumber,
    }).save();

    await sendEmail(user.email, "Vefiy Email", String(otpNumber));
    res.status(200).json({ message: "otp sent", user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
};

const verify = async (req, res, next) => {
  try {
    const { id, otp } = req.body;
    const user = await DeliveryBoy.findOne({ _id: req.body.id });

    if (!user) return res.status(404).json({ message: "user not found" });
    const token = await Token.findOne({
      userID: id,
      token: otp,
    });
    console.log("==token", token);
    if (!token) return res.status(401).json({ message: "otp wrong" });
    console.log("=====calledddd");
    user.isVerified = true;
    await user.save();
    await token.remove();
    // const admin = User.findOne({ type: "admin" });
    // if (admin?.fcmToken != "") {
    //   let data = {
    //     title: "👋 Request!",
    //     body: "A new delivery boy joined us.",
    //   };
    //   sendNotification(admin?.fcmToken, data);
    // }
    res.status(200).json({ message: "user veruified", user });
  } catch (e) {
    res.status(500).json({ message: "somehting went wrong" });
  }
};

const login = async (req, res, next) => {
  try {
    console.log("hey");
    console.log(req.body);
    const { email, password, fcmToken } = req.body;
    let user = await DeliveryBoy.findOne(
      { email }
    );
    console.log(user);
    if (!user) return res.status(400).json({ message: "user not exist" });
    console.log(user);

    // if (!user.isVerified) return res.status(401).json({ message: 'please verify your account' })
    console.log(user.email);
    const pass = await bcrypt.compareSync(password, user.password);
    console.log(pass);
    if (pass) {
      if (user?.fcmToken === undefined || user?.fcmToken !== fcmToken) {
        // If the user doesn't have an fcmToken, or if it's different from the new one,
        // update it with the new value
        user.fcmToken = fcmToken;
        await user.save();
      }
      return res.status(200).json({ message: "user founded", user });
    } else {
      return res
        .status(402)
        .json({ message: "please check your email and password" });
    }
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const fetchAll = async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(id);
    const courierBoy = await DeliveryBoy.findById(id).populate([
      {
        path: "order",
        module: "Order",
      },
      {
        path: "order",
        populate: {
          path: "customer",
          module: "User",
        },
      },
    ]);
    res.status(200).json({ message: "courier boy founded", courierBoy });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const accept = async (req, res, next) => {
  try {
    const { id } = req.query;
    const courierBoy = await DeliveryBoy.findByIdAndUpdate(id, {
      isApproved: "approved",
    });
    res.status(200).json({ message: "courier boy approved", courierBoy });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const fetchAllAccepted = async (req, res) => {
  try {
    const response = await DeliveryBoy.find({ isApproved: "approved" });
    res.status(200).json({ message: "fetch all accepted", response });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const fetchAllRejected = async (req, res) => {
  try {
    const response = await DeliveryBoy.find({ isApproved: "rejected" });
    res.status(200).json({ message: "fetch all rejected", response });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const fetchPending = async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const { extraField } = req.query;
  try {
    const totalCount = await DeliveryBoy.countDocuments();
    const totalAccepted = await DeliveryBoy.find({
      isApproved: "approved",
    }).countDocuments();
    const totalRejected = await DeliveryBoy.find({
      isApproved: "rejected",
    }).countDocuments();
    let response;
    if (extraField != "") {
      response = await DeliveryBoy.find({ isApproved: extraField })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
    } else {
      response = await DeliveryBoy.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
    }
    res.status(200).json({
      message: "delivery booy fetched",
      response,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      totalAccepted,
      totalRejected,
    });
  } catch (e) {
    res.status(500).json({ message: "somethign went wrong" });
  }
};

const reject = async (req, res, next) => {
  try {
    const { id } = req.query;
    const courierBoy = await DeliveryBoy.findByIdAndUpdate(id, {
      isApproved: "rejected",
    });
    res.status(200).json({ message: "courier boy reject", courierBoy });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const receiveFoodFromResturant = async (req, res, next) => {
  try {
    const { id, otp, userfcmToken } = req.body;
    const order = await Order.findOne({ _id: id, courierBoyotpNumber: otp });
    if (!order) {
      return res.status(209).json({ message: "please check ones otp" });
    } else {
      order.status = "on the way";
      await order.save();
      if (userfcmToken != "") {
        let data = {
          title: "👋 Hurray!",
          body: "Delivery boy picked your order from restaurant",
        };
        sendNotification(userfcmToken, data);
      }
      return res.status(200).json({ message: "order on the way", order });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
};

const deliverFoodForCustomer = async (req, res, next) => {
  try {
    const { id, otp, ownerfcmToken, deleveryBoyId } = req.body;

    const order = await Order.findOne({ _id: id, customerOtpNumber: otp });
    let courierBoys = await Courier.findOne({ _id: deleveryBoyId });
    if (!order) {
      return res.status(209).json({ message: "please check ones otp" });
    } else {
      courierBoys.isAvilable = true;
      order.status = "delivered";
      await order.save();
      await courierBoys.save();
      if (ownerfcmToken != "") {
        let data = {
          title: "👋 Hurray!",
          body: "Your order delivered successfully 🍟",
        };
        sendNotification(ownerfcmToken, data);
      }
      return res.status(200).json({ message: "order delivered", order });
    }
  } catch (e) {
    res.status(500).json({ message: "something went wronng" });
  }
};

const allOrder = async (req, res, next) => {
  try {
    const { id } = req.query;

    const response = await DeliveryBoy.findById(id).populate("order");
    res.status(200).json({ message: "all order fetcehd", response });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};
const deleteDeliveryBoy = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const data = await DeliveryBoy.findByIdAndDelete(userId);

    if (!data)
      return res.status(400).json({ messag: "DeliveryBoy not founded" });

    res.status(200).json({ messag: "DeliveryBoy deleted" });
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};
const addReview = async (req, res, next) => {
  try {
    console.log(req.body);
    const { deliveryboyId, user, description, star, orderId, fcmToken } =
      req.body;
    // console.log(req.body)
    const review = await new Review({
      userId: user,
      orderId,
      review: description,
      star,
      deliveryBoyId: deliveryboyId,
      itsFor: 'Delivery'
    }).save();

    // console.log(review);
    
    let response = await DeliveryBoy.findByIdAndUpdate(
      deliveryboyId,
      {
        $push: {review:review._id}
      },
      {
        new: true,
      }
    ).populate('review');
    console.log('its id');
    console.log(review._id);
    const order = await Order.findByIdAndUpdate(orderId, {
      deliveryBoyReview: review._id,
      
      
    }, {
      new:true
    }).populate('deliveryBoyReview')
    console.log(order);
    let ratingCount = 0;

    response.review.map((item) => {
      ratingCount += Number(item.star);
    });

    response.averageRating = (
      ratingCount / Number(response.review.length)
    ).toFixed(1);
    response = await Order.findByIdAndUpdate(
      orderId,
      { "isreviewGiven.forDeliveryBoy": true },
      {
        new: true,
      }
    );

    await response.save();
    console.log(response);
    if (fcmToken != "") {
      let payload = {
        title: "👋 Review!",
        body: `A customer give ${star} ⭐ to you.🔥`,
      };
      sendNotification(fcmToken, payload);
    }
    console.log(response);
    res.status(200).json({ message: "review added", response });

  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "something went wrong" });
  }
};

const forgotPasswordForSentEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await DeliveryBoy.findOne({ email });
    console.log(user);
    if (user === null) {
      console.log("this is ru");
      return res.status(205).json({ message: "user not exist" });
    } else {
      const otpNumber = Math.floor(100000 + Math.random() * 900000);

      const token = await new Token({
        userID: user._id,
        token: otpNumber,
      }).save();

      await sendEmail(user.email, "verify email", String(otpNumber));

      res.status(200).json({ messag: "otop sent", user });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ messag: "somthing went wrong" });
  }
};

const forgotPasswordForSetNewPassword = async (req, res, next) => {
  try {
    const { id, newPassword } = req.body;
    let user = await DeliveryBoy.findById(id);

    console.log("its user",user);
    if (!user)
      return res.status(404).send({
        messag: "user not found",
      });

    const token = await TokenModel.findOne({
      userID: req.body.id,
      token: req.body.otp,
    });

    console.log("its token",token);

    if (!token) {
      return res.status(205).json({ messag: "wrong otp" });
    } else {
      await token.remove();
      const saltGen = await bcrypt.genSalt(10);
      const encryptedPass = await bcrypt.hash(newPassword, saltGen);
      console.log(encryptedPass);
      await DeliveryBoy.findByIdAndUpdate(id, {
        password: encryptedPass,
      });

      res.status(200).json({ messag: "password changes" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ messag: "something went wrong" });
  }
};

const editDeliveryBoy = async (req, res, next) => {
  try {
    const { _id, names, descr, checked, number } = req.body;
    console.log("====req", req.body);
    const response = await DeliveryBoy.findOneAndUpdate(
      {
        _id,
      },
      {
        name: names,
        isApproved: checked,
        email: descr,
        number,
      },
      {
        new: true,
      }
    );
    res.status(201).json({ message: "edited delivery boy", response });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { userId, oldPass, newPass } = req.body;
    const user = await DeliveryBoy.findById(userId);
    const pass = await bcrypt.compareSync(oldPass, user.password)
    console.log(req.body);
    if (!pass) {
      return res.status(401).json({ messag: "your password is incorrect" })
    } else {
      const encryptedPass = await bcrypt.hash(newPass, 10);
      await user.updateOne({ password: encryptedPass });
      return res.status(200).json({ messag: "user password updated" });
    }
  } catch (e) {
    res.status(500).json({ messag: 'something went wrong' });
  }
}

const makeAnAvilable = async (req, res) => {
  try {
    const { id } = req.query;

    const response = await DeliveryBoy.findByIdAndUpdate(id, {
      isAvilable:false
    })
    res.status(200).json({ messag: 'status chage', response });
  } catch (e) {
    res.status(500).json({ messag: 'something went wrong' });
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
  addReview,
  deleteDeliveryBoy,
  forgotPasswordForSetNewPassword,
  forgotPasswordForSentEmail,
  editDeliveryBoy,
  changePassword,
  makeAnAvilable
};
