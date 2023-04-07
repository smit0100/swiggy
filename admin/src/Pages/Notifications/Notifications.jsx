import React, { useState } from "react";
import { Button } from "../../Components";
import { useStateContext } from "../../contexts/ContextProvider";
import { toast } from "react-toastify";
import User from "../../Apis/User";

const mainCategory = [
  {
    _id: "1",
    name: "Users",
  },
  {
    _id: "2",
    name: "Delivery Boy",
  },
  {
    _id: "3",
    name: "Restaurants",
  },
];
export default function Notifications() {
  const { currentColor } = useStateContext();

  const [subDescription, setSubDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState(mainCategory[0].name);
  const [isDisabled, setIsDisabled] = useState(false);

  const [subName, setSubName] = useState("");
  console.log("==selectedOption", selectedOption);
  const handleSendNotification = () => {
    if (subName.trim() == "") {
        toast.error("Notification title is required!");
      } else if (!isNaN(subName)) {
        toast.error("Notification title is not in valid format!");
      } else if (subName?.length < 4) {
        toast.error("Notification title must be longer than 3 characters");
      } else if (subDescription.trim() == "") {
        toast.error("Notification message is required!");
      } else if (!isNaN(subDescription)) {
        toast.error("Notification message is not in valid format!");
      } else if (subDescription?.length < 4) {
        toast.error("Notification message must be longer than 3 characters");
      } else {
        // do api
        setIsDisabled(true)
        let data = {
            to:selectedOption,
            title:subName,
            body:subDescription
        }
        User.sendNotificationToAll(data).then((res)=>{
          if (res?.message == "Found successfully") {
            console.log("=====res",res);
            if (res?.data?.length > 0) {
              
              setSubName("")
              setSubDescription("")
              setIsDisabled(false)
              toast.success(`👌Notification sent to all ${selectedOption}`)
              return
            }
            toast.error(`Notification permission blocked by ${selectedOption}`)
            setIsDisabled(false)
          }
        }).catch((e)=>{
          console.log("===e",e);
        })
      }
  };
  return (
    <>
      <div className="flex flex-wrap bg-blue-100 py-5 rounded-2xl mx-3 justify-between">
        <h1 className="ml-5 max-sm:mb-4 font-semibold text-3xl">
          &bull; Notification
        </h1>
      </div>
      <form className="lg:p-16 p-5 bg-slate-200 lg:w-10/12 shadow-lg lg:mx-10 rounded-2xl my-5">
        <h1 className="font-bold text-2xl mb-5">&bull; Send Notification</h1>
        <div className="flex flex-wrap mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="grid-first-name"
              type="text"
              placeholder="Notification title"
              value={subName}
              onChange={(event) => setSubName(event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Desription
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              placeholder="Notification message"
              value={subDescription}
              onChange={(event) => setSubDescription(event.target.value)}
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as long as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap mb-2">
          <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Select audience
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                onChange={(event) => {
                  setSelectedOption(event.target.value);
                }}
              >
                {mainCategory?.map((item, index) => (
                  <option key={item?._id} value={item?.name}>
                    {item?.name}
                  </option>
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
        <div className="flex justify-center">
          <div className="text-center w-72 mt-10">
            <Button
              disabled={isDisabled}
              color="white"
              bgColor={currentColor}
              onClick={handleSendNotification}
              text={"Submit"}
              borderRadius="10px"
              width={"full"}
            />
          </div>
        </div>
      </form>
    </>
  );
}
