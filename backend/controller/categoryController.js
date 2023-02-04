const CategoryModel = require('../module/CategoryModel');
const Category = require('../module/CategoryModel');


const addCategory = async (req, res, next) => {
    const { name, description } = req.body;

    const category = await new Category({ name, description }).save();
    return res.status(200).json({
        message: 'category created',
        category
    })
}

const fetchCategory = async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(200).json({ message: 'category not found' })
    return res.status(200).json({
        message: 'category founded',
        category
    })
}

const active = async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { isActive: true }).exec();

    return res.status(200).json({ messae: 'category updated' }, category);

}

const disactive = async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { isActive: false }).exec();

    return res.status(200).json({ messae: 'category updated' }, category);
    
}
const fetchAllCategory = async (req, res, next) => {
    try {
        const response = await Category.find({ isActive: true });
        res.status(200).json({ messae: "category founded", response });
    } catch (e) {
        res.status(500).json({ messae: "something went wrong" });
    }

}

module.exports = {
    addCategory,
    fetchCategory,
    active,
    disactive,
    fetchAllCategory
}