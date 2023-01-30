import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

import { userData} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
const Otp = () => {
    const [otp,setOtp] = useState('')
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState('')
    const id = (searchParams.get('id'));
    const email= (searchParams.get('email'));

  console.log(email);
    const dispatch = useDispatch()
    
    const navigate = useNavigate();
    const handleClick = async (e) => {    
        e.preventDefault();
        console.log(id,otp);
        const response = await axios.post('http://localhost:4000/user/verify', {
            id,
            otp    
        })

        if (response.status == 404) {
            setError(response.message)
        }

        if (response.status == 401) {
            setError(response.message);
        }

        if (response.status == 200) {
            console.log(response);
        }
        console.log(response.data.user);
        dispatch(userData(response.data.user))
        navigate('/')
    }

    function hideEmail(email) {
        var index = email.indexOf("@");
        var hidden = email.substr(5,index).replace(/./g,"*");
        return email.substr(0,5)+hidden + email.substring(index);
      }



    //     function OTPInput() {
    //         const inputs = document.querySelectorAll('#otp > *[id]');
    //         for (let i = 0; i < inputs.length; i++) {
    //             inputs[i].addEventListener('keydown', function (event) {
    //                 if (event.key === "Backspace") {
    //                     inputs[i].value = '';
    //                     if (i !== 0) inputs[i - 1].focus();
    //                 }
    //                 else {
    //                     if (i === inputs.length - 1 && inputs[i].value !== '') { return true; }
    //                     else if (event.keyCode > 47 && event.keyCode < 58) {
    //                         inputs[i].value = event.key;
    //                         if (i !== inputs.length - 1)
    //                             inputs[i + 1].focus(); event.preventDefault();
    //                     }
    //                     else if (event.keyCode > 64 && event.keyCode < 91) {
    //                         inputs[i].value = String.fromCharCode(event.keyCode);
    //                         if (i !== inputs.length - 1) inputs[i + 1].focus(); event.preventDefault();
    //                     }
    //                 }
    //             });
    //         }
    //     } OTPInput();
    // });
    
    return (
        <div className="h-screen bg-blue-500 py-20 px-3 ">
            <div className="container mx-auto mt-36">
                <div className="max-w-sm mx-auto md:max-w-lg">
                    <div className="w-full">
                        <div className="bg-white h-64 py-3 rounded text-center">
                            <h1 className="text-2xl font-bold">OTP Verification</h1>
                            <div className="flex flex-col mt-4">
                                <span>Enter the OTP you received at</span>
                                <span className="font-bold">{hideEmail(email)}</span>
                            </div>
                            <input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            type="email"
                            className="mt-6 pl-5  py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 font-bold w-1/3 border-2 border-black"
                            placeholder="Enter your otp..."
                        />

                            <div className="flex justify-center text-center mt-5">
                                <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span className="font-bold">Resend OTP</span><i className='bx bx-caret-right ml-1'></i></a>
                            </div>

                            <button onClick={handleClick} className="inline-block mt-3 bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  rounded border border-current px-8 py-[6px] text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500">
                                submit otp
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Otp