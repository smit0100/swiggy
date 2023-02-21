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

        res.status(200).json({ message: "sub category added successfully",subCategory })

    } catch (e) {
        res.status(404).json({message:"something went wrong"})
    }
}

module.exports = {
    addCategory
}