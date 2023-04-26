import React, { useState, useEffect } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BiRupee } from "react-icons/bi";
import { AiOutlineAlignCenter } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";
import InlineButtonLoader from "./InlineButtonLoader";
import { toast } from "react-toastify";

const UpdateProductPopup = ({
  setShowModal,
  id,
  price,
  name,
  description,
  catId,
  subCatId,
  setData,
}) => {
  console.log(catId, subCatId);

  const [productData, setProductData] = useState({
    name: name,
    price: price,
    description: description,
  });
  const [subCategoryArray, setSubCategoryArray] = useState(null);
  const [CategoryArray, setCategoryArray] = useState(null);

  const [isValid, setIsValid] = useState(false);
  const [isValidLoading, setIsValidLoading] = useState(false);
  const [category, setCategory] = useState(catId);
  const [subCategory, setSubCategory] = useState(subCatId);
  const owner = useSelector((state) => state.userData.user);

  const handlechange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:4000/category/all`);
        console.log(response);
        setCategoryArray(response.data.response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (category != null) {
          const res = await axios.get(
            `http://localhost:4000/subcategory/all?id=${category}`
          );
          console.log(res.data.response);
          setSubCategoryArray(res.data.response);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [category]);

  const productUpdate = async () => {
    console.log(subCatId);
    setIsValidLoading(true);
    try {
      if (category != null && owner != null) {
        const res = await axios.put(`http://localhost:4000/product/update`, {
          price: productData.price,
          name: productData.name,
          description: productData.description,
          id: id,
          category: category,
          subCategory: subCategory,
          resturant: owner._id,
        });
        setData(res.data.product);
        console.log(res);
        setIsValidLoading(false);
        setShowModal(false);
        toast.success("product edited successfully🔥");
      }
    } catch (err) {
      console.log(err);
      setIsValidLoading(false);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto md:w-1/3 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Update Product
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="relative px-6 flex-auto space-x-4">
              <form className="flex flex-col">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label htmlFor="category">Category</label>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      id="category"
                      data-te-select-init
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      ;
                      {CategoryArray != null &&
                        CategoryArray.map((category) => (
                          <option
                            value={category._id}
                            selected={catId == category._id}
                          >
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="SubCategory">Sub-Category</label>
                    <select
                      onChange={(e) => setSubCategory(e.target.value)}
                      id="SubCategory"
                      data-te-select-init
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      {subCategoryArray != null &&
                        subCategoryArray.map((item) => (
                          <option
                            value={item._id}
                            key={item.name}
                            selected={subCatId == item._id}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="pt-4">
                  <label htmlFor="name">Name</label>
                  <div className="relative flex w-full flex-wrap items-stretch mb-3">
                    <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                      <HiOutlinePencilAlt className="text-xl text-black/50" />
                    </span>
                    <input
                      value={productData.name}
                      onChange={handlechange}
                      name="name"
                      type="text"
                      id="name"
                      placeholder="Enter product name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10"
                    />
                  </div>
                </div>
                <label htmlFor="Price">Price</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                  <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <BiRupee className="text-xl text-black/50" />
                  </span>
                  <input
                    value={productData.price}
                    onChange={handlechange}
                    name="price"
                    type="text"
                    id="Price"
                    placeholder="Enter product price"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10"
                  />
                </div>
                <label htmlFor="description">Description</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                  <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <AiOutlineAlignCenter className="text-xl text-black/50" />
                  </span>
                  <textarea
                    value={productData.description}
                    onChange={handlechange}
                    name="description"
                    type="text"
                    id="description"
                    placeholder="Enter product description"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10"
                  ></textarea>
                </div>
                {/* <div className="relative w-full my-3">
                  <label
                    className="block capitalize text-blueGray-600 text-md pb-1"
                    htmlFor="pdImage"
                  >
                    Upload prodouct image
                  </label>
                  <input type="file" name="productImage" id="pdImage" />
                </div> */}
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                type="button"
                disabled={isValid}
                className={`${
                  isValid ? "bg-black" : "hover:bg-white hover:text-black"
                } w-full bg-black text-white p-2 rounded-lg mt-2   hover:border duration-200 border border-gray-300`}
                onClick={(e) => {
                  productUpdate(e);
                }}
              >
                {isValidLoading ? <InlineButtonLoader /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default UpdateProductPopup;
