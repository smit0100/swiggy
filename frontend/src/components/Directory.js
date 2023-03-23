import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FoodCard from './FoodCard'
import Restaurant from './Restaurant'
import Loader from './Loader'


const Directory = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false)
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    (async () => {
      try {
        setLoad(true)
        console.log(process.env.REACT_APP_BASEURL);
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/resturant/fetchAll?pageNumber=${pageNumber}&pageSize=${10}`);
        setData(response.data.results)
        setTotalPages(response.data.totalPages)
        setLoad(false)
      } catch (err) {
        console.log(err);
      }
    })()
  }, [pageNumber])


  function handlePrevPage(e) {
    e.preventDefault()
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function handleNextPage(e) {
    e.preventDefault()
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  return (
    <>
      <div className='relative w-[98.70vw] h-4/5  flex flex-col content-center justify-center' >
        <img alt='pic' src='https://i.ibb.co/PM2sYy4/orangeBg.jpg' className=' blur-[1px] w-full h-[500px] object-cover' />
        <div className='w-full absolute left-0 '>
          <p className='text-3xl md:text-5xl lg:text-7xl text-white transition-all z-20 duration-300 align-middle text-center'>FOODPOINT</p>
          <p className='text-2xl md:text-3xl lg:text-5xl text-white transition-all duration-300 align-middle text-center capitalize'>Discover the <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 relative inline-block">
    <span class="relative text-white">best food & drinks</span>
  </span></p>

        </div>
      </div>
      <div className='containerr'>
        <h1 className='text-4xl font-semibold tracking-[2px] text-center my-5 border-b-4 pb-3 text-[rgba(246,147,18,255)] border-b-orange-500 uppercase'>Restaurant</h1>
        <div className='row'>
          {
            load === true ? (
              <Loader />
            ) : data.map(restaurant => <div className='column'><Restaurant restaurant={restaurant} /></div>)
          }
          <div className="flex w-full justify-center">
            <a href="#a" className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              &laquo;
            </a>
            <a href="#a" className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4" onClick={handlePrevPage} disabled={pageNumber === 1}>
              Pre
            </a>
            <span href="#a" className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
              {pageNumber}

            </span>
            <button className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4" onClick={handleNextPage} disabled={pageNumber === totalPages}>
              Next
            </button>

            <a href="#a" className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              &raquo;
            </a>
          </div>

        </div>
      </div>

      {/* <div className='containerr'>
        <div className='row'>
          <div className='column'><FoodCard /></div>
        </div>
      </div> */}
    </>

  )
}

export default Directory