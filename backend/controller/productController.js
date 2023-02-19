const Product = require('../module/ProductModel');
const Category = require('../module/CategoryModel');
const Resturant = require('../module/ResturantModel');

const createProduct = async (req, res, next) => {
    const { name, price, category,resturnat } = req.body;

    const categoryExist = await Category.findById(category);

    if (!categoryExist) return res.status(400).json({ message: 'choose valid category' });
    const product = await new Product({ name, price, category,resturnat }).save();
    
    console.log(product._id);
    //added in category
    const addProductInCategory = await Category.findByIdAndUpdate(category, { $push: { product: product.id } })
    

    //added in resturant
    console.log(resturnat);
    const addProductInResturnat = await Resturant.findByIdAndUpdate(resturnat, {$push:{ product: product.id }});
    console.log(addProductInResturnat);

    

    
    return res.status(200).json({ message: 'product created',product });
}

const fetchProduct = async (req, res, next) => {
    const product = await Product.find();
    return res.status(200).json({ message: 'product fetched', product });
}


const findProduct = async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'product not found' });

    return res.status(200).json({ message: 'product founded', product });
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

        return res.status(200).json({ message: 'product founded', response ,  totalPages: totalPages,
        pageSize: pageSize,
        totalCount: totalCount});    
    } catch (e) {
        res.status(400).json({ message: 'something went wrong' });
    }
    
}

module.exports = {
    createProduct,
    findProduct,
    fetchProduct,
    fetchAllProduct
}