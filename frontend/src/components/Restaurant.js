import React from 'react'
import { Link } from 'react-router-dom'

const Restaurant = ({ restaurant }) => {
  
  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <div className='w-[350px] h-[390px] md:w-[250px] md:h-[330px] justify-center relative overflow-hidden rounded-md cursor-pointer shadow-xl group text-center align-middle'>
        <img className='absolute object-cover w-full h-full rounded-md group-hover:scale-110 transition-all duration-500' alt='food pic' src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'></img>
        <div className='absolute bottom-0 h-11 w-full bg-black/10'>
          <p className='absolute left-6 bottom-2 text-2xl uppercase'>{restaurant.name}</p>
        </div>

      </div>
      </Link>
    
  )
}

export default Restaurant