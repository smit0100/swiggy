import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import resto from "../../Assets/resto.jpg";
import Restaurants from "../../Apis/Restaurants";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Request() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [load, setLoad] = useState(false)
  const [data, setData] = useState('')
  useEffect(() => {
    (async () => {
      setLoad(true)

      const response = await axios.get(`http://localhost:4000/resturant/fetchAll`)
      setData(response.data.response)
      setLoad(false)
    })()
  }, [])


  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <Toaster />
      <div className="flex flex-wrap -mx-1 lg:-mx-4 gap-3 justify-start">
        {load==false && data!='' && data.map((item, index) => {
          return (
            <Card
              key={index}
              name={item.name}
              restaurantId={item._id}
            />
          );
        })}
      </div>
    </div>
  );
}
