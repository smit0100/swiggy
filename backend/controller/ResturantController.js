const Resturant = require('../module/ResturantModel');
const Product = require('../module/ProductModel')
const cloudinary = require("cloudinary").v2;
const mongoose = require('mongoose')

const createResturnat = async (req, res, next) => {
   
    let { address, email, name,ownerName,number,panCard,bankDetails, outLetType } = req.body;
   address = JSON.parse(address);
   panCard = JSON.parse(panCard)
   bankDetails = JSON.parse(bankDetails)

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
        

        const response = await new Resturant({ name,ownerName,address,panCard,bankDetails, email, number, outLetType,pancardURL: panUrl.url, bankURL: result.url,bgImageUrl:bgimageUrl }).save();

        console.log(response.panCard);
        console.log(response.bankDetails);

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
    const response = await Resturant.findByIdAndUpdate(id, { isApproved: "Accepted" });

    return res.status(200).json({ message: 'resturant is active' });
}
const rejectResturant = async (req, res, next) => {
    const { id } = req.params;
    const response = await Resturant.findByIdAndUpdate(id, { isApproved: "Rejected" });

    return res.status(200).json({ message: 'resturant is rejected' });
}
const fetchAllResturants = async (req, res, next) => {

    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10 ;


    try {
        
        const totalCount = await Resturant.countDocuments();
        // calculate the number of pages
        
        const totalPages = Math.ceil(totalCount / pageSize);
    
        // retrieve the blog posts based on the page number and page size
        const blogPosts = await Resturant.find()
          .skip((pageNumber - 1) * pageSize)
          .limit(pageSize);
    
        // return the paginated results
        res.status(200).json({
          page: pageNumber,
          totalPages: totalPages,
          pageSize: pageSize,
          totalCount: totalCount,
          results: blogPosts
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }

    
}

const fetchResturantAllProduct = async (req, res, next) => {
    const { id } = req.query;
    const ObjectID = require('mongodb').ObjectID;
    let categories = req.query.categories || [];
     
     
 
    
    const resturant = await Resturant.findById(id);

    if (!resturant) return res.status(404).json({ message: "resturant not exist" });
    
    let product
    if (categories.length === 0) {
        product = await Product.find({ resturnat: id })
    } else {
        
         categories = categories.split(',').map(id => mongoose.Types.ObjectId(id.trim()));

        product = await Product.find({resturnat:id,category:{$in:categories}})
    }
    ``
 
    
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


