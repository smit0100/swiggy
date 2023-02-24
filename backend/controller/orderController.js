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
        const rest =  await Resturant.findByIdAndUpdate(resturant, {
            $push:{order:order._id}
        },{new:true})
        const response = await User.findByIdAndUpdate(customer, {
            "cart.products": [],
            "cart.total": 0,
            $unset:{"cart.resturant":""}
          })
         res.status(200).json({ message: "order created", order });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "something went wrong" });
    }
    


}

const fetchOneOrder = async (req, res, next) => {
    try {
        const { id } = req.query
       
        console.log(id);
        const order = await Order.findById(id);
        
        if (!order) return res.status(404).json({ message: 'order not found' });

        res.status(200).json({ message: 'order founded', order });
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

const fetchAllOrder = async (req, res, next) => {
    try {
        const response = await Order.find();
        console.log("==response===>>>",response);
        return res.status(200).json({
            message: 'order founded',
            response
        })
    } catch (e) {
        res.status(500).json({message:"something went wrong"})
    }
}

const fetchUserOrder = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const response = await User.findById(userId).populate({
            path: "order",
            model:"Order"
             
        }).populate({
            path: 'order',
            populate: [
                {
                    path: 'products.product',
                    model:'Product'
                }
            ]
        })
        



        
        
        console.log(response);

        res.status(200).json({ message: "feched all order", response });

    } catch (e) {
        console.log(e);
        res.status(501).json({ message: 'something went wrong' });
    }
    

}

module.exports = {
    createOrder,
    fetchAllOrder,
    fetchUserOrder,
    fetchOneOrder
}