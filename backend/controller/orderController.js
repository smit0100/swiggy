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


const fetchAllOrder = async (req, res, next) => {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10 ;
    try {
        const totalCount = await Order.countDocuments();
        // calculate the number of pages
        
        const totalPages = Math.ceil(totalCount / pageSize);
    
        // retrieve the blog posts based on the page number and page size
        const response = await Order.find()
          .skip((pageNumber - 1) * pageSize)
          .limit(pageSize);
        console.log("==response===>>>",response);
        // return the paginated results
        res.status(200).json({
            message: 'order founded',
            page: pageNumber,
            totalPages: totalPages,
            pageSize: pageSize,
            totalCount: totalCount,
            results: response
          });
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
    fetchUserOrder
}