const Order = require('../module/OrderModel');
const ProductModel = require('../module/ProductModel');
const Review = require('../module/ReviewModel');
const addRating = async (req, res, nextt) => {
    try {
        const { userId, userName, orderId, product, review, star } = req.body;

        const result = await new Review({ userId, userName, orderId, product, review, star }).save();

        await Order.findByIdAndUpdate(orderId, {review: result._id});

        const productDetails = await ProductModel.findByIdAndUpdate(product, {
            $push: { review: result._id },
            $inc: { noOfReview: 1 }
        }, { new:true})

        res.satus(200).json({ message: 'review added',result });
    } catch (e) {
        res.status(500).json({ message: "somehing went wrong" });
    }
    

}

module.exports = {
    addRating
}