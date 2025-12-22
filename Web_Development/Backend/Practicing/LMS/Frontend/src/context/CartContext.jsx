import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await axiosInstance.get("/cart");
    // console.log(typeof res.data);
    setCart(res.data);
  };

  const addToCart = async (courseId) => {
    const existingCourse = cart.find((item) => {
      console.log(item._id, courseId);
      return item._id === courseId;
    });
    if (existingCourse) await axiosInstance.patch(`/cart/${courseId}`);
    else {
      const res = await axiosInstance.post(`/cart/${courseId}`);
    }
    await fetchCart();
  };

  const removeFromCart = async (courseId) => {
    try {
      const res = await axiosInstance.delete("/cart/" + courseId);
      console.log(res);
      await fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const cartCount =
    cart.length &&
    cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartCount, fetchCart }}
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
