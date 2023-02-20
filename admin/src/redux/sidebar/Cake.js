import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cakebuy,cakesell,cakebuy1,cakesell1 } from './sidebarSlice'
export const Cake = () => {
    const cake=useSelector(state=>state.cake.cake)
    const dispatch=useDispatch();
    const [num,setnum]=useState(1);
  return (
    <>
    <button onClick={()=>dispatch(cakebuy())}>-</button>
    <div>{cake}</div>
    <button onClick={()=>dispatch(cakesell())}>+</button><br/>
    <input type="number" onChange={e=>setnum(e.target.value)}/><br/>
    <button onClick={()=>dispatch(cakebuy1(num))}>-</button>
    <button onClick={()=>dispatch(cakesell1(num))}>+</button><br/>

    </>
  )
}
