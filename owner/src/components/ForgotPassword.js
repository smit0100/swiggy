import React, { useState,useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import swal from "sweetalert";
import InlineButtonLoader from './InlineButtonLoader'
import { Images } from "../Assets";
const BgImages = [Images.Bg_LogIn1, Images.Bg_LogIn2, Images.Bg_LogIn3];
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('')
  // const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [pass, setPass] = useState('');
  const [passError, setPassError] = useState('')
  const [cpass, setCpass] = useState('');
  const [cpassError, setCpassError] = useState('')
  const [otpShow, setOtpShow] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false)
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const navigate = useNavigate()

  const handleEmail = (e) => {
    setEmail(e.target.value);
    var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!regex.test(e.target.value)) {
      setEmailError("Please enter valid email address")
    } else {
      setEmailError("")
    }

  }

  const handleOtp = (e) => {
    // setOtp(e.target.value)
    // const regex = /^\d{6}$/
    const regex = /^\d+$/
    if (regex.test(otp)) {
      setOtpError("")
    } else {
      setOtpError("Enter valid otp")
    }
  }

  const handleCpass = (e) => {
    setCpass(e.target.value)
    if (pass == e.target.value) {
      setCpassError('')
    } else {
      setCpassError('please enter same password');
    }
  }

  const handlePass = (e) => {
    setPass(e.target.value);
    if (e.target.value.length < 8) {
      setPassError('password must be 8 character');
    } else {
      setPassError('')
    }
    if (e.target.value == cpass) {
      setCpassError('')
    } else {
      setCpassError('please enter same password');
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post('http://localhost:4000/resturant/forgotpassword', {
        email
      })
      if (response.status === 205) {
        console.log('something wrogn');
        setLoading(false)
      } else {
        console.log(response);
        setId(response.data.rest._id);
        setOtpShow(true)
        setLoading(false)
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleSavePassword = async (e) => {
    e.preventDefault();
    try {
    setLoading(true)
      const response = await axios.post('http://localhost:4000/resturant/verfiyotp', {
        id,
        otp:otp.join(""),
        newPassword: pass
      });
      // console.log(response);
      if (response.status === 205) {
        swal(`wrong otp`, "", "error");
        setLoading(false)
      } else {
        swal("SuccessFully Forget Password", "", "success");
        navigate("/")
      }
    } catch (err) {
      swal(`something error`, "", "error");
      setLoading(false)
      console.log(err);
    }


  }
  function ResetBtn() {
    if (!otpShow) {
      if (email && emailError.length === 0) {
        return (
          <button
            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleClick}
          >
            {loading ? <InlineButtonLoader /> : "Forgot Password"}
          </button>
        );
      } else {
        return (
          <button
            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="button"
            disabled>
            Forgot Password
          </button>
        );
      }
    } else {
      if (email && emailError.length === 0 && pass && cpass && otp && passError.length === 0 && cpassError.length === 0 && otpError.length === 0) {
        return (
          <button
            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSavePassword}
          >
            {loading ? <InlineButtonLoader /> : "Forgot Password"}

          </button>
        );
      } else {
        return (
          <button
            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="button"
            disabled>
            Forgot Password
          </button>
        );
      }
    }

  }

  const handleChange = (event, index) => {
    const value = event.target.value;
    setOTP((prevOTP) => {
      const newOTP = [...prevOTP];
      newOTP[index] = value;
      return newOTP;
    });
    if (value && refs[index + 1]) {
      refs[index + 1].current.focus();
    } else if (!value && refs[index - 1]) {
      refs[index - 1].current.focus();
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(otp.join(""));
  };
  return (
    // <>
    //   <div className="font-mono bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black py-32">
    //     <div className="mx-auto">
    //       <div className="flex justify-center px-6">
    //         <div className="w-full xl:w-3/4 lg:w-11/12 flex">
    //           <div className="w-full h-auto lg:flex bg-gray-400 hidden  lg:w-1/2 bg-cover rounded-l-lg">
    //             <img src='https://i.ibb.co/MPxMSmN/forgotpassword.jpg' alt='rendom' className='py-10 bg-white' />
    //           </div>
    //           <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
    //             <div className="px-8 mb-4 text-center">
    //               <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
    //               <p className="mb-4 text-sm text-gray-700">
    //                 We get it, stuff happens. Just enter your email address below and we'll send you a
    //                 link to reset your password!
    //               </p>
    //             </div>
    //             <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
    //               <div className="mb-4">
    //                 <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
    //                   Email
    //                 </label>
    //                 <input
    //                   className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                   id="email"
    //                   type="email"
    //                   value={email}
    //                   onChange={handleEmail}
    //                   onBlur={handleEmail}
    //                   placeholder="Enter Email Address"
    //                   disabled={otpShow && true}
    //                 />
    //                 <div className="text-sm text-red-500">{emailError}</div>

    //               </div>
    //               <div className="mb-4">
    //                 {otpShow && email && emailError.length === 0 &&
    //                   <>
    //                     <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="otp">
    //                       OTP
    //                     </label>
    //                     <input
    //                       className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                       id="otp"
    //                       type="text"
    //                       value={otp}
    //                       onChange={handleOtp}
    //                       onBlur={handleOtp}
    //                       placeholder="Enter your OTP"
    //                     />
    //                     <div className="text-sm text-red-500">{otpError}</div>
    //                   </>
    //                 }
    //               </div>
    //               <div>
    //                 {
    //                   email && otp && emailError.length === 0 && otpError.length === 0 &&
    //                   <>
    //                     <div className="mb-4">
    //                       <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
    //                         Enter new password
    //                       </label>
    //                       <input
    //                         className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                         id="password"
    //                         type="password"
    //                         value={pass}
    //                         onChange={handlePass}
    //                         onBlur={handlePass}
    //                         placeholder="Enter new password"
    //                       />
    //                       <div className="text-sm text-red-500">{passError}</div>
    //                     </div>
    //                     <div className="mb-4">
    //                       <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
    //                         Confirm new password
    //                       </label>
    //                       <input
    //                         className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                         id="password"
    //                         type="password"
    //                         value={cpass}
    //                         onChange={handleCpass}
    //                         onBlur={handleCpass}
    //                         placeholder="Confirm new password"
    //                       />
    //                       <div className="text-sm text-red-500">{cpassError}</div>
    //                     </div>
    //                   </>
    //                 }

    //               </div>

    //               <div className="mb-6 text-center">
    //                 {ResetBtn()}
    //               </div>
    //               <hr className="mb-6 border-t" />
    //               <div className="text-center">
    //                 <Link
    //                   className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
    //                   to="/ownerregister"
    //                 >
    //                   Create an Account!
    //                 </Link>
    //               </div>
    //               <div className="text-center">
    //                 <Link
    //                   className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
    //                   to="/"
    //                 >
    //                   Already have an account? Login!
    //                 </Link>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <div className="font-mono flex items-center justify-center flex-1 min-h-screen bg-black bg-opacity-30 backdrop-blur-sm">
      <img
        src={BgImages[2]}
        className="w-full h-full object-cover absolute mix-blend-overlay"
      />
      <div className="relative flex flex-col m-6 mt-24 space-y-8 bg-white shadow-md rounded-2xl md:flex-row md:space-y-0 w-full xl:w-3/4 lg:w-11/12">
        <div className="w-full h-auto lg:flex bg-white hidden  lg:w-1/2 bg-cover rounded-l-lg">
          <img
            src="https://i.ibb.co/MPxMSmN/forgotpassword.jpg"
            alt="img"
            className="py-10 bg-white rounded-md"
          />
        </div>
        <div className="lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
          <div className="px-8 mb-4 text-center">
            <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
            <p className="mb-4 text-sm text-gray-700">
              We get it, stuff happens. Just enter your email address below and
              we'll send you a link to reset your password!
            </p>
          </div>
          <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={email}
                onChange={handleEmail}
                onBlur={handleEmail}
                placeholder="Enter Email Address"
                disabled={otpShow}
              />
              <div className="text-sm text-red-500">{emailError}</div>
            </div>
            {otpShow && email && emailError.length === 0 && (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center my-5"
              >
                <label
                  className="block self-start mb-2 text-sm font-bold text-gray-700"
                  htmlFor="otp"
                >
                  OTP
                </label>
                <div className="flex justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      min="0"
                      max="9"
                      ref={refs[index]}
                      className={`w-12 h-12 sm:w-16 sm:h-16 mx-2 text-center text-3xl font-bold border border-gray-400 rounded-lg`}
                      maxLength={1}
                      value={digit}
                      onChange={(event) => handleChange(event, index)}
                      required
                    />
                  ))}
                </div>
              </form>
            )}

            <div>
              {email &&
                otp &&
                emailError.length === 0 &&
                otpError.length === 0 && (
                  <>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                      >
                        New password
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        value={pass}
                        onChange={handlePass}
                        onBlur={handlePass}
                        placeholder="Enter new password"
                      />
                      <div className="text-sm text-red-500">{passError}</div>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Confirm new password
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        value={cpass}
                        onChange={handleCpass}
                        onBlur={handleCpass}
                        placeholder="Confirm new password"
                      />
                      <div className="text-sm text-red-500">{cpassError}</div>
                    </div>
                  </>
                )}
            </div>

            <div className="mb-6 text-center">{ResetBtn()}</div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                to="/ownerRegister"
              >
                Create an Account!
              </Link>
            </div>
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                to="/"
              >
                Already have an account? Login!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword