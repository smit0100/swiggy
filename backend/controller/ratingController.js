const Order = require('../module/OrderModel');
const Resturant = require('../module/ResturantModel');
const Review = require('../module/ReviewModel')

const addReview = async (req, res) => {
    try {
        const { userId, userName, resturant, orderId, review, star } = req.body;

        const response = new Review({ userId, userName, resturant, orderId, review, star });

        const order = await Order.findByIdAndUpdate(orderId, { review: response._id });

        const resturantUpdate = await Resturant.findByIdAndUpdate(resturant, { $push: { review: response._id } }, {
            new:true
        }).populate('review');
        
        
        const numberOfRating = resturantUpdate.review.length + 1;

        const TotalRatingStar = 0

        resturantUpdate.review.map(item => {
            TotalRatingStar + item.star
        })

        resturantUpdate.rating = TotalRatingStar / numberOfRating;

        resturantUpdate.save();

        return res.status(200).json({ message: 'review added', response });
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }
}


module.exports = {
    addReview
}