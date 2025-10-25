import React from 'react'
import Button from './Button.js'
import AppleBasket from './AppleBasket.js'
import './AppleCounter.css'
import leftArrow from 'url:../Assets/images/left-arrow.svg'
import rightArrow from 'url:../Assets/images/right-arrow-icon.png'
import { useState } from 'react'


const totalApple=10;

export default function AppleCounter() {
  
  const [leftBasketApple,leftUseState]=useState(3);
  const [rightBasketApple,rightUseState]=useState(totalApple-leftBasketApple)

  const leftClickHandler=()=>{
    if(rightBasketApple>0){
      leftUseState(leftBasketApple+1)
      rightUseState(rightBasketApple-1)
      console.log("left = "+ leftBasketApple+ "\t\t right= "+rightBasketApple)
    }
  } 
  const rightClickHandler=()=>{
    if(leftBasketApple>0){
            leftUseState(leftBasketApple-1)
            rightUseState(rightBasketApple+1)
            console.log("left = "+ leftBasketApple+ "\t\t right= "+rightBasketApple)
            
    }

  } 

  return (
    <>
    <div className="appleCounter-container">
        <AppleBasket basketName="Basket 1" appleCount={leftBasketApple}/>
        <Button  imgUrl={leftArrow} imgCaption="left-arrow" onClickFun={leftClickHandler}/>
        <Button imgUrl={rightArrow} imgCaption="right-arrow" onClickFun={rightClickHandler}/>
        <AppleBasket basketName="Basket 2" appleCount={rightBasketApple}/>
    </div>
    </>
  )
}
