import React from 'react'

const Directory = () => {
  return (
    <>
      <div className='relative w-[98.70vw] h-4/5  flex flex-col content-center justify-center' >
        <img alt='pic' src='https://i.ibb.co/2hdPfQf/1.png' className='blur-[3px] w-screen h-[500px] object-cover' />
        <div className='w-full absolute left-0 '>
          <p className='text-4xl md:text-6xl lg:text-8xl text-white transition-all z-20 duration-300 align-middle text-center'>FOODPOINT</p>
          <p className='text-2xl md:text-3xl lg:text-5xl text-white transition-all duration-300 align-middle text-center'>Discover the best food & drinks in Surat</p>
        </div>
      </div>
    </>
  )
}

export default Directory