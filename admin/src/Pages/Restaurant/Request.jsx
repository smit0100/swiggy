import React, { useEffect } from 'react'
import Card from '../../Components/Card'
import product3 from '../../Assets/product3.jpg'
import Restaurants from '../../Apis/Restaurants'
import axios from 'axios'
export default function Request() {
    const data = [
        {
            name:'resto',
            path:product3
        },
        {
            name:'resto',
            path:product3
        },
        {
            name:'resto',
            path:product3
        }
    ]
    // useEffect(async() => {
    // //   Restaurants.GetRequests().then((res)=>{
    // //     console.log("=====>>>",res);
    // //   }).catch((e)=>console.log(e))
    //   const data = await axios.get("http://localhost:4000/fetchAll");
    //   console.log('====================================');
    //   console.log(data);
    //   console.log('====================================');
    // }, [])
    
  return (
    <div class="container my-12 mx-auto px-4 md:px-12">
    <div class="flex flex-wrap -mx-1 lg:-mx-4 gap-3 justify-center">
        {
            data.map((item,index)=>{
                return(
                    <Card
                    key={index}
                    path={item.path}
                    onClick={()=>{}}
                    name={item.name}
                    />
                )
            })
        }
        </div>
        </div>
  )
}
