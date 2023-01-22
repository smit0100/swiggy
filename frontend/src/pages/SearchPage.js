import React from 'react'

const SearchPage = () => {
    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='w-4/5 h-full bg-slate-400 mt-32 flex flex-col items-center'>

                <div className='flex justify-center items-center w-full'>
                    <input
                        type="email"
                        className="border-0  mt-6 pl-5 pr-36 py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-3/5 ease-linear transition-all duration-150 font-bold"
                        placeholder="Search for restaurants and foods"/>
                    <i className="fa-solid fa-magnifying-glass pr-3 -ml-8 mt-6 text-gray-400 text-xl"></i>
                </div>

                <div className='flex justify-center items-center w-full'>

                </div>

            </div>
        </div>
    )
}

export default SearchPage