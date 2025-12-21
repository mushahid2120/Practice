import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const CartContext = createContext(undefined);


export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart=async()=>{
    const res=await axiosInstance.get('/cart')
    console.log(res.data)
    setCart(res.data)
  }

  const addToCart = async (courseId) => {
      const res=await axiosInstance.post('/courseId',)
      
      const existingCourse = cart.find((item) => item._id === courseId);

      if (existingCourse) 
        return await axiosInstance.patch('/'+courseId)
      return await axiosInstance.post('/'+courseId)
  };

  const removeFromCart = async(courseId) => {
    const res=await axiosInstance.delete('/'+courseId)
    console.log(res)
  };

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartCount ,fetchCart}}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
