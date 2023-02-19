import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FoodCard from './FoodCard'
import Restaurant from './Restaurant'


const Directory = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false)
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    (async () => {
      setLoad(true)
      const response = await axios.get(`http://localhost:4000/resturant/fetchAll?pageNumber=${pageNumber}&pageSize=${10}`);
      setData(response.data.results)
      setTotalPages(response.data.totalPages)
      setLoad(false)
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


  // useEffect(() => {
  //   console.log(data);
  // },[data])
  return (
    <>
      <div className='relative w-[98.70vw] h-4/5  flex flex-col content-center justify-center' >
        <img alt='pic' src='https://i.ibb.co/2hdPfQf/1.png' className='blur-[3px] w-screen h-[500px] object-cover' />
        <div className='w-full absolute left-0 '>
          <p className='text-4xl md:text-6xl lg:text-8xl text-white transition-all z-20 duration-300 align-middle text-center'>Zometo</p>
          <p className='text-2xl md:text-3xl lg:text-5xl text-white transition-all duration-300 align-middle text-center'>Discover the best food & drinks in Surat</p>

        </div>
      </div>
      <div className='containerr'>
        <div className='row'>
          {
            load === true ? (
              <div className="flex justify-center items-center h-screen w-screen ">
                <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
                </div>
              </div>) : data.map(restaurant => <div className='column'><Restaurant restaurant={restaurant} /></div>)
          }
          <div class="flex w-full justify-center">
            <a href="#" class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              &laquo;
            </a>
            <a href="#" class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4" onClick={handlePrevPage} disabled={pageNumber === 1}>
              Pre
            </a>
            <span href="#" class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
              {pageNumber}
              
            </span>
            <button href="#" class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4" onClick={handleNextPage} disabled={pageNumber === totalPages}>
              Next
            </button>

            <a href="#" class="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              &raquo;
            </a>
          </div>

        </div>
      </div>

      <div className='containerr'>
        <div className='row'>
          <div className='column'><FoodCard /></div>

        </div>

        <div>
          {/* {blogPosts.map(blogPost => <BlogPost key={blogPost._id} {...blogPost} />)} */}

        </div>

      </div>
    </>

  )
}

export default Directory