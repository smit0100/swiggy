const Order = require('../module/OrderModel');
const Resturant = require('../module/ResturantModel');
const Review = require('../module/ReviewModel');
const UserModel = require('../module/UserModel');

const addReview = async (req, res) => {
    try {
       
        const { userId, userName, resturant, orderId, review, star } = req.body;

        let response = await new Review({ userId, userName, resturant, orderId, review, star }).save();

        const order = await Order.findByIdAndUpdate(orderId, { review: response._id });

       
        const resturantUpdate = await Resturant.findByIdAndUpdate(resturant, { $push: { review: response._id } }, {
            new:true
        });
        
        
        const numberOfRating = resturantUpdate.review.length;
        console.log(numberOfRating);
        
        let TotalRatingStar = 0
        await resturantUpdate.populate({
            path: 'review',
            model:"Review"
        })
        
        console.log(resturantUpdate.review);
       
        resturantUpdate.review.map(item => {
            console.log(item.star + "this is item star" );
            TotalRatingStar = TotalRatingStar + Number(item.star)
        })
        console.log(TotalRatingStar)
        resturantUpdate.rating = (TotalRatingStar / numberOfRating).toFixed(1);

        resturantUpdate.save();

        console.log(orderId);
        const data = await Order.findByIdAndUpdate(orderId,{
            "isreviewGiven.forResturant":true 
            
        },{
            new:true
        })

        await data.save();
        console.log(data);
        return res.status(200).json({ message: 'review added', data });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'something went wrong' });
    }
}




module.exports = {
    addReview
}