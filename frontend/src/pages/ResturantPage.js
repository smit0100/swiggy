import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cartData } from "../redux/cart/cartSlice";
import swal from "sweetalert"
import { AiTwotoneStar } from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast'

const ResturantPage = () => {

  const [openTab, setOpenTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [category, setCategory] = useState(null)
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [categories, setCategories] = useState([]);
  const { restaurantId } = useParams();
  const dispatch = useDispatch()
  const user = useSelector(state => state.userData.user);


  const handleCategoryChange = (event) => {
    const category = event.target.value;

    if (event.target.checked) {
      setCategories([...categories, category]);
    } else {
      setCategories(categories.filter(c => c !== category));
    }
  };


  useEffect(() => {
    (async () => {
      setLoad(true)
      console.log(categories);
      const ct = categories.map(id => id.toString()).join(',');
      console.log("this is ct log");
      console.log(typeof (ct));
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/resturant/products?id=${restaurantId}&${categories.length > 0 ? `categories=${categories.join(',')}` : ''}`)

      // const response = await axios.get(`http://localhost:4000/resturant/products?id=${restaurantId}&categories=${categories.join(',')}`)

      console.log(response.data, "ooko");
      setData(response.data)
      setLoad(false)
    })()
  }, [categories])

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/category/all`)
      console.log(response);
      setCategory(response.data.response)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (user != null) {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/cart/${user._id}`);
        console.log(response.data.data);
        dispatch(cartData(response.data.data.cart))
      }
    })()
  }, [])

  const images = [
    'https://picsum.photos/id/27/200/300',
    'https://picsum.photos/id/237/200/300',
    'https://picsum.photos/id/217/200/300',
    'https://picsum.photos/id/327/200/300',
    'https://picsum.photos/id/537/200/300',
    'https://picsum.photos/id/47/200/300',
    'https://picsum.photos/id/37/200/300'
  ];
  const HandleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleClick = (index) => {
    setIsOpen(true);
    setImageIndex(index);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handlePrev = () => {
    setImageIndex((imageIndex + images.length - 1) % images.length);
  }

  const handleNext = () => {
    setImageIndex((imageIndex + 1) % images.length);
  }
  let bgReview = "bg-green-600";

  if (data.length != 0) {
    if (+data.resturant.rating <= 1.5) {
      bgReview = "bg-red-600"
    }
    else if (+data.resturant.rating > 1.5 && data.resturant.rating < 3.5) {
      bgReview = "bg-orange-600"
    }
    else {
      bgReview = "bg-green-600"

    }
  }
  return (
    <>
      {/* image */}
      <div className=''>
        <div className="md:mx-28 top-60 mx-10 bg-cover bg-scale bg-no-repeat  box-border  flex justify-center items-center" >
          <img className="w-full h-[600px] object-cover" src={`${data.length !== 0 ? data.resturant.bgImageUrl[0] : 'https://picsum.photos/200'}`} alt="REstro  pic" />
        </div>
      </div>
      <div className='md:mx-36 m-4  p-2 mx-10 '>
        {/* link */}
        <div className='w-full'>
          <div className=" w-full relative">
            <div className='sticky  top-0 z-30 bg-white'>
              <div className='text-3xl uppercase'>{data.resturant ? data.resturant.name : ''}</div>
              <div className='text-lg capitalize text-slate-600'>pizza,south indian,chinese</div>
              <div className='text-md text-slate-500 capitalize'>{data.resturant && data.resturant.address ? data.resturant.address.street + " " + data.resturant.address.area + " " + data.resturant.address.city + '-' + data.resturant.address.pincode : ''}</div>
              <div className='text-md'><span className='text-orange-300'>Open now</span> - <span className='text-slate-700'>10am - 11.30pm</span></div>
              <div className={` ${bgReview} py-1 my-2  px-3 bg-green-600 flex items-center w-fit rounded-md text-white font-bold `}>{data.length!=0 && data.resturant.rating} &nbsp; <AiTwotoneStar /></div>
              <ul className="flex space-x-2 relative">
                <li><button onClick={() => { setOpenTab(1); HandleClick() }} className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow " >
                  Order Online</button></li>
                <li><button onClick={() => { setOpenTab(2); HandleClick() }} className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow">
                  Reviews</button></li>
                <li><button onClick={() => { setOpenTab(3); HandleClick() }} className="inline-block px-4 py-2 text-gray-600 bg-white rounded shadow">
                  Photos</button></li>
              </ul>
              <div className='border-[1.5px] border-black mb-2'></div>

            </div>
            <div className="p-3 mt-6 bg-white border">
              <div className={openTab === 1 ? "block" : "hidden"}>
                <div className='row overflow-auto'>
                  <div className='block w-full sm:w-2/6 p-4 bg-black/10  overflow-hidden'>
                    <ul className="space-y-2">
                      {
                        category != null && category.map(item => <li>
                          <input type="checkbox" id={item._id} value={item._id} onChange={handleCategoryChange} className="hidden peer" required="" />
                          <label htmlFor={item._id} className="inline-flex items-center justify-between w-full p-1 text-gray-500 bg-white border-2 border-gray-200 cursor-pointer   peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50 ">
                            <div className="block">
                              <div className="w-full text-lg font-semibold">{item.name}</div>
                            </div>
                          </label>

                        </li>)
                      }
                      {/* {menuItems.map((menu, index) => {
                          return <MenuItems items={menu} key={index} event={handleCategoryChange}/>;
                        })} */}
                    </ul>

                  </div>
                  <div className='w-full sm:w-4/6 p-4 h-[800px] no-scrollbar'>
                    {
                      // load === true ? (<h1>loading..</h1>): data.product.map(restaurant=><RestroCategoryCard restaurant={restaurant} />)
                      data.product ? data.product.map(item => <RestroCategoryCard item={item} />) :
                        <div className="flex justify-center items-center h-screen">
                          <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
                          </div>
                        </div>
                    }
                  </div>
                </div>
              </div>

              <div className={openTab === 2 ? "block" : "hidden"}>
                <section className="bg-white">
                  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-xl text-center">
                      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Read trusted reviews from our customers
                      </h2>

                      <p className="text-md ring-offset-warm-gray-500 mx-auto mt-4 max-w-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
                        praesentium natus sapiente commodi. Aliquid sunt tempore iste
                        repellendus explicabo dignissimos placeat, autem harum dolore
                        reprehenderit quis! Quo totam dignissimos earum.
                      </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
                      <UserReviewCard />
                      <UserReviewCard />
                      <UserReviewCard />
                      <UserReviewCard />
                      <UserReviewCard />
                    </div>
                  </div>
                </section>

              </div>

              <div className={openTab === 3 ? "block" : "hidden"}>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

                  {images.map((image, index) => (
                    <div className='overflow-hidden'>
                      <img
                        key={image}
                        src={image}
                        className="w-[300px] h-[250px] object-cover rounded-sm transition-all duration-400 hover:scale-110 cursor-pointer z-40"
                        onClick={() => handleClick(index)}
                        alt="backbone of text"
                      />
                    </div>
                  ))}
                  {isOpen && (
                    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center z-50 bg-black/50" >
                      <div className="bg-gray-900 text-white rounded-lg overflow-hidden relative">
                        <img src={images[imageIndex]} className="w-[400px] h-[250px] sm:w-[500px]  sm:h-[350px] object-cover" alt='backbone' />
                        <button className="hover:bg-black/50 text-white p-2 absolute top-0 left-0 h-full w-[40px]" onClick={handlePrev}>
                          &lt;
                        </button>
                        <button className="hover:bg-black/50 text-white p-2 absolute top-0 right-0 h-full w-[40px]" onClick={handleNext}> {">"} </button>
                      </div>
                      <div className='absolute inset-0 h-screen w-screen bg-black/50 -z-10' onClick={handleClose}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default ResturantPage


const MenuItems = ({ items, event }) => {
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/category/all`)
      console.log(response);
      // setCategory(response.data.response)
    })()
  }, [])

  const [dropdown, setDropdown] = useState(false);
  return (
    <li>
      {
        items.submenu ? (
          <>
            <button type="button"
              aria-haspopup="menu"
              className="font-semibold rounded inline-flex items-center justify-between w-full p-1 text-gray-500 bg-white border-2 border-gray-200 cursor-pointer   peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50"
              aria-expanded={dropdown ? "true" : "false"}
              onClick={() => setDropdown((prev) => !prev)}>
              {items.title}{" "}
            </button>
            <Dropdown submenus={items.submenu} dropdown={dropdown} />
          </>
        ) : (
          <div className="font-semibold rounded inline-flex items-center justify-between w-full p-1 text-gray-500 bg-white border-2 border-gray-200 cursor-pointer   peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50">{items.title}</div>
        )
      }
    </li>
  )
}

const Dropdown = ({ submenus, dropdown }) => {
  return (
    <ul className={`${!dropdown ? "hidden" : ""} mt-1 space-y-1 bg-white/60`}>
      {submenus.map((submenu, index) => (
        <li key={index} className="menu-items pl-5">
          <div>{submenu.title}</div>
        </li>
      ))}
    </ul>
  );
};

export const menuItems = [
  {
    title: 'Home',
    url: '/sdf',
  },
  {
    title: 'Services',
    url: '/sservices',
    submenu: [
      {
        title: 'web design',
        url: 'web-design',
      },
      {
        title: 'web development',
        url: 'web-dev',
      },
      {
        title: 'SEO',
        url: 'seo',
      },
    ],
  },
  {
    title: 'About',
    url: '/aabout',
    submenu: [
      {
        title: 'web design',
        url: 'web-design',
      },
      {
        title: 'web development',
        url: 'web-dev',
      },
      {
        title: 'SEO',
        url: 'seo',
      },
    ],
  },
];


export const UserReviewCard = () => {

  const ReviewStar = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>)

  return (
    <div>
      <img alt="Woman" src="https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" className="mx-auto h-24 w-24 rounded-full object-cover shadow-xl" />

      <blockquote className="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl">
        <p className="text-lg font-bold text-gray-700">Sophie Lennon</p>
        <p className="mt-1 text-xs font-medium text-gray-500">
          Digital Marketing at Studio
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          voluptatem alias ut provident sapiente repellendus.
        </p>

        <div className="mt-8 flex justify-center gap-0.5 text-green-500">
          {ReviewStar}
          {ReviewStar}
          {ReviewStar}
          {ReviewStar}
          {ReviewStar}
        </div>
      </blockquote>
    </div>
  )
}

export const RestroCategoryCard = ({ item }) => {
  // console.log(item);
  const id = item._id;
  const imgUrl = item.imageUrl
  const isUser = useSelector(state => state.userData.user);
  const cartItemData = useSelector(state => state.cartData.cart);
  const [imageUrl, setImageUrl] = useState(null)
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const dispatch = useDispatch()

  const toastElement = () =>
  (toast.custom((t) => (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5"><img className="h-14 w-14 rounded-full" src={imgUrl} alt="" /></div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{item.name}</p>
            <p className="mt-1 text-sm text-gray-500">Add in cart <span className='text-emerald-700 '>Successfully</span></p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">Close</button>
      </div>
    </div>
  ), { duration: 800 }))


  const addtoCart = async (e) => {
    setImageUrl(item.imageUrl)
    console.log('imageurl', imageUrl);
    console.log(restaurantId);
    e.preventDefault();
    if (!isUser) {
      navigate('/login')
    } else {
      if (cartItemData != null && cartItemData.products.length == 0) {
        const response = await axios.post(`${process.env.REACT_APP_BASEURL}/cart/add`, {
          productId: id,
          userId: isUser._id,
          resturantId: restaurantId
        })
        console.log(response.data.data.cart);
        dispatch(cartData(response.data.data.cart))
        toastElement()
      }
      else {
        if (cartItemData.resturant != restaurantId) {
          swal({
            title: "Items already in cart",
            text: "Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?",
            icon: "warning",
            buttons: ["NO", "YES,START REFRESH"],
            cancelButtonColor: "#DD6B55",
            confirmButtonColor: "#DD6B55",
            dangerMode: true,
          })
            .then(async (willDelete) => {
              if (willDelete) {
                const cart = await axios.get(`${process.env.REACT_APP_BASEURL}/cart/clear?userId=${isUser._id}`)

                const response = await axios.post(`${process.env.REACT_APP_BASEURL}/cart/add`, {
                  productId: id,
                  userId: isUser._id,
                  resturantId: restaurantId
                })
                dispatch(cartData(response.data.data.cart))

                swal("your previous restuarant Item removed and add this restaurant item", {
                  icon: "success",
                });
              } else {
                swal("Your cart still remainning");
              }
            });
        }
        else {
          const response = await axios.post(`${process.env.REACT_APP_BASEURL}/cart/add`, {
            productId: id,
            userId: isUser._id,
            resturantId: restaurantId
          })
          console.log("ok");
          dispatch(cartData(response.data.data.cart))
          toastElement()
        }
      }

    }


  }

  return (
    <>
      <div className="flex flex-wrap anim py-3 gap-5">
        <div className="relative ">
          <img className="h-36 w-36 rounded-md object-cover" src={`${item.imageUrl}`} alt="food" />
          <button onClick={addtoCart} className="inline-block absolute left-7 bg-white hover:text-white hover:bg-green-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-green-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-green-500">
            Add
          </button>
        </div>
        <div className="sm:pt-5 lg:pt-0">
          <img alt="veg" className="w-5 mr-1" src="../svg/veg.svg" />
          <p className="font-bold capitalize">{item.name} </p>
          <p className="text-sm">&#8377; {item.price}</p>
          <p className='text-md text-slate-500 capitalize w-96'>{item.description}</p>
        </div>

      </div>

    </>
  )
}



