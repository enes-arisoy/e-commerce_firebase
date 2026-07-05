import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const normalizePrice = useCallback((value) => {
    if (value === null || value === undefined || value === "") return 0;
    const parsed = Number(String(value).replace(/[$,]/g, ""));
    return Number.isNaN(parsed) ? 0 : parsed;
  }, []);

  const normalizeCartItem = useCallback((product) => {
    const rawPrice = product?.productPrice ?? product?.price ?? product?.unitPrice ?? 0;
    const price = normalizePrice(rawPrice);

    return {
      ...product,
      price,
      productPrice: price,
      quantity: 1,
    };
  }, [normalizePrice]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prevCart, normalizeCartItem(product)];
    });
  }, [normalizeCartItem]);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const getItemPrice = useCallback((item) => {
    const priceValue = item?.productPrice ?? item?.price ?? item?.unitPrice ?? 0;
    return normalizePrice(priceValue);
  }, [normalizePrice]);

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity * getItemPrice(item), 0),
    [cart, getItemPrice]
  );

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, decreaseQuantity, clearCart, totalItems, totalPrice }),
    [cart, addToCart, removeFromCart, decreaseQuantity, clearCart, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

export default CartContext;