const Product = require('../module/ProductModel');
const Category = require('../module/CategoryModel');
const Resturant = require('../module/ResturantModel');

const createProduct = async (req, res, next) => {
    const { name, price, category,resturnat } = req.body;

    const categoryExist = await Category.findById(category);

    if (!categoryExist) return res.status(400).json({ message: 'choose valid category' });
    const product = await new Product({ name, price, category,resturnat }).save();
    
    //added in category
    const addProductInCategory = await Category.findByIdAndUpdate(category, { $push: { product: product.id } })
    

    //added in resturant
    const addProductInResturnat = await Resturant.findByIdAndUpdate(resturnat, {$push:{ product: product.id }});


 

    
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
    
    try {
        const response = await Product.find();
        return res.status(200).json({ message: 'product founded', response });    
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