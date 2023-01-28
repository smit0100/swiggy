const Order = require('../module/OrderModel');
const Resturant = require('../module/ResturantModel');
const User = require('../module/UserModel');


const createOrder = async (req, res, next) => {
    try {
        const { products, customer, total, address ,resturant} = req.body;
        console.log(products,customer,total,address);
        const order = await new Order({ products, customer, total ,address,resturant}).save();

        //added in user
        const userUpdate = await User.findByIdAndUpdate(customer, { $push: { order: order._id } }, {
            new:true
        });

        //add in resturant
        const rest = Resturant.findByIdAndUpdate(resturant, {
            $push:{product:order._id}
        },{new:true})

        console.log(userUpdate);
         res.status(200).json({ message: "order created", order });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "something went wrong" });
    }
    


}


const fetchAllOrder = async (req, res, next) => {
    try {
        const response = await Order.find();
        return res.status(200).json({
            message: 'order founded',
            response
        })
    } catch (e) {
        res.status(500).json({message:"something went wrong"})
    }
}

module.exports = {
    createOrder,
    fetchAllOrder
}