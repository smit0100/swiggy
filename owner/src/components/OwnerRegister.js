import React, { useState } from 'react'

import axios from 'axios'

const OwnerRegister = () => {
  const [restaurant,setRestaurent]=useState({
    restaurantName:"",
    restaurantAddress:"",
    area:"",
    city:"",
    state:"",
    pincode:"",
    ownerName:"",
    email:"",
    number:"",  
  })

const {restaurantName,
restaurantAddress,
area,
city,
state,
pincode,
ownerName,
email,
number}=restaurant;
const [opentime,setOpentime]=useState("")
const [closetime,setClosetime]=useState("")

  const [tabOpen, setTabOpen] = useState(1)
  const [selectOutletType, setSelectOutletType] = useState([]);
  const [selectCuisinesType, setSelectCuisinesType] = useState([]);
  const [selectDay, setSelectDay] = useState([]);
  const [restaurantType,setRestaurantType]=useState("")
  const [pancardPhoto, setPanCardPhoto] = useState(null);
  const [bankDetailsPhoto, setBankDetailsPhoto] = useState(null);
  const outletType = ['Bakery', 'Bar', 'Beverage Shop', 'Bhojanalya', 'Butcher Shop', 'Cafe', 'Casual Dining', 'Club', 'Cocktail Bar', 'Confectionery', 'Desser Parlour', 'Dhaba', 'Fine Dining', 'Food Court', 'Food Truck', 'Irani Cafe', 'Kiosk', 'Lounge', 'Mess', 'Microbrewery', 'Paan Shop', 'Pub', 'Quick Bites', 'Shack', 'Sweet Shop']
  const cuisinesType = ['South Indian', 'Indian', 'Chinese', 'Mexican', 'Italian', 'Korean']
  const dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  console.log(opentime+"   "+closetime);
 function handelchange(e){
  e.preventDefault()
  setRestaurent({...restaurant,[e.target.name]:e.target.value})
 }
 console.log(restaurant);

  function handleOutletType(e) {
    if (e.target.checked) {
      setSelectOutletType([...selectOutletType, e.target.value]);
    } else {
      setSelectOutletType(selectOutletType.filter(option => option !== e.target.value));
    }
  }
  function handleDayList(e) {
    if (e.target.checked) {
      setSelectDay([...selectDay, e.target.value]);
    } else {
      setSelectDay(selectDay.filter(option => option !== e.target.value));
    }
  }
  function handleCuisinesType(e) {
    if (e.target.checked) {
      setSelectCuisinesType([...selectCuisinesType, e.target.value]);
    } else {
      setSelectCuisinesType(selectCuisinesType.filter(option => option !== e.target.value));
    }
  }

  function handleUpload(e) {
    e.preventDefault()

    const formData = new FormData();
    formData.append(
      "bankPassbook",
      bankDetailsPhoto,
      bankDetailsPhoto.name
    );
    formData.append("pancard",
      pancardPhoto,
      pancardPhoto.name
    )

    // console.log(formData);
    console.log(formData.getAll("bankPassbook"));
    console.log(bankDetailsPhoto);

    // axios.post("api/uploadfile", formData);
    axios.post("http://localhost:4000/resturant/add",{
      address:{
        street:restaurantAddress,
        area:area,
        state:state,
        city:city,
        pincode:pincode
      },
      category:selectCuisinesType,
      outLetType:selectOutletType,
      resturantType:restaurantType,
      timing:{
        openAt:opentime,
        closeAt:closetime
      },
      formData
    })
  }
  console.log(selectOutletType);
  return (
    <div className='mx-10 sm:mx-20 md:mx-28 lg:mx-40 xl:mx-72 flex flex-wrap'>
      <div className='w-full sm:w-1/4 p-5 shadow-lg rounded'>
        <h1 className='text-xl pb-5'>1. Create your restaurant page</h1>
        <ul className='space-y-4'>
          <li onClick={() => setTabOpen(1)} className='text-lg font-normal cursor-pointer'>Restaurant information<br /><span className='text-sm text-slate-500'>Restaurant name,address,contact no.,owner details</span></li>
          <li onClick={() => setTabOpen(2)} className='text-lg font-normal cursor-pointer'>Restaurant Type & Timing <br /> <span className='text-sm text-slate-500'>Establishment & cruisine type. opening hours</span></li>
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
                  onChange={handelchange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Restaurant name" />
                  <input type="text"
                  name='restaurantAddress'
                  onChange={handelchange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Restaurant address" />
                </div>
                <div className='pt-10 '>
                  <h1 className='text-xl'>Restaurant address details</h1>
                  <h1>Address details are basis the restaurant location mentioned above</h1>
                  <div className='space-y-5 pt-5'>

                    <div className='gap-5 flex'>
                      <input type="text"
                      name='area'
                      onChange={handelchange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                        placeholder="Area" />
                      <input type="text"
                      name='pincode'
                      onChange={handelchange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                        placeholder="Pincode" />
                    </div>
                    <div className='flex gap-5'>
                      <input type="text"
                      onChange={handelchange}
                      name='city'
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                        placeholder="City" />
                      <input type="text"
                      onChange={handelchange}
                      name='state'
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                        placeholder="State" />
                    </div>
                  </div>
                </div>
              </div>
              <div className='p-5 border-[1.5px] shadow-md shadow-black mt-4 relative'>
                <h2 className='text-2xl font-semibold'>Contact number at restaurant</h2>
                <h3 className='text-slate-500'>Your Customer will call on this number for general enquiries</h3>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-8">
                  <span className="z-10 h-full leading-snug font-normal text-center flex  text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-user"></i>
                  </span>
                  <input onChange={handelchange} type="text" id='name' name='ownerName' placeholder="Owner full name" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10" />
                </div>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                  <span className="z-10 h-full leading-snug font-normal  text-center text-slate-700 absolute bg-transparent rounded text-base items-center justify-center w-8 px-3 py-3">
                    +91
                  </span>
                  <input onChange={handelchange} type="text" name='number' id='number' placeholder="Enter Your Number" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-3/6 md:w-4/6 pl-12" />
                  <button className=' ml-3 inline-block bg-white hover:text-white hover:bg-blue-600 font-bold  rounded border border-current px-10 text-center py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Verify</button>
                </div>
                <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-2">
                  <span className="z-10 h-full leading-snug font-normal  text-center text-slate-700 absolute bg-transparent rounded text-base items-center justify-center w-8 px-3 py-3">
                    @
                  </span>
                  <input onChange={handelchange} type="email" id='number' name='email' placeholder="Enter Your Email" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-3/6 md:w-4/6 pl-12" />

                  <button className=' sm:ml-3 inline-block bg-white hover:text-white w-28 sm:w-fit hover:bg-blue-600 font-bold  rounded border border-current px-10 text-center py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Verify</button>
                </div>
                <div className='flex justify-end pt-12'>
                  <button className='inline-block  bg-white hover:text-white border border-current hover:bg-blue-600 font-bold  rounded  px-10  py-[10px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Next {'>'}</button>
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
                    {outletType.map((opt, index) => (
                      <label key={index} className="p-1">
                        <input
                          type="checkbox"
                          value={opt}
                          checked={selectOutletType.includes(opt)}
                          onChange={handleOutletType}
                          className=""
                        />
                        &nbsp;{opt}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className='shadow-md p-5 mt-3'>
                <h2 className='text-2xl font-medium'>Type of cuisines</h2>
                <h3 className='text-slate-500'>Select options which best describe food your serve</h3>
                <div className='grid grid-cols-1 sm:grid-cols-3 pt-4'>
                  {cuisinesType.map((opt, index) => (
                    <label key={index} className="p-1">
                      <input
                        type="checkbox"
                        value={opt}
                        checked={selectCuisinesType.includes(opt)}
                        onChange={handleCuisinesType}
                        className=""
                      />
                      &nbsp;{opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className='shadow-md p-5 mt-3'>
                <h2 className='text-2xl font-medium'>Restaurant operational hours</h2>
                <h3 className='text-slate-500'>Mark restaurant opening and closing hours</h3>
                <div className='flex pt-8'>

                  <div className="timepicker relative form-floating mb-3 xl:w-96" data-mdb-with-icon="false" id="input-toggle-timepicker">
                    <label for="floatingInput" className="text-gray-700">Open at</label>
                    <input type="time"
                    value={opentime}
                      className="form-control block w-1/2 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Select a date" data-mdb-toggle="input-toggle-timepicker"
                      onChange={(e)=>setOpentime(e.target.value)} />
                  </div>
                  <div className="timepicker relative form-floating mb-3 xl:w-96" data-mdb-with-icon="false" id="input-toggle-timepicker">
                    <label for="floatingInput" className="text-gray-700">Close at</label>
                    <input type="time"
                    value={closetime}
                      className="form-control block w-1/2 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Select a date" data-mdb-toggle="input-toggle-timepicker"  onChange={(e)=>setClosetime(e.target.value)}/>
                  </div>
                </div>
                <div className='pt-5 pb-3'>
                  <p className='text-lg font-medium'>Mark open days</p>
                  <p className='text-slate-500'>Don't forget ot uncheck your off-day</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-3 pt-4'>
                  {dayList.map((opt, index) => (
                    <label key={index} className="p-1">
                      <input
                        type="checkbox"
                        value={opt}
                        checked={selectDay.includes(opt)}
                        onChange={handleDayList}
                        className=""
                      />
                      &nbsp;{opt}
                    </label>
                  ))}
                </div>
                <div className='flex justify-end pt-12'>
                  <button className='inline-block  bg-white hover:text-white border border-current hover:bg-blue-600 font-bold  rounded  px-10  py-[10px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500'>Next {'>'}</button>
                </div>
              </div>
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
                    <input type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                      placeholder="Bank account number" />
                    <input type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                      placeholder="Re-enter account number" />
                  </div>
                  <div className='gap-5 flex'>
                    <select className="w-1/2 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                      <option value=''>Select account type</option>
                      <option value='saving'>Saving account</option>
                      <option value='current'>Current account</option>
                    </select>
                    <input type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                      placeholder="Bank IFSC code" />
                  </div>
                  <div className="flex justify-center">
                    <div className="mb-3 w-96">
                      <label for="formFile" className="form-label inline-block mb-2 text-gray-700">Upload passbook photo</label>
                      <input className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name='bank'  type="file" onChange={e => setBankDetailsPhoto(e.target.files[0])} id="formFile" />
                    </div>
                  </div>
                </div>
              </div>
              <div className='shadow-md p-5'>
                <h2 className='text-2xl font-medium'>PAN detail</h2>
                <h3 className='text-slate-500'>Let us know where to diposit your money</h3>
                <div className='space-y-5 pt-5'>
                  <div className='gap-5 flex'>
                    <input type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                      placeholder="PAN Number" />
                    <input type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/2 ease-linear transition-all duration-150"
                      placeholder="PAN holder name" />
                  </div>
                  <div className="flex justify-center">
                    <div className="mb-3 w-96">
                      <label for="formFile" className="form-label inline-block mb-2 text-gray-700">Upload PAN card image</label>
                      <input className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name='pancard'  onChange={e => setPanCardPhoto(e.target.files[0])} type="file" id="formFile" />
                    </div>
                  </div>
                </div>
              </div>
              <button className="bg-emerald-500 w-full my-2  text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                onClick={handleUpload}>
                Save Update
              </button>
            </form>
          </div> : <></>

      }

    </div>
  )
}

export default OwnerRegister