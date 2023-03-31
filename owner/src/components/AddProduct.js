import axios from 'axios';

import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Loader from './Loader';


const AddProduct = () => {
  const [categoryArray, setCategoryArray] = useState([]);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subCategoryArray, setSubCategoryArray] = useState([]);
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [price, setPrice] = useState('')
  const [priceError, SetpriceError] = useState('')
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('')
  const [productImage, setProductImage] = useState(null)
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()

  const owner = useSelector(state => state.userData.user);

  const handleName = (e) => {
    setName(e.target.value)
    var regex = /^[\sA-Za-z]+$/;

    if (!regex.test(e.target.value)) {
      setNameError("please enter valid name")
    } else {
      setNameError("")
    }
  }

  const handlePrice = (e) => {
    setPrice(e.target.value)
    const regx = /^\d+$/
    if (!regx.test(e.target.value)) {
      SetpriceError("please enter valid price")
    } else {
      SetpriceError("");
    }
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
    const regx = /^.+$/
    if (!regx.test(e.target.value)) {
      setDescriptionError("please enter description")
    } else {
      setDescriptionError("");
    }
  }



  useEffect(() => {

    (async () => {
      const res = await axios.get("http://localhost:4000/category/all")
      console.log(res.data.response);
      setCategoryArray(res.data.response);
      setCategory(res.data.response[0]._id)
    })();

  }, [])

  useEffect(() => {


    (async () => {
      const res = await axios.get(`http://localhost:4000/subcategory/all?id=${category}`);
      console.log(res.data.response);
      setSubCategoryArray(res.data.response);
      setSubCategory(res.data.response[0]._id)
    })();

  }, [category])


  const handleSubmit = (e) => {
    (
      async () => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append("name", name);
        formData.append('price', price);
        formData.append("description", description);
       
        formData.append('resturnat',owner._id)
        formData.append('category',category);
        formData.append('subCategory',subCategory)
        formData.append('productImage',productImage)

        console.log(name, price, description,productImage,owner._id,category,subCategory,productImage);

       console.log(owner._id);
        const data = await axios.post('http://localhost:4000/product/add', formData)
        console.log(data);
        setLoading(false)
      swal("SuccessFully Added", "", "success");
        navigate("/listofproducts")
        
      }
    )();
   
  }


  return (
    <>{
      loading==true? <Loader/>:
      <div className='bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100'>

        <div className='mx-10'>
          <div className='m-5 '>
            <h1 className='text-3xl font-semibold py-5 pl-2 border-b-2 border-black'>Add Product</h1>
            <div className='flex flex-wrap py-3'>

              <div className='w-full sm:w-2/5 px-2'>
                <h1 className='text-xl text-slate-800 '>Select Category</h1>
                <div className="flex flex-wrap pt-5">
                  <div className="mb-3 xl:w-2/5">
                    <select data-te-select-init onChange={e => setCategory(e.target.value)} className='block appearance-none w-full bg-white border-y border-l border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-tl rounded-bl shadow leading-tight focus:outline-none focus:shadow-outline'>
                      {
                        categoryArray ? categoryArray.map(item => <option value={item._id} key={item.name}>{item.name}</option>) : ''
                      }

                    </select>
                  </div>
                  <div className="mb-3 xl:w-3/5">
                    <select data-te-select-init onChange={e => setSubCategory(e.target.value)} className="block appearance-none w-full bg-white border-y border-r border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-tr rounded-br shadow leading-tight focus:outline-none focus:shadow-outline">;
                      {
                        subCategoryArray ? subCategoryArray.map(item => <option value={item._id} key={item.name}>{item.name}</option>) : ''
                      }
                    </select>
                  </div>
                </div>

              </div>

              <div className='w-full sm:w-3/5 px-4 border-l-2 border-black'>
                <h1 className='text-xl text-slate-800 '>Product Details</h1>
                <form className='pt-5'>
                  <div className="relative w-full mb-3">
                    <label className="block capitalize text-blueGray-600 text-md pb-1" htmlFor="productName">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id='productName'
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Enter Product name"
                      value={name}
                      onChange={handleName}
                      onBlur={handleName}
                    />
                    <span className='text-red-500 text-sm'>{nameError}</span>

                  </div>
                  <div>
                    <label className="block capitalize text-blueGray-600 text-md pb-1" htmlFor="price">
                      Product Price
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                      </div>
                      <input
                        type="number"
                        id="price"
                        className="block w-full px-4 py-2 pr-12 border-t border-b border-l border-gray-300 rounded focus:outline-none focus:ring ease-linear transition-all duration-150 pl-7 sm:text-sm"
                        placeholder="Product price"
                        value={price}
                        onChange={handlePrice}
                        onBlur={handlePrice}
                      />
                      <span className='text-red-500 text-sm'>{priceError}</span>
                    </div>
                  </div>
                  <div className="relative w-full my-3">
                    <label className="block capitalize text-blueGray-600 text-md pb-1" htmlFor="description">
                      Product Description
                    </label>
                    <textarea
                      id="description"
                      rows="4"
                      className="resize-none block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:placeholder-gray-400 focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Write Product description..."
                      value={description}
                      onChange={handleDescription}
                      onBlur={handleDescription}
                    ></textarea>
                    <span className='text-red-500 text-sm'>{descriptionError}</span>
                  </div>

                  <div className="relative w-full my-3">
                    <label className="block capitalize text-blueGray-600 text-md pb-1" htmlFor="pdImage">
                      Upload prodouct image
                    </label>
                    <input type="file" name="productImage" id="pdImage" onChange={(e) => setProductImage(e.target.files[0])} />
                  </div>
                  <button className="inline-block ml-2 mt-3 bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500" onClick={handleSubmit}>
                    Add Product
                  </button>

                </form>
              </div>
            </div>
          </div>

        </div>


      </div>
}
    </>
  )
}

export default AddProduct