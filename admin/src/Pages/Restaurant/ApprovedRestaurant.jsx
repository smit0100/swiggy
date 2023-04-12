import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import pizza from "../../Assets/pizza.jpg";
import { MdFastfood } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
import { useState } from "react";
import { Categories, Product } from "../../Components";
import Restaurants from "../../Apis/Restaurants";
import Category from "../../Apis/Category";
import { Images } from "../../Assets";
import swal from "sweetalert";
import { toast } from "react-toastify";

export default function ApprovedRestaurant() {
  const location = useLocation();
  const [category, setCategory] = useState("");
  const [mainCategory, setMainCategory] = useState([]);
  const state = location.state;
  const [data, setData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);
  useEffect(() => {
    getReviews();
  }, [currentPage]);

  const getCategory = () => {
    Category.getAllCategory().then((result) => {
      console.log("===getAllCategory", result);
      if (result?.response) {
        setMainCategory(result?.response);
      }
    });
  };
  const getProducts = () => {
    Restaurants.getOneProduct(state._id)
      .then((res) => {
        console.log("resresresresres", res);
        setData(res?.product);
        setAllData(res?.product);
      })
      .catch((e) => {
        console.log("=====e", e);
      });
  };
  const getReviews = () => {
    Restaurants.getAllReviews(state._id)
      .then((res) => {
        console.log("==reviewww", res);
        if (res?.review?.review) {
          setReviewData(res?.review?.review);
        }
      })
      .catch((e) => {
        console.log("=====e", e);
      });
  };
  const { currentColor, rupee } = useStateContext();
  const handleFilter = (id) => {
    setCategory(id);
    let arrayData = [...allData];
    let datas = arrayData?.filter((item) => item.category._id == id);
    console.log("===data", datas);
    setData(datas);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleDelete = (status, id) => {
    swal({
      title: "Are you sure ?",
      text: `You want to ${status ? "deactive" : "active"} this product`,
      icon: "warning",
      buttons: ["NO", "YES"],
      cancelButtonColor: "#DD6B55",
      confirmButtonColor: "#DD6B55",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        Restaurants.setProductDeactive(id, state._id)
          .then((res) => {
            console.log("===res", res);
            if (res?.message == "Product status updated successfully") {
              getProducts();
              toast.success(`Product ${status ? "deactived" : "actived"} successfully👌`);
            }
          })
          .catch((e) => {
            console.log("===e", e);
            toast.error("Something went wrong,try again");
          });
      }
    });
  };
  const getRemainingStar = (number) => {
    let Array = [];
    for (let i = 1; i <= 5 - number; i++) {
      Array.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return (
      <div className="flex justify-center gap-0.5 text-slate-200">{Array}</div>
    );
  };
  const ReviewCard = ({ item }) => {
    let Array = [];
    for (let i = 1; i <= +item.star; i++) {
      Array.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
          key={i}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return (
      <section className="bg-blueGray-100 rounded-t-10xl overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="mb-2 shadow-lg rounded-t-3xl rounded-b-xl overflow-hidden">
            <div className="py-3 px-4 md:px-16 bg-white bg-opacity-40">
              <div className="flex flex-wrap items-center">
                <div className="bg-white p-3 rounded-3xl mr-6 shadow-lg">
                  <img className="h-10 w-10" src={Images.user} alt="user" />
                </div>
                <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                  {item?.userName}
                </h4>
                <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
                <span className="mr-4 text-xl font-heading font-medium">
                  {item?.star + ".0"}
                </span>
                {/* <div className="inline-flex">
                    <a className="inline-block text-gray-200" href="#">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </a>
                  </div> */}
                <div className="flex justify-center gap-0.5 text-yellow-400">
                  {Array}
                </div>
                {getRemainingStar(Array.length)}
              </div>
            </div>
            <div className="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-white">
              <div className="flex flex-wrap">
                <div className="w-full md:w-2/3 mb-6 md:mb-0">
                  <p className="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">
                    {item?.review}
                  </p>
                </div>
                <div className="w-full md:w-1/3 text-right">
                  <p className="mb-8 text-sm text-gray-300">
                    Added 2 months ago
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="text-center">
            <button className="inline-block w-full md:w-auto h-full py-4 px-10 leading-8 font-heading font-medium tracking-tighter text-xl text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">
              See all
            </button>
          </div> */}
        </div>
      </section>
    );
  };
  return (
    <div>
      <div className="bg-gradient-to-tl from-purple-900 to-green-700 h-96 w-full relative">
        <img
          src="https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress cs=tinysrob dpr=2&h=750w 1260"
          className="w-full h-full object-cover absolute mix-blend-overlay"
        />
        <div className="p-24">
          <h1 className="text-green-200 text-6xl font-bold">{state?.name}</h1>
          <h2 className="text-slate-300 text-3xl font-light mt-5">
            Some really great deshes here.
          </h2>
        </div>
      </div>
      <h1 className="my-5 ml-5 max-sm:mb-4 dark:text-white font-semibold text-3xl">
        &bull; Categories
      </h1>
      <div className="flex flex-wrap max-sm:gap-5 md:gap-5 lg:gap-10 items-center justify-center mb-10">
        {mainCategory?.map((item, index) => {
          return (
            <Categories
              key={index}
              onClick={() => handleFilter(item?._id)}
              name={item?.name}
              id={item?._id}
              currentColor={currentColor}
              category={category}
            />
          );
        })}
      </div>
      <>
        <h1 className="mb-2 ml-5 max-sm:mb-4 dark:text-white font-semibold text-3xl">
          &bull; Products
        </h1>
        <div className="flex flex-wrap py-10 gap-10 w-full rounded-2xl mb-11 items-center justify-center bg-gradient-to-bl from-violet-900 to-teal-400">
          {data?.length > 0 ? (
            data?.map((item, index) => {
              return (
                <>
                  {item.price > 0 && (
                    <Product
                      key={index}
                      name={item?.name}
                      price={item?.price}
                      bgImage={item?.imageUrl}
                      description={item?.description}
                      status={item?.isActive == true ? "Deactive" : "Active"}
                      onClick={() => handleDelete(item?.isActive, item?._id)}
                    />
                  )}
                </>
              );
            })
          ) : (
            <div>
              <h1 className="text-white">No Items found</h1>
            </div>
          )}
        </div>
      </>
      <h1 className="my-5 ml-5 max-sm:mb-4 dark:text-white font-semibold text-3xl">
        &bull; Reviews
      </h1>
      <div className="flex flex-wrap py-10 gap-10 w-full rounded-2xl mb-11 items-center justify-center bg-gradient-to-tr from-teal-300 to-violet-500 ">
        {reviewData.map((item, index) => {
          return <ReviewCard item={item} key={item._id} />;
        })}
        {/* <div className="justify-center items-center flex">
          <button
            disabled={currentPage > 1 ? false : true}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`${
              currentPage > 1
                ? "hover:shadow-lg"
                : ""
            } inline-flex items-center px-4 py-2 ml-3 text-sm font-medium rounded-lg  dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white  text-white hover:text-black hover:border-black border-2`}
          >
            Previous
          </button>

          <button
            disabled={reviewData?.length == 4 ? false : true}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`inline-flex items-center px-4 py-2 ml-3 text-sm font-medium rounded-lg  dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white text-white hover:text-black hover:border-black border-2 ${
              reviewData?.length == 4
                ? "hover:shadow-lg "
                : "bg-white"
            }`}
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
}
