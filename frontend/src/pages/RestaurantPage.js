import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";


// import Navbar from "components/Navbars/AuthNavbar.js";
// import Footer from "components/Footers/Footer.js";

export default function RestaurantPage() {
  const { restaurantId } = useParams();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    (async () => {
      setLoad(true)

      const response = await axios.get(`http://localhost:4000/resturant/products?id=${restaurantId}`)
      setData(response.data)

      setLoad(false)
    })()
  }, [])

  return (
    <>


      <div className="relative w-full h-5/6">
        <img alt="bg" className="w-full object-cover h-[40vh] md:h-[80vh] first-letter blur-sm" src="https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80" />
      </div>

      <div className="w-5/6 mx-auto  bg-white shadow-xl h-auto relative -top-36 rounded-md ">
        {/* rounded_image */}
        <div className="absolute h-full w-full rounded-full flex justify-center overflow-hidden  md:-top-28 -top-20 left-">
          <img src="./svg/pagenotfound.svg" alt="background" className="md:w-56 md:h-56 w-40 h-40 bg-black rounded-full anim" />
        </div>
        {/* restroName & rating  */}
        <div className="row">
          <div className="restroColumn space-x-56 sm:space-x-6 md:space-x-10 lg:left-28 relative left-6 top-4 md:top-7 anim">
            <div className="text-center">
              <div className="font-bold  text-xl">344343</div>
              <div className="text-base ">product</div>
            </div>
            <div className="text-center">
              <div className="font-bold  text-xl">4.5</div>
              <div className="text-base ">rating</div>
            </div>
          </div>
          <div className="restroColumn justify-center relative sm:left-10 top-4 md:top-7 anim">
            <div className="text-center">
              <div className="font-bold text-2xl">{data.resturant ? data.resturant.name : ''}</div>
              <div>{data.resturant ? data.resturant.address.street + " " + data.resturant.address.area + " " + data.resturant.address.city + '-' + data.resturant.address.pincode : ''}</div>
            </div>
          </div>
        </div>

        <hr className="top-[200px] relative" />

        <div className="row mt-56">
          <div className="p-3 w-full bg-red-300 sm:w-5/12">
            <ul className="text-right px-8">
              <li>category-1</li>
              <li>category-1</li>
              <li>category-1</li>
              <li>category-1</li>
              <li>category-1</li>
            </ul>
          </div>
          <div className="sm:p-3 w-full bg-red-50 sm:w-7/12 space-y-7 pt-10">
            {/* {
              load === "true: ? <div></div> : data.product.map(item => <div>{ JSON.stringify(item) }</div>)
            } */}
            {
              // load === true ? (<h1>loading..</h1>): data.product.map(restaurant=><RestroCategoryCard restaurant={restaurant} />)
              data.product ? data.product.map(item => <RestroCategoryCard item={item}></RestroCategoryCard>) :
                <div className="flex justify-center items-center h-screen">
                  <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
                  </div>
                </div>
            }

          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
    
  );
}

export const RestroCategoryCard = ({ item }) => {
  const id = item._id;
  const isUser = useSelector(state => state.userData.user);
  const navigate = useNavigate();

  const addtoCart = async (e) => {
    e.preventDefault();
    if (!isUser) {
      navigate('/login')
    } else {
      const response = await axios.post('http://localhost:4000/cart/add', {
        productId: id,
        userId: isUser._id
      })

    }


  }

  return (
    <>
      <div className="flex flex-wrap-reverse justify-between anim py-3">
        <div className="sm:pt-5 lg:pt-0">
          <img alt="github" className="w-5 mr-1" src="./svg/github.svg" />
          <p className="font-bold capitalize">{item.name} </p>
          <p className="text-sm">{item.price}</p>
        </div>
        <div className="relative ">
          <img className="h-36 w-36 rounded-md object-cover" src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="food" />

          <button onClick={addtoCart} className="inline-block absolute left-7 bg-white hover:text-white hover:bg-green-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500"
          >
            Add
          </button>

        </div>
      </div>
    </>
  )
}