import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DeliveryBoy from "../../Apis/DeliveryBoy";
import { Images } from "../../Assets";
import { DeliveryBoyCard } from "../../Components";
const data = [
  {
    name: "Smit",
    image: Images.Avatar3,
  },
  {
    name: "Rohit",
    image: Images.Avatar3,
  },
  {
    name: "Poojan",
    image: Images.Avatar3,
  },
  {
    name: "Dixit",
    image: Images.Avatar3,
  },
];
export default function GetDeliveryBoy() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    (async () => {
      DeliveryBoy.GetRequests()
        .then((res) => {
          console.log("===fetchall", res);
          if (res?.courierBoy) {
            setDatas(res?.data);
          }
        })
        .catch((e) => console.log("====ee", e));
    })();
  }, []);
  return (
    <div>
      <h1 className="ml-5 max-sm:mb-4 dark:text-white font-semibold text-3xl">
        &bull; Delivery Boy's request
      </h1>
      <div className="flex flex-wrap justify-start gap-2 max-sm:justify-center items-center mb-12">
        {data.map((item, index) => {
          return (
            <DeliveryBoyCard image={item.image} name={item.name} key={index} />
          );
        })}
      </div>
    </div>
  );
}
