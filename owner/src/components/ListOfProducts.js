import React, { useEffect, useState } from "react";
import ListOfProductCard from "./ListOfProductCard";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Loader from "./Loader";
import { setCurrentColor } from "../redux/user/userSlice";

const ListOfProducts = () => {
  const user = useSelector((state) => state.userData.user);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState(null);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoad(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/resturant/allProduct?id=${user._id}`
        );
        setData(response.data.result);
        setProduct(response.data.result);
        console.log(response.data, "this is data");
        setLoad(false);
      } catch (err) {
        setLoad(false);
        console.log(err);
      }
    })();
    dispatch(setCurrentColor("slate-800"));
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;

    if (event.target.checked) {
      setCategories([...categories, category]);
    } else {
      setCategories(categories.filter((c) => c !== category));
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoad(true);
  //       const ct = categories.map((id) => id.toString()).join(",");
  //       console.log("this is ct log");
  //       console.log(typeof ct);
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BASEURL}/resturant/products?id=${user._id}&${
  //           categories.length > 0 ? `categories=${categories.join(",")}` : ""
  //         }`
  //       );
  //       console.log(response.data, "dataaaaaa");
  //       setData(response.data.product);
  //       setLoad(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, [categories]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL}/category/all`
        );
        console.log(response.data, "category response");
        setCategory(response.data.response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const handleFilter = (e, id) => {
    e.preventDefault();
    if (categoryID == id) {
      setData(product);
      setCategoryID("");
      return;
    }
    setCategoryID(id);
    let arrayData = [...product];
    let datas = arrayData?.filter((item) => item.category._id == id);
    console.log("===data====", id);
    setData(datas);
  };

  return (
    <div className="min-h-screen">
      <div className="pt-24 flex flex-grow-0 text-center justify-center items-center">
        <h1 className="text-3xl text-center border-b-2 border-black uppercase mb-5 pb-3">
          List of Products
        </h1>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full sm:w-1/5 p-5">
          <ul className="space-y-3">
            {/* {data?.length > 0 && ( */}
              <>
                <li
                  className={`text-lg ${
                    true
                      ? "border-slate-700 border-2"
                      : "bg-slate-200 border-slate-200 border-2"
                  } font-mono font-semibold text-black cursor-pointer pl-5 py-2 rounded-3xl hover:pl-8 duration-300`}
                  onClick={() => {
                    setCategoryID("");
                    setData(product);
                  }}
                >
                  Categories
                </li>
                <li className="bg-black h-1 w-full rounded-full"></li>
              </>
            {/* )} */}
            {category?.length > 0 &&
              // data?.length > 0 &&
              category.map((item) => (
                <li
                  className={`text-base ${
                    categoryID == item._id
                      ? "border-slate-700 border-2"
                      : "bg-slate-200 border-slate-200 border-2"
                  } font-mono font-semibold text-black pl-5 py-2 cursor-pointer  rounded-3xl hover:pl-8 duration-300`}
                  onClick={(e) => handleFilter(e, item?._id)}
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="w-full sm:w-9/12 p-4">
          {load === true ? (
            <div className="flex justify-center items-center h-full w-full">
              <img
                src="https://s10.gifyu.com/images/loader175ba3dbc6a2636c.gif"
                className="w-56 "
                alt="this is loader"
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 justify-evenly">
              {data != null &&
                data.map((item) => (
                  <ListOfProductCard item={item} setData={setData} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListOfProducts;

const MenuItems = ({ items }) => {
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
    title: "South indian",
  },
  {
    title: "Italian",
    submenu: [
      {
        title: "Pizaa",
      },
      {
        title: "Burger",
      },
      {
        title: "Speggeti",
      },
    ],
  },
  {
    title: "Chinese",
    submenu: [
      {
        title: "Mansuriyan",
      },
      {
        title: "Manchaw soupe",
      },
    ],
  },
];
