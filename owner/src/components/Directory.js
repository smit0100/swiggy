import React from 'react'
import { useNavigate } from 'react-router-dom'

const Directory = () => {
    const navigate = useNavigate()
    const checkMark = (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48"><linearGradient id="I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"></stop><stop offset="1" stop-color="#088242"></stop></linearGradient><path fill="url(#I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05"></path><path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07"></path><path fill="#fff" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"></path></svg>)
    return (
        <div className='relative h-screen w-screen'>
            <img className='h-4/6 w-full object-cover' src='https://i.ibb.co/2hdPfQf/1.png' alt='img' />
            <div className='absolute top-40 sm:left-[40px] md:left-[500px] space-y-3'>
                <p className='text-4xl text-white '>Register your restaurant on Zomato</p>
                <p className=' text-xl text-slate-300 font-light'>and get more customers!</p>
                <button className='text-xl bg-blue-500 font-light px-14 rounded py-2 text-white 'onClick={() => navigate("/resturantRegister")}>Register your restaurant</button>
                <div className='absolute bg-white top-52 left-0 w-full h-fit rounded-md shadow-md p-10'>
                    <div className='pb-10 space-y-2'>
                        <h1 className='text-center text-3xl text-slate-800'>Get started with online ordering</h1>
                        <h2 className='text-center text-slate-500'>Please keep the documents ready  for a smooth signup</h2>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-full sm:w-1/2 '>
                            <ul className='sm:pl-10 space-y-4'>

                                <li className='flex gap-2'>{checkMark}PAN card copy</li>
                                <li className='flex gap-2'>{checkMark}Your restaurant menu</li>

                            </ul>
                        </div>
                        <div className='w-full sm:w-1/2 pt-5 sm:pt-0'>
                            <ul className='space-y-4'>
                                <li className='flex gap-2'>{checkMark}Dish images for top 5 items</li>
                                <li className='flex gap-2'>{checkMark}Bank account details</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Directory