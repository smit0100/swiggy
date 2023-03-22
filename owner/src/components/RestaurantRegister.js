import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import{ useSelector,useDispatch} from 'react-redux'
import { userData } from '../redux/user/userSlice';
import swal from 'sweetalert'

const RestaurantRegister = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const owner = useSelector(state => state.userData.user);
  const [restaurant, setRestaurent] = useState({
    restaurantName: "",
    restaurantAddress: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    ownerName: "",
    email: "",
    number: "",
  })


  const [bankNpan, setBankNpan] = useState({
    accountno: "",
    confirmAccountno: "",
    acType: "",
    ifsc: "",
    panno: "",
    panholdername: ""
  })

  const [banknpanError, setBanknpanError] = useState({
    accountno: "",
    confirmAccountno: "",
    ifsc: "",
    panno: "",
    panholdername: ""
  })

  const { restaurantName,
    restaurantAddress,
    area,
    city,
    state,
    pincode,
    ownerName,
    email,
    number } = restaurant;

  const [opentime, setOpentime] = useState("")
  const [closetime, setClosetime] = useState("")

  const [tabOpen, setTabOpen] = useState(1)
  const [selectOutletType, setSelectOutletType] = useState([]);
  const [selectCuisinesType, setSelectCuisinesType] = useState([]);
  const [restaurantType, setRestaurantType] = useState("")
  const [pancardPhoto, setPanCardPhoto] = useState(null);
  const [bankDetailsPhoto, setBankDetailsPhoto] = useState(null);
  const [bg1, setBg1] = useState(null)
  const [bg2, setBg2] = useState(null)
  const [bg3, setBg3] = useState(null)
  const [category,setCategory] = useState([])

  const [loading, setLoading] = useState(false)

  const [outletType, setOutletType] = useState(null)
  // const outletType = ['Bakery', 'Bar', 'Beverage Shop', 'Bhojanalya', 'Butcher Shop', 'Cafe', 'Casual Dining', 'Club', 'Cocktail Bar', 'Confectionery', 'Desser Parlour', 'Dhaba', 'Fine Dining', 'Food Court', 'Food Truck', 'Irani Cafe', 'Kiosk', 'Lounge', 'Mess', 'Microbrewery', 'Paan Shop', 'Pub', 'Quick Bites', 'Shack', 'Sweet Shop']
  const cuisinesType = ['South Indian', 'Indian', 'Chinese', 'Mexican', 'Italian', 'Korean']

  // error handling section 
  const [errorHandle, setErrorHandle] = useState({
    restaurantName: "",
    restaurantAddress: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    ownerName: "",
    email: "",
    number: "",
  })


  const handleRestaurantName = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value })
    console.log(restaurantName);
    if (restaurantName === null || restaurantName === "") {
      setErrorHandle({ ...errorHandle, [e.target.name]: "Enter your shop name" })
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" })
    }
  }
  const handleRestaurantAddress = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value })
    if (restaurantAddress === null || restaurantAddress === "") {
      setErrorHandle({ ...errorHandle, [e.target.name]: "Enter your shop address" })
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" })
    }
  }
  const handleArea = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value })
    if (area === null || area === "") {
      setErrorHandle({ ...errorHandle, [e.target.name]: "Please Enter area name" })
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" })
    }
  }
  const handlePincode = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value })
    const regex = /^\d{6}$/
    if (!regex.test(e.target.value)) {
      setErrorHandle({ ...errorHandle, [e.target.name]: "Enter correct pincode" })
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" })
    }
  }
  const handleCity = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value })
    if (city === null || city === "") {
      setErrorHandle({ ...errorHandle, [e.target.name]: "Please Enter city name" })
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" })
    }
  }
  const handleState = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value })
    if (state === null || state === "") {
      setErrorHandle({ ...errorHandle, [e.target.name]: "Please Enter state name" })
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" })
    }
  }
  const handleOwnerName = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value })
    var regex = /^[\sA-Za-z]+$/;
    if (!regex.test(e.target.value)) {
      setErrorHandle({ ...errorHandle, [e.target.name]: "Enter your name" })
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" })
    }
  }
  const handleNumber = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value })
    const regex = /^[789]\d{9}$/
    if (!regex.test(e.target.value)) {
      setErrorHandle({ ...errorHandle, [e.target.name]: "Enter correct number" })
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" })
    }
  }
  const handleEmail = (e) => {
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value })
    var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!regex.test(e.target.value)) {
      setErrorHandle({ ...errorHandle, [e.target.name]: "Enter valid email address" })
    } else {
      setErrorHandle({ ...errorHandle, [e.target.name]: "" })
    }
  }


  const handleACno = (e) => {
    setBankNpan({ ...bankNpan, [e.target.name]: e.target.value })
    var regex = /^\d{9,18}$/;
    if (!regex.test(e.target.value)) {
      setBanknpanError({ ...banknpanError, [e.target.name]: "Please enter your account no" })
    } else {
      setBanknpanError({ ...banknpanError, [e.target.name]: "" })
    }

  }

  const handleAcType = e => {
    setBankNpan({ ...bankNpan, [e.target.name]: e.target.value })
    console.log(e.target.value)
    console.log(bankNpan)
  }
  const handleConfirmACno = e => {
    setBankNpan({ ...bankNpan, [e.target.name]: e.target.value })
    var regex = /^\d{9,18}$/;
    if (!regex.test(e.target.value)) {
      setBanknpanError({ ...banknpanError, [e.target.name]: "Please enter your account no" })
    } else {
      setBanknpanError({ ...banknpanError, [e.target.name]: "" })
    }
  }
  const handleifsc = (e) => {
    setBankNpan({ ...bankNpan, [e.target.name]: e.target.value })
    var regex = /^[A-Za-z]{4}\d{7}$/;
    if (!regex.test(e.target.value)) {
      setBanknpanError({ ...banknpanError, [e.target.name]: "Please enter bank IFSC code" })
    } else {
      setBanknpanError({ ...banknpanError, [e.target.name]: "" })
    }
  }
  const handlepanno = (e) => {
    setBankNpan({ ...bankNpan, [e.target.name]: e.target.value })
    var regex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    if (!regex.test(e.target.value)) {
      setBanknpanError({ ...banknpanError, [e.target.name]: "Please enter PAN number" })
    } else {
      setBanknpanError({ ...banknpanError, [e.target.name]: "" })
    }
  }

  useEffect(() => {
    console.log(selectCuisinesType);
  },[selectCuisinesType])
  const handlepanholder = (e) => {
    setBankNpan({ ...bankNpan, [e.target.name]: e.target.value })
    var regex = /^[\sA-Za-z]+$/;
    if (!regex.test(e.target.value)) {
      setBanknpanError({ ...banknpanError, [e.target.name]: "Please enter your name" })
    } else {
      setBanknpanError({ ...banknpanError, [e.target.name]: "" })
    }
  }

  // for next step 
  function handleFirstForm(e) {
    if (restaurantName && restaurantAddress && area && city && pincode && state && ownerName
      && errorHandle.restaurantName.length === 0 && errorHandle.restaurantAddress.length === 0 && errorHandle.area.length === 0 && errorHandle.city.length === 0 && errorHandle.state.length === 0 && errorHandle.pincode.length === 0 && errorHandle.ownerName.length === 0 ) {
      return (<button onClick={() => setTabOpen(2)} className='inline-block  bg-white hover:text-white border border-current hover:bg-blue-600 font-bold  rounded  px-10  py-[10px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Next {'>'}</button>)
    } else {
      return (<button disabled onClick={() => setTabOpen(2)} className='inline-block  bg-white hover:text-white border border-current hover:bg-blue-600 font-bold  rounded  px-10  py-[10px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Next {'>'}</button>)
    }
  }



  function handelchange(e) {
    e.preventDefault()
    setRestaurent({ ...restaurant, [e.target.name]: e.target.value })
  }
  console.log(restaurant);

  function handleOutletType(e) {
    if (e.target.checked) {
      setSelectOutletType([...selectOutletType, e.target.value]);
    } else {
      setSelectOutletType(selectOutletType.filter(option => option !== e.target.value));
    }
  }

  function handleCuisinesType(e) {
    if (e.target.checked) {
      setSelectCuisinesType([...selectCuisinesType, e.target.value]);
    } else {
      setSelectCuisinesType(selectCuisinesType.filter(option => option !== e.target.value));
    }
  }

  async function handleUpload(e) {
    e.preventDefault()

    const formData = new FormData();


    const address = {
      street: restaurantAddress,
      area: area,
      state: state,
      city: city,
      pincode: pincode
    }

    const bankDetails = {
      ACnumber: bankNpan.accountno,
      IFSC: bankNpan.ifsc,
      actype: bankNpan.acType
    }

    const pancardDetail = {
      holderName: bankNpan.panholdername,
      number: bankNpan.panno
    }

    formData.append("bank", bankDetailsPhoto)
    formData.append("pancard", pancardPhoto)
    formData.append("address", JSON.stringify(address))
    formData.append("email", restaurant.email)
    formData.append("number", restaurant.number);
    formData.append("category", selectCuisinesType)
    formData.append("outLetType", selectOutletType)
    formData.append("name", restaurantName);
    formData.append("ownerName", ownerName);
    formData.append("bg1", bg1)
    formData.append("bg2", bg2)
    formData.append("bg3", bg3)
    formData.append("bankDetails", JSON.stringify(bankDetails));
    formData.append("panCard", JSON.stringify(pancardDetail))
    formData.append("id", owner._id)
    

    try {
      setLoading(true)
      const res = await axios.post("http://localhost:4000/resturant/add", formData)
      console.log(res);
      setLoading(false)
      navigate("/")
     dispatch(userData(res.data.response))
      swal("Registration successfully", "", "success");

    } catch (err) {
      console.log(err);
    }

  }

  // by smit 
  //  async function handleUpload(e) {
  //     e.preventDefault()

  //     const formData = new FormData();
  //     // formData.append(
  //     //   "bankPassbook",
  //     //   bankDetailsPhoto,
  //     //   bankDetailsPhoto.name
  //     //   );
  //     // formData.append("pancard",
  //     //   pancardPhoto,
  //     //   pancardPhoto.name
  //     // )

  //     const address = {
  //       street:restaurantAddress,
  //       area:area,
  //       state:state,
  //       city:city,
  //       pincode:pincode
  //     }
  //     formData.append("bank", bankDetailsPhoto)
  //     formData.append("pancard", pancardPhoto)
  //     formData.append("address", address)    
  //     formData.append("email", restaurant.email)
  //     formData.append("number", restaurant.number);
  //     formData.append("category", selectCuisinesType)
  //     formData.append("outLetType",selectOutletType)

  //     // console.log(formData);
  //     // console.log(formData.getAll("bankPassbook"));
  //     // console.log(bankDetailsPhoto);

  //     // axios.post("api/uploadfile", formData);
  //     // axios.post("http://localhost:4000/resturant/add", {
  //     //   formData,
  //     //   address:{
  //     //     street:restaurantAddress,
  //     //     area:area,
  //     //     state:state,
  //     //     city:city,
  //     //     pincode:pincode
  //     //   },
  //     //   category:selectCuisinesType,
  //     //   outLetType:selectOutletType,
  //     //   resturantType:restaurantType,
  //     //   timing:{
  //     //     openAt:opentime,
  //     //     closeAt:closetime
  //     //   }
  //     // })

  //     // const form=await JSON.stringify({ address:{
  //     //   street:restaurantAddress,
  //     //   area:area,
  //     //   state:state,
  //     //   city:city,
  //     //   pincode:pincode
  //  // },
  //     // name:restaurantName,
  //     // ownerName:ownerName,
  //     // email:email,
  //     // number:number,
  //     // category:selectCuisinesType,
  //     // outLetType:selectOutletType,
  //     // resturantType:restaurantType,
  //     // timing:{
  //     //   openAt:opentime,
  //     //   closeAt:closetime
  //     //   }
  //     // })






  //     await axios.post("http://localhost:4000/resturant/add",formData)  
  //   }

  useEffect(() => {
    (async () => {
      const response = await axios.get(`http://localhost:4000/outlet/all`)
      console.log(response);
      setOutletType(response.data.response)

      const data = await axios.get('http://localhost:4000/category/all');
      setCategory(data.data.response)
      console.log(data.data.response);
    })()
  }, [])


  return (
    <>

      {
        loading &&
        <div className="fixed top-0 w-screen h-screen bg-black/20 z-50">
          <div className="flex justify-center items-center h-screen">
            <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      }
      <div className='mx-10 sm:mx-20 md:mx-28 lg:mx-40 xl:mx-72 flex flex-wrap'>

        <div className='w-full sm:w-1/4 p-5 shadow-lg rounded'>
          <h1 className='text-xl pb-5'>1. Create your restaurant page</h1>
          <ul className='space-y-4'>
            <li onClick={() => setTabOpen(1)} className='text-lg font-normal cursor-pointer'>Restaurant information<br /><span className='text-sm text-slate-500'>Restaurant name,address,contact no.,owner details</span></li>
            <li onClick={() => setTabOpen(2)} className='text-lg font-normal cursor-pointer '>Restaurant Type & Timing <br /> <span className='text-sm text-slate-500'>Establishment & cruisine type. opening hours</span></li>
            <li onClick={() => setTabOpen(3)} className='text-lg font-normal cursor-pointer'>Upload Images <br /> <span className='text-sm text-slate-500'>Menu,restaurant,food images</span></li>
          </ul>
        </div>

        {/* Restaurant information  */}
        {
          tabOpen === 1 ?
            <div className='w-full sm:w-3/4'>
              <h2 className='text-4xl font-normal pb-10'>Restaurant Information</h2>

              <form className=''>
                <div className='p-5 border-[1.5px] shadow-md shadow-black'>
                  <h2 className='text-2xl font-semibold'>Restaurant Details</h2>
                  <h3 className='text-slate-500'>Name, Address and location</h3>
                  <div className='pt-10 space-y-10'>
                    <input type="text"
                      name='restaurantName'
                      onChange={handleRestaurantName}
                      onBlur={handleRestaurantName}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Restaurant name" />
                    <span className='text-sm text-red-500'>{errorHandle.restaurantName}</span>
                    <input type="text"
                      name='restaurantAddress'
                      onChange={handleRestaurantAddress}
                      onBlur={handleRestaurantAddress}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Restaurant address" />
                    <span className='text-sm text-red-500'>{errorHandle.restaurantAddress}</span>
                  </div>
                  <div className='pt-10 '>
                    <h1 className='text-xl'>Restaurant address details</h1>
                    <h1>Address details are basis the restaurant location mentioned above</h1>
                    <div className='space-y-5 pt-5'>

                      <div className='gap-5 flex'>
                        <div>
                          <input type="text"
                            name='area'
                            onChange={handleArea}
                            onBlur={handleArea}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-fit ease-linear transition-all duration-150"
                            placeholder="Area" /><br />
                          <span className='text-sm text-red-500'>{errorHandle.area}</span>
                        </div>
                        <div>
                          <input type="text"
                            name='pincode'
                            onChange={handlePincode}
                            onBlur={handlePincode}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-fit ease-linear transition-all duration-150"
                            placeholder="Pincode" /><br />
                          <span className='text-sm text-red-500'>{errorHandle.pincode}</span>
                        </div>
                      </div>
                      <div className='flex gap-5'>
                        <div>

                          <input type="text"
                            onChange={handleCity}
                            onBlur={handleCity}
                            name='city'
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-fit ease-linear transition-all duration-150"
                            placeholder="City" /><br />
                          <span className='text-sm text-red-500'>{errorHandle.city}</span>
                        </div>
                        <div>

                          <input type="text"
                            onChange={handleState}
                            onBlur={handleState}
                            name='state'
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-fit ease-linear transition-all duration-150"
                            placeholder="State" /><br />
                          <span className='text-sm text-red-500'>{errorHandle.state}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='p-5 border-[1.5px] shadow-md shadow-black mt-4 relative'>
                  <h2 className='text-2xl font-semibold'>Restaurant Owner name</h2>
                  <h3 className='text-slate-500'>Your Customer will call on this nanme for general enquiries</h3>
                  <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-8">
                    <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                      <i className="fas fa-user"></i>
                    </span>
                    <input onChange={handleOwnerName} onBlur={handleOwnerName} type="text" id='name' name='ownerName' placeholder="Owner full name" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                    <span className='text-sm text-red-500'>{errorHandle.ownerName}</span>

                  </div>
                  {/* <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                    <span className="z-10 h-full leading-snug font-normal  text-center text-slate-700 absolute bg-transparent rounded text-base items-center justify-center w-8 px-3 py-3">
                      +91
                    </span>
                    <input onChange={handleNumber} onBlur={handleNumber} type="text" name='number' id='number' placeholder="Enter Your Number" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-12" />
                    <span className='text-sm text-red-500'>{errorHandle.number}</span>
                  </div>
                  <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                    <span className="z-10 h-full leading-snug font-normal  text-center text-slate-700 absolute bg-transparent rounded text-base items-center justify-center w-8 px-3 py-3">
                      @
                    </span>
                    <input onChange={handleEmail} onBlur={handleEmail} type="email" id='number' name='email' placeholder="Enter Your Email" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-3/6 md:w-4/6 pl-12" />

                    <button className=' sm:ml-3 inline-block bg-white hover:text-white w-28 sm:w-fit hover:bg-blue-600 font-bold  rounded border border-current px-10 text-center py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Verify</button>
                    <span className='text-sm text-red-500'>{errorHandle.email}</span>

                  </div> */}
                  <div className='flex justify-end pt-12'>
                    {handleFirstForm()}
                  </div>

                </div>
              </form>

            </div> : <></>
        }

        {/* Restaurant type & timing  */}
        {
          tabOpen === 2 ?
            <div className='w-full sm:w-3/4'>
              <h2 className='text-4xl font-normal pb-10'>Restaurant Type & Timings</h2>

              <form>
                <div className='shadow-md p-5'>
                  <h2 className='text-2xl font-medium'>Establishment type</h2>
                  <h3 className='text-slate-500'>Select most relevant category for your restaurant type</h3>
                  {/* radio button  */}
                  <div className='space-y-4 pt-3'>
                    <div>
                      <input type="radio" name="establishment" checked={restaurantType === 'deliveryANDdine-in'} onClick={() => setRestaurantType('deliveryANDdine-in')} value="deliveryANDdine-in" id="option1" className="peer hidden" />
                      <label htmlFor="option1" className="flex cursor-pointer items-center flex-col rounded-lg border border-gray-100 p-4  font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">
                        <p className="text-gray-700 text-md">Both, delivery and dine-in available</p>
                        <p className="text-gray-400 text-xs">Select this option when you have a place for customers to dine-in and also want to activate online ordering for your restaurant</p>
                      </label>
                    </div>
                    <div>
                      <input type="radio" name="establishment" checked={restaurantType === 'dine-in'} onClick={() => setRestaurantType('dine-in')} value="dine-in" id="option2" className="peer hidden" />
                      <label htmlFor="option2" className="flex cursor-pointer items-center flex-col rounded-lg border border-gray-100 p-4  font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">
                        <p className="text-gray-700 text-md">Dine-in only</p>
                        <p className="text-gray-400 text-xs">Select when you don't want to register for online ordering</p>
                      </label>
                    </div>
                    <div>
                      <input type="radio" name="establishment" checked={restaurantType === 'delivery'} onClick={() => setRestaurantType('delivery')} value="delivery" id="option3" className="peer hidden" />
                      <label htmlFor="option3" className="flex cursor-pointer items-center flex-col rounded-lg border border-gray-100 p-4  font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">
                        <p className="text-gray-700 text-md">Delivery only</p>
                        <p className="text-gray-400 text-xs">Select when you don't have a facility for customers to dine-in (like delivery kitchens)</p>
                      </label>
                    </div>
                  </div>

                  <div className='pt-8'>
                    <h1 className='text-md font-normal text-slate-600'>Select options which best describe your outlet</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-3 pt-4'>
                      {outletType != null && outletType.map((opt, index) => (
                        <label key={index} className="p-1">
                          <input
                            type="checkbox"
                            value={opt.name}
                            checked={selectOutletType.includes(opt.name)}
                            onChange={handleOutletType}
                            className=""
                          />
                          &nbsp;{opt.name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='shadow-md p-5 mt-3'>
                  <h2 className='text-2xl font-medium'>
                    Category
                  </h2>
                  <h3 className='text-slate-500'>Select options which best describe food your serve</h3>
                  <div className='grid grid-cols-1 sm:grid-cols-3 pt-4'>
                  {
                  category && category.map(item => (
                    <div>

                      
                       <label key={item._id} className="p-1">
                        <input
                          type="checkbox"
                          value={item._id}
                          // checked={selectCuisinesType.includes(opt)}
                          onChange={handleCuisinesType}
                          className=""
                        />
                        &nbsp;{ item.name}
                      </label>
                      </div>
                    ))
                  }
                     
                  </div>
                  <div className='flex justify-end pt-12'>
                    <button onClick={() => setTabOpen(3)} className='inline-block  bg-white hover:text-white border border-current hover:bg-blue-600 font-bold  rounded  px-10  py-[10px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Next {'>'}</button>
                  </div>
                </div>

                {/* <div className='shadow-md p-5 mt-3'>
                  <h2 className='text-2xl font-medium'>Restaurant operational hours</h2>
                  <h3 className='text-slate-500'>Mark restaurant opening and closing hours</h3>
                  <div className='flex pt-8 justify-evenly'>
                    <div className="flex justify-center">
                      <div className="timepicker relative form-floating mb-3 xl:w-40">
                        <input type="time"
                          value={opentime}
                          onChange={e => setOpentime(e.target.value)}
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Select a date" />
                        <label for="floatingInput" className="text-gray-700">Open at</label>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="timepicker relative form-floating mb-3 xl:w-40">
                        <input type="time"
                          value={closetime}
                          onChange={e => setClosetime(e.target.value)}
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Select a date" />
                        <label for="floatingInput" className="text-gray-700">Close at</label>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-end pt-12'>
                    <button onClick={() => setTabOpen(3)} className='inline-block  bg-white hover:text-white border border-current hover:bg-blue-600 font-bold  rounded  px-10  py-[10px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Next {'>'}</button>
                  </div>
                </div> */}
              </form>
            </div>
            : <></>
        }

        {/* Upload images  */}
        {
          tabOpen === 3 ?
            <div className='w-full sm:w-3/4 p-5'>
              <form>

                <div className='shadow-md p-5'>
                  <h2 className='text-2xl font-medium'>Bank details</h2>
                  <h3 className='text-slate-500'>Let us know where to diposit your money</h3>
                  <div className='space-y-5 pt-5'>
                    <div className='gap-5 flex'>
                      <div>

                        <input type="text"
                          name='accountno'
                          onChange={handleACno}
                          onBlur={handleACno}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-fit ease-linear transition-all duration-150"
                          placeholder="Bank account number" /><br />
                        <span className='text-sm text-red-500'>{banknpanError.accountno}</span>
                      </div>
                      <div>
                        <input type="text"
                          name='confirmAccountno'

                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-fit ease-linear transition-all duration-150"
                          placeholder="Re-enter account number" />
                      </div>

                    </div>
                    <div className='gap-5 flex'>
                      <div>

                        <select name='acType' onChange={handleAcType} onBlur={handleAcType} className="w-fit p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                          <option value=''>Select account type</option>
                          <option value='saving'>Saving account</option>
                          <option value='current'>Current account</option>
                        </select>
                      </div>
                      <div>

                        <input type="text"
                          name='ifsc'
                          onChange={handleifsc}
                          onBlur={handleifsc}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-fit ease-linear transition-all duration-150"
                          placeholder="Bank IFSC code" /><br />
                        <span className='text-sm text-red-500'>{banknpanError.ifsc}</span>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="mb-3 w-96">
                        <label for="formFile" className="form-label inline-block mb-2 text-gray-700">Upload passbook photo</label>
                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name='bank' type="file" onChange={e => setBankDetailsPhoto(e.target.files[0])} id="formFile" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='shadow-md p-5'>
                  <h2 className='text-2xl font-medium'>PAN detail</h2>
                  <h3 className='text-slate-500'>Let us know where to diposit your money</h3>
                  <div className='space-y-5 pt-5'>
                    <div className='gap-5 flex'>
                      <div>
                        <input type="text"
                          name='panno'
                          onChange={handlepanno}
                          onBlur={handlepanno}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-fit ease-linear transition-all duration-150"
                          placeholder="PAN Number" /><br />
                        <span className='text-sm text-red-500'>{banknpanError.panno}</span>
                      </div>
                      <div>
                        <input type="text"
                          name='panholdername'
                          onChange={handlepanholder}
                          onBlur={handlepanholder}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-fit ease-linear transition-all duration-150"
                          placeholder="PAN holder name" /><br />
                        <span className='text-sm text-red-500'>{banknpanError.panholdername}</span>
                      </div>

                    </div>
                    <div className="flex justify-center">
                      <div className="mb-3 w-96">
                        <label for="formFile" className="form-label inline-block mb-2 text-gray-700">Upload PAN card image</label>
                        <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          name='pancard' onChange={e => setPanCardPhoto(e.target.files[0])} type="file" id="formFile" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='shadow-md p-5'>
                  <h2 className='text-2xl font-medium'>Restaurant Images</h2>
                  <h3 className='text-slate-500 pb-7'>Let us know how your restaurant looks like</h3>
                  <div className="flex items-center justify-center w-full">
                    {/* <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label> */}
                  </div>
                  <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name='bg1' type="file" id="formFile" onChange={e => setBg1(e.target.files[0])} /><br />
                  <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name='bg2' type="file" id="formFile" onChange={e => setBg2(e.target.files[0])} /><br />
                  <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name='bg3' type="file" id="formFile" onChange={e => setBg3(e.target.files[0])} />

                </div>
                <button className="bg-emerald-500 w-full my-2  text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                  onClick={handleUpload}>
                  Save Update
                </button>
              </form>
            </div> : <></>

        }

      </div>
    </>
  )
}

export default RestaurantRegister