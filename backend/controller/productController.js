const Product = require('../module/ProductModel');
const Category = require('../module/CategoryModel');
const Resturant = require('../module/ResturantModel');
const SubCategory = require('../module/SubCategory');
const cloudinary = require("cloudinary").v2;

const createProduct = async (req, res, next) => {
    try {
        const { description,name, price, category,resturnat,subCategory } = req.body;
        console.log(JSON.stringify(req.body));
    const categoryExist = await Category.findById(category);

    // if (!categoryExist) return res.status(400).json({ message: 'choose valid category' });

    // const subCategoryExist = await SubCategory.findById(subCategory);

    //     if (!subCategoryExist) return res.status(400).json({ message: "choose valid sub category" });
        

    //     console.log(resturnat);
    //     const resturantExist = await Resturant.findById(resturnat);

    //     console.log(resturantExist);

    //     if (!resturantExist) return res.status(400).json({ message: "resturant not found" });

        let productImage  = req.files.productImage
        
        let result
        try {
             result = await cloudinary.uploader.upload(productImage.tempFilePath, {
                folder: 'productImage',
                crop: 'fill',
                width: 250,
                height:250
            })


        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'product uploading failed' });
        }

    const product = await new Product({ name, price, category,resturnat,subCategory,imageUrl:result.url,description }).save();
    
    console.log(product._id);
    //added in category
        const addProductInCategory = await Category.findByIdAndUpdate(category, { $push: { product: product._id } })
        
        await SubCategory.findByIdAndUpdate(subCategory, {
            $push: {
                product:product.id
            }
        })
    

    //added in resturant
 
    const addProductInResturnat = await Resturant.findByIdAndUpdate(resturnat, {$push:{ product: product._id }},{
        new:true
    });
    console.log("this is resturant id");
    console.log(resturnat);
   
    console.log(addProductInResturnat);
 

    

    
    return res.status(200).json({ message: 'product created',product });
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: "something went wrong" });
    }
    
}

const fetchProduct = async (req, res, next) => {
    const product = await Product.find();
    return res.status(200).json({ message: 'product fetched', product });
}

const allResturantProduct = async (req, res, next) => {
    try {
        const { id } = req.query;

        const resturantExist = await Resturant.findById(id).populate({path:'product'});
        if (!resturantExist) return res.status(400).json({ message: 'resturant not found' });

        res.status(200).json({ message: 'resturant product founded', resturantExist });



    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }
}


const findProduct = async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'product not found' });
    const product = await Product.findById(id);
    return res.status(200).json({ message: 'product founded', product });
}

const updateProduct = async (req, res) => {
    try {
        const { price, name, description, id, category, subCategory,resturant } = req.body;
        console.log(req.body);
        
        if (req.files) {
            let productImae = req.files.productImage
            let result

            try {
                result = await cloudinary.uploader.upload(productImae.tempFilePath, {
                    folder: 'productImage',
                    crop: 'fill',
                    width: 250,
                    height:250
                })

                let product = await Product.findByIdAndUpdate(id, { name, price, description, category, subCategory, imageUrl: result.url }, { new: true });
                product = await Product.find({ resturnat: resturant });
                
                res.status(200).json({ message: 'product updated', product });
            } catch (e) {
                console.log(e);
                return res.status(500).json({ message: 'product upload failed' });
            }
        } else {
            const product = await Product.findByIdAndUpdate(id, { name, price, description,category,subCategory });
            res.status(200).json({ message: 'product updated', product });    
        }
        
    } catch (e) {
        res.status(500).json({message:'something went wrong'})
    }
}

const fetchAllProduct = async (req, res, next) => {
    const searchQuery = req.query.q;
 
    const regex = new RegExp(searchQuery, 'i');

    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    

    try {
        

        const totalCount = await Product.find({ name: regex }).countDocuments();
    
        const totalPages = Math.ceil(totalCount / pageSize);        

        const response = await Product.find({ name: regex }).skip((pageNumber - 1) * pageSize).limit(pageSize);
            console.log(response)
        return res.status(200).json({ message: 'product founded', response ,  totalPages: totalPages,
        pageSize: pageSize,
        totalCount: totalCount});    
    } catch (e) {
        res.status(400).json({ message: 'something went wrong' });
    }
    
}

const isActive = async (req, res, next) => {
    try {
        const { id,resturant } = req.query;
        let product = await Product.findByIdAndUpdate(id, { isActive: false }, {
            new:true
        })
        product = await Product.find({ resturnat: resturant });
        res.status(200).json({ message: 'deactivated product', product });

    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

module.exports = {
    createProduct,
    findProduct,
    fetchProduct,
    fetchAllProduct,
    allResturantProduct,
    updateProduct,
    isActive
}