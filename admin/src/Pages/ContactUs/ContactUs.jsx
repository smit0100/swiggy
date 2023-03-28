import React, { useEffect, useState } from "react";
import Contactus from "../../Apis/Contactus";
import { Button } from "../../Components";
import { toast } from "react-toastify";
import { useStateContext } from "../../contexts/ContextProvider";
import swal from "sweetalert";
const data = [
  {
    name: "rohit kajavadra",
    email: "aa@test.com",
    number: "9988774455",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it",
      _id:"00"
  },
];
export default function ContactUs() {
  const { currentColor } = useStateContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getContactUs();
  }, []);
  const getContactUs = () => {
    Contactus.GetContactUs()
      .then((res) => {
        console.log("===res", res);
      })
      .catch((e) => console.log("====e", e));
  };
  const handleModal = (id) => {
    let item = data?.find((item) => item?._id == id);
    if (item) {
      setEmail(item?.email);
      setIsVisible(true);
    }
  };
  const handleSendResponse = () => {
    if (message.trim() == "") {
      toast.error("☹️ Message must be filled.");
      return;
    }
    setIsValid(true);
    let data = {
      email,
      message,
    };
    Contactus.SendResponse(data)
      .then((res) => {
        console.log("===res", res);
        if (res?.data?.message == "response sended") {
          setIsVisible(false);
          toast.success("⭐ response send successfully.");
        } else {
          toast.error("☹️ Something went wrong, try again.");
        }
        setIsValid(false);
      })
      .catch((e) => {
        console.log("====e", e);
        toast.error("☹️ Something went wrong, try again.");
        setIsValid(false);
      });
  };
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure! you want to delete this inquiry?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((e) => {
      if (e) {
        Contactus.deleteInquiry(id)
          .then((res) => {
            if (res?.message == "Inquiry deleted") {
              toast.success("👌 inquiry deleted successfully.");
              return
            }
            toast.error("☹️ Something went wrong,try again");
          })
          .catch((re) => {
            console.log("===re", re);
            toast.error("☹️ Something went wrong,try again");
          });
      }
    });
  };
  const ProductTable = ({ data }) => {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:mx-20 md:mt-12 m-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
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
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.email}
                </th>
                <td className="px-6 py-4">{item?.message}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    className="font-medium border-blue-600 border-1 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-600 hover:text-white duration-150"
                    onClick={()=>handleModal(item?._id)}
                  >
                    Response
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
    <div>
      <div className="flex flex-wrap bg-blue-100 py-5 rounded-2xl mx-3 justify-between">
        <h1 className="ml-5 max-sm:mb-4 font-semibold text-3xl">
          &bull; Contact Us
        </h1>
      </div>
      <ProductTable data={data} />
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
                  {`Give Response`}
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
                <div className="col-span-6 sm:col-span-3 w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Message
                  </label>
                  <textarea
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 flex w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Give response . . ."
                  />
                </div>
              </div>
              <div className="flex py-2 items-center justify-center">
                <Button
                  disabled={isValid}
                  color="white"
                  bgColor={currentColor}
                  text={"Send"}
                  borderRadius="10px"
                  width={"64"}
                  onClick={handleSendResponse}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
