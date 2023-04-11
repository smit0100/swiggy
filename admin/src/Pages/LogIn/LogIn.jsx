import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Images } from "../../Assets";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import User from "../../Apis/User";
import swal from "sweetalert";
import { requestForToken } from "../../firebase";

const BgImages = [Images.Bg_LogIn1, Images.Bg_LogIn2, Images.Bg_LogIn3];
function LogIn() {
  const { setIsLogIn } = useStateContext();
  const [bgIndex, setBgIndex] = useState(null);
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNpass, setConfirmNpass] = useState("");
  const [tokenFound, setTokenFound] = useState(false);
  function getRandomIndex() {
    return Math.floor(Math.random() * BgImages.length);
  }
  useEffect(() => {
    setBgIndex(getRandomIndex());
    document.title = "Admin - Login";
    getFcmToken();
  }, []);
  const getFcmToken = () => {
    const temp = localStorage.getItem("fcmToken");
    console.log("===tempp", temp);
    if (temp == null) {
      requestForToken(setTokenFound);
    }
  };
  const history = useNavigate();
  const handleLogIn = () => {
    let data = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (email == "") {
      toast.error("Email is required!", { theme: "dark" });
    } else if (!regex.test(email)) {
      toast.error("This is not a valid email format!", { theme: "dark" });
    } else if (password == "") {
      toast.error("Password is required", { theme: "dark" });
    } else if (password.length < 5) {
      toast.error("Password must be more than 4 characters", {
        theme: "dark",
      });
    } else {
      let fcmToken = "";
      const temp = localStorage.getItem("fcmToken");
      if (temp != null) {
        fcmToken = temp;
      }
      data = {
        email,
        password,
        fcmToken,
      };
      User.AdminLogIn(JSON.stringify(data))
        .then((result) => {
          if (result?.response) {
            console.log("==result===", result);
            clearLogInState();
            localStorage.setItem("isLogIn", JSON.stringify(true));
            let data = {
              email: result?.response?.email,
              name: result?.response?.name,
              id: result?.response?._id,
            };
            localStorage.setItem("Admin", JSON.stringify(data));
            setIsLogIn(true);
            history("/dashboard");
            swal({
              title: `Wellcome ${result?.response?.name}`,
              text: `You are successfully log in`,
              icon: "success",
              buttons: false,
              timer: 3000,
            });
          }
          if (result?.data?.messag != "user founded") {
            toast.error(result?.data?.messag, { theme: "dark" });
            return;
          }
        })
        .catch((error) => {
          console.log("==error login", error);
          toast.error("something went wrong,Please try again", {
            theme: "dark",
          });
        });
    }
  };
  const hanldeForgot = () => {
    setIsForgot(!isForgot);
    clearLogInState();
  };
  const handleForgotPassword = () => {
    if (cPassword.trim() == "") {
      toast.error("Current Password is required.", { theme: "dark" });
    } else if (newPass.trim() == "") {
      toast.error("New Password is required.", { theme: "dark" });
    } else if (newPass.length < 5) {
      toast.error("New Password must be more than 4 characters", {
        theme: "dark",
      });
    } else if (confirmNpass == "") {
      toast.error("Confirm Password is required.", { theme: "dark" });
    } else if (confirmNpass != newPass) {
      toast.error("Confirm Password does not match", { theme: "dark" });
    } else {
      let data = {
        oldPass: cPassword,
        newPass: newPass,
      };
      User.ForgotPasswords(data)
        .then((res) => {
          if (res?.messag) {
            console.log("res", res);
            toast.success("Password Changed Successfully 👌", {
              theme: "dark",
            });
            clearState();
            setIsForgot(false);
          }
          if (res?.data?.errors) {
            toast.error(res?.data?.errors, { theme: "dark" });
          }
        })
        .catch((e) => {
          console.log("===e", e);
          toast.error("Something went wrong,please try again", {
            theme: "dark",
          });
        });
    }
  };
  const clearState = () => {
    setCPassword("");
    setNewPass("");
    setConfirmNpass("");
  };
  const clearLogInState = () => {
    setEmail("");
    setPassword("");
  };
  return (
    <div className="flex items-center justify-center flex-1 min-h-screen bg-black bg-opacity-30 backdrop-blur-sm">
      <ToastContainer />
      <img
        src={BgImages[bgIndex]}
        className="w-full h-full object-cover absolute mix-blend-overlay"
      />
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-md rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <div className="flex">
            <img src={Images.logo} className="bg-cover h-8 w-8" />
            <span className="mb-3 text-4xl font-bold">Food Point</span>
          </div>
          <span className="font-light text-gray-400 mb-8">
            {`${
              isForgot ? "Forgot password," : "Welcom back!"
            } Please enter your details`}
          </span>
          {isForgot ? (
            <>
              <div>
                <span className="mb-2 text-md">Current Password</span>
                <input
                  type="text"
                  value={cPassword}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  onChange={(event) => setCPassword(event.target.value)}
                />
              </div>
              <div className="mt-4">
                <span className="mb-2 text-md">New Password</span>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  value={newPass}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  onChange={(event) => setNewPass(event.target.value)}
                />
              </div>
              <div className="mt-4">
                <span className="mb-2 text-md">Re-enter new password</span>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  value={confirmNpass}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  onChange={(event) => setConfirmNpass(event.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="py-4">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email"
                  value={email}
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="py-4">
                <span className="mb-2 text-md">Password</span>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  value={password}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="flex justify-between w-full py-4">
                <div className="mr-24">
                  <input type="checkbox" name="ch" id="ch" className="mr-2" />
                  <span className="text-md">Remember me</span>
                </div>
                <span
                  onClick={hanldeForgot}
                  className="font-bold text-md cursor-pointer hover:underline"
                >
                  Forgot password
                </span>
              </div>
            </>
          )}
          {isForgot ? (
            <>
              <button
                className="w-full bg-black text-white p-2 rounded-lg mt-10 hover:bg-white hover:text-black hover:border duration-200 border border-gray-300"
                onClick={handleForgotPassword}
              >
                Submit
              </button>
              <button
                className="w-full mt-5 hover:bg-black text-black hover:text-white p-2 rounded-lg duration-200 border border-gray-300"
                onClick={() => {
                  setIsForgot(false);
                  clearState();
                }}
              >
                Go Back
              </button>
            </>
          ) : (
            <button
              className="w-full bg-black text-white p-2 rounded-lg mt-10 hover:bg-white hover:text-black hover:border duration-200 border border-gray-300"
              onClick={() => handleLogIn()}
            >
              Sign in
            </button>
          )}
          {/* <div className="text-center text-gray-400">
            Dont'have an account?
            <span className="font-bold text-black">Sign up for free</span>
          </div> */}
        </div>
        <div className="relative">
          <img
            src={Images.Product1}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
              Our aim is not just to serve meal, it's a journey through taste
              and ambiance.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
