import React from 'react'

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen w-screen bg-transparent">
            {/* <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
            </div> */}
              <img src='https://s10.gifyu.com/images/loader175ba3dbc6a2636c.gif' className='w-56 ' alt='this is loader'/>

        </div>
    )
}

export default Loader