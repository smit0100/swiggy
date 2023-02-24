import React from 'react'
import { Link } from 'react-router-dom'

const Restaurant = ({ restaurant }) => {
  console.log(restaurant);
  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <div className='w-[350px] h-[390px] md:w-[250px] md:h-[330px] justify-center relative overflow-hidden rounded-md cursor-pointer shadow-xl group text-center align-middle'>
        <img className='absolute object-cover w-full h-full rounded-md group-hover:scale-110 transition-all duration-500' alt='food pic' src={restaurant.bgImageUrl[0]}></img>
        <div className='absolute bottom-0 h-11 w-full bg-black/10'>
          <p className='absolute left-6 bottom-2 text-2xl uppercase'>{restaurant.name}</p>
        </div>

      </div>
      </Link>
    
  )
}

export default Restaurant