const Resturant = require('../module/ResturantModel');
const Product = require('../module/ProductModel')
const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: "dvhmpngol",
    api_key: "813247467149162",
    api_secret: "hOjqIE5aRuOOQRSqRLss99GM_PE"
});
  


const createResturnat = async (req, res, next) => {
    // const {name,address,number,emailId}
    console.log(req.body);
    console.log(req.files);
    
    let bankImage = req.files.bank;
    let panImage = req.files.pan;

    result = await cloudinary.uploader.upload(bankImage.tempFilePath, {
        folder:'ownerDetails'   
    })

    console.log(result);

    res.status(200).json({ message: "uploader",result });
    // const { name, address,count } = req.body;

    // const resturant = await new Resturant({ name, email,address,location }).save();

    // return res.status(200).json({
    //     message: "resturant created",
    //     resturant
    // })
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


