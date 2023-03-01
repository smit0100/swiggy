import React from "react"

const CustomerOrderCard = ({items}) => {

    return (
        <div className="flex flex-wrap anim py-3 gap-5">
            <div className="relative ">
                <img className="h-36 w-36 rounded-md object-cover" src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="food" />
            </div>
            <div className="sm:pt-5 lg:pt-0 flex items-center ">
                <div className="space-y-2">
                    <img alt="veg" className="w-5 mr-1" src="../svg/veg.svg" />
                    <p className="font-bold capitalize">Pizaa </p>
                    <p className="text-sm">&#8377; 500</p>
                    <p className='text-md text-slate-500 capitalize'>Onions|Tomatoes|Capsicum|Sweet Corns</p>
                </div>
            </div>
        {items.map(order => <div>{order.customer}</div>)}
        </div>

    )
}

export default CustomerOrderCard