import React from "react"

const CustomerOrderCard = ({items}) => {

    return (
        <div className="flex flex-wrap anim py-3 gap-5">
            <div className="relative ">
                <img className="h-36 w-36 rounded-md object-cover" src={items?.product.imageUrl} alt="food" />
            </div>
            <div className="sm:pt-5 lg:pt-0 flex items-center ">
                <div className="space-y-2">
                    <img alt="veg" className="w-5 mr-1" src="../svg/veg.svg" />
                    <p className="font-bold capitalize">{items?.product.name} </p>
                    <p className="text-sm">&#8377; {items?.product.price}</p>
                    <p className="text-sm">  {items?.quantity}</p>
                    <p className='text-md text-slate-500 capitalize'>{items?.product.description}</p>
                </div>
            </div>
        {/* {items.map(order => <div>{order.customer}</div>)} */}
        </div>

    )
}

export default CustomerOrderCard