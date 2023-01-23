import axios from 'axios'
import React from 'react'
import Stripe from 'react-stripe-checkout'

const StripeComponent = () => {

   

    // const tokenHanlder = (token) => {
    //     handleToken(100, token);
    // }

    // handleToken = (totalAmout, token) => {
    //     try {
    //         axios.post('url', {
    //             token: token.id,
    //             amount:totalAmout
    //       })  
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
  return (
      <div>
          {/* <Stripe stripkey='' token={tokenHanlder} /> */}
    </div>
  )
}

export default StripeComponent