import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../globalContext/cartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, totalItems, totalPrice, addToCart, decreaseQuantity } = useCart();
  const [checkoutStage, setCheckoutStage] = useState('cart');

  const increaseQuantity = (product) => {
    addToCart(product);
  };

  const handleDecreaseQuantity = (product) => {
    if (product.quantity === 1) {
      removeFromCart(product.id);
    } else {
      decreaseQuantity(product.id);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Your Cart</h3>
              <p className="text-blue-100 mt-1">{totalItems} item{totalItems > 1 ? 's' : ''} selected</p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-xl text-right">
              <p className="text-sm text-blue-100">Subtotal</p>
              <p className="text-xl font-semibold">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
              <p className="text-xl font-semibold text-gray-700">Your cart is empty</p>
              <p className="text-gray-500 mt-2">Add some products to see them here.</p>
            </div>
          ) : checkoutStage === 'cart' ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-xl p-4 bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-800">{item.productName}</p>
                    <p className="text-sm text-gray-500 mt-1">Item Price: ${Number(item.productPrice || 0).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="flex items-center border rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => handleDecreaseQuantity(item)}
                        className="px-3 py-2 text-lg font-semibold hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item)}
                        className="px-3 py-2 text-lg font-semibold hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-gray-800">${(Number(item.productPrice || 0) * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm font-medium hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center justify-between text-lg font-semibold text-gray-800">
                  <span>Total Price</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="flex-1 bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => navigate('/checkout')}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  Go to Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                <h4 className="text-lg font-semibold mb-2">Checkout</h4>
                <p className="text-gray-600">Total to pay: ${totalPrice.toFixed(2)}</p>
              </div>

              <button
                onClick={() => setCheckoutStage('cart')}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition"
              >
                Back to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
