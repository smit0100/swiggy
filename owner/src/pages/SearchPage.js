import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert'
import Loader from '../components/Loader';
const SearchPage = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false)
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const owner = useSelector(state => state.userData.user);

  useEffect(() => {
    (async () => {
      try {
        if (owner != null) {
          setLoad(true)
          const response = await axios.get(`http://localhost:4000/resturant/search?q=${search}&pageNumber=${pageNumber}&pageSize=${10}&id=${owner._id}`);
          console.log(response);
          setData(response.data.response)
          setTotalPages(response.data.totalPages)
          setLoad(false)
        }
      } catch (err) {
        console.log(err);
      }
    })()
  }, [pageNumber, search])

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
    // <>
    //   <div><img className='image-cover w-screen h-3/5 absolute -z-10 blur-sm' src='https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=' /></div>
    //   <div className='w-full h-full flex justify-center pb-5'>
    //     <div className='w-4/5 h-full bg-slate-100 mt-60 flex flex-col items-center rounded-md'>
    //       <div className='flex justify-center items-center w-full'>
    //         <input
    //           type="text"
    //           className="border-0  mt-6 pl-5 pr-36 py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-3/5 ease-linear transition-all duration-150 font-bold"
    //           placeholder="Search for restaurants and foods"
    //           onChange={(event) => setSearch(event.target.value)}
    //         />
    //         <i className="fa-solid fa-magnifying-glass pr-3 -ml-8 mt-6 text-gray-400 text-xl"></i>
    //       </div>

    //       <div className="">
    //         <div className=''>
    //           {
    //             load === true ? (
    //               <Loader />
    //             ) : data.map(restaurant => <div className='cursor-pointer'>
    //               <div className="bg-white flex items-center border rounded-lg p-6 shadow-lg mt-4">
    //                 <img src={`${restaurant.imageUrl}`} alt="Food item" className="w-32 h-32 rounded-full mr-6" />
    //                 <div className=''>
    //                   <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
    //                   <p className="text-gray-700 text-base mb-4">{restaurant.description}</p>
    //                   <div className="flex items-center justify-between">
    //                     <span className="text-lg font-bold">₹ {restaurant.price}</span>
    //                   </div>
    //                 </div>
    //               </div>

    //             </div>)
    //           }
    //           <div className='py-5'>

    //             <div className="flex w-full justify-center">
    //               <a href="#" className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4" onClick={handlePrevPage} disabled={pageNumber === 1}>
    //                 Pre
    //               </a>
    //               <span href="#" className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
    //                 {pageNumber}

    //               </span>
    //               <button href="#" className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4" onClick={handleNextPage} disabled={pageNumber === totalPages}>
    //                 Next
    //               </button>
    //             </div>
    //           </div>

    //         </div>
    //       </div>



    //       <div className='flex justify-center items-center w-full'>

    //       </div>


    //     </div>
    //   </div>
    // </>
    <>
    <div>
      <img className='image-cover w-screen h-3/5 absolute -z-10 blur-sm' src='https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=' /></div>
    <div className='w-full h-full flex justify-center pb-5  '>
      <div className='w-4/5 h-full bg-slate-100 mt-60 flex flex-col items-center rounded-md'>
        <div className='flex justify-center items-center w-full'>
          <input
            type="text"
            className="border-0  mt-6 pl-5 pr-36 py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-3/5 ease-linear transition-all duration-150 font-bold"
            placeholder="Search for restaurants and foods"
            onChange={(event) => setSearch(event.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass pr-3 -ml-8 mt-6 text-gray-400 text-xl"></i>
        </div>

        <div className='w-4/5 px-5'>
          {
            load === true ? (
              <Loader />
            ) : data.map(restaurant => <div className='cursor-pointer'>
              <div  className="bg-white flex items-center border rounded-lg p-6 shadow-lg mt-4">
                <img src={`${restaurant.imageUrl}`} alt="Food item" className="w-32 h-32 rounded-full mr-6" />
                <div className='w-full'>
                  <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
                  <p className="text-gray-700 text-base mb-4">{restaurant.description}</p>
                    <span className="text-lg font-bold">₹ {restaurant.price}</span>
                </div>
              </div>

            </div>)
          }
          <div className='py-5'>

            <div className="flex w-full justify-center">
              <a href="#" className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4" onClick={handlePrevPage} disabled={pageNumber === 1}>
                Pre
              </a>
              <span href="#" className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
                {pageNumber}

              </span>
              <button href="#" className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4" onClick={handleNextPage} disabled={pageNumber === totalPages}>
                Next
              </button>

              {/* <a href="#" className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                  &raquo;
                </a> */}
            </div>
          </div>

        </div>



        <div className='flex justify-center items-center w-full'>

        </div>


      </div>
    </div>
  </>
  )
}

export default SearchPage