import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DeliveryBoy from "../../Apis/DeliveryBoy";

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
      {datas?.length == 0 ? <p>No delivery boy's request found</p> : <>Found request</>}
    </div>
  );
}
