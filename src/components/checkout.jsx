import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../globalContext/cartContext';

const Checkout = ({ user }) => {
  const { cart, totalPrice, clearCart } = useCart();

  const handlePay = () => {
    alert('Payment completed successfully!');
    clearCart();
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 mb-4">
                <p className="text-sm font-semibold text-blue-700">Signed in as</p>
                <p className="text-gray-800">{user?.displayName || user?.email?.split('@')[0] || 'Guest User'}</p>
                <p className="text-gray-600">{user?.email || 'No email available'}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border rounded-xl px-4 py-3" placeholder="First Name" defaultValue={user?.displayName?.split(' ')[0] || ''} />
                <input className="border rounded-xl px-4 py-3" placeholder="Last Name" defaultValue={user?.displayName?.split(' ').slice(1).join(' ') || ''} />
                <input className="border rounded-xl px-4 py-3 md:col-span-2" placeholder="Address" />
                <input className="border rounded-xl px-4 py-3" placeholder="City" />
                <input className="border rounded-xl px-4 py-3" placeholder="Postal Code" />
                <input className="border rounded-xl px-4 py-3 md:col-span-2" placeholder="Phone Number" />
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
              <div className="border rounded-xl p-4 bg-gray-50 space-y-3">
                <div className="flex items-center gap-2">
                  <input type="radio" name="payment" defaultChecked />
                  <span>Credit / Debit Card</span>
                </div>
                <input className="w-full border rounded-xl px-4 py-3" placeholder="Card Number" />
                <div className="grid grid-cols-2 gap-4">
                  <input className="border rounded-xl px-4 py-3" placeholder="MM/YY" />
                  <input className="border rounded-xl px-4 py-3" placeholder="CVV" />
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600">
                <span>{item.productName} x {item.quantity}</span>
                <span>${(Number(item.productPrice ?? item.price ?? item.unitPrice ?? 0) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Products Total</span>
              <span>${Number(totalPrice || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>${Number(totalPrice || 0).toFixed(2)}</span>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handlePay}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Pay Now
            </button>
            <Link
              to="/cart"
              className="block w-full text-center bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
