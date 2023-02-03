import React from 'react'
import avatar from '../../Assets/avatar.jpg'
export default function User() {
    const adrees = {
        area:"varachha",
        city:"surat",
        state:"gujrat",
        pincode:303333
    }
    const UserAddress = (address) => {
        return (
          <div className="bg-slate-200 max-w-lg shadow-lg p-4 rounded-lg">
            <h2 className=" font-extrabold text-2xl">Address</h2>
            <div className='flex-1 flex justify-between mb-2 pt-5 border-t-1 border-gray-500'>
            <h2 className='font-bold'>Area</h2>
            <p className="text-gray-700">{address?.area}</p>
            </div>
            <div className='flex-1 flex justify-between mb-2'>
            <h2 className='font-bold'>City</h2>
            <p className="text-gray-700">{address?.city}</p>
            </div>
            <div className='flex-1 flex justify-between mb-2'>
            <h2 className='font-bold'>State</h2>
            <p className="text-gray-700">{address?.state}</p>
            </div>
            <div className='flex-1 flex justify-between mb-2'>
            <h2 className='font-bold'>Pincode</h2>
            <p className="text-gray-700">{address?.pincode}</p>
            </div>
          </div>
        );
      };
  return (
    <div className='p-5'>
    <div className="flex flex-col sm:flex-row items-center p-4">
      <img
        src={avatar}
        alt="User"
        className="w-32 h-32 rounded-full object-cover mr-4"
        />
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 dark:text-white">User Name</h3>
        <p className="text-sm font-light mb-2 dark:text-gray-500">user@email.com</p>
        <p className="text-sm font-light dark:text-gray-500">555-555-5555</p>
      </div>
      <button className="text-gray-800 border-2 border-gray-300 py-2 px-4 rounded-lg hover:bg-slate-200 dark:text-white dark:hover:bg-slate-600">
        Edit
      </button>
    </div>
    {UserAddress(adrees)}
        </div>
  )
}
