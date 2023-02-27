const Category = require('../module/CategoryModel');
const SubCategory = require('../module/SubCategory');


const addCategory = async (req,res,next) => {
    try {
        const { name, description, mainCategory } = req.body;

        const mainCategoryExist = await Category.findById(mainCategory);

        if (!mainCategoryExist) return res.status(400).json({ message: 'provide right main category' });

        const subCategory = await new SubCategory({
            name, description, mainCategory
        }).save();

        res.status(200).json({ message: "Sub category added successfully",subCategory })

    } catch (e) {
        res.status(404).json({message:"something went wrong"})
    }
}

const fetchAllSubCategory = async (req, res, next) => {
    try {
        const { id } = req.query;

        const response = await SubCategory.find({ mainCategory: id });

        res.status(200).json({ message: 'category founded', response });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "something went wroong" });
    }
}

module.exports = {
    addCategory,
    fetchAllSubCategory
}