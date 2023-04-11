import React from "react"

const CustomerOrderCard = ({items}) => {

    return (
        <div className="flex flex-wrap anim py-3 gap-5">
            <div className="relative flex items-center">
                <img className="h-36 w-36 rounded-md object-cover" src={items?.product.imageUrl} alt="food" />
            </div>
            <div className="sm:pt-5 lg:pt-0 flex items-center w-2/3">
                <div className="space-y-2">
                    <img alt="veg" className="w-5 mr-1" src="../svg/veg.svg" />
                    <p className="font-bold capitalize">{items?.product.name} </p>
                    <p className="text-md">&#8377; {items?.product.price} <span className='text-sm font-light text-slate-500'>/Price</span></p>
                    <p className="text-md">  {items?.quantity} <span className='text-sm font-light text-slate-500'>/Qty</span></p>
                    <p className='text-md text-slate-800 capitalize'>{items?.product.description}</p>
                </div>
            </div>
        {/* {items.map(order => <div>{order.customer}</div>)} */}
        </div>

    )
}

export default CustomerOrderCard