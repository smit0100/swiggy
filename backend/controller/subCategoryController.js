const Category = require("../module/CategoryModel");
const SubCategory = require("../module/SubCategory");

const addCategory = async (req, res, next) => {
  try {
    const { name, description, mainCategory } = req.body;

    const mainCategoryExist = await Category.findById(mainCategory);

    if (!mainCategoryExist)
      return res.status(400).json({ message: "provide right main category" });

    const subCategory = await new SubCategory({
      name,
      description,
      mainCategory,
    }).save();

    res
      .status(200)
      .json({ message: "Sub category added successfully", subCategory });
  } catch (e) {
    res.status(404).json({ message: "something went wrong" });
  }
};

const fetchAllSubCategory = async (req, res, next) => {
  try {
    const { id } = req.query;

    const response = await SubCategory.find({
      mainCategory: id,
      isActive: true,
    });

    res.status(200).json({ message: "category founded", response });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "something went wroong" });
  }
};
const getAllSubCategory = async (req, res, next) => {
  const { extraField, pageSize, pageNumber } = req.query;
  const pageNumbers = parseInt(pageNumber) || 1;
  const pageSizes = parseInt(pageSize) || 10;
  try {
    const totalCount = await SubCategory.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSizes);
    const totalActive = await SubCategory.find({
        isActive: true,
      }).countDocuments();
      const totalDeactive = await SubCategory.find({
        isActive: false,
      }).countDocuments();
    let response;
    if (extraField != "") {
      response = await SubCategory.find({ isActive: extraField == "true" ? true : false })
        .skip((pageNumbers - 1) * pageSizes)
        .limit(pageSizes);
    } else {
      response = await SubCategory.find()
        .skip((pageNumbers - 1) * pageSizes)
        .limit(pageSizes);
    }
    res.status(200).json({
      page: pageNumbers,
      totalPages: totalPages,
      pageSize: pageSizes,
      totalCount: totalCount,
      response: response,
      totalActive,
      totalDeactive
    });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};
const deleteSubCategory = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const data = await SubCategory.findByIdAndDelete(userId);

    if (!data)
      return res.status(400).json({ messag: "Sub category not founded" });

    res.status(200).json({ messag: "Sub category deleted" });
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};
const editSubCategory = async (req, res, next) => {
  try {
    const { _id, names, descr, checked } = req.body;
    console.log("====req", req.body);
    const response = await SubCategory.findOneAndUpdate(
      {
        _id,
      },
      {
        name: names,
        isActive: checked == "checked" ? true : false,
        description: descr,
      },
      {
        new: true,
      }
    );
    res.status(201).json({ message: "edited sub category", response });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
};
module.exports = {
  addCategory,
  fetchAllSubCategory,
  getAllSubCategory,
  deleteSubCategory,
  editSubCategory,
};
