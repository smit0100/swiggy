const Resturant = require('../module/ResturantModel');
const Product = require('../module/ProductModel')
const cloudinary = require("cloudinary").v2;


 
  


const createResturnat = async (req, res, next) => {
   
    const { address, email, name,ownerName,number, outLetType } = req.body;

     
    let bankImage = req.files.bank;
    let panImage = req.files.pancard;
    let {bg1,bg2,bg3} = req.files
    console.log(req.files.bank);
    try {
       const result = await cloudinary.uploader.upload(bankImage.tempFilePath, {
           folder: 'ownerDetails',
           crop: 'fill',
            width: 250,
            height:250
        })    
        panUrl = await cloudinary.uploader.upload(panImage.tempFilePath,{
            folder: "ownerDetails",
            crop: 'fill',
            width: 250,
            height:250
        })
        
        
        const bgimageUrl = [];
        let {url} = await cloudinary.uploader.upload(bg1.tempFilePath, {
            folder: "Resturant",
            crop: 'fill',
            width: 250,
            height:250
        
        })

        bgimageUrl.push(url);
        const {url:url2} = await cloudinary.uploader.upload(bg2.tempFilePath, {
            folder: "Resturant",
            crop: 'fill',
            width: 250,
            height:250
        
         })
        bgimageUrl.push(url2);

        let {url:url3} = await cloudinary.uploader.upload(bg3.tempFilePath, {
            folder: "Resturant",
            crop: 'fill',
            width: 250,
            height:250
        
        })
        bgimageUrl.push(url3);

        console.log("this is ");
        console.log(bgimageUrl);
        

        const response = await new Resturant({ name,ownerName,address, email, number, outLetType,pancardURL: panUrl.url, bankURL: result.url,bgImageUrl:bgimageUrl }).save();

        console.log(response);

        return res.status(200).json({ message: 'resturant created' });

    } catch (e) {
        console.log(e);
    }
    

    

    res.status(200).json({ message: "uploader" });
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

const approveResturant = async (req, res, next) => {
    const { id } = req.params;
    const response = await Resturant.findByIdAndUpdate(id, { isApproved: true });

    return res.status(200).json({ message: 'resturant is active' });
}
const rejectResturant = async (req, res, next) => {
    const { id } = req.params;
    const response = await Resturant.findByIdAndUpdate(id, { isApproved: false });

    return res.status(200).json({ message: 'resturant is rejected' });
}
const fetchAllResturants = async (req, res, next) => {
    const response = await Resturant.find({});
  console.log(response);
    if (!response) return res.status(400).json({ message: 'resturant not founded' });

    return res.status(200).json({message:"resturants founded",response})
}

const fetchAllActiveResturant = async (req, res, next) => {
    try {
        const response = await Resturant.find({ isApproved: true });
        res.status(200).json({ messag: "all active resturant", response });
    } catch (e) {
        res.status(500).json({ messag: "something went wrong" });
    }
}

const fetchResturantAllProduct = async (req, res, next) => {
    const { id } = req.query;
    console.log(id);
    const resturant = await Resturant.findById(id);

    if (!resturant) return res.status(404).json({ message: "resturant not exist" });

     const product = await Product.find({resturnat:id})

 
    
    res.status(200).json({message:'product finded',product,resturant})
    
    
}

const fetchAllApprovedResturant = async (req, res, next) => {
    try {
        const data = await Resturant.find({ isApproved: "Accepted" });
        console.log(data);
        res.status(200).json({ message: "fetched all active resturant", data });
    } catch (e) {
        res.status(500).json({ messag: "something went wrong" });
    }
}

 

module.exports = {
    createResturnat,
    fetchResturant,
    approveResturant,
    rejectResturant,
    fetchAllResturants,
    fetchResturantAllProduct,
    fetchAllApprovedResturant
}


