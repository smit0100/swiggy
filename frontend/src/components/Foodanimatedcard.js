import React from 'react'

const Foodanimatedcard = () => {
  return (
    <>
        <div className='w-[380px] h-[420px] relative overflow-hidden rounded-md cursor-pointer shadow-2xl group text-center align-middle'>
            <img className='absolute w-full h-full rounded-md group-hover:scale-110 transition-all duration-500' alt='food pic' src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'></img>
            <div className='absolute bottom-0 h-14 w-full text-4xl group-hover:h-full group-hover:bg-opacity-20 bg-gray-400  transition-all duration-700'>
            <p className='mt-2'>ok that</p>
            <button className='mt-4 p-3 rounded bg-yellow-500 transition-all duration-700 hover:bg-green-400'>Order Now</button>
            </div>
        </div>
    </>
  )
}

export default Foodanimatedcard