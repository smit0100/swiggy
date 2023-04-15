const CategoryModel = require("../module/CategoryModel");
const Category = require("../module/CategoryModel");

const addCategory = async (req, res, next) => {
  const { name, description } = req.body;

  const category = await new Category({ name, description }).save();
  return res.status(200).json({
    message: "Category created successfully.",
    category,
  });
};

const fetchCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) return res.status(200).json({ message: "category not found" });
  return res.status(200).json({
    message: "category founded",
    category,
  });
};

const active = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, {
    isActive: true,
  }).exec();

  return res.status(200).json({ messae: "category updated" }, category);
};

const disactive = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, {
    isActive: false,
  }).exec();

  return res.status(200).json({ messae: "category updated" }, category);
};
const fetchAllCategory = async (req, res, next) => {
  try {
    const response = await Category.find()
    res.status(200).json({ message: "category founded", response });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const data = await Category.findByIdAndDelete(userId);

    if (!data) return res.status(400).json({ messag: "Category not founded" });

    res.status(200).json({ messag: "Category deleted" });
  } catch (e) {
    res.status(500).json({ messag: "something went wrong" });
  }
};

const editCategory = async (req, res, next) => {
  try {
    const { _id, names, descr, checked } = req.body;
    console.log("====req", req.body);
    const response = await Category.findOneAndUpdate(
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
    res.status(201).json({ message: "edited category", response });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something went wrong" });
  }
};
module.exports = {
  addCategory,
  fetchCategory,
  active,
  disactive,
  fetchAllCategory,
  deleteCategory,
  editCategory,
};
