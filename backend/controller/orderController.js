const Order = require("../module/OrderModel");
const Resturant = require("../module/ResturantModel");
const User = require("../module/UserModel");
const MongoClient = require("mongodb").MongoClient;
const Courier = require("../module/DeliveryBoyModel");
const sendEmail = require("../utils/sendEmail");
const { sendNotification } = require("../utils/PushNotification");
const { getNearestDeliveryBoy } = require("../utils/GetDeliveryBoy");
require("dotenv").config();
const uri = process.env.MONGOOSE_URL;

// const client = new MongoClient(uri);
// client.connect(err => {
//     const db = client.db("test");
//     const collection = db.collection("deliveryboys");
//     const changeStream = collection.watch();
//     changeStream.on("change", function(change) {
//       console.log("Delivery boy location updated:", change);
//     });
//   });

const createOrder = async (req, res, next) => {
  try {
    const { customer, total, address, resturant } = req.body;
    console.log(req.body);
    // console.log(products,customer,total,address);
    const user = await User.findById(customer);

    const order = await new Order({
      products: user.cart.products,
      customer,
      total,
      address,
      resturant,
    }).save();

    //added in user

    const userUpdate = await User.findByIdAndUpdate(
      customer,
      { $push: { order: order._id } },
      {
        new: true,
      }
    );

    //add in resturant
    const rest = await Resturant.findByIdAndUpdate(
      resturant,
      {
        $push: { order: order._id },
      },
      { new: true }
    );
    let datas = {
    title: "🔥Order",
    body: "🍟New order recieved..🍔",
    }
    sendNotification(rest?.fcmToken,datas)
    const response = await User.findByIdAndUpdate(customer, {
      "cart.products": [],
      "cart.total": 0,
      $unset: { "cart.resturant": "" },
    });
    res.status(200).json({ message: "order created", order });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
};

const fetchOneOrder = async (req, res, next) => {
  try {
    const { id } = req.query;

    console.log(id);
    const order = await Order.findById(id).populate([
      {
        path: "products.product",
        model: "Product",
      },
      {
        path: "resturant",
        model: "Resturant",
      },
      {
        path: "customer",
        model: "User",
      },
      {
        path: "deliveryBoy",
        module: "DeliverBoy",
      },
     {
        path:'review',
        module:"Review"
    }
    ]);

    if (!order) return res.status(404).json({ message: "order not found" });

    res.status(200).json({ message: "order founded", order });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
};

const fetchAllOrder = async (req, res, next) => {
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const totalCount = await Order.countDocuments();
    // calculate the number of pages

    const totalPages = Math.ceil(totalCount / pageSize);
    
    // retrieve the blog posts based on the page number and page size
    const response = await Order.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    // return the paginated results
    res.status(200).json({
      message: "order founded",
      page: pageNumber,
      totalPages: totalPages,
      pageSize: pageSize,
      totalCount: totalCount,
      results: response,
    });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const fetchUserOrder = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const response = await User.findById(userId)
      .populate({
        path: "order",
        model: "Order",
      })
      .populate({
        path: "order",
        populate: [
          {
            path: "products.product",
            model: "Product",
          },
          {
            path: "resturant",
            model: "Resturant",
          },
        ],
      });

    console.log(response);

    res.status(200).json({ message: "feched all order", response });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "something went wrong" });
  }
};

const fetchAllResturantOrder = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = await Order.find({ resturant: id }).populate([
      {
        path: "products.product",
        model: "Product",
      },
      {
        path: "customer",
        model: "User",
      },
      {
        path: "review",
        model: "Review",
      },
    ]);
    res.status(200).json({ message: "order fetched", data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
};

const acceptOrder = async (req, res, next) => {
  try {
    const { id } = req.query;
    let response = await Order.findByIdAndUpdate(
      id,
      {
        status: "accept",
      },
      {
        new: true,
      }
    ).populate([
      {
        path: "products.product",
        model: "Product",
      },
      {
        path: "resturant",
        model: "Resturant",
      },
      {
        path: "customer",
        model: "User",
      },
    ]);
    // const dataResponse = await Courier.find({ isAvilable: true });
    // let nearestDeliveryBoy
    // if (dataResponse) {
    //   const restaurantLocation = {
    //     latitude: response?.resturant?.latitude || 21.1910656,
    //     longitude: response?.resturant?.longitude || 72.8399872
    //   }
    //   nearestDeliveryBoy = getNearestDeliveryBoy(
    //     dataResponse,
    //     restaurantLocation
    //   );

    //   console.log("nearestDeliveryBoy", nearestDeliveryBoy);
    // }
    let courierBoys = await Courier.findOne({ isAvilable: true });
    courierBoys.isAvilable = false

    if (!courierBoys) {
      return res.status(205).json({ message: "courier boy is not avilable " });
    } else {
      courierBoys.order.push(id);
      await courierBoys.save();
      console.log(courierBoys);
      const otpNumberForResturant = Math.floor(100000 + Math.random() * 900000);
      const otpNUmberForCustomer = Math.floor(100000 + Math.random() * 900000);
      console.log(response.resturant.email);
      console.log(response.customer.email);
      response.courierBoyotpNumber = otpNumberForResturant;
      await sendEmail(
        response.resturant.email,
        "Otp Nuber",
        String(otpNumberForResturant)
      );
      await sendEmail(
        response.customer.email,
        "order otp",
        String(otpNUmberForCustomer)
      );
      response.customerOtpNumber = otpNUmberForCustomer;
      response.deliveryBoy = courierBoys._id;
      await response.populate({
        path: "deliveryBoy",
        module: "DeliverBoy",
      });
      await response.save();
      let datas = {
        title: "🔥New Order!",
        body: `🍟Pick up your order at ${response?.resturant?.name}🍔`,
      }
      console.log(courierBoys);
      // sendNotification(courierBoys?.fcmToken, datas)
      console.log(response);
      res.status(200).json({ message: "order status update", response });
    }
  } catch (e) {

    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = {
  createOrder,
  fetchAllOrder,
  fetchUserOrder,
  fetchOneOrder,
  fetchAllResturantOrder,
  acceptOrder,
};
