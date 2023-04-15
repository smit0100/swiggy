import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cartData } from "../redux/cart/cartSlice";
import swal from "sweetalert";
import { AiTwotoneStar } from "react-icons/ai";
import toast from "react-hot-toast";
import UserReviewCard from "../components/UserReviewCard";
import { setCurrentColor } from "../redux/user/userSlice";
import Categories from "../components/Categories";

const ResturantPage = () => {
  const [openTab, setOpenTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [category, setCategory] = useState(null);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [categories, setCategories] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const { restaurantId } = useParams();
  const [categoryID, setCategoryID] = useState("");
  const [product, setProduct] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.user);
  const handleFilter = (e, id) => {
    e.preventDefault();
    if (categoryID == id) {
      setProduct(data.product);
      setCategoryID("");
      return;
    }
    setCategoryID(id);
    let arrayData = [...data.product];
    let datas = arrayData?.filter((item) => item.category._id == id);
    console.log("===data====", id);
    setProduct(datas);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;

    if (event.target.checked) {
      setCategories([...categories, category]);
    } else {
      setCategories(categories.filter((c) => c !== category));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoad(true);
        // console.log(categories);
        const ct = categories.map((id) => id.toString()).join(",");
        console.log("this is ct log");
        console.log(typeof ct);
        const response = await axios.get(
          `${
            process.env.REACT_APP_BASEURL
          }/resturant/products?id=${restaurantId}&${
            categories.length > 0 ? `categories=${categories.join(",")}` : ""
          }`
        );
        const review = await axios.get(
          `${process.env.REACT_APP_BASEURL}/resturant/getallreview/?id=${response.data.resturant._id}`
        );
        // const response = await axios.get(`http://localhost:4000/resturant/products?id=${restaurantId}&categories=${categories.join(',')}`)
        console.log(response);
        setUserReview(review.data.review.review);
        setData(response.data);
        setProduct(response?.data?.product);
        setLoad(false);
      } catch (err) {
        console.log(err);
      }
    })();
    dispatch(setCurrentColor("slate-800"));
  }, [categories]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL}/category/all`
        );
        console.log("response", response);
        setCategory(response.data.response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (user != null) {
          const response = await axios.get(
            `${process.env.REACT_APP_BASEURL}/cart/${user._id}`
          );
          console.log(response.data.data);
          dispatch(cartData(response.data.data.cart));
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const HandleClick = () => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClick = (index) => {
    setIsOpen(true);
    setImageIndex(index);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePrev = () => {
    if (data.length !== 0) {
      setImageIndex(
        (imageIndex + data?.product?.length - 1) % data?.product?.length
      );
    }
  };

  const handleNext = () => {
    if (data.length !== 0) {
      setImageIndex((imageIndex + 1) % data?.product?.length);
    }
  };
  let bgReview = "bg-green-600";

  if (data.length !== 0) {
    if (+data.resturant.rating <= 1.5) {
      bgReview = "bg-red-600";
    } else if (+data.resturant.rating > 1.5 && data.resturant.rating < 3.5) {
      bgReview = "bg-orange-600";
    } else {
      bgReview = "bg-green-600";
    }
  }
  console.log("==category", category);
  return (
    <>
      {/* image */}
      <div className="pt-24">
        {/* <div className="md:mx-28 top-60 mx-10 bg-cover bg-scale bg-no-repeat  box-border  flex justify-center items-center">
          <img
            className="w-full h-[600px] object-cover"
            src={`${
              data.length !== 0
                ? data.resturant.bgImageUrl[0]
                : "https://picsum.photos/200"
            }`}
            alt="REstro  pic"
          />
        </div> */}
        <div className=" bg-gradient-to-tl from-slate-500 to-slate-500 rounded-3xl h-[600px] w-full relative">
          <img
            src={`${
              data.length !== 0
                ? data.resturant.bgImageUrl[0]
                : "https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress cs=tinysrob dpr=2&h=750w 1260"
            }`}
            alt="restaurant"
            className="w-full h-full object-cover absolute mix-blend-overlay rounded-3xl"
          />
          <div className="p-24">
            <h1 className="text-white text-6xl font-bold">
              {data?.resturant ? data?.resturant?.name : ""}
            </h1>
            <h2 className="text-slate-300 text-xl font-semibold mt-5">
              {data?.resturant && data?.resturant?.address
                ? data?.resturant?.address?.street +
                  " " +
                  data?.resturant?.address?.area
                : ""}
            </h2>
            <h2 className="text-slate-300 text-xl font-semibold">
              {data?.resturant && data?.resturant?.address
                ? data?.resturant?.address?.city +
                  "-" +
                  data?.resturant?.address?.pincode
                : ""}
            </h2>
          </div>
          <div className="flex gap-4 absolute top-5 right-5">
            <div
              className={` ${bgReview} py-2 my-2 px-3 bg-green-600 flex items-center w-fit rounded-md text-white font-bold`}
            >
              {data.length !== 0 && data.resturant.rating} &nbsp;{" "}
              <AiTwotoneStar />
            </div>
            <img alt="veg" className="w-10" src="../svg/veg.svg" />
          </div>
        </div>
      </div>
      <div className="md:mx-36 m-4  p-2 mx-10 ">
        {/* link */}
        <div className="w-full">
          <div className=" w-full relative">
            <div className="sticky  top-0 z-30 bg-orange-100">
              {/* <div className="text-3xl uppercase">
                {data.resturant ? data.resturant.name : ""}
              </div> */}
              {/* <div className="text-lg capitalize text-slate-600">
                pizza,south indian,chinese
              </div> */}
              {/* <div className="text-md text-slate-500 capitalize">
                {data.resturant && data.resturant.address
                  ? data.resturant.address.street +
                    " " +
                    data.resturant.address.area +
                    " " +
                    data.resturant.address.city +
                    "-" +
                    data.resturant.address.pincode
                  : ""}
              </div> */}
              {/* <div
                className={` ${bgReview} py-1 my-2  px-3 bg-green-600 flex items-center w-fit rounded-md text-white font-bold `}
              >
                {data.length !== 0 && data.resturant.rating} &nbsp;{" "}
                <AiTwotoneStar />
              </div> */}
              <ul className="flex space-x-2 relative mb-2">
                <li>
                  <button
                    onClick={() => {
                      setOpenTab(1);
                      HandleClick();
                    }}
                    className={`inline-block px-4 py-2 rounded-t-xl border-b-4  ${
                      openTab == 1 ? "border-black" : "border-orange-800"
                    } bg-${
                      openTab == 1 ? "white" : "orange-200"
                    } rounded shadow`}
                  >
                    Order Online
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setOpenTab(2);
                      HandleClick();
                    }}
                    className={`inline-block px-4 py-2 bg-${
                      openTab == 2 ? "white" : "orange-200"
                    } border-t-4  ${
                      openTab == 2 ? "border-black" : "border-orange-800"
                    } rounded-b-xl shadow`}
                  >
                    Reviews
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setOpenTab(3);
                      HandleClick();
                    }}
                    className={`inline-block px-4 py-2 bg-${
                      openTab == 3 ? "white" : "orange-200"
                    }  rounded-t-xl border-b-4 ${
                      openTab == 3 ? "border-black" : "border-orange-800"
                    } shadow`}
                  >
                    Photos
                  </button>
                </li>
              </ul>
              <div className="border-[1.5px] border-black mb-2"></div>
            </div>
            <div className="mt-6 bg-inherit border">
              <div className={openTab === 1 ? "block" : "hidden"}>
                <div className="row overflow-auto bg-orange-200 p-4">
                  {/* <div className='sticky left-0 top-0 w-full sm:w-2/6 p-4 bg-orange-200 '>
                    <ul className="space-y-2">
                      {
                        category != null && category.map(item => <li>
                          <input type="checkbox" id={item._id} value={item._id} onChange={handleCategoryChange} className="hidden peer" required="" />
                          <label htmlFor={item._id} className="inline-flex items-center justify-between w-full p-1 text-gray-500 bg-inherit border-2 border-gray-200 cursor-pointer   peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50 ">
                            <div className="block">
                              <div className="w-full text-lg font-semibold">{item.name}</div>
                            </div>
                          </label>

                        </li>)
                      }
                      {menuItems.map((menu, index) => {
                          return <MenuItems items={menu} key={index} event={handleCategoryChange}/>;
                        })}
                    </ul>

                  </div> */}
                  <h1 className="max-sm:mb-4 w-full text-center text-black font-semibold text-3xl">
                    Categories
                  </h1>
                  <div className="w-full h-2 flex flex-1 items-center justify-center mt-2">
                    <span className="w-60 h-1 bg-orange-600 text-center rounded-full" />
                  </div>
                  <div className="flex flex-wrap w-full max-sm:gap-5 md:gap-5 lg:gap-10 items-center justify-center my-5">
                    {category &&
                      category?.map((item, index) => {
                        return (
                          <Categories
                            key={index}
                            onClick={(e) => handleFilter(e, item?._id)}
                            name={item?.name}
                            id={item?._id}
                            currentColor={"red"}
                            category={categoryID}
                          />
                        );
                      })}
                  </div>
                  <div className="flex justify-center items-center w-full h-2">
                    <span className="w-11/12 h-1 bg-orange-600 rounded-full" />
                  </div>
                  <div className="w-full sm:w-4/6 p-4 h-[800px] no-scrollbar">
                    {
                      // load === true ? (<h1>loading..</h1>): data.product.map(restaurant=><RestroCategoryCard restaurant={restaurant} />)
                      product ? (
                        product.map((item) => (
                          <RestroCategoryCard item={item} />
                        ))
                      ) : (
                        <div className="flex justify-center items-center h-screen">
                          <img
                            src="https://s10.gifyu.com/images/loader175ba3dbc6a2636c.gif"
                            className="w-56 "
                            alt="this is loader"
                          />
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>

              <div className={openTab === 2 ? "block" : "hidden"}>
                <section className="bg-orange-200">
                  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-xl text-center border-b-2 border-b-black pb-5">
                      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Read trusted reviews from our customers
                      </h2>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
                      {userReview != null &&
                        userReview.map((review) => (
                          <UserReviewCard review={review} />
                        ))}
                    </div>
                  </div>
                </section>
              </div>

              <div className={openTab === 3 ? "block" : "hidden"}>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-orange-200">
                  {data.length !== 0 &&
                    data?.product?.map((image, index) => (
                      <div className="overflow-hidden">
                        <img
                          key={image}
                          src={image.imageUrl}
                          className="w-[300px] h-[250px] object-cover rounded-sm transition-all duration-400 hover:scale-110 cursor-pointer z-40"
                          onClick={() => handleClick(index)}
                          alt="backbone of text"
                        />
                      </div>
                    ))}
                  {isOpen && data.length !== 0 && (
                    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center z-50 bg-black/50">
                      <div className="bg-gray-900 text-white rounded-lg overflow-hidden relative">
                        <img
                          src={data?.product[imageIndex]?.imageUrl}
                          className="w-[400px] h-[250px] sm:w-[700px]  sm:h-1/2 object-contain"
                          alt="backbone"
                        />
                        <button
                          className="hover:bg-black/50 text-2xl font-bold text-white p-2 absolute top-0 left-0 h-full w-[40px]"
                          onClick={handlePrev}
                        >
                          &lt;
                        </button>
                        <button
                          className="hover:bg-black/50 text-2xl font-bold text-white p-2 absolute top-0 right-0 h-full w-[40px]"
                          onClick={handleNext}
                        >
                          &gt;
                        </button>
                      </div>
                      <div
                        className="absolute inset-0 h-screen w-screen bg-black/50 -z-10"
                        onClick={handleClose}
                      ></div>
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
};

export default ResturantPage;

const MenuItems = ({ items, event }) => {
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL}/category/all`
        );
        console.log(response);
        // setCategory(response.data.response)
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const [dropdown, setDropdown] = useState(false);
  return (
    <li>
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            className="font-semibold rounded inline-flex items-center justify-between w-full p-1 text-gray-500 bg-white border-2 border-gray-200 cursor-pointer   peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{" "}
          </button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} />
        </>
      ) : (
        <div className="font-semibold rounded inline-flex items-center justify-between w-full p-1 text-gray-500 bg-white border-2 border-gray-200 cursor-pointer   peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50">
          {items.title}
        </div>
      )}
    </li>
  );
};

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
    title: "Home",
    url: "/sdf",
  },
  {
    title: "Services",
    url: "/sservices",
    submenu: [
      {
        title: "web design",
        url: "web-design",
      },
      {
        title: "web development",
        url: "web-dev",
      },
      {
        title: "SEO",
        url: "seo",
      },
    ],
  },
  {
    title: "About",
    url: "/aabout",
    submenu: [
      {
        title: "web design",
        url: "web-design",
      },
      {
        title: "web development",
        url: "web-dev",
      },
      {
        title: "SEO",
        url: "seo",
      },
    ],
  },
];

export const RestroCategoryCard = ({ item }) => {
  // console.log(item);
  const id = item._id;
  const imgUrl = item.imageUrl;
  const isUser = useSelector((state) => state.userData.user);
  const cartItemData = useSelector((state) => state.cartData.cart);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const dispatch = useDispatch();

  const toastElement = () =>
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img className="h-14 w-14 rounded-full" src={imgUrl} alt="" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="mt-1 text-sm text-gray-500">
                  Add in cart{" "}
                  <span className="text-emerald-700 ">Successfully</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ),
      { duration: 800 }
    );

  const addtoCart = async (e) => {
    setImageUrl(item.imageUrl);
    console.log("imageurl", imageUrl);
    console.log(restaurantId);
    e.preventDefault();
    try {
      if (!isUser) {
        navigate("/login");
      } else {
        if (cartItemData !== null && cartItemData.products.length === 0) {
          const response = await axios.post(
            `${process.env.REACT_APP_BASEURL}/cart/add`,
            {
              productId: id,
              userId: isUser._id,
              resturantId: restaurantId,
            }
          );
          console.log(response.data.data.cart);
          dispatch(cartData(response.data.data.cart));
          toastElement();
        } else {
          if (cartItemData.resturant !== restaurantId) {
            swal({
              title: "Items already in cart",
              text: "Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?",
              icon: "warning",
              buttons: ["NO", "YES,START REFRESH"],
              cancelButtonColor: "#DD6B55",
              confirmButtonColor: "#DD6B55",
              dangerMode: true,
            }).then(async (willDelete) => {
              if (willDelete) {
                const cart = await axios.get(
                  `${process.env.REACT_APP_BASEURL}/cart/clear?userId=${isUser._id}`
                );

                const response = await axios.post(
                  `${process.env.REACT_APP_BASEURL}/cart/add`,
                  {
                    productId: id,
                    userId: isUser._id,
                    resturantId: restaurantId,
                  }
                );
                dispatch(cartData(response.data.data.cart));

                toast.success(
                  "Your previous restuarant Item removed and add this restaurant item 👌"
                );
              } else {
                toast("Your cart still remainning.");
              }
            });
          } else {
            const response = await axios.post(
              `${process.env.REACT_APP_BASEURL}/cart/add`,
              {
                productId: id,
                userId: isUser._id,
                resturantId: restaurantId,
              }
            );
            dispatch(cartData(response.data.data.cart));
            toastElement();
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-wrap anim py-3 gap-5">
        <div className="relative ">
          <img
            className="h-36 w-36 rounded-md object-cover"
            src={`${item.imageUrl}`}
            alt="food"
          />
          <button
            onClick={addtoCart}
            className="inline-block absolute left-7 bg-white hover:text-white hover:bg-black -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-black transition hover:scale-100 hover:shadow-xl focus:outline-none focus:ring active:text-white"
          >
            Add
          </button>
        </div>
        <div className="sm:pt-5 lg:pt-0">
          <img alt="veg" className="w-5 mr-1" src="../svg/veg.svg" />
          <p className="font-bold capitalize">{item.name} </p>
          <p className="text-sm">&#8377; {item.price}</p>
          <p className="text-md text-slate-500 capitalize w-96">
            {item.description}
          </p>
        </div>
      </div>
    </>
  );
};
