import React, { useCallback, useEffect, useState } from "react";
import Category from "../../Apis/Category";
import { Button, Tabs } from "../../Components";
import { useStateContext } from "../../contexts/ContextProvider";
import swal from "sweetalert";
import { toast } from "react-toastify";
export default function AddCategory() {
  const { currentColor } = useStateContext();
  const [isDisabled, setIsDisabled] = useState(false);
  const [description, setDescription] = useState("");
  const [subDescription, setSubDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [mainCategory, setMainCategory] = useState([]);
  const [name, setName] = useState("");
  const [editUser, setEditUser] = useState({});
  const [subName, setSubName] = useState("");
  const [edit, setEdit] = useState(false);
  const [checked, setChecked] = useState("");
  const [names, setNames] = useState("");
  const [descr, setDescr] = useState("");
  const [tabs, setTabs] = useState([
    { label: "All", badge: null },
    { label: "Add Category", badge: null },
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    getCategory();
    document.title = "Admin - Category";
  }, []);
  const getCategory = () => {
    Category.getAllCategory().then((result) => {
      console.log("===getAllCategory", result);
      if (result?.response) {
        setMainCategory(result?.response);
      }
    });
  };
  const addMainCategory = () => {
    if (name.trim() != "" && description.trim() != "") {
      setIsDisabled(true);
      let data = {
        name: name,
        description: description,
      };
      Category.AddMainCategory(JSON.stringify(data)).then((response) => {
        console.log("==response", response);
        if (response?.message) {
          swal({
            title: "Success!",
            text: response?.message,
            icon: "success",
            buttons: false,
            timer: 1500,
          });
          setDescription("");
          setName("");
          setIsDisabled(false);
        }
      });
    }
  };
  const addSubCategory = () => {
    console.log("===", subName.trim(), subDescription.trim(), selectedOption);
    if (
      subName.trim() != "" &&
      subDescription.trim() != "" &&
      selectedOption != ""
    ) {
      let data = {
        name: subName,
        description: subDescription,
        mainCategory: selectedOption,
      };
      Category.AddSubCategory(data).then((response) => {
        console.log("==response", response);
        if (response?.message) {
          swal({
            title: "Success!",
            text: response?.message,
            icon: "success",
            buttons: false,
            timer: 1500,
          });
          setSubDescription("");
          setSubName("");
          setSelectedOption("");
          setIsDisabled(false);
        }
      });
    }
  };
  const deleteCategory = (id) => {
    Category.deleteCategory(id).then((response) => {
      if (response?.messag) {
        toast.success("⭐ Category deleted successfully");
        getCategory();
      }
    });
  };
  const handleModal = (id) => {
    let data = [...mainCategory];
    let item = data.find((item) => item?._id == id);
    if (item) {
      setEditUser(item);
      setChecked(item.isActive ? "checked" : "unchecked");
      setNames(item.name);
      setDescr(item.description);
      setIsVisible(true);
    }
  };
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure! you want to delete this category?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((e) => {
      if (e) {
        deleteCategory(id);
      }
    });
  };
  const editCategory = () => {
    let data = {
      _id: editUser._id,
      names,
      descr,
      checked,
    };
    Category.editCategory(JSON.stringify(data))
      .then((res) => {
        console.log("===res", res);
        if (res?.response) {
        toast.success("⭐ Category edited successfully");
          setIsVisible(false);
          getCategory();
        }
      })
      .catch((e) => console.log("=====e", e));
  };
  const ProductTable = () => {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:m-20 m-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Category name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mainCategory?.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } border-b dark:bg-gray-800 dark:border-gray-700`}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.name}
                </th>
                <td className="px-6 py-4 ">
                  <span
                    className={`${
                      item?.isActive ? "bg-green-500" : "bg-red-500"
                    } text-white rounded-2xl py-1 px-3 text-sm font-medium`}
                  >
                    {item?.isActive ? "Active" : "Deactive"}
                  </span>
                </td>
                <td className="px-6 py-4">{item?.description}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    className="font-medium border-blue-600 border-1 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white duration-150"
                    onClick={() => handleModal(item?._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="font-medium border-red-500 border-1 text-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white duration-150"
                    onClick={() => handleDelete(item?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-wrap bg-blue-100 py-5 rounded-2xl mx-3 justify-between">
        <h1 className="ml-5 max-sm:mb-4 font-semibold text-3xl">
          &bull; Category
        </h1>
        <div>
          <Tabs
            tabs={tabs}
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={(index) => {
              setActiveTabIndex(index);
            }}
          />
        </div>
      </div>
      {activeTabIndex == 0 ? (
        <ProductTable />
      ) : (
        <>
          <form className="lg:p-16 p-5 bg-slate-200 lg:w-10/12 shadow-lg lg:mx-10 rounded-2xl my-5">
            <h1 className="font-bold text-2xl mb-5">
              &bull; Add Main Category
            </h1>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Category Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  id="grid-first-name"
                  type="text"
                  placeholder="Category Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                {/* <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
              </div>
              {/* <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="grid-last-name"
              type="text"
              placeholder="0"
            />
          </div> */}
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Desription
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  placeholder="Discription"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <p className="text-gray-600 text-xs italic">
                  Make it as long and as crazy as you'd like
                </p>
              </div>
            </div>
            {/* <div className="flex flex-wrap mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Type
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              placeholder="Type of category"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Status
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option>New</option>
                <option>Upcomming</option>
                <option>Ongoing</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Discount
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="grid-zip"
              type="text"
              placeholder="5 %"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 mt-4 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Add Image
            </label>
            <div className="mt-4">
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-1 file:border-violet-500 file:text-sm file:font-semibold   file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100
    "
                />
              </label>
            </div>
          </div>
        </div> */}
            <div className="text-center">
              <Button
                disabled={isDisabled}
                color="white"
                bgColor={currentColor}
                onClick={addMainCategory}
                text={edit ? "Update" : "Submit"}
                borderRadius="10px"
                width={"52"}
              />
            </div>
          </form>
          <form className="lg:p-16 p-5 bg-slate-200 lg:w-10/12 shadow-lg lg:mx-10 rounded-2xl my-5">
            <h1 className="font-bold text-2xl mb-5">&bull; Add Sub Category</h1>
            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Sub Category Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  id="grid-first-name"
                  type="text"
                  placeholder="Sub Category Name"
                  value={subName}
                  onChange={(event) => setSubName(event.target.value)}
                />
                {/* <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
              </div>
              {/* <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="grid-last-name"
              type="text"
              placeholder="0"
            />
          </div> */}
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Desription
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  placeholder="Discription"
                  value={subDescription}
                  onChange={(event) => setSubDescription(event.target.value)}
                />
                <p className="text-gray-600 text-xs italic">
                  Make it as long and as crazy as you'd like
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mb-2">
              <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Main Category
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    onChange={(event) => {
                      setSelectedOption(event.target.value);
                    }}
                  >
                    {mainCategory?.map((item, index) => (
                      <>
                        {item?.isActive && (
                          <option key={item?._id} value={item?._id}>
                            {item?.name}
                          </option>
                        )}
                      </>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                disabled={isDisabled}
                color="white"
                bgColor={currentColor}
                onClick={addSubCategory}
                text={"Submit"}
                borderRadius="10px"
                width={"52"}
              />
            </div>
          </form>
        </>
      )}
      {isVisible && (
        <div
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 bg-black bg-opacity-70 z-50 items-center justify-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex"
        >
          <div className="relative w-full h-full max-w-2xl md:h-auto">
            {/* <!-- Modal content --> */}
            <form className=" bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Category
                </h3>
                <button
                  type="button"
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={names}
                      onChange={(e) => setNames(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 mt-5">
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        onChange={(e) => setChecked(e.target.value)}
                        value={"checked"}
                        checked={checked == "checked" ? true : false}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Active
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={checked == "unchecked" ? true : false}
                        onChange={(e) => setChecked(e.target.value)}
                        value={"unchecked"}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Deactive
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3 w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Description
                  </label>
                  <textarea
                    type="text"
                    value={descr}
                    onChange={(e) => setDescr(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 flex w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Description"
                  />
                </div>
              </div>
              <div className="flex py-2 items-center justify-center">
                <Button
                  // disabled={isDisabled}
                  color="white"
                  bgColor={currentColor}
                  text={"Save"}
                  borderRadius="10px"
                  width={"64"}
                  onClick={editCategory}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
