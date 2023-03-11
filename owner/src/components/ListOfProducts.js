import React, { useEffect, useState } from 'react'
import ListOfProductCard from './ListOfProductCard';
import { useSelector } from "react-redux"
import axios from 'axios'
import Loader from './Loader'

const ListOfProducts = () => {
  const user = useSelector(state => state.userData.user)
  const [load, setLoad] = useState(false)
  const [data, setData] = useState(null)
  useEffect(() => {
    (async () => {
      setLoad(true)
      try {
        const response = await axios.get(`http://localhost:4000/resturant/allProduct?id=${user._id}`);
        setData(response.data.result.product)
        console.log(response.data.result.product)
        setLoad(false)
      }
      catch (err) {
        console.log(err);
      }
    })()
  }, [])

  return (
    <>
      <div className='flex flex-wrap'>
        <div className=' w-full sm:w-3/12 p-4 top-0 bg-black/10 left-0 overflow-hidden relative'>
          <h1 className='text-2xl font-semibold py-4'>List of Products</h1>

          <ul className="space-y-2">
            {menuItems.map((menu, index) => {
              return <MenuItems items={menu} key={index} />;
            })}
          </ul>

        </div>
        <div className='w-full sm:w-9/12 p-4'>
          <h1 className='text-3xl text-center border-b-2 border-black uppercase mb-5 pb-3'>List of Products</h1>
          {load === true ?
            <div className="flex justify-center items-center h-1/2 w-full bg-transparent">
              <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
              </div>
            </div>
            :
            <div className="flex flex-wrap gap-4 justify-evenly">
              {
                data != null && data.map(item => <ListOfProductCard item={item} />)
              }
            </div>
          }
        </div>
      </div>

    </>
  )
}

export default ListOfProducts

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <li>
      {
        items.submenu ? (
          <>
            <button type="button"
              aria-haspopup="menu"
              className="font-semibold rounded inline-flex items-center justify-between w-full p-1 text-gray-500 bg-white border-2 border-gray-200 cursor-pointer   peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50"
              aria-expanded={dropdown ? "true" : "false"}
              onClick={() => setDropdown((prev) => !prev)}>
              {items.title}{" "}
            </button>
            <Dropdown submenus={items.submenu} dropdown={dropdown} />
          </>
        ) : (
          <div className="font-semibold rounded inline-flex items-center justify-between w-full p-1 text-gray-500 bg-white border-2 border-gray-200 cursor-pointer   peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50">{items.title}</div>
        )
      }
    </li>
  )
}

const Dropdown = ({ submenus, dropdown }) => {
  return (
    <ul className={`${!dropdown ? "hidden" : ""} mt-1 space-y-1 bg-white/60`}>
      {submenus.map((submenu, index) => (
        <li key={index} className="menu-items pl-5">
          <div>{submenu.title}</div>
        </li>
      ))}
    </ul>
  );
};

export const menuItems = [
  {
    title: 'South indian',
  },
  {
    title: 'Italian',
    submenu: [
      {
        title: 'Pizaa',
      },
      {
        title: 'Burger',
      },
      {
        title: 'Speggeti',
      },
    ],
  },
  {
    title: 'Chinese',
    submenu: [
      {
        title: 'Mansuriyan',
      },
      {
        title: 'Manchaw soupe',
      }
    ],
  },
];

