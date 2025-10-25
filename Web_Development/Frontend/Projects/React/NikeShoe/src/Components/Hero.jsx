import React from "react";
import heroShoe from "../assets/shoe_image.png";
import Button from "./Button";
import flipkartImg from "../assets/flipkart.png"
import amazonImg from "../assets/amazon.png"

export default function Hero() {
  return (
    <main className="flex px-16 py-8 justify-center items-center ">
      <section className="w-[50%]">
        <h2 className="text-6xl font-extrabold ">YOUR FEET DESERVE THE BEST</h2>
        <p className="py-4 font-semibold text-[#5A5959]" >
          YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
          SHOES.YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
          SHOES.
        </p>
        <div className="space-x-4">
            <Button buttonName="Shop Now" bgColor="#D01C28" textColor="white" borderColor="#D01C28" />
            <Button buttonName="Category" bgColor="#fffff" textColor="#5A5959" borderColor="#5a5959" />
        </div>
        <div className="">
            <p className="font-light text-[#5A5959] text-[14px] pt-4 pb-2">Also Available On</p>
            <div className="flex justify-start items-center h-6 gap-4">
                <img className="h-full" src={flipkartImg} alt="flipart Icon" />
                <img className="h-full" src={amazonImg} alt="Amazon Icon" />
            </div>
        </div>
      </section>
      <section className="flex items-center justify-center">
        <img className="max-w-[320px]" src={heroShoe} alt="" />
      </section>
    </main>
  );
}
