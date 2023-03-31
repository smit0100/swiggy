import React, { useState } from 'react'
import { FcLike } from 'react-icons/fc'
import UpdateProductPopup from './UpdateProductPopup';
import axios from 'axios'
import swal from 'sweetalert'
import { useSelector } from 'react-redux';

const ListOfProductCard = ({ item,setData}) => {
    // console.log(item);
    const [showModal, setShowModal] = useState(false);
    const owner=useSelector(state=>state.userData.user)
    
    const deleteProduct = async (e) => {
        e.preventDefault()
        if(owner!=null){
        try {
            swal({
                title: "Are you sure !",
                text: "Your product delete permanent",
                icon: "warning",
                buttons: ["NO", "YES"],
                cancelButtonColor: "#DD6B55",
                confirmButtonColor: "#DD6B55",
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        const res = await axios.get(`http://localhost:4000/product/deleteProduct/?id=${item._id}&resturant=${owner._id}`)
                        console.log(res);
                        setData(res.data.product)
                        swal("your product removed from list ", {
                            icon: "success",
                        });
                    } else {
                        swal("Your product still in list");
                    }
                });
        } catch (err) {
            console.log(err);
        }
    }
    }

    return (
        <div className='relative mb-20'>
            <img src={`${item.imageUrl}`} alt=" random imgee" className="w-72 h-72 rounded-lg object-cover  shadow-md transition-all duration-300" />

            <div className="absolute group top-52 px-4 w-full h-36 overflow-hidden transition-all duration-500 hover:top-0 hover:px-0 hover:bg-white/70 hover:h-full" >
                <div className="relative rounded-lg bg-white group-hover:h-full group-hover:bg-white/50 p-5 shadow-lg overflow-hidden">
                    <div className="flex items-baseline">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">&bull; {item ? item.category.name : ""}</div>
                    </div>
                    <h4 className="mt-1 truncate text-md font-semibold uppercase leading-tight">{item ? item.name : ""}</h4>
                    <div className="mt-1 font-medium">
                        <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-pink-400 border border-pink-400 uppercase flex w-fit"><FcLike className='mr-1' />bestseller</span>
                    </div>
                    <div className="mt-1 flex justify-between items-center">
                        <span className="text-md font-medium tracking-wide capitalize text-teal-600">4/5 ratings </span>
                    </div>
                    <div className="mt-1 font-medium">
                        ₹{item ? item.price : "0.00"}<span className="text-sm text-gray-600"> /Price</span>
                    </div>

                    <div className="text-sm mt-1 font-ligh text-slate-700 first-letter:uppercase">
                        {item ? item.description : ""}
                    </div>
                    <div className="mt-1 font-medium">
                    </div>
                    <div className='absolute bottom-3 left-3 space-x-3'>
                        <button onClick={(e) => { setShowModal(true) }} className="rounded-full inline-block bg-white hover:text-white hover:bg-blue-600 -bottom-4 font-bold  border border-current w-fit p-2 ml-1 text-xs uppercase  text-blue-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-blue-500">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                            </svg>
                        </button>
                        <button onClick={deleteProduct} className=" inline-block bg-white hover:text-white hover:bg-red-600 -bottom-4 font-bold  rounded-full border border-current w-fit p-2 ml-1 text-xs uppercase  text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-red-500" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /> <path fill-ru="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {showModal ? (
                <UpdateProductPopup setShowModal={setShowModal} id={item?._id} price={item?.price} name={item?.name} description={item?.description} cat={item?.category?.name} catId={item?.category?._id} subCatId={item?.subCategory} setData={setData}/>
            ) : null}
        </div>
    )
}

export default ListOfProductCard
