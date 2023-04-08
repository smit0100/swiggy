import axios from "axios";

import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loader from "./Loader";
import InlineButtonLoader from "./InlineButtonLoader";

const AddProduct = () => {
  const [categoryArray, setCategoryArray] = useState([]);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subCategoryArray, setSubCategoryArray] = useState([]);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, SetpriceError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

  const owner = useSelector((state) => state.userData.user);

  const handleName = (e) => {
    setName(e.target.value);
    var regex = /^[\sA-Za-z]+$/;

    if (!regex.test(e.target.value)) {
      setNameError("please enter valid name");
    } else {
      setNameError("");
    }
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
    const regx = /^\d+$/;
    if (!regx.test(e.target.value)) {
      SetpriceError("please enter valid price");
    } else {
      SetpriceError("");
    }
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    const regx = /^.+$/;
    if (!regx.test(e.target.value)) {
      setDescriptionError("please enter description");
    } else {
      setDescriptionError("");
    }
  };
  useEffect(() => {
    if (
      name.trim() != "" &&
      price.trim() != "" &&
      description.trim() != "" &&
      productImage != null
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [name, price, description, productImage]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:4000/category/all");
      console.log(res.data.response);
      setCategoryArray(res.data.response);
      setCategory(res.data.response[0]._id);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:4000/subcategory/all?id=${category}`
      );
      console.log(res.data.response);
      setSubCategoryArray(res.data.response);
      setSubCategory(res.data.response[0]._id);
    })();
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);

      formData.append("resturnat", owner._id);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("productImage", productImage);

      console.log(
        name,
        price,
        description,
        productImage,
        owner._id,
        category,
        subCategory,
        productImage
      );

      console.log(owner._id);
      const data = await axios.post(
        "http://localhost:4000/product/add",
        formData
      );
      console.log(data);
      setLoading(false);
      swal("SuccessFully Added", "", "success");
      navigate("/listofproducts");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {loading == true ? (
        <Loader />
      ) : (
        <div className="bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100 min-h-screen">
          <div className="mx-5">
            <div className="pt-20">
              <form className="lg:px-16 lg:pt-10 p-5 bg-slate-200 shadow-lg lg:mx-10 rounded-2xl my-5">
                <h1 className="font-bold text-2xl mb-5">&bull; Add Product</h1>
                <div className="flex flex-wrap mb-3">
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Product Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      id="grid-first-name"
                      type="text"
                      placeholder="Enter product name"
                      value={name}
                      onChange={handleName}
                      onBlur={handleName}
                    />
                    <span className="text-red-500 text-sm">{nameError}</span>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Price
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="0"
                      maxLength={4}
                      value={price}
                      onChange={handlePrice}
                      onBlur={handlePrice}
                    />
                    <span className="text-red-500 text-sm">{priceError}</span>
                  </div>
                </div>
                <div className="flex flex-wrap mb-3">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Desription
                    </label>
                    <textarea
                      className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      type="text"
                      placeholder="Write product description..."
                      value={description}
                      onChange={handleDescription}
                      onBlur={handleDescription}
                    />
                    <p className="text-gray-600 text-xs italic">
                      Make it as long as you'd like
                    </p>
                    <span className="text-red-500 text-sm">
                      {descriptionError}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Type
                    </label>
                    <select
                      data-te-select-init
                      onChange={(e) => setCategory(e.target.value)}
                      className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    >
                      {categoryArray
                        ? categoryArray.map((item) => (
                            <option value={item._id} key={item.name}>
                              {item.name}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Type
                    </label>
                    <select
                      data-te-select-init
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    >
                      {subCategoryArray
                        ? subCategoryArray.map((item) => (
                            <option value={item._id} key={item.name}>
                              {item.name}
                            </option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 mt-4 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Add Image
                  </label>
                  <div className="mt-4">
                    <label className="block">
                      <input
                        type="file"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-1 file:border-violet-500 file:text-sm file:font-semibold   file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        name="productImage"
                        id="pdImage"
                        onChange={(e) => setProductImage(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className={`${
                      isValid ? "bg-black" : "hover:bg-white hover:text-black"
                    } md:w-1/3 w-full bg-black text-white p-2 rounded-lg mt-4 hover:border duration-200 border border-gray-300`}
                    onClick={handleSubmit}
                    disabled={isValid}
                  >
                    {loading ? <InlineButtonLoader /> : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
