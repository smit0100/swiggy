const Resturant = require('../module/ResturantModel');
const Product = require('../module/ProductModel')
const createResturnat = async (req, res, next) => {
    const { name, email,address, location } = req.body;

    const resturant = await new Resturant({ name, email,address,location }).save();

    return res.status(200).json({
        message: "resturant created",
        resturant
    })
}

const fetchResturant = async (req, res, next) => {
    const { id } = req.params;
    const response = await Resturant.findById(id);

    if (!response) return res.status(400).json({ message: 'resturant not founded' });

    return res.status(200).json({message:"resturant founded",response})
}

const activeResturant = async (req, res, next) => {
    const { id } = req.params;
    const response = await Resturant.findByIdAndUpdate(id, { isApproved: true });

    return res.status(200).json({ message: 'resturant is active' });
}
const fetchAllResturants = async (req, res, next) => {
    const response = await Resturant.find({});
  console.log(response);
    if (!response) return res.status(400).json({ message: 'resturant not founded' });

    return res.status(200).json({message:"resturants founded",response})
}

const fetchResturantAllProduct = async (req, res, next) => {
    const { id } = req.query;
    console.log(id);
    const resturant = await Resturant.findById(id);

    if (!resturant) return res.status(404).json({ message: "resturant not exist" });

     const product = await Product.find({resturnat:id})

 
    
    res.status(200).json({message:'product finded',product,resturant})
    
    
}

 

module.exports = {
    createResturnat,
    fetchResturant,
    activeResturant,
    fetchAllResturants,
    fetchResturantAllProduct
}

