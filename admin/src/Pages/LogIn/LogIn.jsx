import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Images } from "../../Assets";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
  function getRandomIndex() {
    return Math.floor(Math.random() * BgImages.length);
  }
  useEffect(() => {
    setBgIndex(getRandomIndex());
  }, []);
  const history = useNavigate();
  const handleLogIn = () => {
    localStorage.setItem("isLogIn", JSON.stringify(true));
    setIsLogIn(true);
    history("/dashboard");
  };
  const hanldeForgot = () => {
    setIsForgot(!isForgot);
  };
  const handleForgotPassword = () => {
    if (cPassword.trim() == "") {
      toast.error("Current Password is required.", { duration: 1000 });
    } else if (newPass.trim() == "") {
      toast.error("New Password is required.", { duration: 1000 });
    } else if (newPass.length < 5) {
      toast.error("New Password must be more than 4 characters", {
        duration: 1000,
      });
    } else if (confirmNpass == "") {
      toast.error("Confirm Password is required.", { duration: 1000 });
    } else if (confirmNpass != newPass) {
      toast.error("Confirm Password does not match", { duration: 1000 });
    } else {
      toast("Password Changed Successfully", {
        duration: 3000,
        position: "top-center",
        icon: "👏",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      clearState();
      setIsForgot(false);
    }
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // if (email != "") {
    //   setEmailErr("Email is required!")
    // } else if (!regex.test(email)) {
    //   setEmailErr("This is not a valid email format!")
    // } else if (!password) {
    //   setPassErr("Password is required")
    // } else{
    //   console.log("===call api");
    // }
  };
  const clearState = () => {
    setCPassword("");
    setNewPass("");
    setConfirmNpass("");
  };
  return (
    <div className="flex items-center justify-center flex-1 min-h-screen bg-black bg-opacity-30 backdrop-blur-sm">
      <Toaster />
      <img
        src={BgImages[bgIndex]}
        className="w-full h-full object-cover absolute mix-blend-overlay"
      />
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-md rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Swiggy</span>
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
                  <span className="text-md">Remember for 7 days</span>
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
              onClick={handleLogIn}
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
              We've been uesing Untitle to kick"
              <br />
              start every new project and can't <br />
              imagine working without it."
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
