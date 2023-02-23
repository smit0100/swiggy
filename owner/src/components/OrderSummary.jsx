import React from 'react'
import { useParams } from 'react-router-dom'

const OrderSummary = () => {
    const { orderId } = useParams()
    return (
        <>
            <div className='mx-5 shadow-md bg-transparent '>
                <div className='flex flex-wra'>
                    <div></div>

                </div>
            </div>
        </>
    )
}

export default OrderSummary