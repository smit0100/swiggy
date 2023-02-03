import React, { useEffect, useState } from 'react'
import Order from '../../Apis/Order';

export default function GetOrder() {
  const [datas, setDatas] = useState([]);
    useEffect(() => {
        (async () => {
          Order.GetOrders()
            .then((res) => {
              console.log("response====", res);
              setDatas(res?.data);
            })
            .catch((e) => console.log("====ee", e));
        })();
      }, []);
  return (
    <div>GetOrder</div>
  )
}
