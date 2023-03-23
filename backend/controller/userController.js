const User = require("../module/UserModel");
const Token = require("../module/TokenModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { log } = require("console");
const jwt = require("jsonwebtoken");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./localStorage");

require("dotenv").config();

const { sign } = require("jsonwebtoken");
const { sendNotification } = require("../utils/PushNotification");

const createUser = async (req, res, next) => {
  const { name, email, number, password, fcmToken } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist)
    return res.status(409).json({ message: "email id already exist" });
  const saltGen = await bcrypt.genSalt(10);
  console.log(saltGen);
  // res.send(saltGen)
  const encryptedPass = await bcrypt.hash(password, saltGen);
  // const encryptedPass = await bcrypt.hash(password, 10);
  console.log("this is encrypted");
  console.log(encryptedPass);
  const user = await new User({
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

  const url = otpNumber;
  console.log("this is url", url);
  await sendEmail(user.email, "Verify Email", String(url));

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
};

const verifyUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.body.id });
    console.log(user + "this data");
    if (!user) return res.status(404).send({ message: "user not found" });

    const token = await Token.findOne({
      userID: req.body.id,
      token: req.body.otp,
    });

    if (!token) return res.status(401).json({ message: "wrong otp" });

    await User.updateOne({ _id: user._id }, { verified: true });
    console.log("hello hello");
    console.log(req.body);
    if (req.body.newAddress) {
      const { name, email, number } = req.body.newAddress;
      console.log(name, email, number);
      user = await User.findByIdAndUpdate(
        user._id,
        { name, email, number },
        {
          new: true,
        }
      );
      console.log(user);
    }
    await token.remove();
    res.status(200).json({ message: "user verifed", user });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "internal server error",
    });
  }
};

const fetchAllUser = async (req, res, next) => {
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const totalCount = await User.countDocuments();
    // calculate the number of pages

    const totalPages = Math.ceil(totalCount / pageSize);

    // retrieve the blog posts based on the page number and page size
    const response = await User.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    // return the paginated results
    res.status(200).json({
      messag: "user fectehd",
      page: pageNumber,
      totalPages: totalPages,
      pageSize: pageSize,
      totalCount: totalCount,
      data: response,
    });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const updateUserType = async (req, res, next) => {
  try {
    const { userId, userType } = req.body;
    const data = await User.findByIdAndUpdate(
      userId,
      {
        type: userType,
      },
      {
        new: true,
      }
    );
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};

const fetchOnlyOneUser = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const data = await User.findById(userId, {
      password: -1,
      name: 1,
      email: 1,
      number: 1,
      order: 1,
      type: 1,
      address: 1,
    });
    if (!data) return res.status(400).json({ messag: "user not founded" });

    res.status(200).json({ messag: "user founded", data });
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password, fcmToken,coordinates } = req.body;
  let user = await User.findOneAndUpdate(
    { email },
    { fcmToken,      
      latitude: coordinates?.latitude,
      longitude: coordinates?.longitude,
    },
    { new: true }
  );

  // user not exist

  if (!user) return res.status(400).json({ message: "user not exist" });
  console.log(password);
  console.log(user.password);

  //userr not verified
  if (!user.verified)
    return res.status(401).json({ message: "please verify you user account" });

  const pass = await bcrypt.compareSync(password, user.password);

  if (pass) {
    const token = jwt.sign({ id: user._id }, "jwtsecret");
    res.cookie("token", token);
    req.session.isLoggedIn = true;

    return res.status(200).json({ message: "user founded", user, token });
  } else {
    return res
      .status(402)
      .json({ message: "please check your email and password" });
  }
};

const addAdddress = async (req, res, next) => {
  try {
    const { userId, area, city, state, pincode } = req.body;

    const response = await User.findByIdAndUpdate(
      userId,
      { $push: { address: { area, city, state, pincode } } },
      {
        new: true,
      }
    );
    console.log(response);
    res.status(200).json({ message: "address added", response });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const fetchAllAddress = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await User.findById(id, { address: 1, password: -1 });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const deleteUserAddress = async (req, res, next) => {
  try {
    const { userId, itemId } = req.query;
    const response = await User.findByIdAndUpdate(
      userId,
      { $pull: { address: { _id: itemId } } },
      {
        new: true,
      }
    );

    if (response) {
      return res.status(200).json({
        message: "deleted",
        response,
      });
    } else {
      return res.status(400).json({
        message: "messing details    ",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
};

const updateAddress = async (req, res, next) => {
  const { userId, name, number, email } = req.body;

  let user = await User.findById(userId);
  if (user.email === email) {
    user = await User.findByIdAndUpdate(
      userId,
      { name, number },
      {
        new: true,
      }
    );

    return res.status(200).json({ message: "updated", user });
  } else {
    const emailExist = await User.find({ email });
    console.log(emailExist);
    if (emailExist.length != 0)
      return res.status(409).json({ message: "email id already exist" });
    else {
      const otpNumber = Math.floor(100000 + Math.random() * 900000);
      const token = await new Token({
        userID: userId,
        token: otpNumber,
      }).save();

      const url = otpNumber;
      console.log("this is url", url);
      await sendEmail(email, "Verify Email", String(url));

      res.status(201).json({
        message: "otp sent",
        user,
        newDetails: { name, number, email },
      });
    }
  }
};

const changePassword = async (req, res, next) => {
  const { userId, oldPass, newPass } = req.body;
  console.log(userId);
  let user = await User.findById(userId);
  console.log(user);
  console.log(oldPass);
  const pass = await bcrypt.compareSync(oldPass, user.password);
  console.log(pass);
  if (!pass) {
    return res.status(401).json({
      message: "Your password is incorrect",
    });
  } else {
    const encryptedPass = await bcrypt.hash(newPass, 10);
    await user.updateOne({ password: encryptedPass });
    return res.status(200).json({ messag: "user password updated" });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const data = await User.findByIdAndDelete(userId);

    if (!data) return res.status(400).json({ messag: "user not founded" });

    res.status(200).json({ messag: "user deleted" });
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};

const editAddress = async (req, res, next) => {
  try {
    const { userId, itemId, area, city, state, pincode } = req.body;
    console.log(req.body);
    // const response = await User.findOneAndUpdate({_id:userId,address:{$in:{_id:itemId}}}, {
    //     new:true
    // });

    const result = await User.findOne({
      _id: userId,
      address: { $elemMatch: { _id: itemId } },
    });
    console.log(result);

    const response = await User.findOneAndUpdate(
      {
        _id: userId,
        address: { $elemMatch: { _id: itemId } },
      },
      {
        "address.$": { area: area, city: city, state: state, pincode: pincode },
      },
      {
        new: true,
      }
    );

    console.log("check this response");
    console.log(response);
    res.status(201).json({ messag: "edited address", response });
  } catch (e) {
    console.log(e);
    res.status(500).json({ messag: "something went wrong" });
  }
};

const forgotPasswordForSentEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
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
    let user = await User.findById(id);

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
      await User.findByIdAndUpdate(id, {
        password: encryptedPass,
      });

      res.status(200).json({ messag: "password changes" });
    }
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};

const isExist = async (req, res) => {
  try {
    const access_token = req.cookies.access_token;
    if (access_token) {
      jwt.verify(access_token, "jwtsecret", async (err, data) => {
        if (err) {
          console.log(err + "this is error");
          res.sendStatus(403);
        } else {
          let user = await User.findById(data.id);
          console.log(user);
          return res.status(200).json({ message: "user founded", user });
        }
      });
    } else {
      res.sendStatus(403);
    }
  } catch (e) {
    resaccess_tokenstatus(500).json({ messag: "something went wrong" });
  }

  // try {
  //     // const token = req.cookies.token;
  //     const user = req.session.user;

  // console.log(token + "check this token");
  // console.log(user);

  // console.log(JSON.stringify(req.cookies));
  // console.log(JSON.stringify(req.session));

  //     if ( !user) {

  //         res.sendStatus(403)

  //     } else {

  //     }
  // } catch (e) {
  //     console.log(e);
  //     res.status(500).json({ messag: 'something went wrong' });
  // }
};

const loginAsAdmin = async (req, res) => {
  try {
    const { email, password, fcmToken } = req.body;

    const response = await User.findOneAndUpdate(
      { email, type: "admin" },
      { fcmToken },
      { new: true }
    );

    if (!response) return res.status(400).json({ messag: "user not exist" });

    const pass = bcrypt.compareSync(password, response.password);

    if (pass) {
      localStorage.setItem("fcmTokenAdmin", fcmToken);

      return res.status(200).json({ messag: "user founded", response });
    } else {
      return res.status(300).json({ messag: "please check your crediential" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ messag: "something went wrong" });
  }
};

const makeAdmin = async (req, res) => {
  try {
    const { id } = req.query;

    const res = await User.findByIdAndUpdate(id, { type: "admin" });

    res.status(200).json({ messag: "updated", res });
  } catch (e) {
    res.status(500).json({ messag: "somehting went wrong" });
  }
};
const forgotAdminPassword = async (req, res) => {
  const { oldPass, newPass } = req.body;
  let user = await User.findOne({ type: "admin" });
  console.log("=====",req.body,user);
  const pass = await bcrypt.compareSync(oldPass, user.password);
  console.log(pass);
  if (!pass) {
    return res.status(401).json({
      errors: "Your password is incorrect",
    });
  } else {
    const encryptedPass = await bcrypt.hash(newPass, 10);
    await user.updateOne({ password: encryptedPass });
    return res.status(200).json({ messag: "Admin password updated" });
  }
};
const editUser = async (req, res, next) => {
  try {
    const { _id, names, descr, checked,number } = req.body;
    console.log("====req", req.body);
    const response = await User.findOneAndUpdate(
      {
        _id,
      },
      {
        name: names,
        type: checked == "customer" ? "customer" : "admin",
        email: descr,
        number:number
      },
      {
        new: true,
      }
    );
    res.status(201).json({ message: "edited User successfully", response });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
};

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
  deleteUser,
  editAddress,
  forgotPasswordForSentEmail,
  forgotPasswordForSetNewPassword,
  isExist,
  loginAsAdmin,
  makeAdmin,
  forgotAdminPassword,
  editUser
};
