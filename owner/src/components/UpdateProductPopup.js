import React, { useState, useEffect } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BiRupee } from "react-icons/bi"
import { AiOutlineAlignCenter } from 'react-icons/ai'
import axios from 'axios'
import { useSelector } from "react-redux";

const UpdateProductPopup = ({ setShowModal,id,price,name,description,catId,subCatId,setData}) => {

  console.log(catId,subCatId);

  const [productData, setProductData] = useState({
    name: name,
    price: price,
    description: description,
  })
  const [subCategoryArray, setSubCategoryArray] = useState(null);
  const [CategoryArray, setCategoryArray] = useState(null);

  const [category, setCategory] = useState(catId);
  const [subCategory, setSubCategory] = useState(subCatId)
  const owner = useSelector(state=>state.userData.user)


  const handlechange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/category/all`
        );
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
          const res = await axios.get(`http://localhost:4000/subcategory/all?id=${category}`);
          console.log(res.data.response);
          setSubCategoryArray(res.data.response);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [category])

  const productUpdate=async()=>{
    console.log(subCatId);
    try {
      if (category != null && owner!=null) {
        const res = await axios.put(`http://localhost:4000/product/update`,{
          price:productData.price,
          name:productData.name,
          description:productData.description,
          id:id,
          category:category,
          subCategory:subCategory,
          resturant:owner._id
        });
        setData(res.data.product)
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  }

  

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold">Update Product</h3>
              <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}>
                <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  X
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto space-x-4">
              <form className='flex flex-col'>
                <div>
                  <label htmlFor='category'>Category</label>
                  <select onChange={e => setCategory(e.target.value)}  id='category' data-te-select-init className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">;
                    {
                      CategoryArray != null && CategoryArray.map(category => <option value={category._id} selected={catId==category._id}>{category.name}</option>)
                    }
                  </select>
                </div>
                <div className='pt-4'>
                  <label htmlFor='SubCategory'>Sub-Category</label>
                  <select onChange={e => setSubCategory(e.target.value)} id='SubCategory' data-te-select-init className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">;
                  {
                        subCategoryArray!=null && subCategoryArray.map(item => <option value={item._id} key={item.name} selected={subCatId==item._id}>{item.name}</option>) 
                  }
                  </select>
                </div>
                <div className='pt-4'>
                  <label htmlFor='name'>Name</label>
                  <div className="relative flex w-full flex-wrap items-stretch mb-3">
                    <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                      <HiOutlinePencilAlt className='text-xl text-black/50' />
                    </span>
                    <input value={productData.name} onChange={handlechange} name="name" type="text" id='name' placeholder="Enter product name" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                  </div>
                </div>
                <label htmlFor='Price'>Price</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                  <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <BiRupee className='text-xl text-black/50' />
                  </span>
                  <input value={productData.price} onChange={handlechange} name="price" type="text" id='Price' placeholder="Enter product price" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                </div>
                <label htmlFor='description'>Description</label>
                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                  <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <AiOutlineAlignCenter className='text-xl text-black/50' />
                  </span>
                  <textarea value={productData.description} onChange={handlechange} name="description" type="text" id="description" placeholder="Enter product description" className="px-3 py-3 resize-none placeholder-slate-300 text-slate-600 relative  bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full h-24 pl-10" ></textarea>
                </div>
                <div className="relative w-full my-3">
                  <label className="block capitalize text-blueGray-600 text-md pb-1" htmlFor="pdImage">
                    Upload prodouct image
                  </label>
                  <input type="file" name="productImage" id="pdImage" />
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                onClick={() => setShowModal(false)}>
                Close
              </button>
              <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                onClick={(e) => {
                  setShowModal(false)
                  productUpdate()
                }}>
                Save Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>

  )
}

export default UpdateProductPopup