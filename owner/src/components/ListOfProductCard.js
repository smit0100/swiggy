import React from 'react'
import { FcLike } from 'react-icons/fc'

const ListOfProductCard = () => {
    return (
        <div className='relative mb-20'>
            <img src="https://source.unsplash.com/random/350x350" alt=" random imgee" className="w-72 h-72 rounded-lg object-cover  shadow-md transition-all duration-300" />

            <div className="absolute group top-52 px-4 w-full h-36 overflow-hidden transition-all duration-500 hover:top-0 hover:px-0 hover:bg-white/70 hover:h-full" >
                <div className="rounded-lg bg-white group-hover:h-full group-hover:bg-white/50 p-5 shadow-lg overflow-hidden">
                    <div className="flex items-baseline">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">&bull; Category name</div>
                    </div>
                    <h4 className="mt-1 truncate text-md font-semibold uppercase leading-tight">Food Name</h4>
                    <div className="mt-1 font-medium">
                        <span class="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-pink-400 border border-pink-400 uppercase flex w-fit"><FcLike className='mr-1' />bestseller</span>
                    </div>
                    <div className="mt-1 flex justify-between items-center">
                        <span className="text-md font-medium tracking-wide capitalize text-teal-600">4/5 ratings </span>
                    </div>
                    <div className="mt-1 font-medium">
                        ₹500<span className="text-sm text-gray-600"> /Price</span>
                    </div>

                    <div className="text-sm mt-1 font-ligh text-slate-700">
                        Tomato / capsicup / chilly / olive
                    </div>
                    <div className="mt-1 font-medium">
                        Other description
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListOfProductCard