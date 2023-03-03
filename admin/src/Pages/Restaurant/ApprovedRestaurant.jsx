import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import pizza from "../../Assets/pizza.jpg";
import { MdFastfood } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
import { useState } from "react";
import { Categories, Product } from "../../Components";
import Restaurants from "../../Apis/Restaurants";
import Category from "../../Apis/Category";

export default function ApprovedRestaurant() {
  const location = useLocation();
  const [category, setCategory] = useState("");
  const [mainCategory, setMainCategory] = useState([]);
  const state = location.state;
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    getCategory();
    getProducts();
  }, []);
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
  const { currentColor, rupee } = useStateContext();
  const handleFilter = (id) => {
    setCategory(id);
    let arrayData = [...allData];
    let datas = arrayData?.filter((item) => item.category == id);
    console.log("===data", datas);
    setData(datas);
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
      <h1 className="mt-5 ml-5 max-sm:mb-4 dark:text-white font-semibold text-3xl">
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
      {data?.length > 0 && (
        <>
          <h1 className="mb-2 ml-5 max-sm:mb-4 dark:text-white font-semibold text-3xl">
            &bull; Products
          </h1>
          <div className="flex flex-wrap py-10 gap-10 w-full rounded-2xl mb-11 items-center justify-center bg-gradient-to-bl from-violet-900 to-teal-400">
            {data?.map((item, index) => {
              return (
                <Product
                  key={index}
                  name={item?.name}
                  price={item?.price}
                  bgImage={item?.imageUrl}
                  description={item?.description}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
