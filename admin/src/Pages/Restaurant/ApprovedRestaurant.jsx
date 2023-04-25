import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MdFastfood } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
import { useState } from "react";
import { Categories, Product, ReviewCard } from "../../Components";
import Restaurants from "../../Apis/Restaurants";
import Category from "../../Apis/Category";
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
    if (category == id) {
      setData(allData);
      setCategory("");
      return;
    }
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
              toast.success(
                `Product ${status ? "deactived" : "actived"} successfully👌`
              );
            }
          })
          .catch((e) => {
            console.log("===e", e);
            toast.error("Something went wrong,try again");
          });
      }
    });
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
        {reviewData?.length > 0 ? (
          reviewData.map((item, index) => {
            return <ReviewCard item={item} key={item._id} />;
          })
        ) : (
          <div>
            <p className="text-white">No reviews here</p>
          </div>
        )}
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
