import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentColor } from '../redux/user/userSlice';

const Directory = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentColor("white"))
  }, [])
  return (
    <>
      <div className='relative w-[98.70vw] h-4/5  flex flex-col content-center justify-center' >
        <img alt='pic' src='https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&h=300&q=80' className='blur-[3px] w-screen h-[500px] object-cover' />
        <div className='w-full absolute left-0 '>
          <p className='text-4xl md:text-6xl lg:text-8xl text-white transition-all z-20 duration-300 align-middle text-center'>FOODPOINT</p>
          <p className='text-2xl md:text-3xl lg:text-5xl text-white transition-all duration-300 align-middle text-center'>Discover the best food & drinks in Surat</p>
        </div>
      </div>
    </>
  )
}

export default Directory